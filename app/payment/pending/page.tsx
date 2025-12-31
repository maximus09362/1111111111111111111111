"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentPendingPage() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("payment_id")
  const externalReference = searchParams.get("external_reference")

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <Clock className="h-20 w-20 text-yellow-500 mx-auto mb-6" />

            <h1 className="text-3xl font-bold mb-4 text-yellow-800">Pago Pendiente</h1>

            <p className="text-gray-600 mb-6">Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>

            {paymentId && (
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-yellow-800 font-semibold mb-2">Detalles del Pago</p>
                <p className="text-sm text-yellow-700">ID de Pago: {paymentId}</p>
                {externalReference && <p className="text-sm text-yellow-700">Número de Orden: {externalReference}</p>}
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">¿Qué significa esto?</h3>

              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Verificación en proceso</p>
                    <p className="text-sm text-blue-600">Tu banco está verificando la transacción</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Tiempo estimado</p>
                    <p className="text-sm text-blue-600">Puede tomar hasta 2 días hábiles</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Te notificaremos</p>
                    <p className="text-sm text-blue-600">Recibirás un email cuando se confirme el pago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <p className="font-semibold text-green-800">Mantente informado</p>
              </div>
              <p className="text-sm text-green-700">
                Te enviaremos actualizaciones por email sobre el estado de tu pago
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button variant="outline" className="flex items-center bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>

            <Link href="/">
              <Button className="bg-red-800 hover:bg-red-900">Volver al inicio</Button>
            </Link>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>¿Tienes dudas?</strong> Contactanos por WhatsApp al +54 11 1234-5678 o por email a
                info@lascosascomoson.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
