import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { PROFILE_STATUS } from '../constants/profileStatus';
import { USER_STATUS } from '../constants/roles';
import {
  loginWithEmail,
  logoutUser,
  registerWithEmail,
} from '../services/authService';
import { AuthContext } from './AuthContext';

const EMPTY_PROFILE_STATE = {
  uid: null,
  status: PROFILE_STATUS.LOADING,
  data: null,
  errorCode: null,
};

/**
 * Fuente única de verdad de sesión + perfil.
 *
 * - `loading`: solo es true hasta que Firebase responde por primera vez sobre la sesión.
 * - `profileStatus`: estado del perfil del usuario actual (idle/loading/ready/missing/error).
 *   Se deriva comparando el uid, así un perfil de otro usuario nunca se reutiliza.
 * - `hasAccess`: true únicamente si el perfil existe, se leyó bien y su estado es "active".
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileState, setProfileState] = useState(EMPTY_PROFILE_STATE);
  const [profileAttempt, setProfileAttempt] = useState(0);
  const isRegistering = useRef(false);

  // Sesión de Firebase (persistente por defecto en el navegador).
  useEffect(
    () =>
      onAuthStateChanged(auth, (firebaseUser) => {
        // Durante el registro se expone al usuario solo cuando su perfil ya fue creado.
        if (isRegistering.current) return;

        setUser(firebaseUser);
        setLoading(false);
      }),
    [],
  );

  const uid = user?.uid ?? null;

  // Perfil (rol y estado) en tiempo real: si un administrador desactiva la cuenta,
  // el acceso se retira sin necesidad de recargar.
  useEffect(() => {
    if (!uid) return undefined;

    return onSnapshot(
      doc(db, 'users', uid),
      (snapshot) => {
        if (snapshot.exists()) {
          setProfileState({
            uid,
            status: PROFILE_STATUS.READY,
            data: { id: snapshot.id, ...snapshot.data() },
            errorCode: null,
          });
          return;
        }

        // Sin conexión, un documento ausente en caché no prueba que no exista:
        // se trata como error recuperable (el listener se actualiza al volver la red).
        const unconfirmed = snapshot.metadata.fromCache;

        setProfileState({
          uid,
          status: unconfirmed ? PROFILE_STATUS.ERROR : PROFILE_STATUS.MISSING,
          data: null,
          errorCode: unconfirmed ? 'unavailable' : null,
        });
      },
      (error) => {
        console.error('No se pudo leer el perfil del usuario:', error);
        setProfileState({
          uid,
          status: PROFILE_STATUS.ERROR,
          data: null,
          errorCode: error?.code ?? 'unknown',
        });
      },
    );
  }, [uid, profileAttempt]);

  const profileMatchesUser = profileState.uid === uid;
  const profileStatus = !uid
    ? PROFILE_STATUS.IDLE
    : profileMatchesUser
      ? profileState.status
      : PROFILE_STATUS.LOADING;
  const profile = profileStatus === PROFILE_STATUS.READY ? profileState.data : null;
  const profileErrorCode =
    profileStatus === PROFILE_STATUS.ERROR ? profileState.errorCode : null;
  const hasAccess = profile?.status === USER_STATUS.ACTIVE;

  const login = useCallback(
    (email, password) => loginWithEmail(email, password),
    [],
  );

  const register = useCallback(async (values) => {
    isRegistering.current = true;

    try {
      await registerWithEmail(values);
    } finally {
      isRegistering.current = false;
      // Sincroniza con el estado real de Firebase (éxito: usuario creado; fallo: sin sesión).
      setUser(auth.currentUser);
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => logoutUser(), []);

  const retryProfile = useCallback(() => {
    if (!uid) return;

    setProfileState({ ...EMPTY_PROFILE_STATE, uid });
    setProfileAttempt((attempt) => attempt + 1);
  }, [uid]);

  const value = useMemo(
    () => ({
      user,
      profile,
      profileStatus,
      profileErrorCode,
      hasAccess,
      loading,
      login,
      register,
      logout,
      retryProfile,
    }),
    [
      user,
      profile,
      profileStatus,
      profileErrorCode,
      hasAccess,
      loading,
      login,
      register,
      logout,
      retryProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
