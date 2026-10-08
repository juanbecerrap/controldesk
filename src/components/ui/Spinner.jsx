function Spinner({ size = 'md', decorative = false }) {
  return (
    <span
      className={`spinner spinner--${size}`}
      role={decorative ? undefined : 'status'}
      aria-label={decorative ? undefined : 'Cargando'}
      aria-hidden={decorative || undefined}
    />
  );
}

export default Spinner;
