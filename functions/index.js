const { setGlobalOptions } = require('firebase-functions');
const { onCall, HttpsError } = require('firebase-functions/https');
const { getApps, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

setGlobalOptions({ maxInstances: 10 });

if (getApps().length === 0) {
  initializeApp();
}

const adminAuth = getAuth();
const db = getFirestore();

async function requireAdmin(request) {
  if (!request.auth) {
    throw new HttpsError(
      'unauthenticated',
      'Debes iniciar sesión para realizar esta operación.',
    );
  }

  const adminSnapshot = await db
    .collection('users')
    .doc(request.auth.uid)
    .get();

  if (!adminSnapshot.exists || adminSnapshot.data().role !== 'admin') {
    throw new HttpsError(
      'permission-denied',
      'No tienes permisos de administrador.',
    );
  }

  return adminSnapshot.data();
}

exports.getUsers = onCall(async (request) => {
  await requireAdmin(request);

  const snapshot = await db.collection('users').get();

  return {
    users: snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis?.() ?? null,
      };
    }),
  };
});

exports.updateUserRole = onCall(async (request) => {
  await requireAdmin(request);

  const { uid, role } = request.data || {};

  if (!uid || !['admin', 'user'].includes(role)) {
    throw new HttpsError(
      'invalid-argument',
      'El usuario y el rol son obligatorios.',
    );
  }

  if (uid === request.auth.uid && role !== 'admin') {
    throw new HttpsError(
      'failed-precondition',
      'No puedes quitarte tu propio rol de administrador.',
    );
  }

  const userRef = db.collection('users').doc(uid);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'El usuario no existe.');
  }

  await userRef.update({ role });

  return {
    success: true,
  };
});

exports.updateUserStatus = onCall(async (request) => {
  await requireAdmin(request);

  const { uid, status } = request.data || {};

  if (!uid || !['active', 'disabled'].includes(status)) {
    throw new HttpsError(
      'invalid-argument',
      'El usuario y el estado son obligatorios.',
    );
  }

  if (uid === request.auth.uid && status !== 'active') {
    throw new HttpsError(
      'failed-precondition',
      'No puedes desactivar tu propia cuenta.',
    );
  }

  const userRef = db.collection('users').doc(uid);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    throw new HttpsError('not-found', 'El usuario no existe.');
  }

  const previousDisabled = userSnapshot.data().status === 'disabled';

  try {
    await adminAuth.updateUser(uid, {
      disabled: status === 'disabled',
    });

    await userRef.update({ status });
  } catch (error) {
    await adminAuth
      .updateUser(uid, { disabled: previousDisabled })
      .catch(() => {});

    throw new HttpsError(
      'internal',
      'No se pudo actualizar el estado del usuario.',
    );
  }

  return {
    success: true,
  };
});
