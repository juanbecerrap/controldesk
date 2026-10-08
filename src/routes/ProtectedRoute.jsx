import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullPageLoader from '../components/ui/FullPageLoader';
import { PROFILE_STATUS } from '../constants/profileStatus';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import AccessBlockedPage from '../pages/AccessBlockedPage';

/**
 * Concede acceso solo si hay sesión Y el perfil de Firestore existe, se leyó
 * correctamente y está "active". Cualquier otro caso se resuelve así:
 *  - sin sesión            -> redirige a /login
 *  - cargando sesión/perfil -> indicador de carga (nunca se muestra el panel)
 *  - perfil ausente, desactivado o con error -> pantalla de acceso bloqueado
 *
 * El bloqueo se renderiza en el sitio, sin redirigir: una redirección a /login
 * rebotaría de vuelta (PublicOnlyRoute) y crearía un bucle infinito.
 */
function ProtectedRoute() {
  const { user, loading, profileStatus, hasAccess } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader message="Verificando sesión…" />;

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (profileStatus === PROFILE_STATUS.LOADING) {
    return <FullPageLoader message="Verificando tu perfil…" />;
  }

  if (!hasAccess) return <AccessBlockedPage />;

  return <Outlet />;
}

export default ProtectedRoute;
