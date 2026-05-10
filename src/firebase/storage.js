import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config";

/**
 * Faz upload do avatar do usuário e retorna a URL pública.
 * @param {string} uid - UID do usuário
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string>} URL da imagem
 */
export async function uploadAvatar(uid, file) {
  const extension = file.name.split(".").pop();
  const storageRef = ref(storage, `avatars/${uid}/profile.${extension}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

/**
 * Faz upload da imagem principal de um estabelecimento.
 * @param {string} estId - ID do estabelecimento
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string>} URL da imagem
 */
export async function uploadEstablishmentImage(estId, file) {
  const extension = file.name.split(".").pop();
  const storageRef = ref(storage, `establishments/${estId}/cover.${extension}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

/**
 * Faz upload do logo de um estabelecimento.
 * @param {string} estId
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function uploadEstablishmentLogo(estId, file) {
  const extension = file.name.split(".").pop();
  const storageRef = ref(storage, `establishments/${estId}/logo.${extension}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}