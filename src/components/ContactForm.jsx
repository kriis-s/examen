import { Component, createRef } from "react"
import SimpleReactValidator from "simple-react-validator"
import { saveContactForm, uploadSupportFile } from "../firebase.js"
import { products } from "../data/products.js"

class ContactForm extends Component {
  constructor(props) {
    super(props)

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "Este campo es obligatorio.",
        email: "Ingresa un correo valido.",
        min: "Debe tener al menos :min caracteres.",
      },
    })

    this.fileInput = createRef()
    this.state = {
      form: {
        name: "",
        email: "",
        phone: "",
        product: "",
        message: "",
      },
      status: "",
      loading: false,
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }))
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    if (!this.validator.allValid()) {
      this.validator.showMessages()
      this.forceUpdate()
      return
    }

    this.setState({ loading: true, status: "Guardando datos..." })

    try {
      const selectedFile = this.fileInput.current?.files?.[0]
      const upload = await uploadSupportFile(selectedFile)
      const result = await saveContactForm({
        ...this.state.form,
        supportFile: upload?.url || "",
      })

      this.setState({
        form: {
          name: "",
          email: "",
          phone: "",
          product: "",
          message: "",
        },
        loading: false,
        status:
          result.mode === "firebase"
            ? "Formulario guardado correctamente en Firestore."
            : "Formulario guardado en localStorage. Agrega credenciales Firebase para usar Firestore.",
      })

      if (this.fileInput.current) {
        this.fileInput.current.value = ""
      }

      this.validator.hideMessages()
    } catch (error) {
      this.setState({
        loading: false,
        status: `No se pudo guardar: ${error.message}`,
      })
    }
  }

  render() {
    const { form, loading, status } = this.state

    return (
      <section className="form-page">
        <div className="section-heading">
          <span className="eyebrow">Ejercicio 2 y 3</span>
          <h1>Pedido personalizado</h1>
          <p>
            Pide tus dibujitos favoritos o envia una idea para una ilustracion
            personalizada.
          </p>
        </div>

        <form className="workshop-form" onSubmit={this.handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="name">
                Nombre
              </label>
              <input
                className="form-control"
                id="name"
                name="name"
                value={form.name}
                onChange={this.handleChange}
              />
              <small className="text-danger">{this.validator.message("nombre", form.name, "required|min:3")}</small>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="email">
                Correo
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={this.handleChange}
              />
              <small className="text-danger">{this.validator.message("correo", form.email, "required|email")}</small>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="phone">
                Telefono
              </label>
              <input
                className="form-control"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={this.handleChange}
              />
              <small className="text-danger">{this.validator.message("telefono", form.phone, "required|min:8")}</small>
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="product">
                Dibujito de interes
              </label>
              <select
                className="form-select"
                id="product"
                name="product"
                value={form.product}
                onChange={this.handleChange}
              >
                <option value="">Selecciona un dibujito</option>
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
              <small className="text-danger">{this.validator.message("producto", form.product, "required")}</small>
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="message">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={this.handleChange}
              />
              <small className="text-danger">{this.validator.message("mensaje", form.message, "required|min:10")}</small>
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="supportFile">
                Referencia para el dibujito
              </label>
              <input className="form-control" id="supportFile" type="file" ref={this.fileInput} />
            </div>
          </div>

          <div className="form-footer">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar formulario"}
            </button>
            {status && <p className="status-message">{status}</p>}
          </div>
        </form>
      </section>
    )
  }
}

export default ContactForm
