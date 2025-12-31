// components/dashboard.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
}

export function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: 0, imagen: "" })

  // Agregar producto
  const agregarProducto = () => {
    const nuevo = {
      ...nuevoProducto,
      id: Date.now(),
    }
    setProductos([...productos, nuevo])
    setNuevoProducto({ nombre: "", precio: 0, imagen: "" })
  }

  // Eliminar producto
  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id))
  }

  // Editar producto
  const actualizarProducto = (id: number, campo: keyof Producto, valor: string | number) => {
    setProductos(productos.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto space-y-8 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Gestor de Productos</h1>
          <p className="text-gray-400">Administra tu catálogo de productos de forma simple</p>
        </div>

        {/* Formulario para nuevo producto */}
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Agregar nuevo producto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              type="number"
              placeholder="Precio"
              value={nuevoProducto.precio || ""}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Input
              placeholder="URL de imagen"
              value={nuevoProducto.imagen}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Button
            onClick={agregarProducto}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!nuevoProducto.nombre || !nuevoProducto.precio}
          >
            Agregar producto
          </Button>
        </Card>

        {/* Lista de productos */}
        {productos.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700 p-8 text-center">
            <p className="text-gray-400 text-lg">No hay productos agregados aún</p>
            <p className="text-gray-500 text-sm mt-2">Usa el formulario de arriba para agregar tu primer producto</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <Card key={producto.id} className="bg-gray-800 border-gray-700 p-4 space-y-3">
                {producto.imagen && (
                  <img
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/generic-product-display.png"
                    }}
                  />
                )}
                <Input
                  value={producto.nombre}
                  onChange={(e) => actualizarProducto(producto.id, "nombre", e.target.value)}
                  placeholder="Nombre"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  type="number"
                  value={producto.precio}
                  onChange={(e) => actualizarProducto(producto.id, "precio", Number.parseFloat(e.target.value) || 0)}
                  placeholder="Precio"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  value={producto.imagen}
                  onChange={(e) => actualizarProducto(producto.id, "imagen", e.target.value)}
                  placeholder="URL imagen"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button
                  variant="destructive"
                  onClick={() => eliminarProducto(producto.id)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Eliminar
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
