import { Link, useParams } from "react-router-dom"
import { formatPrice, products } from "../data/products.js"

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <section className="simple-page">
        <h1>Producto no encontrado</h1>
        <Link className="btn btn-primary" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="detail-page">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="eyebrow">Ruta con parametro</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <dl className="detail-list">
          <div>
            <dt>Categoria</dt>
            <dd>{product.category}</dd>
          </div>
          <div>
            <dt>Precio</dt>
            <dd>{formatPrice(product.price)}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{product.stock} unidades</dd>
          </div>
        </dl>
        <Link className="btn btn-outline-secondary" to="/">
          Volver al catalogo
        </Link>
      </div>
    </section>
  )
}

export default ProductDetail
