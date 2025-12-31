"use client"

import { useCart } from "@/components/cart-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Eye } from "lucide-react"
import { useState } from "react"

export function CartMiniPreview() {
  const { cart, getTotalItems, getTotalPrice, setIsOpen } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  if (getTotalItems() === 0) return null

  return (
    <div
      className="fixed top-20 right-4 z-30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
      bg-white rounded-lg shadow-lg border transition-all duration-300
      ${isHovered ? "scale-105 shadow-xl" : "scale-100"}
    `}
      >
        {/* Collapsed State */}
        <div className="p-3 flex items-center gap-3 cursor-pointer" onClick={() => setIsOpen(true)}>
          <div className="relative">
            <ShoppingBag className="h-5 w-5 text-red-800" />
            <Badge className="absolute -top-2 -right-2 bg-red-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getTotalItems()}
            </Badge>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">${getTotalPrice().toLocaleString()}</div>
            <div className="text-xs text-gray-500">{getTotalItems()} productos</div>
          </div>
          <Button size="sm" variant="ghost" className="p-1">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Expanded State */}
        {isHovered && (
          <div className="border-t p-3 space-y-2 max-h-60 overflow-y-auto">
            {cart.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.quantity}x ${item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            {cart.length > 3 && (
              <div className="text-xs text-gray-500 text-center pt-2 border-t">+{cart.length - 3} productos más</div>
            )}

            <Button
              onClick={() => setIsOpen(true)}
              className="w-full mt-3 bg-red-800 hover:bg-red-900 text-xs"
              size="sm"
            >
              Ver Carrito Completo
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
