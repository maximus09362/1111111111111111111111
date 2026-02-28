"use client"

import { MenuCard } from "@/components/ui/menu-card"
import { bebidaMenu } from "@/lib/menu-data"
import Link from "next/link"
import { useEffect } from "react"

export default function BebidasPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 relative pb-20">
      {/* Boton flotante: Volver responsive */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 md:top-32 md:bottom-auto z-50 inline-flex items-center bg-white/90 text-cyan-800 hover:text-cyan-900 px-3 py-2 text-sm md:text-base md:px-4 md:py-2 rounded-lg shadow-md backdrop-blur transition-all"
      >
        <span className="mr-2">{"<-"}</span>
        Volver
      </Link>

      <div className="relative w-full h-auto lg:h-[300px] overflow-hidden">
        {/* Mobile and Tablet Banner */}
        <img
          src="/images/bebidas-banner-final.png"
          alt="Bebidas Banner"
          className="w-full h-auto object-contain md:hidden"
        />
        {/* Desktop Banner */}
        <img
          src="/images/bebidas-banner-final.png"
          alt="Bebidas Banner"
          className="hidden md:block w-full h-full object-cover lg:object-cover"
        />
      </div>

      {/* Features */}
      <div className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-cyan-100 p-3 rounded-full mb-3 text-2xl">{"🧊"}</div>
              <h3 className="font-semibold text-gray-800 text-lg">Bien Frias</h3>
              <p className="text-sm text-gray-600">Todas nuestras bebidas bien heladas</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-cyan-100 p-3 rounded-full mb-3 text-2xl">{"🔥"}</div>
              <h3 className="font-semibold text-gray-800 text-lg">Los Mejores Combos</h3>
              <p className="text-sm text-gray-600">Arma tu combo ideal con tu comida favorita</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bebidaMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            {"Complementa tu pedido con una bebida!"}
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Consultanos por otras opciones de bebidas disponibles
          </p>
          <Link
            href="https://wa.me/5493541587118?text=Hola! Quiero consultar por las bebidas disponibles"
            className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors"
          >
            {"🥤"} Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  )
}
