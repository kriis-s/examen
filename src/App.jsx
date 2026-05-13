import { Link, NavLink, Route, Routes } from "react-router-dom"
import "./App.css"
import ProductCatalog from "./components/ProductCatalog.jsx"
import ContactForm from "./components/ContactForm.jsx"
import ProductDetail from "./components/ProductDetail.jsx"
import FirebasePanel from "./components/FirebasePanel.jsx"

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          Dibujitos
        </Link>
        <nav className="nav-links" aria-label="Navegacion principal">
          <NavLink to="/">Catalogo</NavLink>
          <NavLink to="/formulario">Pedidos</NavLink>
          <NavLink to="/firebase">Firebase</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/formulario" element={<ContactForm />} />
          <Route path="/firebase" element={<FirebasePanel />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
