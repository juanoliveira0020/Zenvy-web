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
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// ─────────────────────────────────────────────
//  USUÁRIOS
// ─────────────────────────────────────────────

/**
 * Cria o documento de perfil do usuário no Firestore.
 */
export async function createUserProfile(uid, data) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/**
 * Retorna o perfil completo de um usuário.
 */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Atualiza campos do perfil do usuário.
 */
export async function updateUserProfile(uid, data) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─────────────────────────────────────────────
//  ESTABELECIMENTOS
// ─────────────────────────────────────────────

/**
 * Cria um estabelecimento vinculado ao uid do dono.
 */
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

/**
 * Retorna um estabelecimento por ID.
 */
export async function getEstablishment(estId) {
  const snap = await getDoc(doc(db, "establishments", estId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Retorna o estabelecimento de um dono (por ownerId).
 */
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
 * Retorna todos os estabelecimentos de uma categoria.
 */
export async function getEstablishmentsByCategory(category) {
  const q = query(
    collection(db, "establishments"),
    where("category", "==", category),
    where("active", "==", true),
    orderBy("rating", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Atualiza o perfil de um estabelecimento.
 */
export async function updateEstablishment(estId, data) {
  await updateDoc(doc(db, "establishments", estId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─────────────────────────────────────────────
//  SERVIÇOS
// ─────────────────────────────────────────────

/**
 * Cria um serviço vinculado a um estabelecimento.
 */
export async function createService(estId, data) {
  const ref = await addDoc(collection(db, "services"), {
    ...data,
    estId,
    active: true,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Retorna os serviços de um estabelecimento.
 */
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

/**
 * Verifica se um slot (estId + date + time) já está ocupado.
 * Retorna true se disponível, false se ocupado.
 */
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

/**
 * Cria uma reserva no Firestore.
 */
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

/**
 * Retorna todas as reservas de um usuário (cliente).
 */
export async function getUserBookings(userId) {
  const q = query(
    collection(db, "bookings"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Retorna todas as reservas de um estabelecimento.
 */
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

/**
 * Atualiza o status de uma reserva.
 * @param {string} bookingId
 * @param {"pendente"|"confirmado"|"cancelado"|"concluído"} status
 */
export async function updateBookingStatus(bookingId, status) {
  await updateDoc(doc(db, "bookings", bookingId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Retorna os slots já ocupados de um estabelecimento em uma data.
 */
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