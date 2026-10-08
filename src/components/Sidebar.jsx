import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside>
      <div>
        <h2>ControlDesk</h2>
        <p>Panel administrativo</p>
      </div>

      <nav>
        <NavLink to="/">
          Panel general
        </NavLink>
      </nav>

      <div>
        <p>Entorno de desarrollo</p>
        <span>Local</span>
      </div>
    </aside>
  );
}

export default Sidebar;