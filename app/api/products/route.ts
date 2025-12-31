import { type NextRequest, NextResponse } from "next/server"

// Datos de productos por defecto
const defaultProducts = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 12.99,
    image: "/pizza-margherita.png",
    description: "Pizza clásica con tomate, mozzarella y albahaca fresca",
  },
  {
    id: 2,
    name: "Pasta Carbonara",
    price: 14.99,
    image: "/pasta-carbonara.png",
    description: "Pasta con huevo, panceta, queso parmesano y pimienta negra",
  },
  {
    id: 3,
    name: "Risotto ai Funghi",
    price: 16.99,
    image: "/risotto-mushrooms.jpg",
    description: "Risotto cremoso con setas porcini y queso parmesano",
  },
  {
    id: 4,
    name: "Osso Buco",
    price: 24.99,
    image: "/osso-buco-milanese.jpg",
    description: "Jarrete de ternera estofado con verduras y vino blanco",
  },
  {
    id: 5,
    name: "Tiramisu",
    price: 8.99,
    image: "/classic-tiramisu.png",
    description: "Postre tradicional italiano con café, mascarpone y cacao",
  },
  {
    id: 6,
    name: "Bruschetta",
    price: 7.99,
    image: "/bruschetta-tomato-basil.jpg",
    description: "Pan tostado con tomate fresco, ajo y albahaca",
  },
]

// Simulamos una base de datos en memoria
let products = [...defaultProducts]

export async function GET() {
  try {
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (Array.isArray(body)) {
      // Actualizar todos los productos
      products = body.map((product, index) => ({
        ...product,
        id: product.id || index + 1,
      }))
    } else {
      // Agregar un nuevo producto
      const newProduct = {
        ...body,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
      }
      products.push(newProduct)
    }

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar productos" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    products[productIndex] = { ...products[productIndex], ...updateData }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = Number.parseInt(searchParams.get("id") || "0")

    products = products.filter((p) => p.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 })
  }
}
