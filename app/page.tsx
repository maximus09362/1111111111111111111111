"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const menuCategories = [
    {
      title: "Sr. Lomo",
      description: "Lomos & Sandwiches como deben ser",
      image: "/sr-lomo-logo.jpg",
      href: "/menu/lomos",
      color: "bg-yellow-600",
      items: "8 especialidades",
    },
    {
      title: "Sra. Empanada",
      description: "Empanadas que cuentan su historia",
      image: "/sra-empanada-logo.jpg",
      href: "/menu/empanadas",
      color: "bg-pink-400",
      items: "12 sabores",
    },
    {
      title: "Sra. Pizza",
      description: "Pizza con personalidad italiana",
      image: "/sra-pizza-logo.jpg",
      href: "/menu/pizzas",
      color: "bg-green-500",
      items: "8 variedades",
    },
    {
      title: "Postres",
      description: "Dulces tentaciones artesanales",
      image: "/images/29.jpeg",
      href: "/menu/desserts",
      color: "bg-purple-500",
      items: "12 delicias",
    },
    {
      title: "Combos",
      description: "Las mejores promos para compartir",
      image: "/images/combos-promo.jpg",
      href: "/menu/combos",
      color: "bg-gray-500",
      items: "6 promos",
    },
    {
      title: "Bebidas",
      description: "Refrescate con lo mejor",
      image: "/images/bebidas-logo-new.png",
      href: "/menu/bebidas",
      color: "bg-black",
      items: "8 opciones",
    },
    {
      title: "Sra.Hamburguesa",
      description: "Hamburguesas con carácter y sabor real",
      image: "/images/gra-hamburguesa-logo.jpg",
      href: "/menu/burgers",
      color: "bg-red-600",
      items: "2 variedades",
    },
  ]

  return (
    <div className="bg-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative w-full h-auto lg:h-[300px]">
          <picture className="w-full h-full">
            <source media="(max-width: 1023px)" srcSet="/images/sr-lomo-mobile-header.jpeg" />
            <source media="(min-width: 1024px)" srcSet="/images/89789789.jpg" />
            <img
              src="/images/89789789.jpg"
              alt="Sr Lomo - Las cosas como son"
              className="w-full h-auto lg:h-full lg:object-cover"
            />
          </picture>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500 text-black">Nuestros Menús</Badge>
            <h2 className="text-4xl font-bold mb-4 text-red-800">Elegí tu favorita</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cada menú tiene su propia personalidad y especialidades únicas. Hacé click para ver todas las opciones
              disponibles.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 max-w-7xl mx-auto">
            {menuCategories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader className={`${category.color} text-white text-center py-3 px-3`}>
                  <CardTitle className="text-base flex items-center justify-center">{category.title}</CardTitle>
                  <p className="opacity-90 text-xs leading-tight">{category.description}</p>
                </CardHeader>

                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {category.items}
                    </Badge>
                    <p className="text-xs text-gray-600">Disponibles para delivery</p>
                  </div>

                  <Link href={category.href}>
                    <Button className="w-full bg-red-800 hover:bg-red-900 text-sm py-2">
                      Ver Menú
                      <span className="ml-2">→</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">Testimonios</Badge>
            <h2 className="text-4xl font-bold mb-4 text-red-800">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">
                  ⭐
                </span>
              ))}
              <span className="text-gray-600 ml-2">4.9/5 basado en 500+ reseñas</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María",
                text: "Genial llego, muchísimas Gracias la verdad está muy riquísimo muchas Gracias.",
                rating: 5,
              },
              {
                name: "Carlos",
                text: "Recien terminamos de comer, un lujo el lomito. Muy rico, ya te voy a ir encargando más veces! También recomendar. Muchas gracias!",
                rating: 5,
              },
              {
                name: "Ana",
                text: "Muy ricas las empanadas, un lujo cómo siempre y buen detalle el limón. Muchas gracias",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-bold text-red-800">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Tenés hambre?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Hacé tu pedido ahora y recibilo en 30-45 minutos. Aceptamos todos los métodos de pago.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="https://wa.me/5493541587118?text=¡Hola! Me interesa hacer un pedido desde la página web.">
                <span className="mr-2">📱</span>
                WhatsApp
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div>🏦 Transferencia</div>
            <div>💵 Efectivo</div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-red-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">📍</span>
              </div>
              <h3 className="font-bold mb-2">Ubicación</h3>
              <p className="text-gray-600">
                Envios a Domicilio.
                <br />
                Villa Carlos Paz, Cordoba Argentina.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-red-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">📞</span>
              </div>
              <h3 className="font-bold mb-2">Teléfono</h3>
              <p className="text-gray-600">
                +54 3541587118
                <br />
                WhatsApp disponible
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-red-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🕐</span>
              </div>
              <h3 className="font-bold mb-2">Horarios</h3>
              <p className="text-gray-600">
                Lun - Dom: 11:00 - 23:00
                <br />
                Delivery hasta las 24:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl mr-2 text-yellow-500">👨‍🍳</span>
            <h5 className="text-xl font-bold">Sr Lomo</h5>
          </div>
          <p className="text-gray-400 mb-4">Delicias auténticas con identidad propia desde 2025</p>
          <p className="text-gray-500">&copy; 2025 Atlas Corporation S.A se reserva los derechos sobre esta pagina. </p>
        </div>
      </footer>
    </div>
  )
}
