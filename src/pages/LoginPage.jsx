import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import AuthLayout from '../layouts/AuthLayout';
import { getAuthErrorMessage } from '../utils/authErrors';
import { validateLogin } from '../utils/validators';

function LoginPage() {
  const { login } = useAuth();
  const { values, errors, setErrors, handleChange } = useForm({
    email: '',
    password: '',
  });
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      // Al iniciar sesión, PublicOnlyRoute redirige al dashboard automáticamente.
      await login(values.email.trim(), values.password);
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Inicia sesión"
      subtitle="Ingresa con tu correo para acceder al panel."
      footer={
        <>
          ¿Aún no tienes cuenta? <Link to={ROUTES.REGISTER}>Crear cuenta</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        {submitError && <Alert variant="error">{submitError}</Alert>}

        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          disabled={submitting}
        />

        <Input
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          disabled={submitting}
        />

        <Button type="submit" size="lg" loading={submitting}>
          Iniciar sesión
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
