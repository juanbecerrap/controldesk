const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
  'auth/invalid-login-credentials': 'El correo o la contraseña no son correctos.',
  'auth/user-not-found': 'El correo o la contraseña no son correctos.',
  'auth/wrong-password': 'El correo o la contraseña no son correctos.',
  'auth/invalid-email': 'El correo electrónico no tiene un formato válido.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo. Inicia sesión o usa otro correo.',
  'auth/weak-password': 'La contraseña es demasiado débil. Usa al menos 8 caracteres.',
  'auth/user-disabled': 'Esta cuenta está desactivada. Contacta con un administrador.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos y vuelve a intentarlo.',
  'auth/network-request-failed': 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.',
  'auth/operation-not-allowed': 'El acceso con correo y contraseña no está habilitado en Firebase.',
  'permission-denied': 'No se pudo guardar tu perfil por los permisos de Firestore. Revisa que las reglas estén publicadas.',
};

const DEFAULT_MESSAGE = 'Ocurrió un error inesperado. Inténtalo de nuevo.';

export function getAuthErrorMessage(error) {
  return AUTH_ERROR_MESSAGES[error?.code] ?? DEFAULT_MESSAGE;
}
