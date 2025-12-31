"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"

export function CartFloatButton() {
  const { getTotalItems, setIsOpen, cart } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsVisible(getTotalItems() > 0)

    if (getTotalItems() > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [getTotalItems()])

  useEffect(() => {
    // Animación cuando se agrega un producto
    if (cart.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [cart])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <Button
        onClick={() => setIsOpen(true)}
        className={`
        relative bg-red-800 hover:bg-red-900 text-white shadow-lg hover:shadow-xl 
        transition-all duration-300 rounded-full w-16 h-16 p-0
        ${isAnimating ? "animate-bounce scale-110" : "hover:scale-105"}
      `}
        size="icon"
      >
        <ShoppingBag className="h-6 w-6" />

        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse">
            {getTotalItems()}
          </Badge>
        )}

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
      </Button>

      {/* Mini preview */}
      <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-2 min-w-[200px] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="text-xs text-gray-600 mb-1">Últimos agregados:</div>
        {cart.slice(-2).map((item) => (
          <div key={item.id} className="flex items-center gap-2 text-xs">
            <span className="bg-red-100 text-red-800 px-1 rounded">{item.quantity}</span>
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
