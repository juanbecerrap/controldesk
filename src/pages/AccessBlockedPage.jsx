import { useState } from 'react';
import BrandMark from '../components/BrandMark';
import Button from '../components/ui/Button';
import { PROFILE_STATUS } from '../constants/profileStatus';
import { USER_STATUS } from '../constants/roles';
import { useAuth } from '../hooks/useAuth';

function getBlockedContent({ profileStatus, profile, errorCode }) {
  if (profileStatus === PROFILE_STATUS.MISSING) {
    return {
      title: 'No encontramos tu perfil',
      message:
        'Tu cuenta existe, pero no tiene un perfil asociado, así que no podemos darte acceso. Si acabas de registrarte, reintenta. Si el problema continúa, contacta con un administrador.',
      canRetry: true,
    };
  }

  if (profileStatus === PROFILE_STATUS.ERROR) {
    return errorCode === 'permission-denied'
      ? {
          title: 'No pudimos validar tu acceso',
          message:
            'Firestore rechazó la lectura de tu perfil por permisos. Verifica que las reglas de seguridad estén publicadas.',
          canRetry: true,
        }
      : {
          title: 'No pudimos validar tu acceso',
          message:
            'No se pudo comprobar tu perfil. Revisa tu conexión a internet y vuelve a intentarlo.',
          canRetry: true,
        };
  }

  if (profile?.status === USER_STATUS.DISABLED) {
    return {
      title: 'Cuenta desactivada',
      message:
        'Tu cuenta está desactivada. Contacta con un administrador para recuperar el acceso.',
      canRetry: false,
    };
  }

  return {
    title: 'Acceso no disponible',
    message:
      'Tu cuenta no tiene permiso para entrar al panel. Contacta con un administrador.',
    canRetry: false,
  };
}

function AccessBlockedPage() {
  const { profile, profileStatus, profileErrorCode, logout, retryProfile } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const { title, message, canRetry } = getBlockedContent({
    profileStatus,
    profile,
    errorCode: profileErrorCode,
  });

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error('No se pudo cerrar la sesión:', error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="state-screen">
      <section className="state-card" aria-labelledby="blocked-title">
        <span className="state-card__logo">
          <BrandMark size={36} />
        </span>
        <h1 id="blocked-title">{title}</h1>
        <p role="alert">{message}</p>

        <div className="state-card__actions">
          {canRetry && (
            <Button variant="secondary" onClick={retryProfile} disabled={loggingOut}>
              Reintentar
            </Button>
          )}
          <Button onClick={handleLogout} loading={loggingOut}>
            Cerrar sesión
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AccessBlockedPage;
