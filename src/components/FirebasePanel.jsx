import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, hasFirebaseConfig, loginAnonymously, loginWithGoogle, logout } from "../firebase.js"

function FirebasePanel() {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (!auth) return undefined
    return onAuthStateChanged(auth, setUser)
  }, [])

  const handleAuth = async (method) => {
    setStatus("Procesando autenticacion...")
    try {
      await method()
      setStatus("Autenticacion realizada correctamente.")
    } catch (error) {
      setStatus(`Error de autenticacion: ${error.message}`)
    }
  }

  return (
    <section className="simple-page">
      <span className="eyebrow">Firebase Auth y Storage</span>
      <h1>Panel de servicios cloud</h1>
      <p>
        Esta vista comprueba FirebaseAuth. Los pedidos de Dibujitos usan Firestore
        Database y el campo de referencia esta preparado para Firebase Storage.
      </p>

      {!hasFirebaseConfig && (
        <div className="alert alert-warning">
          Faltan variables de entorno Firebase. Crea un archivo .env con los valores
          indicados en el README para activar los servicios reales.
        </div>
      )}

      <div className="auth-actions">
        <button
          className="btn btn-primary"
          type="button"
          disabled={!hasFirebaseConfig}
          onClick={() => handleAuth(loginAnonymously)}
        >
          Ingresar anonimo
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          disabled={!hasFirebaseConfig}
          onClick={() => handleAuth(loginWithGoogle)}
        >
          Ingresar con Google
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          disabled={!hasFirebaseConfig || !user}
          onClick={() => handleAuth(logout)}
        >
          Cerrar sesion
        </button>
      </div>

      <div className="user-box">
        <strong>Usuario actual</strong>
        <span>{user ? user.email || user.uid : "Sin sesion activa"}</span>
      </div>
      {status && <p className="status-message">{status}</p>}
    </section>
  )
}

export default FirebasePanel
