import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AppLayout() {
  return (
    <div>
      <Sidebar />

      <main>
        <Topbar />

        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;