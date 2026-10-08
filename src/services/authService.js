import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { ROLES, USER_STATUS } from '../constants/roles';

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Crea la cuenta y su perfil en Firestore.
 * El rol siempre es "user": las reglas de Firestore rechazan cualquier otro valor,
 * y no existe ninguna función en el cliente que modifique el rol.
 * Si el perfil no se puede guardar, se elimina la cuenta (o, si no se puede eliminar,
 * se cierra la sesión) para no dejar una sesión activa sin perfil.
 */
export async function registerWithEmail({ displayName, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = credential;

  try {
    await updateProfile(user, { displayName });
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName,
      role: ROLES.USER,
      status: USER_STATUS.ACTIVE,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    await deleteUser(user).catch(() => signOut(auth).catch(() => {}));
    throw error;
  }

  return user;
}

export function logoutUser() {
  return signOut(auth);
}
