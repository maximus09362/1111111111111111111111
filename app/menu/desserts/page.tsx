"use client"

import { MenuCard } from "@/components/ui/menu-card"
import { dessertMenu } from "@/lib/menu-data"
import Link from "next/link"
import { useEffect } from "react"

export default function DessertsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative pb-20">
      {/* Botón flotante: Volver responsive */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 md:top-32 md:bottom-auto z-50 inline-flex items-center bg-white/90 text-purple-700 hover:text-purple-900 px-3 py-2 text-sm md:text-base md:px-4 md:py-2 rounded-lg shadow-md backdrop-blur transition-all"
      >
        <span className="mr-2">←</span>
        Volver
      </Link>

      <div className="relative w-full overflow-hidden">
        <picture className="w-full">
          <source media="(max-width: 1023px)" srcSet="/images/postres-mobile-header.jpeg" />
          <source media="(min-width: 1024px)" srcSet="/images/postres-banner.jpg" />
          <img
            src="/images/postres-banner.jpg"
            alt="Postres Banner"
            className="w-full lg:h-[300px] lg:object-cover h-auto object-contain"
          />
        </picture>
      </div>

      {/* Features */}
      <div className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3 text-2xl">🍰</div>
              <h3 className="font-semibold text-gray-800 text-lg">Recetas Artesanales</h3>
              <p className="text-sm text-gray-600">Preparados diariamente</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3 text-2xl">🏆</div>
              <h3 className="font-semibold text-gray-800 text-lg">Ingredientes Premium</h3>
              <p className="text-sm text-gray-600">Calidad en cada bocado</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3 text-2xl">❤️</div>
              <h3 className="font-semibold text-gray-800 text-lg">Hecho con Amor</h3>
              <p className="text-sm text-gray-600">Tradición y sabor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {dessertMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">¿Buscás algo especial?</h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Consultanos por tortas personalizadas y postres para eventos
          </p>
          <Link
            href="https://wa.me/5493541587118?text=Hola! Quiero consultar por postres especiales"
            className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors"
          >
            🎂 Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  )
}
