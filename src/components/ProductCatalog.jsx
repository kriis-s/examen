import { Component } from "react"
import ProductCard from "./ProductCard.jsx"
import { formatPrice, products } from "../data/products.js"

class ProductCatalog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
    }
  }

  handleAddToCart = (product) => {
    this.setState((prevState) => {
      const item = prevState.cart.find((cartItem) => cartItem.id === product.id)

      if (item) {
        return {
          cart: prevState.cart.map((cartItem) =>
            cartItem.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        }
      }

      return {
        cart: [...prevState.cart, { ...product, quantity: 1 }],
      }
    })
  }

  handleRemoveFromCart = (productId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.id !== productId),
    }))
  }

  getTotal() {
    return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  render() {
    return (
      <section className="page-grid">
        <div className="catalog-content">
          <div className="section-heading">
            <span className="eyebrow">Tienda infantil</span>
            <h1>Dibujitos</h1>
            <p>
              Venta de laminas, posters y stickers digitales con ilustraciones
              infantiles listas para imprimir.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={this.handleAddToCart}
              />
            ))}
          </div>
        </div>

        <aside className="cart-panel" aria-label="Carrito de compras">
          <span className="eyebrow">Carrito</span>
          <h2>{this.state.cart.length} productos</h2>

          {this.state.cart.length === 0 ? (
            <p className="muted">Agrega tus dibujitos favoritos para armar el pedido.</p>
          ) : (
            <ul className="cart-list">
              {this.state.cart.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    onClick={() => this.handleRemoveFromCart(item.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(this.getTotal())}</strong>
          </div>
        </aside>
      </section>
    )
  }
}

export default ProductCatalog
