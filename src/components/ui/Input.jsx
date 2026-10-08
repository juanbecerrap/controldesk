import { useId, useState } from 'react';

function Input({ label, error, hint, type = 'text', id, ...rest }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const messageId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>
        {label}
      </label>

      <div className="field__control">
        <input
          id={inputId}
          className={`field__input${error ? ' field__input--error' : ''}${isPassword ? ' field__input--with-toggle' : ''}`}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            className="field__toggle"
            onClick={() => setVisible((current) => !current)}
            aria-pressed={visible}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>

      {error && (
        <p id={messageId} className="field__error" role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={messageId} className="field__hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export default Input;
