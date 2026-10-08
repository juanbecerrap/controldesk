// Estado de la carga del perfil de Firestore (users/{uid}) del usuario autenticado.
export const PROFILE_STATUS = {
  IDLE: 'idle', // no hay sesión, no hay perfil que cargar
  LOADING: 'loading', // esperando la primera respuesta de Firestore
  READY: 'ready', // el perfil existe y se pudo leer
  MISSING: 'missing', // la lectura funcionó, pero el documento no existe
  ERROR: 'error', // no se pudo leer (permisos, red, etc.)
};
