import { type NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

const payment = new Payment(client)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verificar que sea una notificación de pago
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Obtener información del pago
      const paymentInfo = await payment.get({ id: paymentId })

      // Procesar según el estado del pago
      switch (paymentInfo.status) {
        case "approved":
          // Pago aprobado - actualizar orden
          await handleApprovedPayment(paymentInfo)
          break

        case "pending":
          // Pago pendiente - notificar al cliente
          await handlePendingPayment(paymentInfo)
          break

        case "rejected":
          // Pago rechazado - notificar error
          await handleRejectedPayment(paymentInfo)
          break

        default:
          console.log("Payment status not handled:", paymentInfo.status)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

async function handleApprovedPayment(paymentInfo: any) {
  // Aquí implementarías la lógica para:
  // 1. Actualizar el estado de la orden en la base de datos
  // 2. Enviar email de confirmación
  // 3. Notificar al restaurante
  // 4. Iniciar proceso de preparación

  console.log("Payment approved:", {
    id: paymentInfo.id,
    external_reference: paymentInfo.external_reference,
    transaction_amount: paymentInfo.transaction_amount,
  })

  // Ejemplo de actualización de orden (implementar según tu base de datos)
  // await updateOrderStatus(paymentInfo.external_reference, 'paid')
  // await sendConfirmationEmail(paymentInfo.external_reference)
}

async function handlePendingPayment(paymentInfo: any) {
  console.log("Payment pending:", {
    id: paymentInfo.id,
    external_reference: paymentInfo.external_reference,
  })

  // Notificar que el pago está pendiente
  // await updateOrderStatus(paymentInfo.external_reference, 'pending')
}

async function handleRejectedPayment(paymentInfo: any) {
  console.log("Payment rejected:", {
    id: paymentInfo.id,
    external_reference: paymentInfo.external_reference,
    status_detail: paymentInfo.status_detail,
  })

  // Notificar que el pago fue rechazado
  // await updateOrderStatus(paymentInfo.external_reference, 'rejected')
}
