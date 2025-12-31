"use client"

import { useState } from "react"

const mockProducts = [
  { id: 1, name: "Lomo Completo", category: "Lomos", price: 2500, stock: 25, status: "Disponible" },
  { id: 2, name: "Burger Clásica", category: "Burgers", price: 1800, stock: 30, status: "Disponible" },
  { id: 3, name: "Empanada de Carne", category: "Empanadas", price: 350, stock: 50, status: "Disponible" },
  { id: 4, name: "Pizza Margherita", category: "Pizzas", price: 2200, stock: 15, status: "Disponible" },
  { id: 5, name: "Lomo Vegetariano", category: "Lomos", price: 2300, stock: 8, status: "Poco Stock" },
  { id: 6, name: "Burger BBQ", category: "Burgers", price: 2100, stock: 0, status: "Agotado" },
  { id: 7, name: "Empanada de Pollo", category: "Empanadas", price: 350, stock: 40, status: "Disponible" },
  { id: 8, name: "Pizza Pepperoni", category: "Pizzas", price: 2400, stock: 20, status: "Disponible" },
]

export function ProductTable() {
  const [products, setProducts] = useState(mockProducts)
  const [filter, setFilter] = useState("all")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [tempPrice, setTempPrice] = useState<number | null>(null)

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true
    if (filter === "available") return product.status === "Disponible"
    if (filter === "low-stock") return product.status === "Poco Stock"
    if (filter === "out-of-stock") return product.status === "Agotado"
    return true
  })

  const startEditing = (product: (typeof mockProducts)[0]) => {
    setEditingId(product.id)
    setTempPrice(product.price)
  }

  const savePrice = (id: number) => {
    if (tempPrice !== null) {
      setProducts(products.map((p) => (p.id === id ? { ...p, price: tempPrice } : p)))
    }
    setEditingId(null)
    setTempPrice(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setTempPrice(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible":
        return "bg-green-100 text-green-800"
      case "Poco Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Agotado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Todos los productos</option>
              <option value="available">Disponibles</option>
              <option value="low-stock">Poco stock</option>
              <option value="out-of-stock">Agotados</option>
            </select>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Agregar Producto
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={tempPrice || ""}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        autoFocus
                      />
                      <button
                        onClick={() => savePrice(product.id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        ✓
                      </button>
                      <button onClick={cancelEditing} className="text-red-600 hover:text-red-800 text-sm">
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      className="text-sm font-medium text-gray-900 cursor-pointer hover:text-red-600"
                      onClick={() => startEditing(product)}
                    >
                      ${product.price}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock} unidades</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => startEditing(product)} className="text-indigo-600 hover:text-indigo-900">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
