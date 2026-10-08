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
import { PASSWORD_MIN_LENGTH, validateRegister } from '../utils/validators';

function RegisterPage() {
  const { register } = useAuth();
  const { values, errors, setErrors, handleChange } = useForm({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      await register({
        displayName: values.displayName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Regístrate para empezar a usar ControlDesk."
      footer={
        <>
          ¿Ya tienes cuenta? <Link to={ROUTES.LOGIN}>Iniciar sesión</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        {submitError && <Alert variant="error">{submitError}</Alert>}

        <Input
          label="Nombre"
          name="displayName"
          autoComplete="name"
          value={values.displayName}
          onChange={handleChange}
          error={errors.displayName}
          disabled={submitting}
        />

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
          autoComplete="new-password"
          hint={`Mínimo ${PASSWORD_MIN_LENGTH} caracteres.`}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          disabled={submitting}
        />

        <Input
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          disabled={submitting}
        />

        <Button type="submit" size="lg" loading={submitting}>
          Crear cuenta
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
