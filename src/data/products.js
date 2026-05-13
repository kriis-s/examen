export const products = [
  {
    id: "sol-feliz",
    name: "Dibujito Sol Feliz",
    category: "Lamina digital",
    price: 5990,
    stock: 25,
    image: "/doodles/sol-feliz.svg",
    description:
      "Ilustracion alegre para imprimir, decorar cuadernos o usar en una pieza infantil.",
  },
  {
    id: "arcoiris-magico",
    name: "Dibujito Arcoiris Magico",
    category: "Pack imprimible",
    price: 7990,
    stock: 18,
    image: "/doodles/arcoiris-magico.svg",
    description:
      "Dibujito colorido con nubes suaves, pensado para invitaciones, afiches y tareas creativas.",
  },
  {
    id: "casita-dulce",
    name: "Dibujito Casita Dulce",
    category: "Poster infantil",
    price: 8990,
    stock: 12,
    image: "/doodles/casita-dulce.svg",
    description:
      "Poster tierno de una casita de cuento, listo para descargar e imprimir en alta calidad.",
  },
  {
    id: "cohete-aventura",
    name: "Dibujito Cohete Aventura",
    category: "Sticker digital",
    price: 4990,
    stock: 30,
    image: "/doodles/cohete-aventura.svg",
    description:
      "Sticker infantil con cohete y estrellas para decorar trabajos, regalos y material escolar.",
  },
]

export function formatPrice(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value)
}
