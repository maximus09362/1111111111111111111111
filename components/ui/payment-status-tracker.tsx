"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, Package, Truck } from "lucide-react"

interface PaymentStatusTrackerProps {
  orderId: string
}

export function PaymentStatusTracker({ orderId }: PaymentStatusTrackerProps) {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "preparing" | "ready" | "delivered">(
    "pending",
  )

  const statusConfig = {
    pending: {
      icon: <Clock className="h-5 w-5" />,
      color: "bg-yellow-500",
      text: "Pago Pendiente",
      description: "Esperando confirmación del pago",
    },
    approved: {
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-500",
      text: "Pago Confirmado",
      description: "Tu pago fue procesado exitosamente",
    },
    rejected: {
      icon: <XCircle className="h-5 w-5" />,
      color: "bg-red-500",
      text: "Pago Rechazado",
      description: "Hubo un problema con tu pago",
    },
    preparing: {
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-500",
      text: "Preparando Pedido",
      description: "Estamos preparando tu comida",
    },
    ready: {
      icon: <Truck className="h-5 w-5" />,
      color: "bg-purple-500",
      text: "Listo para Entrega",
      description: "Tu pedido está listo para ser entregado",
    },
    delivered: {
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-600",
      text: "Entregado",
      description: "¡Disfruta tu comida!",
    },
  }

  const currentStatus = statusConfig[status]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Estado del Pedido
          <Badge className={`${currentStatus.color} text-white`}>
            {currentStatus.icon}
            {currentStatus.text}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">{currentStatus.description}</p>

          <div className="space-y-2">
            <div className="text-sm font-medium">Progreso:</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${currentStatus.color} h-2 rounded-full transition-all duration-500`}
                style={{
                  width:
                    status === "pending"
                      ? "20%"
                      : status === "approved"
                        ? "40%"
                        : status === "preparing"
                          ? "60%"
                          : status === "ready"
                            ? "80%"
                            : "100%",
                }}
              />
            </div>
          </div>

          <div className="text-xs text-gray-500">Orden ID: {orderId}</div>
        </div>
      </CardContent>
    </Card>
  )
}
