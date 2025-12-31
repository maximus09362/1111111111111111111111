"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentFailurePage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const statusDetail = searchParams.get("status_detail")

  const getErrorMessage = (statusDetail: string | null) => {
    switch (statusDetail) {
      case "cc_rejected_insufficient_amount":
        return "Fondos insuficientes en tu tarjeta"
      case "cc_rejected_bad_filled_security_code":
        return "Código de seguridad incorrecto"
      case "cc_rejected_bad_filled_date":
        return "Fecha de vencimiento incorrecta"
      case "cc_rejected_bad_filled_other":
        return "Revisa los datos de tu tarjeta"
      default:
        return "Hubo un problema procesando tu pago"
    }
  }

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <XCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />

            <h1 className="text-3xl font-bold mb-4 text-red-800">Pago No Procesado</h1>

            <p className="text-gray-600 mb-6">{getErrorMessage(statusDetail)}</p>

            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-red-800 mb-4">¿Qué puedes hacer?</h3>

              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Verificar datos</p>
                    <p className="text-sm text-red-600">Revisa que los datos de tu tarjeta sean correctos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Intentar otro método</p>
                    <p className="text-sm text-red-600">Prueba con otra tarjeta o método de pago</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Contactar al banco</p>
                    <p className="text-sm text-red-600">Si el problema persiste, contacta a tu banco</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/checkout">
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Intentar Nuevamente
                </Button>
              </Link>

              <Button variant="outline" className="flex items-center bg-transparent">
                <Phone className="h-4 w-4 mr-2" />
                Contactar Soporte
              </Button>
            </div>

            <Link href="/">
              <Button variant="ghost">Volver al inicio</Button>
            </Link>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Otros métodos de pago:</strong> También aceptamos transferencia bancaria y efectivo contra
                entrega
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
