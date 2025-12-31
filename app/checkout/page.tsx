"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useOrdersToday } from "@/components/orders-today-provider"
import { paymentMethods } from "@/lib/menu-data"
import { ArrowLeft, CreditCard, User, CheckCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { incrementOrder } = useOrdersToday()
  const [selectedPayment, setSelectedPayment] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const generateWhatsAppMessage = () => {
    const orderSummary = cart
      .map((item) => `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString()}`)
      .join("\n")

    const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedPayment)
    const total = getTotalPrice()

    const message = `🍽️ *NUEVO PEDIDO - Sr Lomo*

👤 *Cliente:* ${customerInfo.name}
📱 *Teléfono:* ${customerInfo.phone}
${customerInfo.email ? `📧 *Email:* ${customerInfo.email}\n` : ""}
📍 *Dirección:* ${customerInfo.address}

📋 *PEDIDO:*
${orderSummary}

💰 *RESUMEN:*
Subtotal: $${getTotalPrice().toLocaleString()}
Delivery: Según zona
*TOTAL: $${total.toLocaleString()}*

💳 *Método de pago:* ${selectedPaymentMethod?.name || "No seleccionado"}

⏰ *Fecha y hora:* ${new Date().toLocaleString("es-AR")}

¡Gracias por tu pedido! 🙏`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productCounts: Record<string, number> = {}
    cart.forEach((item) => {
      productCounts[item.id] = (productCounts[item.id] || 0) + item.quantity
    })

    for (const productId in productCounts) {
      for (let i = 0; i < productCounts[productId]; i++) {
        await incrementOrder(productId)
      }
    }

    const whatsappMessage = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/5493541587118?text=${whatsappMessage}`

    window.open(whatsappUrl, "_blank")

    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-amber-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agregá algunos productos para continuar con tu pedido</p>
          <Link href="/" passHref>
            <Button className="w-full sm:w-auto bg-red-800 hover:bg-red-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="bg-amber-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4 text-green-800">¡Pedido Enviado!</h1>
              <p className="text-gray-600 mb-6">
                Tu pedido ha sido enviado por WhatsApp. Te contactaremos pronto para confirmar la entrega.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-semibold">Pedido enviado por WhatsApp</p>
                </div>
                <p className="text-green-700 text-sm">Tiempo estimado de entrega: 30-45 minutos</p>
              </div>
              <Link href="/" passHref>
                <Button className="w-full bg-red-800 hover:bg-red-900 flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const finalTotal = getTotalPrice()

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" passHref>
            <Button className="bg-red-800 hover:bg-red-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-red-800">Finalizar Pedido</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información del cliente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Dirección de entrega *</label>
                    <textarea
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Calle, número, piso, depto, referencias..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Método de pago */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-2xl mr-3">{method.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                        {selectedPayment === method.id && <CheckCircle className="h-5 w-5 text-red-500" />}
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
                size="lg"
                disabled={!selectedPayment || !customerInfo.name || !customerInfo.phone || !customerInfo.address}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Pedido por WhatsApp - ${finalTotal.toLocaleString()}
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        {item.notes && <p className="text-xs text-gray-500 mt-1">Notas: {item.notes}</p>}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery:</span>
                    <span className="text-gray-600">Según zona</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">${finalTotal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg mt-4 border border-amber-200">
                  <div className="flex items-center text-amber-800 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    El costo de delivery depende de tu zona
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
