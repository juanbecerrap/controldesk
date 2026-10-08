import { useState } from 'react';
import Button from './ui/Button';
import { ROLE_LABELS } from '../constants/roles';
import { useAuth } from '../hooks/useAuth';
import { getInitials } from '../utils/formatters';

function Topbar({ onMenuClick }) {
  const { user, profile, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const name = user?.displayName || user?.email;

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
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Abrir menú de navegación"
        >
          <span aria-hidden="true">☰</span>
        </button>
        <p className="topbar__title">Panel de control</p>
      </div>

      <div className="topbar__right">
        <div className="user-chip">
          <span className="user-chip__avatar" aria-hidden="true">
            {getInitials(user?.displayName, user?.email)}
          </span>
          <span className="user-chip__text">
            <strong>{name}</strong>
            {profile && <small>{ROLE_LABELS[profile.role] ?? profile.role}</small>}
          </span>
        </div>

        <Button variant="secondary" size="sm" onClick={handleLogout} loading={loggingOut}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}

export default Topbar;
