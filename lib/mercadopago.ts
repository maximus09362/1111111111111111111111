import { MercadoPagoConfig, Preference } from "mercadopago"

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: "abc",
  },
})

export const preference = new Preference(client)

export interface MPItem {
  id: string
  title: string
  description?: string
  quantity: number
  unit_price: number
  currency_id: string
  picture_url?: string
}

export interface MPPreferenceData {
  items: MPItem[]
  payer?: {
    name?: string
    surname?: string
    email?: string
    phone?: {
      area_code?: string
      number?: string
    }
    address?: {
      street_name?: string
      street_number?: number
      zip_code?: string
    }
  }
  back_urls?: {
    success?: string
    failure?: string
    pending?: string
  }
  auto_return?: "approved" | "all"
  notification_url?: string
  external_reference?: string
  expires?: boolean
  expiration_date_from?: string
  expiration_date_to?: string
}

export async function createPreference(data: MPPreferenceData) {
  try {
    const response = await preference.create({
      body: data,
    })
    return response
  } catch (error) {
    console.error("Error creating MP preference:", error)
    throw error
  }
}
