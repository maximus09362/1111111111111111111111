"use client"

import { MenuCard } from "@/components/ui/menu-card"
import { Badge } from "@/components/ui/badge"
import { burgerMenu } from "@/lib/menu-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function BurgersPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative pb-20">
      {/* Botón flotante: Volver responsive */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 md:top-32 md:bottom-auto z-50 inline-flex items-center bg-white/90 text-red-800 hover:text-red-900 px-3 py-2 text-sm md:text-base md:px-4 md:py-2 rounded-lg shadow-md backdrop-blur transition-all"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Link>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full mb-4 sm:mb-0 sm:mr-4">
                <span className="text-4xl sm:text-5xl">🥩</span>
              </div>
              <div>
                <Badge className="mb-2 bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  Sra.Hamburguesa
                </Badge>
                <h1 className="text-3xl sm:text-5xl font-bold mb-2">Hamburguesas Gourmet</h1>
                <p className="text-lg sm:text-xl opacity-90">Con carácter y sabor real</p>
              </div>
            </div>

            <p className="text-base sm:text-lg max-w-3xl mx-auto opacity-90 leading-relaxed">
              Medallones caseros de 150g, pan brioche artesanal y ingredientes premium. Cada hamburguesa es una
              experiencia única preparada al momento con la pasión que nos caracteriza desde hace 15 años.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">0</div>
                <div className="text-sm opacity-80">Variedades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">150g</div>
                <div className="text-sm opacity-80">Medallón casero</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">4.8</div>
                <div className="text-sm opacity-80">★ Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute top-10 left-10 text-4xl sm:text-6xl">🍔</div>
          <div className="absolute top-20 right-20 text-4xl sm:text-6xl">🥓</div>
          <div className="absolute bottom-10 left-20 text-4xl sm:text-6xl">🧀</div>
          <div className="absolute bottom-20 right-10 text-4xl sm:text-6xl">🍟</div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3 text-2xl">🔥</div>
              <h3 className="font-semibold text-gray-800 text-lg">A la Parrilla</h3>
              <p className="text-sm text-gray-600">Cocción perfecta al carbón</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3 text-2xl">🏆</div>
              <h3 className="font-semibold text-gray-800 text-lg">Carne Premium</h3>
              <p className="text-sm text-gray-600">Medallones caseros 150g</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3 text-2xl">⚡</div>
              <h3 className="font-semibold text-gray-800 text-lg">Preparación Express</h3>
              <p className="text-sm text-gray-600">12-18 minutos promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {burgerMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">¿Querés armar tu burger personalizada?</h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Elegí tus ingredientes favoritos y creamos la hamburguesa perfecta para vos
          </p>
          <Link
            href="https://wa.me/5493541587118?text=Hola! Quiero armar una hamburguesa personalizada"
            className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors"
          >
            🍔 Personalizar Burger
          </Link>
        </div>
      </div>
    </div>
  )
}
