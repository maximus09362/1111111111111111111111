"use client"

import { MenuCard } from "@/components/ui/menu-card"
import { comboMenu } from "@/lib/menu-data"
import Link from "next/link"
import { useEffect } from "react"

export default function CombosPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-white relative pb-20">
      {/* Boton flotante: Volver responsive */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 md:top-32 md:bottom-auto z-50 inline-flex items-center bg-white/90 text-neutral-800 hover:text-yellow-600 px-3 py-2 text-sm md:text-base md:px-4 md:py-2 rounded-lg shadow-md backdrop-blur transition-all border border-neutral-300"
      >
        <span className="mr-2">{"<-"}</span>
        Volver
      </Link>

      {/* Mobile Banner */}
      <div className="relative w-full h-auto md:hidden">
        <img
          src="/images/combos-banner-new.jpg"
          alt="Combos - Familiar e Individual"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Desktop Banner */}
      <div className="hidden md:block relative w-full h-[300px] overflow-hidden">
        <img
          src="/images/combos-banner-new.jpg"
          alt="Combos Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Features */}
      <div className="py-12 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500/20 p-3 rounded-full mb-3 text-2xl">{"🔥"}</div>
              <h3 className="font-semibold text-neutral-900 text-lg">Mejor Precio</h3>
              <p className="text-sm text-neutral-500">Ahorra con nuestros combos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500/20 p-3 rounded-full mb-3 text-2xl">{"🍟"}</div>
              <h3 className="font-semibold text-neutral-900 text-lg">Todo Incluido</h3>
              <p className="text-sm text-neutral-500">Comida + extras</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-500/20 p-3 rounded-full mb-3 text-2xl">{"👨‍👩‍👧‍👦"}</div>
              <h3 className="font-semibold text-neutral-900 text-lg">Para Todos</h3>
              <p className="text-sm text-neutral-500">Individuales y familiares</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {comboMenu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-6 sm:p-8 bg-neutral-100 backdrop-blur-sm rounded-2xl border border-neutral-200">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">{"Arma tu propio combo!"}</h3>
          <p className="text-neutral-500 mb-6 text-sm sm:text-base">
            Consultanos por combos personalizados o para eventos
          </p>
          <Link
            href="https://wa.me/5493541587118?text=Hola! Quiero consultar por un combo especial"
            className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors"
          >
            {"📱"} Consultar por WhatsApp
          </Link>
        </div>
      </div>
    </div>
  )
}
