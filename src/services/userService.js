import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const usersCollection = collection(db, 'users');

export async function getUsers() {
  const snapshot = await getDocs(usersCollection);

  return snapshot.docs.map((userDoc) => ({
    id: userDoc.id,
    ...userDoc.data(),
  }));
}

export async function updateUserRole(uid, role) {
  await updateDoc(doc(db, 'users', uid), {
    role,
  });
}

export async function updateUserStatus(uid, status) {
  await updateDoc(doc(db, 'users', uid), {
    status,
  });
}