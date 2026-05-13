import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// ─────────────────────────────────────────────
//  USUÁRIOS
// ─────────────────────────────────────────────

export async function createUserProfile(uid, data) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function updateUserProfile(uid, data) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─────────────────────────────────────────────
//  ESTABELECIMENTOS
// ─────────────────────────────────────────────

export async function createEstablishment(uid, data) {
  const ref = await addDoc(collection(db, "establishments"), {
    ...data,
    ownerId: uid,
    rating: 0,
    ratingCount: 0,
    active: true,
    createdAt: serverTimestamp(),
  });

  // Salva o id do estabelecimento no perfil do usuário
  await updateDoc(doc(db, "users", uid), { establishmentId: ref.id });

  return ref.id;
}

export async function getEstablishment(estId) {
  const snap = await getDoc(doc(db, "establishments", estId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getEstablishmentByOwner(uid) {
  const q = query(
    collection(db, "establishments"),
    where("ownerId", "==", uid),
    where("active", "==", true)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
}

/**
 * Busca estabelecimentos por categoria.
 * Usa apenas um filtro simples (sem orderBy no Firestore) para não
 * exigir índice composto. A ordenação é feita em memória.
 */
export async function getEstablishmentsByCategory(category) {
  const q = query(
    collection(db, "establishments"),
    where("category", "==", category),
    where("active", "==", true)
  );
  const snap = await getDocs(q);
  const results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Ordena por rating decrescente em memória (sem precisar de índice)
  return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

export async function updateEstablishment(estId, data) {
  await updateDoc(doc(db, "establishments", estId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─────────────────────────────────────────────
//  SERVIÇOS
// ─────────────────────────────────────────────

export async function createService(estId, data) {
  const ref = await addDoc(collection(db, "services"), {
    ...data,
    estId,
    active: true,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getServices(estId) {
  const q = query(
    collection(db, "services"),
    where("estId", "==", estId),
    where("active", "==", true)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ─────────────────────────────────────────────
//  RESERVAS
// ─────────────────────────────────────────────

export async function checkSlotAvailability(estId, date, time) {
  const q = query(
    collection(db, "bookings"),
    where("estId", "==", estId),
    where("date", "==", date),
    where("time", "==", time),
    where("status", "in", ["pendente", "confirmado"])
  );
  const snap = await getDocs(q);
  return snap.empty; // true = disponível
}

export async function createBooking({
  userId,
  userName,
  estId,
  establishmentName,
  serviceId,
  serviceName,
  servicePrice,
  date,
  time,
}) {
  const available = await checkSlotAvailability(estId, date, time);
  if (!available) {
    throw new Error("Este horário já foi reservado. Escolha outro.");
  }

  const ref = await addDoc(collection(db, "bookings"), {
    userId,
    userName,
    estId,
    establishmentName,
    serviceId,
    serviceName,
    servicePrice,
    date,
    time,
    status: "pendente",
    createdAt: serverTimestamp(),
  });

  return ref.id;
}

export async function getUserBookings(userId) {
  const q = query(
    collection(db, "bookings"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getEstablishmentBookings(estId) {
  const q = query(
    collection(db, "bookings"),
    where("estId", "==", estId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Listener em tempo real para reservas de um estabelecimento.
 * @returns {function} Unsubscribe
 */
export function onEstablishmentBookings(estId, callback) {
  const q = query(
    collection(db, "bookings"),
    where("estId", "==", estId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(bookings);
  });
}

export async function updateBookingStatus(bookingId, status) {
  await updateDoc(doc(db, "bookings", bookingId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function getOccupiedSlots(estId, date) {
  const q = query(
    collection(db, "bookings"),
    where("estId", "==", estId),
    where("date", "==", date),
    where("status", "in", ["pendente", "confirmado"])
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data().time);
}