import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCEu2ALClTRHnWqnOWCHONf97IRtY-9UUk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "examen-7dd8b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "examen-7dd8b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "examen-7dd8b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "436715435932",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:436715435932:web:e47db30a8d013f54b97a59",
}

export const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean)

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null
export const googleProvider = new GoogleAuthProvider()

export async function saveContactForm(formData) {
  const payload = {
    ...formData,
    createdAt: hasFirebaseConfig ? serverTimestamp() : new Date().toISOString(),
  }

  if (!hasFirebaseConfig) {
    const saved = JSON.parse(localStorage.getItem("contactos") || "[]")
    saved.push(payload)
    localStorage.setItem("contactos", JSON.stringify(saved))
    return { mode: "local", id: crypto.randomUUID() }
  }

  const docRef = await addDoc(collection(db, "contactos"), payload)
  return { mode: "firebase", id: docRef.id }
}

export async function uploadSupportFile(file) {
  if (!file) return null

  if (!hasFirebaseConfig) {
    return {
      mode: "local",
      name: file.name,
      url: URL.createObjectURL(file),
    }
  }

  const fileRef = ref(storage, `comprobantes/${Date.now()}-${file.name}`)
  await uploadBytes(fileRef, file)
  return {
    mode: "firebase",
    name: file.name,
    url: await getDownloadURL(fileRef),
  }
}

export async function loginAnonymously() {
  if (!hasFirebaseConfig) return null
  return signInAnonymously(auth)
}

export async function loginWithGoogle() {
  if (!hasFirebaseConfig) return null
  return signInWithPopup(auth, googleProvider)
}

export async function logout() {
  if (!hasFirebaseConfig) return null
  return signOut(auth)
}
