"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"
import type { CartItem } from "@/lib/types"

interface MercadoPagoButtonProps {
  items: CartItem[]
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
  }
  total: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function MercadoPagoButton({ items, customerInfo, total, onSuccess, onError }: MercadoPagoButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Generar ID único para la orden
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Crear preferencia de pago
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerInfo,
          orderId,
        }),
      })

      if (!response.ok) {
        throw new Error("Error creating payment preference")
      }

      const data = await response.json()

      // Guardar información de la orden en localStorage para tracking
      localStorage.setItem(
        "currentOrder",
        JSON.stringify({
          orderId,
          items,
          customerInfo,
          total,
          preferenceId: data.id,
          createdAt: new Date().toISOString(),
        }),
      )

      // Redirigir a Mercado Pago
      const checkoutUrl = process.env.NODE_ENV === "production" ? data.init_point : data.sandbox_init_point

      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Payment error:", error)
      onError?.("Error al procesar el pago. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={loading} variant="default" size="lg" className="w-full">
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5 mr-2" />
          Pagar con Mercado Pago - ${total.toLocaleString()}
        </>
      )}
    </Button>
  )
}
