import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BrandMark from './BrandMark';
import { ROUTES } from '../constants/routes';

const NAV_ITEMS = [{ to: ROUTES.DASHBOARD, label: 'Panel general', end: true }];

function Sidebar({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`sidebar-backdrop${open ? ' sidebar-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar${open ? ' sidebar--open' : ''}`}
        aria-label="Navegación principal"
      >
        <div className="sidebar__brand">
          <BrandMark size={32} />
          <div>
            <strong>ControlDesk</strong>
            <span>Panel administrativo</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span>Entorno</span>
          <strong>
            {import.meta.env.MODE === 'production' ? 'Producción' : 'Desarrollo'}
          </strong>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
