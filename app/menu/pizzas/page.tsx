"use client"

import { MenuCard } from "@/components/ui/menu-card"
import { pizzaMenu } from "@/lib/menu-data"
import Link from "next/link"
import { useEffect } from "react"

export default function PizzasPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative pb-20">
      {/* Botón flotante: Volver responsive */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 md:top-32 md:bottom-auto z-50 inline-flex items-center bg-white/90 text-green-700 hover:text-green-900 px-3 py-2 text-sm md:text-base md:px-4 md:py-2 rounded-lg shadow-md backdrop-blur transition-all"
      >
        <span className="mr-2">←</span>
        Volver
      </Link>

      <div className="relative w-full lg:h-[300px] overflow-hidden">
        <picture className="w-full h-full">
          {/* Mobile/Tablet: New pizza collage design with auto height */}
          <source media="(max-width: 1023px)" srcSet="/images/pizza-mobile-header.jpeg" />
          {/* Desktop: Original banner with fixed height */}
          <source media="(min-width: 1024px)" srcSet="/images/inicio-20pizzas.jpeg" />
          <img
            src="/images/inicio-20pizzas.jpeg"
            alt="Sra. Pizza Banner"
            className="w-full h-auto lg:h-full lg:object-cover"
          />
        </picture>
      </div>

      {/* Features */}
      <div className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3 text-2xl">🔥</div>
              <h3 className="font-semibold text-gray-800 text-lg">Horno Premium</h3>
              <p className="text-sm text-gray-600">Cocción tradicional 400°C</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3 text-2xl">🏆</div>
              <h3 className="font-semibold text-gray-800 text-lg">Ingredientes Premium</h3>
              <p className="text-sm text-gray-600">Ingredientes De Altisima Calidad</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3 text-2xl">⚡</div>
              <h3 className="font-semibold text-gray-800 text-lg">Preparación Rápida</h3>
              <p className="text-sm text-gray-600">20-25 minutos promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pizzaMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Italian Touch */}
        <div className="text-center mt-16 p-6 sm:p-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🇮🇹 Auténtico Sabor Italiano</h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Nuestro maestro pizzero estudió en Nápoles para traerte la verdadera tradición italiana
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🍅</span>
              <span>Tomates Frescos</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🧀</span>
              <span>Mozzarella Calidad Premium</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌿</span>
              <span>Albahaca Fresca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
