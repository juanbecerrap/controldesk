import { ROLE_LABELS } from '../constants/roles';
import { useAuth } from '../hooks/useAuth';

// Placeholder: se reemplaza por el dashboard real en la Fase 2.
// ProtectedRoute garantiza que aquí el perfil existe y está activo.
function DashboardPage() {
  const { user, profile } = useAuth();
  const firstName = (profile.displayName ?? '').split(' ')[0];

  return (
    <div className="page">
      <h1 className="page__title">
        {firstName ? `Hola, ${firstName}` : 'Bienvenido a ControlDesk'}
      </h1>
      <p className="page__lead">Tu sesión está activa. Estos son los datos de tu cuenta.</p>

      <dl className="detail-list">
        <div>
          <dt>Correo</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Rol</dt>
          <dd>{ROLE_LABELS[profile.role] ?? profile.role}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>{profile.status}</dd>
        </div>
      </dl>
    </div>
  );
}

export default DashboardPage;
