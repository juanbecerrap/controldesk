import Spinner from './Spinner';

function FullPageLoader({ message = 'Cargando…' }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <Spinner size="lg" decorative />
      <p>{message}</p>
    </div>
  );
}

export default FullPageLoader;
