"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { AddToCartAnimation } from "./add-to-cart-animation"
import type { MenuItem } from "@/lib/types"
import { useState } from "react"

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedSauce, setSelectedSauce] = useState<string | null>(
    item.sauceOptions && item.sauceOptions.length > 0 ? item.sauceOptions[0] : null
  )

  const handleAddToCart = () => {
    setIsAdding(true)
    const notes = selectedSauce ? `Aderezo: ${selectedSauce}` : undefined
    addToCart(item, 1, notes)

    // Reset animation after completion
    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }

  return (
    <div className="hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {item.popular && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white shadow-lg">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Popular
            </Badge>
          )}

          {item.varieties && item.varieties.length > 0 && (
            <Badge className="absolute top-3 right-12 bg-blue-500 text-white shadow-lg">
              {item.varieties.length} variedades
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
              isFavorite ? "text-red-500 bg-white/90" : "text-white bg-black/20 hover:bg-white/90 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg group-hover:text-red-800 transition-colors">{item.name}</CardTitle>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </CardHeader>

        <CardContent>
          {item.varieties && item.varieties.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Variedades disponibles:</p>
              <div className="space-y-2">
                {item.varieties.slice(0, 2).map((variety, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{variety.name}</span>
                    <span className="text-green-600 font-bold">${variety.price.toLocaleString()}</span>
                  </div>
                ))}
                {item.varieties.length > 2 && (
                  <p className="text-xs text-gray-400">+{item.varieties.length - 2} variedades más</p>
                )}
              </div>
            </div>
          )}

          {item.ingredients && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Ingredientes:</p>
              <div className="flex flex-wrap gap-1">
                {item.ingredients.slice(0, 3).map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {item.ingredients.length > 3 && (
                  <Badge variant="outline" className="text-xs text-gray-400">
                    +{item.ingredients.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          )}

          {item.sauceOptions && item.sauceOptions.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">Elegí tu aderezo:</p>
              <div className="flex flex-wrap gap-2">
                {item.sauceOptions.map((sauce) => (
                  <button
                    key={sauce}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      selectedSauce === sauce
                        ? "bg-red-800 text-white border-red-800 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:border-red-400 hover:text-red-700"
                    }`}
                  >
                    {sauce}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {item.varieties && item.varieties.length > 0 ? (
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    Desde ${Math.min(...item.varieties.map((v) => v.price)).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Precio según variedad</div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-green-600">${item.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Precio {item.priceLabel || "por unidad"}</div>
                </div>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`bg-green-600 hover:bg-green-700 transition-all duration-300 ${
                isAdding ? "bg-green-500 scale-95" : "hover:scale-105"
              }`}
            >
              <AddToCartAnimation isAdding={isAdding} />
              <span className="ml-2">{isAdding ? "Agregando..." : "Agregar"}</span>
            </Button>
          </div>

          <div className="mt-3 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between text-xs text-gray-500">
              <span>⏱️ Prep: 10-15 min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
