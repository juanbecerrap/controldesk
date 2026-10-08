import Spinner from './Spinner';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner size="sm" decorative />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
