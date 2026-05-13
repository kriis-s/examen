import { Link } from "react-router-dom"
import { formatPrice } from "../data/products.js"

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-picture">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <span className="badge text-bg-light">{product.category}</span>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-meta">
          <strong>{formatPrice(product.price)}</strong>
          <span>{product.stock} disponibles</span>
        </div>
        <div className="product-actions">
          <Link className="btn btn-outline-secondary btn-sm" to={`/producto/${product.id}`}>
            Ver detalle
          </Link>
          <button className="btn btn-primary btn-sm" type="button" onClick={() => onAddToCart(product)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
