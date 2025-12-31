"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, AlertCircle, Copy } from "lucide-react"
import Link from "next/link"

export default function TestWhatsAppPage() {
  const [testData, setTestData] = useState({
    name: "Juan Pérez",
    phone: "+54 11 1234-5678",
    email: "juan@email.com",
    address: "Av. San Martín 123, Villa Carlos Paz",
  })

  const [customMessage, setCustomMessage] = useState("")
  const [lastUrl, setLastUrl] = useState("")
  const [testResults, setTestResults] = useState<string[]>([])

  const whatsappNumber = "5493541587118"

  // Mensaje de prueba simple
  const sendSimpleMessage = () => {
    const message = "¡Hola! Esta es una prueba desde la página web."
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    setLastUrl(url)
    addTestResult("✅ Mensaje simple enviado")
    window.open(url, "_blank")
  }

  // Mensaje de prueba con datos del cliente
  const sendTestOrder = () => {
    const testOrder = `🍽️ *PEDIDO DE PRUEBA - Sr Lomo*

👤 *Cliente:* ${testData.name}
📱 *Teléfono:* ${testData.phone}
📧 *Email:* ${testData.email}
📍 *Dirección:* ${testData.address}

📋 *PEDIDO:*
• 2x Lomo Completo - $5,600
• 1x Pizza Margherita - $2,200
• 3x Empanada de Carne - $1,350

💰 *RESUMEN:*
Subtotal: $9,150
Delivery: GRATIS
*TOTAL: $9,150*

💳 *Método de pago:* Efectivo

⏰ *Fecha y hora:* ${new Date().toLocaleString("es-AR")}

¡Gracias por tu pedido! 🙏`

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(testOrder)}`
    setLastUrl(url)
    addTestResult("✅ Pedido de prueba enviado")
    window.open(url, "_blank")
  }

  // Mensaje personalizado
  const sendCustomMessage = () => {
    if (!customMessage.trim()) {
      addTestResult("❌ El mensaje personalizado está vacío")
      return
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`
    setLastUrl(url)
    addTestResult("✅ Mensaje personalizado enviado")
    window.open(url, "_blank")
  }

  // Solo generar URL sin abrir
  const generateUrlOnly = () => {
    const message = "Mensaje de prueba - solo URL"
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    setLastUrl(url)
    addTestResult("🔗 URL generada (no abierta)")
  }

  const addTestResult = (result: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setTestResults((prev) => [`[${timestamp}] ${result}`, ...prev.slice(0, 9)])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    addTestResult("📋 Copiado al portapapeles")
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-red-800 hover:text-red-900 mb-4">
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-red-800 mb-2">Prueba de WhatsApp</h1>
          <p className="text-gray-600">Página de prueba para verificar la funcionalidad de WhatsApp</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel de pruebas */}
          <div className="space-y-6">
            {/* Información del número */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Configuración
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Número de WhatsApp:</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">+54 9 3541 587118</code>
                      <Button size="sm" variant="outline" onClick={() => copyToClipboard(whatsappNumber)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Formato interno: {whatsappNumber}</div>
                </div>
              </CardContent>
            </Card>

            {/* Datos de prueba */}
            <Card>
              <CardHeader>
                <CardTitle>Datos de Prueba</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <Input value={testData.name} onChange={(e) => setTestData({ ...testData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Teléfono</label>
                  <Input value={testData.phone} onChange={(e) => setTestData({ ...testData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input value={testData.email} onChange={(e) => setTestData({ ...testData, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección</label>
                  <Input
                    value={testData.address}
                    onChange={(e) => setTestData({ ...testData, address: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mensaje personalizado */}
            <Card>
              <CardHeader>
                <CardTitle>Mensaje Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe tu mensaje personalizado aquí..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Panel de acciones y resultados */}
          <div className="space-y-6">
            {/* Botones de prueba */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Pruebas de WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={sendSimpleMessage} className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar Mensaje Simple
                </Button>

                <Button onClick={sendTestOrder} className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar Pedido de Prueba
                </Button>

                <Button
                  onClick={sendCustomMessage}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!customMessage.trim()}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Enviar Mensaje Personalizado
                </Button>

                <Button onClick={generateUrlOnly} variant="outline" className="w-full bg-transparent">
                  🔗 Solo Generar URL
                </Button>
              </CardContent>
            </Card>

            {/* Última URL generada */}
            {lastUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Última URL Generada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded text-xs break-all">{lastUrl}</div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(lastUrl)}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(lastUrl, "_blank")}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Abrir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resultados de pruebas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Resultados de Pruebas</span>
                  <Button size="sm" variant="outline" onClick={clearResults}>
                    Limpiar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">No hay resultados aún</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información de diagnóstico */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Información de Diagnóstico
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700 space-y-2">
                <div>
                  <strong>User Agent:</strong> {navigator.userAgent.slice(0, 50)}...
                </div>
                <div>
                  <strong>Plataforma:</strong> {navigator.platform}
                </div>
                <div>
                  <strong>Idioma:</strong> {navigator.language}
                </div>
                <div>
                  <strong>Online:</strong> {navigator.onLine ? "✅ Sí" : "❌ No"}
                </div>
                <div>
                  <strong>Cookies habilitadas:</strong> {navigator.cookieEnabled ? "✅ Sí" : "❌ No"}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instrucciones */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">📋 Instrucciones de Prueba</CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-700 space-y-2 text-sm">
            <div>
              <strong>1. Mensaje Simple:</strong> Envía un mensaje básico para probar la conexión
            </div>
            <div>
              <strong>2. Pedido de Prueba:</strong> Simula un pedido completo con formato
            </div>
            <div>
              <strong>3. Mensaje Personalizado:</strong> Prueba con tu propio texto
            </div>
            <div>
              <strong>4. Solo URL:</strong> Genera la URL sin abrir WhatsApp
            </div>
            <div className="mt-4 p-3 bg-yellow-100 rounded">
              <strong>Nota:</strong> Si WhatsApp no se abre automáticamente, copia la URL y pégala en tu navegador, o
              verifica que tengas WhatsApp Web o la aplicación instalada.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
