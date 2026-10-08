import './firebase/firebase';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';

function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          {/* Fases siguientes: /products, /users, /orders, /reports */}
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
}

export default App;
