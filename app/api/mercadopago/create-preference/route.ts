import { type NextRequest, NextResponse } from "next/server"
import { createPreference } from "@/lib/mercadopago"
import type { CartItem } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customerInfo, orderId } = body

    // Convertir items del carrito a formato de Mercado Pago
    const mpItems = items.map((item: CartItem) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "ARS",
      picture_url: item.image,
    }))

    // Crear preferencia de pago
    const preferenceData = {
      items: mpItems,
      payer: {
        name: customerInfo.name?.split(" ")[0] || "",
        surname: customerInfo.name?.split(" ").slice(1).join(" ") || "",
        email: customerInfo.email || "",
        phone: {
          number: customerInfo.phone || "",
        },
        address: {
          street_name: customerInfo.address || "",
        },
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
      },
      auto_return: "approved" as const,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
      external_reference: orderId,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    }

    const preference = await createPreference(preferenceData)

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    })
  } catch (error) {
    console.error("Error creating preference:", error)
    return NextResponse.json({ error: "Error creating payment preference" }, { status: 500 })
  }
}
