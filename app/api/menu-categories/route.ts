import { type NextRequest, NextResponse } from "next/server"

type MenuCategory = {
  id: string
  title: string
  description: string
  image: string
  href: string
  color: string
  items: string
}

let menuCategories: MenuCategory[] = [
  {
    id: "sr-lomo",
    title: "Sr. Lomo",
    description: "Lomos & Sandwiches como deben ser",
    image: "/sr-lomo-logo.jpg",
    href: "/menu/lomos",
    color: "bg-yellow-600",
    items: "8 especialidades",
  },
  {
    id: "sr-burguer",
    title: "Sra. Burguer", // Cambiar de Sr. Burguer a Sra.Burguer
    description: "Hamburguesas con carácter y sabor real",
    image: "/gourmet-hamburger-beef.jpg",
    href: "/menu/burgers",
    color: "bg-red-600", // Cambiar de bg-amber-800 a bg-red-600
    items: "6 variedades",
  },
  {
    id: "sra-empanada",
    title: "Sra. Empanada",
    description: "Empanadas que cuentan su historia",
    image: "/traditional-empanadas-golden.jpg",
    href: "/menu/empanadas",
    color: "bg-pink-400",
    items: "12 sabores",
  },
  {
    id: "sra-pizza",
    title: "Sra. Pizza",
    description: "Pizza con personalidad italiana",
    image: "/italian-pizza-margherita.jpg",
    href: "/menu/pizzas",
    color: "bg-green-500",
    items: "10 variedades",
  },
]

export async function GET() {
  try {
    console.log("[v0] API menu-categories GET llamada, devolviendo:", menuCategories.length, "categorías")
    return NextResponse.json(menuCategories)
  } catch (error) {
    console.error("[v0] Error obteniendo categorías de menú:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const updatedCategories: MenuCategory[] = await request.json()
    console.log("[v0] API menu-categories POST llamada con:", updatedCategories.length, "categorías")

    // Validar que todas las categorías tengan los campos requeridos
    for (const category of updatedCategories) {
      if (!category.id || !category.title || !category.description) {
        console.log("[v0] Validación fallida para categoría:", category.id)
        return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
      }
    }

    // Actualizar las categorías
    menuCategories = updatedCategories
    console.log("[v0] Categorías actualizadas exitosamente")

    return NextResponse.json(menuCategories)
  } catch (error) {
    console.error("[v0] Error actualizando categorías de menú:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
