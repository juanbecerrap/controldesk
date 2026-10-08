import { useCallback, useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) =>
      current[name] ? { ...current, [name]: undefined } : current,
    );
  }, []);

  return { values, errors, setErrors, handleChange };
}
