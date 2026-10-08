import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullPageLoader from '../components/ui/FullPageLoader';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader message="Verificando sesión…" />;

  if (user) {
    const destination = location.state?.from?.pathname ?? ROUTES.DASHBOARD;
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
