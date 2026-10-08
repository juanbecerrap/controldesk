import BrandMark from '../components/BrandMark';
import '../styles/auth.css';

function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="auth__logo">
          <BrandMark size={36} />
          <span>ControlDesk</span>
        </div>

        <div className="auth__pitch">
          <h2>Todo tu negocio en un solo escritorio.</h2>
          <p>
            Gestiona productos, pedidos y usuarios, y revisa tus ventas sin
            cambiar de herramienta.
          </p>
        </div>

        <p className="auth__legal">Acceso protegido con Firebase Authentication</p>
      </aside>

      <main className="auth__main">
        <div className="auth__panel">
          <div className="auth__logo auth__logo--mobile">
            <BrandMark size={32} />
            <span>ControlDesk</span>
          </div>

          <header className="auth__header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </header>

          {children}

          <p className="auth__footer">{footer}</p>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
