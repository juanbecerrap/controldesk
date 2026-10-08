const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 60;

function validateEmail(email) {
  const value = email.trim();

  if (!value) return 'Ingresa tu correo electrónico.';
  if (!EMAIL_PATTERN.test(value)) return 'Ingresa un correo válido, por ejemplo nombre@empresa.com.';
  return undefined;
}

export function validateLogin({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);

  if (emailError) errors.email = emailError;
  if (!password) errors.password = 'Ingresa tu contraseña.';

  return errors;
}

export function validateRegister({ displayName, email, password, confirmPassword }) {
  const errors = {};
  const name = displayName.trim();
  const emailError = validateEmail(email);

  if (name.length < NAME_MIN_LENGTH) {
    errors.displayName = `Ingresa tu nombre (mínimo ${NAME_MIN_LENGTH} caracteres).`;
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.displayName = `El nombre no puede superar ${NAME_MAX_LENGTH} caracteres.`;
  }

  if (emailError) errors.email = emailError;

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }

  return errors;
}
