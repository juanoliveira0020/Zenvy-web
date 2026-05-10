import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";
import { createUserProfile, getUserProfile } from "./db";

/**
 * Cria uma nova conta de usuário e salva o perfil no Firestore.
 * @param {string} email
 * @param {string} password
 * @param {string} name - Nome do usuário ou responsável
 * @param {"cliente"|"empresa"} type - Tipo de conta
 * @param {object} extraData - Dados adicionais (para empresa: establishmentName, category, address)
 */
export async function signUp(email, password, name, type, extraData = {}) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  await updateProfile(user, { displayName: name });

  const profileData = {
    name,
    email,
    type,
    createdAt: new Date().toISOString(),
    ...extraData,
  };

  await createUserProfile(user.uid, profileData);

  return user;
}

/**
 * Autentica um usuário existente.
 * @param {string} email
 * @param {string} password
 * @returns {{ user, profile }} - Objeto Firebase user + perfil do Firestore
 */
export async function signIn(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  const profile = await getUserProfile(user.uid);
  return { user, profile };
}

/**
 * Encerra a sessão do usuário autenticado.
 */
export async function signOut() {
  await firebaseSignOut(auth);
}

/**
 * Envia e-mail de recuperação de senha.
 * @param {string} email
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Observa mudanças no estado de autenticação.
 * @param {function} callback - Chamado com (user | null)
 * @returns {function} - Função para cancelar o listener
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Retorna o usuário autenticado atualmente (ou null).
 */
export function getCurrentUser() {
  return auth.currentUser;
}