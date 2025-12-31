"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowLeft, Package, Plus, Trash2, Edit3, Save, X } from "lucide-react"
import Link from "next/link"

type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  categoria: string
  descripcion?: string
  popular?: boolean
}

interface ProductManagerProps {
  userRole: string
}

export function ProductManager({ userRole }: ProductManagerProps) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: 0,
    imagen: "",
    categoria: "lomos",
    descripcion: "",
    popular: false,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const productosIniciales: Producto[] = [
      {
        id: 1,
        nombre: "Lomo Completo Clásico",
        precio: 8500,
        imagen: "/lomo-sandwich.jpg",
        categoria: "lomos",
        descripcion: "Lomo con lechuga, tomate, huevo y papas fritas",
        popular: true,
      },
      {
        id: 2,
        nombre: "Hamburguesa Especial",
        precio: 7200,
        imagen: "/hamburger-gourmet.jpg",
        categoria: "burgers",
        descripcion: "Carne artesanal con queso cheddar y bacon",
        popular: true,
      },
      {
        id: 3,
        nombre: "Empanadas de Carne",
        precio: 1200,
        imagen: "/argentinian-empanadas.png",
        categoria: "empanadas",
        descripcion: "Empanadas caseras de carne cortada a cuchillo",
      },
      {
        id: 4,
        nombre: "Pizza Margherita",
        precio: 9800,
        imagen: "/pizza-margherita.png",
        categoria: "pizzas",
        descripcion: "Pizza clásica con tomate, mozzarella y albahaca",
      },
    ]
    setProductos(productosIniciales)
  }, [])

  // Agregar producto
  const agregarProducto = () => {
    if (!nuevoProducto.nombre || nuevoProducto.precio <= 0) {
      setMessage("Por favor completa todos los campos obligatorios")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    const nuevo: Producto = {
      ...nuevoProducto,
      id: Date.now(),
    }
    setProductos([...productos, nuevo])
    setNuevoProducto({
      nombre: "",
      precio: 0,
      imagen: "",
      categoria: "lomos",
      descripcion: "",
      popular: false,
    })
    setMessage("Producto agregado correctamente")
    setTimeout(() => setMessage(""), 3000)
  }

  // Eliminar producto
  const eliminarProducto = (id: number) => {
    setProductos(productos.filter((p) => p.id !== id))
    setMessage("Producto eliminado correctamente")
    setTimeout(() => setMessage(""), 3000)
  }

  // Editar producto
  const actualizarProducto = (id: number, campo: keyof Producto, valor: string | number | boolean) => {
    setProductos(productos.map((p) => (p.id === id ? { ...p, [campo]: valor } : p)))
  }

  const guardarEdicion = (id: number) => {
    setEditingId(null)
    setMessage("Producto actualizado correctamente")
    setTimeout(() => setMessage(""), 3000)
  }

  if (userRole !== "admin") {
    return (
      <Card className="dashboard-card border-dashboard-border">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 dashboard-text">Acceso Restringido</h3>
          <p className="dashboard-muted">No tienes permisos para acceder a esta sección.</p>
        </CardContent>
      </Card>
    )
  }

  const productosPorCategoria = {
    lomos: productos.filter((p) => p.categoria === "lomos"),
    burgers: productos.filter((p) => p.categoria === "burgers"),
    empanadas: productos.filter((p) => p.categoria === "empanadas"),
    pizzas: productos.filter((p) => p.categoria === "pizzas"),
  }

  const renderProductos = (productosCategoria: Producto[], categoria: string) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 dashboard-muted" />
        <h3 className="text-lg font-semibold dashboard-text">
          {categoria === "lomos"
            ? "Sr. Lomo"
            : categoria === "burgers"
              ? "Sra. Burguer"
              : categoria === "empanadas"
                ? "Sra. Empanada"
                : "Sra. Pizza"}
        </h3>
        <Badge variant="outline" className="border-dashboard-border dashboard-muted">
          {productosCategoria.length} productos
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosCategoria.map((producto) => (
          <Card key={producto.id} className="dashboard-card border-dashboard-border">
            <CardContent className="p-4 space-y-3">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={producto.imagen || "/placeholder.svg"}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              {editingId === producto.id ? (
                <div className="space-y-2">
                  <Input
                    value={producto.nombre}
                    onChange={(e) => actualizarProducto(producto.id, "nombre", e.target.value)}
                    placeholder="Nombre del producto"
                    className="dashboard-card border-dashboard-border"
                  />
                  <Input
                    value={producto.descripcion || ""}
                    onChange={(e) => actualizarProducto(producto.id, "descripcion", e.target.value)}
                    placeholder="Descripción"
                    className="dashboard-card border-dashboard-border"
                  />
                  <Input
                    type="number"
                    value={producto.precio}
                    onChange={(e) => actualizarProducto(producto.id, "precio", Number.parseFloat(e.target.value) || 0)}
                    placeholder="Precio"
                    className="dashboard-card border-dashboard-border"
                  />
                  <Input
                    value={producto.imagen}
                    onChange={(e) => actualizarProducto(producto.id, "imagen", e.target.value)}
                    placeholder="URL de imagen"
                    className="dashboard-card border-dashboard-border"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={producto.popular || false}
                      onChange={(e) => actualizarProducto(producto.id, "popular", e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm dashboard-text">Producto popular</label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => guardarEdicion(producto.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Guardar
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      size="sm"
                      className="dashboard-card border-dashboard-border bg-transparent"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium dashboard-text">{producto.nombre}</h4>
                    {producto.popular && (
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30 text-xs">Popular</Badge>
                    )}
                  </div>

                  {producto.descripcion && (
                    <p className="text-sm dashboard-muted line-clamp-2">{producto.descripcion}</p>
                  )}

                  <div className="text-lg font-bold dashboard-text">${producto.precio.toLocaleString()}</div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingId(producto.id)}
                      variant="outline"
                      size="sm"
                      className="dashboard-card border-dashboard-border bg-transparent flex-1"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button onClick={() => eliminarProducto(producto.id)} variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="dashboard-card border-dashboard-border bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold dashboard-text">Gestión de Productos</h1>
          <p className="dashboard-muted">Administra el catálogo completo de productos</p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("Error") || message.includes("completa")
              ? "bg-red-600/20 text-red-400 border border-red-600/30"
              : "bg-green-600/20 text-green-400 border border-green-600/30"
          }`}
        >
          {message}
        </div>
      )}

      {/* Formulario para nuevo producto */}
      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dashboard-text">
            <Plus className="h-5 w-5" />
            Agregar Nuevo Producto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
              className="dashboard-card border-dashboard-border"
            />
            <Input
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
              className="dashboard-card border-dashboard-border"
            />
            <Input
              type="number"
              placeholder="Precio"
              value={nuevoProducto.precio || ""}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number.parseFloat(e.target.value) || 0 })}
              className="dashboard-card border-dashboard-border"
            />
            <select
              value={nuevoProducto.categoria}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
              className="px-3 py-2 rounded-md dashboard-card border-dashboard-border bg-transparent dashboard-text"
            >
              <option value="lomos">Sr. Lomo</option>
              <option value="burgers">Sra. Burguer</option>
              <option value="empanadas">Sra. Empanada</option>
              <option value="pizzas">Sra. Pizza</option>
            </select>
          </div>

          <Input
            placeholder="URL de imagen"
            value={nuevoProducto.imagen}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
            className="dashboard-card border-dashboard-border"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={nuevoProducto.popular}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, popular: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm dashboard-text">Marcar como popular</label>
            </div>

            <Button onClick={agregarProducto} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de productos por categorías */}
      <Tabs defaultValue="lomos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 dashboard-card border-dashboard-border">
          <TabsTrigger value="lomos" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Lomos ({productosPorCategoria.lomos.length})
          </TabsTrigger>
          <TabsTrigger value="burgers" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Burgers ({productosPorCategoria.burgers.length})
          </TabsTrigger>
          <TabsTrigger
            value="empanadas"
            className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
          >
            Empanadas ({productosPorCategoria.empanadas.length})
          </TabsTrigger>
          <TabsTrigger value="pizzas" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
            Pizzas ({productosPorCategoria.pizzas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lomos" className="mt-6">
          {renderProductos(productosPorCategoria.lomos, "lomos")}
        </TabsContent>

        <TabsContent value="burgers" className="mt-6">
          {renderProductos(productosPorCategoria.burgers, "burgers")}
        </TabsContent>

        <TabsContent value="empanadas" className="mt-6">
          {renderProductos(productosPorCategoria.empanadas, "empanadas")}
        </TabsContent>

        <TabsContent value="pizzas" className="mt-6">
          {renderProductos(productosPorCategoria.pizzas, "pizzas")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
