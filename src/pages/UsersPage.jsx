import { useCallback, useEffect, useState } from 'react';
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from '../services/userService';
import { useAuth } from '../context/AuthContext';

function formatDate(timestamp) {
  if (!timestamp) {
    return '—';
  }

  const date =
    typeof timestamp.toDate === 'function'
      ? timestamp.toDate()
      : new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
  }).format(date);
}

function UsersPage() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (loadError) {
      console.error(loadError);
      setError('No se pudieron cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialUsers() {
      try {
        const data = await getUsers();

        if (!cancelled) {
          setUsers(data);
        }
      } catch (loadError) {
        console.error(loadError);

        if (!cancelled) {
          setError('No se pudieron cargar los usuarios.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadInitialUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRefresh() {
    setLoading(true);
    setError('');

    await fetchUsers();
  }

  async function handleRoleChange(uid, role) {
    setError('');

    try {
      await updateUserRole(uid, role);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === uid ? { ...item, role } : item,
        ),
      );
    } catch (updateError) {
      console.error(updateError);
      setError('No se pudo actualizar el rol.');
    }
  }

  async function handleStatusChange(uid, status) {
    setError('');

    try {
      await updateUserStatus(uid, status);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === uid ? { ...item, status } : item,
        ),
      );
    } catch (updateError) {
      console.error(updateError);
      setError('No se pudo actualizar el estado.');
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Administración</p>
          <h1>Usuarios</h1>
          <p>
            Gestiona los roles y el estado de acceso de los usuarios de
            ControlDesk.
          </p>
        </div>

        <button type="button" onClick={handleRefresh} disabled={loading}>
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {error && <div role="alert">{error}</div>}

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Registro</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => {
                const isCurrentUser = item.id === user?.uid;

                return (
                  <tr key={item.id}>
                    <td>{item.displayName || 'Sin nombre'}</td>

                    <td>{item.email}</td>

                    <td>
                      <select
                        value={item.role}
                        disabled={isCurrentUser}
                        onChange={(event) =>
                          handleRoleChange(item.id, event.target.value)
                        }
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>

                    <td>
                      <select
                        value={item.status}
                        disabled={isCurrentUser}
                        onChange={(event) =>
                          handleStatusChange(item.id, event.target.value)
                        }
                      >
                        <option value="active">Activo</option>
                        <option value="disabled">Desactivado</option>
                      </select>
                    </td>

                    <td>{formatDate(item.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UsersPage;