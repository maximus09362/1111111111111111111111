"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { X, Plus, Minus, ShoppingBag, Trash2, Edit3 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { CartQuickActions } from "./cart-quick-actions"
import { dessertMenu, bebidaMenu } from "@/lib/menu-data"

export function CartSidebar() {
  const {
    cart,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
    addToCart,
  } = useCart()
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState("")
  const [currentDessertIndex, setCurrentDessertIndex] = useState(0)
  const [currentBebidaIndex, setCurrentBebidaIndex] = useState(0)

  const suggestedItems = [...dessertMenu, ...bebidaMenu]

  useEffect(() => {
    if (dessertMenu.length > 2) {
      const interval = setInterval(() => {
        setCurrentDessertIndex((prevIndex) => {
          const maxIndex = dessertMenu.length - 2
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (bebidaMenu.length > 2) {
      const interval = setInterval(() => {
        setCurrentBebidaIndex((prevIndex) => {
          const maxIndex = bebidaMenu.length - 2
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [])

  const displayedDesserts = dessertMenu.slice(currentDessertIndex, currentDessertIndex + 2)
  const displayedBebidas = bebidaMenu.slice(currentBebidaIndex, currentBebidaIndex + 2)

  const handleEditNotes = (itemId: string, currentNotes?: string) => {
    setEditingNotes(itemId)
    setTempNotes(currentNotes || "")
  }

  const handleSaveNotes = (itemId: string) => {
    // Aquí actualizarías las notas del item
    setEditingNotes(null)
    setTempNotes("")
  }

  const handleAddDessert = (dessert: any) => {
    addToCart({
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
      image: dessert.image,
      description: dessert.description || "Delicioso postre casero",
      quantity: 1,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-red-800 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Tu Pedido
              <Badge className="bg-yellow-500 text-black">{getTotalItems()}</Badge>
            </h2>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-white hover:bg-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-red-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4">
                <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">Agregá algunos productos deliciosos para empezar</p>
                <Button onClick={() => setIsOpen(false)} className="bg-red-800 hover:bg-red-900">
                  Explorar Menú
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 bg-white rounded-lg border">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-green-600">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">${item.price.toLocaleString()} c/u</div>
                          </div>
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-2">
                          {editingNotes === item.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Agregar notas especiales..."
                                className="w-full text-xs p-2 border rounded resize-none"
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveNotes(item.id)}
                                  className="text-xs bg-green-600 hover:bg-green-700"
                                >
                                  Guardar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingNotes(null)}
                                  className="text-xs"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              {item.notes ? (
                                <div className="text-xs text-gray-600 bg-yellow-50 p-2 rounded flex-1 mr-2">
                                  <strong>Notas:</strong> {item.notes}
                                </div>
                              ) : (
                                <div className="flex-1" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditNotes(item.id, item.notes)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Actions */}
                <CartQuickActions />

                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Te puede interesar</h4>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Postres</p>
                    {displayedDesserts.map((dessert) => (
                      <div
                        key={dessert.id}
                        className="flex items-center gap-3 p-2 bg-white rounded-lg border hover:bg-gray-50 transition-all"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={dessert.image || "/placeholder.svg"}
                            alt={dessert.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{dessert.name}</p>
                          <p className="text-xs text-gray-500">${dessert.price.toLocaleString()}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent hover:bg-green-50 hover:text-green-700 hover:border-green-600"
                          onClick={() => handleAddDessert(dessert)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-3">Bebidas</p>
                    {displayedBebidas.map((bebida) => (
                      <div
                        key={bebida.id}
                        className="flex items-center gap-3 p-2 bg-white rounded-lg border hover:bg-gray-50 transition-all"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={bebida.image || "/placeholder.svg"}
                            alt={bebida.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{bebida.name}</p>
                          <p className="text-xs text-gray-500">${bebida.price.toLocaleString()}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent hover:bg-green-50 hover:text-green-700 hover:border-green-600"
                          onClick={() => handleAddDessert(bebida)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t bg-white p-4 space-y-4">
              {/* Delivery Info */}
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <div className="flex items-center text-amber-800 text-sm">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>El costo de delivery depende de tu zona</span>
                </div>
              </div>

              {/* Total */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery:</span>
                  <span>Según zona</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-green-600">${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    Finalizar Pedido
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                  Seguir Comprando
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
