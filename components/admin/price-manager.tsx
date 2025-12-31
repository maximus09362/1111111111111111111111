"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, DollarSign, Package, AlertCircle, ArrowLeft } from "lucide-react"
import { lomoMenu, burgerMenu, empanadaMenu, pizzaMenu } from "@/lib/menu-data"
import { updateItemPrice, getAllPriceSettings, bulkUpdatePrices } from "@/app/actions/prices"
import type { MenuItem } from "@/lib/types"
import Link from "next/link"

interface PriceManagerProps {
  userRole: string
}

export function PriceManager({ userRole }: PriceManagerProps) {
  const [prices, setPrices] = useState<Record<string, number>>({})
  const [originalPrices, setOriginalPrices] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const allMenuItems = [...lomoMenu, ...burgerMenu, ...empanadaMenu, ...pizzaMenu]

  useEffect(() => {
    loadPrices()
  }, [])

  const loadPrices = async () => {
    setLoading(true)
    try {
      const priceSettings = await getAllPriceSettings()
      const priceMap: Record<string, number> = {}

      // Cargar precios personalizados desde la base de datos
      priceSettings.forEach((setting: any) => {
        priceMap[setting.item_id] = setting.price
      })

      // Usar precios por defecto para items sin configuración personalizada
      allMenuItems.forEach((item) => {
        if (!priceMap[item.id]) {
          priceMap[item.id] = item.price
        }
      })

      setPrices(priceMap)
      setOriginalPrices({ ...priceMap })
    } catch (error) {
      console.error("Error loading prices:", error)
      setMessage("Error al cargar los precios")
    } finally {
      setLoading(false)
    }
  }

  const handlePriceChange = (itemId: string, newPrice: string) => {
    const price = Number.parseFloat(newPrice) || 0
    setPrices((prev) => ({ ...prev, [itemId]: price }))
  }

  const savePrice = async (itemId: string) => {
    setSaving(true)
    try {
      const success = await updateItemPrice(itemId, prices[itemId])
      if (success) {
        setOriginalPrices((prev) => ({ ...prev, [itemId]: prices[itemId] }))
        setMessage("Precio actualizado correctamente")
      } else {
        setMessage("Error al actualizar el precio")
      }
    } catch (error) {
      console.error("Error saving price:", error)
      setMessage("Error al guardar el precio")
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const saveAllChanges = async () => {
    setSaving(true)
    try {
      const changes = Object.entries(prices)
        .filter(([itemId, price]) => price !== originalPrices[itemId])
        .map(([itemId, price]) => ({ itemId, price }))

      if (changes.length === 0) {
        setMessage("No hay cambios para guardar")
        setSaving(false)
        return
      }

      const success = await bulkUpdatePrices(changes)
      if (success) {
        setOriginalPrices({ ...prices })
        setMessage(`${changes.length} precios actualizados correctamente`)
      } else {
        setMessage("Error al actualizar los precios")
      }
    } catch (error) {
      console.error("Error saving all prices:", error)
      setMessage("Error al guardar los cambios")
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const resetPrices = () => {
    setPrices({ ...originalPrices })
    setMessage("Cambios descartados")
    setTimeout(() => setMessage(""), 3000)
  }

  const hasChanges = Object.entries(prices).some(([itemId, price]) => price !== originalPrices[itemId])

  if (userRole !== "admin") {
    return (
      <Card className="dashboard-card border-dashboard-border">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 dashboard-text">Acceso Restringido</h3>
          <p className="dashboard-muted">No tienes permisos para acceder a esta sección.</p>
        </CardContent>
      </Card>
    )
  }

  const renderMenuSection = (items: MenuItem[], categoryName: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 dashboard-muted" />
        <h3 className="text-lg font-semibold dashboard-text">{categoryName}</h3>
        <Badge variant="outline" className="border-dashboard-border dashboard-muted">
          {items.length} productos
        </Badge>
      </div>

      <div className="grid gap-4">
        {items.map((item) => {
          const currentPrice = prices[item.id] || item.price
          const originalPrice = originalPrices[item.id] || item.price
          const hasChanged = currentPrice !== originalPrice

          return (
            <Card
              key={item.id}
              className={`dashboard-card border-dashboard-border ${hasChanged ? "border-yellow-600/50 bg-yellow-600/10" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium dashboard-text">{item.name}</h4>
                    <p className="text-sm dashboard-muted line-clamp-1">{item.description}</p>
                    {item.popular && (
                      <Badge className="mt-1 bg-red-600/20 text-red-400 border-red-600/30 text-xs">Popular</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs dashboard-muted">Precio original</div>
                      <div className="font-medium dashboard-text">${item.price.toLocaleString()}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 dashboard-muted" />
                      <Input
                        type="number"
                        value={currentPrice}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        className="w-24 text-center dashboard-card border-dashboard-border"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <Button
                      onClick={() => savePrice(item.id)}
                      disabled={saving || !hasChanged}
                      size="sm"
                      className={hasChanged ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {hasChanged && (
                  <div className="mt-2 text-xs text-yellow-400 bg-yellow-600/20 p-2 rounded border border-yellow-600/30">
                    Cambio: ${originalPrice.toLocaleString()} → ${currentPrice.toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="dashboard-card border-dashboard-border bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold dashboard-text">Gestión de Precios</h1>
          <p className="dashboard-muted">Configura los precios de todos los productos del menú</p>
        </div>
      </div>

      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dashboard-text">
            <DollarSign className="h-5 w-5" />
            Control de Precios
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="dashboard-muted">Gestiona los precios de forma individual o masiva</p>
            <div className="flex items-center gap-2">
              <Button
                onClick={loadPrices}
                disabled={loading}
                variant="outline"
                size="sm"
                className="dashboard-card border-dashboard-border bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Recargar
              </Button>
              {hasChanges && (
                <>
                  <Button
                    onClick={resetPrices}
                    variant="outline"
                    size="sm"
                    className="dashboard-card border-dashboard-border bg-transparent"
                  >
                    Descartar
                  </Button>
                  <Button
                    onClick={saveAllChanges}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Todo
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-600/20 text-red-400 border border-red-600/30"
              : "bg-green-600/20 text-green-400 border border-green-600/30"
          }`}
        >
          {message}
        </div>
      )}

      <Tabs defaultValue="lomos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 dashboard-card border-dashboard-border">
          <TabsTrigger value="lomos" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Lomos
          </TabsTrigger>
          <TabsTrigger value="burgers" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Burgers
          </TabsTrigger>
          <TabsTrigger
            value="empanadas"
            className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
          >
            Empanadas
          </TabsTrigger>
          <TabsTrigger value="pizzas" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Pizzas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lomos" className="mt-6">
          {renderMenuSection(lomoMenu, "Sr. Lomo")}
        </TabsContent>

        <TabsContent value="burgers" className="mt-6">
          {renderMenuSection(burgerMenu, "Sra.Burguer")}
        </TabsContent>

        <TabsContent value="empanadas" className="mt-6">
          {renderMenuSection(empanadaMenu, "Sra. Empanada")}
        </TabsContent>

        <TabsContent value="pizzas" className="mt-6">
          {renderMenuSection(pizzaMenu, "Sra. Pizza")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
