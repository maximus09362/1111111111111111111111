"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [orderInfo, setOrderInfo] = useState<any>(null)

  useEffect(() => {
    // Obtener información de la orden desde localStorage
    const savedOrder = localStorage.getItem("currentOrder")
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder))
    }

    // Limpiar carrito después del pago exitoso
    localStorage.removeItem("cart")
    localStorage.removeItem("currentOrder")
  }, [])

  const paymentId = searchParams.get("payment_id")
  const status = searchParams.get("status")
  const externalReference = searchParams.get("external_reference")

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />

            <h1 className="text-3xl font-bold mb-4 text-green-800">¡Pago Exitoso!</h1>

            <p className="text-gray-600 mb-6">Tu pago ha sido procesado correctamente y tu pedido está confirmado.</p>

            {paymentId && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="text-green-800 font-semibold mb-2">Detalles del Pago</p>
                <p className="text-sm text-green-700">ID de Pago: {paymentId}</p>
                {externalReference && <p className="text-sm text-green-700">Número de Orden: {externalReference}</p>}
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">¿Qué sigue ahora?</h3>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Confirmación</p>
                    <p className="text-sm text-blue-600">Recibirás un email con los detalles de tu pedido</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Preparación</p>
                    <p className="text-sm text-blue-600">Comenzamos a preparar tu pedido inmediatamente</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Entrega</p>
                    <p className="text-sm text-blue-600">
                      Te contactaremos cuando esté listo para la entrega (30-45 min)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {orderInfo && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-semibold mb-3">Resumen de tu pedido:</h4>
                <div className="space-y-2">
                  {orderInfo.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold flex justify-between">
                    <span>Total:</span>
                    <span>${orderInfo.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-red-800 hover:bg-red-900">Volver al inicio</Button>
              </Link>

              <Button variant="outline" className="flex items-center bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>¿Necesitas ayuda?</strong> Contactanos por WhatsApp o llamanos al +54 11 1234-5678
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
