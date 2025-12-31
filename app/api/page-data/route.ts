import { type NextRequest, NextResponse } from "next/server"

// Datos por defecto de la página
let pageData = {
  heroImage: "/italian-restaurant-interior.png",
  heroText: "Auténtica Cocina Italiana en el Corazón de la Ciudad",
  aboutText:
    "Desde 1985, ofrecemos la mejor experiencia gastronómica italiana con ingredientes frescos importados directamente de Italia.",
  restaurantName: "Bella Vista",
  phone: "+34 912 345 678",
  email: "info@bellavista.es",
  address: "Calle Mayor 123, 28013 Madrid",
  openingHours: {
    monday: "12:00 - 16:00, 19:00 - 23:30",
    tuesday: "12:00 - 16:00, 19:00 - 23:30",
    wednesday: "12:00 - 16:00, 19:00 - 23:30",
    thursday: "12:00 - 16:00, 19:00 - 23:30",
    friday: "12:00 - 16:00, 19:00 - 00:00",
    saturday: "12:00 - 16:00, 19:00 - 00:00",
    sunday: "12:00 - 16:00, 19:00 - 23:00",
  },
  socialMedia: {
    facebook: "https://facebook.com/bellavista",
    instagram: "https://instagram.com/bellavista",
    twitter: "https://twitter.com/bellavista",
  },
}

export async function GET() {
  try {
    return NextResponse.json(pageData)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener datos de la página" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Actualizar solo los campos proporcionados
    pageData = {
      ...pageData,
      ...body,
    }

    return NextResponse.json(pageData)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar datos de la página" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { field, value } = body

    if (!field) {
      return NextResponse.json({ error: "Campo requerido" }, { status: 400 })
    }

    // Actualizar un campo específico
    if (field.includes(".")) {
      // Para campos anidados como 'openingHours.monday'
      const [parent, child] = field.split(".")
      if (pageData[parent as keyof typeof pageData]) {
        ;(pageData[parent as keyof typeof pageData] as any)[child] = value
      }
    } else {
      // Para campos de primer nivel
      ;(pageData as any)[field] = value
    }

    return NextResponse.json(pageData)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar campo" }, { status: 500 })
  }
}
