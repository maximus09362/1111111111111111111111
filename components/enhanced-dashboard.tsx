"use client"

import { useEffect, useState } from "react"

type Product = {
  id: number
  name: string
  price: number
  image: string | null
  description?: string
}

type PageData = {
  heroImage: string
  heroText: string
  aboutText?: string
  restaurantName?: string
  phone?: string
  email?: string
  address?: string
}

type MenuCategory = {
  id: string
  title: string
  description: string
  image: string
  href: string
  color: string
  items: string
}

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [pageData, setPageData] = useState<PageData>({
    heroImage: "/italian-restaurant-interior.png",
    heroText: "Auténtica Cocina Italiana en el Corazón de la Ciudad",
  })

  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      console.log("[v0] Iniciando carga de datos del dashboard")
      try {
        const [productsRes, pageRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/page-data"),
          fetch("/api/menu-categories"),
        ])

        console.log("[v0] Respuestas de APIs:", {
          products: productsRes.status,
          page: pageRes.status,
          categories: categoriesRes.status,
        })

        if (productsRes.ok) {
          const productsData = await productsRes.json()
          console.log("[v0] Productos cargados:", productsData.length)
          setProducts(productsData)
        } else {
          console.log("[v0] Error en API productos:", productsRes.status)
        }

        if (pageRes.ok) {
          const pageDataRes = await pageRes.json()
          console.log("[v0] Datos de página cargados:", pageDataRes)
          setPageData(pageDataRes)
        } else {
          console.log("[v0] Error en API page-data:", pageRes.status)
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          console.log("[v0] Categorías cargadas:", categoriesData.length)
          setMenuCategories(categoriesData)
        } else {
          console.log("[v0] Error en API menu-categories:", categoriesRes.status)
        }
      } catch (error) {
        console.error("[v0] Error cargando datos:", error)
      } finally {
        console.log("[v0] Carga de datos completada")
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Actualizar productos
  const updateProduct = async (id: number, field: string, value: string | number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, [field]: value }
        }
        return product
      })
    })
  }

  // Actualizar datos de la página
  const updatePageData = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/page-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      })

      if (response.ok) {
        const updatedData = await response.json()
        setPageData(updatedData)
        alert("Datos de página actualizados correctamente")
      }
    } catch (error) {
      console.error("Error actualizando página:", error)
      alert("Error al actualizar los datos")
    } finally {
      setSaving(false)
    }
  }

  const saveProducts = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      })

      if (response.ok) {
        const updatedProducts = await response.json()
        setProducts(updatedProducts)
        alert("Productos guardados correctamente")
      }
    } catch (error) {
      console.error("Error guardando productos:", error)
      alert("Error al guardar los productos")
    } finally {
      setSaving(false)
    }
  }

  const updateMenuCategory = (id: string, field: string, value: string) => {
    setMenuCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === id) {
          return { ...category, [field]: value }
        }
        return category
      })
    })
  }

  const saveMenuCategories = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/menu-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuCategories),
      })

      if (response.ok) {
        const updatedCategories = await response.json()
        setMenuCategories(updatedCategories)
        alert("Categorías de menú guardadas correctamente")
      }
    } catch (error) {
      console.error("Error guardando categorías:", error)
      alert("Error al guardar las categorías")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        {" "}
        {/* Cambiar de amber-50 a red-50 */}
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-900 text-lg">Cargando dashboard...</p> {/* Cambiar de amber-900 a red-900 */}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {" "}
      {/* Cambiar de amber-50 a red-50 */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-red-900">
            {" "}
            {/* Cambiar de amber-900 a red-900 */}
            {isAdmin ? "Panel de Administración" : "Dashboard del Restaurante"}
          </h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {isAdmin ? "Vista Usuario" : "Modo Admin"}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Estado del Dashboard:</h3>
          <p className="text-sm text-blue-800">
            Categorías cargadas: {menuCategories.length} | Productos cargados: {products.length} | Modo:{" "}
            {isAdmin ? "Admin" : "Usuario"}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Loading: {loading ? "Sí" : "No"} | Saving: {saving ? "Sí" : "No"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-red-900 mb-6">Categorías de Menú Principal</h2>{" "}
          {/* Cambiar de amber-900 a red-900 */}
          {menuCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron categorías de menú</p>
              <p className="text-sm text-gray-400 mt-2">Verifica que la API /api/menu-categories esté funcionando</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuCategories.map((category) => (
                <div
                  key={category.id}
                  className="border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow" // Cambiar de amber-200 a red-200
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <div className={`${category.color} text-white p-2 rounded mb-3 text-center`}>
                    <h3 className="font-bold text-lg">{category.title}</h3>
                  </div>

                  {isAdmin ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={category.title}
                        onChange={(e) => updateMenuCategory(category.id, "title", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="Título de la categoría"
                      />
                      <input
                        type="text"
                        value={category.description}
                        onChange={(e) => updateMenuCategory(category.id, "description", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="Descripción"
                      />
                      <input
                        type="text"
                        value={category.image}
                        onChange={(e) => updateMenuCategory(category.id, "image", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="URL de imagen"
                      />
                      <input
                        type="text"
                        value={category.items}
                        onChange={(e) => updateMenuCategory(category.id, "items", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="Cantidad de items (ej: 8 especialidades)"
                      />
                      <input
                        type="text"
                        value={category.href}
                        onChange={(e) => updateMenuCategory(category.id, "href", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="Enlace (ej: /menu/lomos)"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-600 mb-2">{category.description}</p> {/* Cambiar de amber-700 a red-600 */}
                      <p className="text-sm text-gray-600 mb-1">📍 {category.items}</p>
                      <p className="text-sm text-blue-600">🔗 {category.href}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {isAdmin && (
            <div className="mt-6 text-center">
              <button
                onClick={saveMenuCategories}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar Categorías de Menú"}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-red-900 mb-4">Imagen Principal</h2>{" "}
          {/* Cambiar de amber-900 a red-900 */}
          <div className="relative">
            <img
              src={pageData.heroImage || "/placeholder.svg"}
              alt="Hero"
              className="w-full h-64 object-cover rounded-lg border-2 border-red-200" // Cambiar de amber-200 a red-200
            />
            {isAdmin && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  value={pageData.heroImage}
                  onChange={(e) => setPageData({ ...pageData, heroImage: e.target.value })}
                  className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" // Cambiar de amber-300 a red-300
                  placeholder="URL de la imagen hero"
                />
                <input
                  type="text"
                  value={pageData.heroText}
                  onChange={(e) => setPageData({ ...pageData, heroText: e.target.value })}
                  className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" // Cambiar de amber-300 a red-300
                  placeholder="Texto hero"
                />
                {pageData.aboutText !== undefined && (
                  <textarea
                    value={pageData.aboutText}
                    onChange={(e) => setPageData({ ...pageData, aboutText: e.target.value })}
                    className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" // Cambiar de amber-300 a red-300
                    placeholder="Texto sobre el restaurante"
                    rows={3}
                  />
                )}
                <button
                  onClick={updatePageData}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? "Guardando..." : "Actualizar Página"}
                </button>
              </div>
            )}
          </div>
          <p className="text-xl text-red-700 mt-4 text-center font-medium">{pageData.heroText}</p>{" "}
          {/* Cambiar de amber-800 a red-700 */}
          {pageData.aboutText && <p className="text-red-600 mt-2 text-center">{pageData.aboutText}</p>}{" "}
          {/* Cambiar de amber-700 a red-600 */}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-red-900 mb-6">Nuestros Platos</h2>{" "}
          {/* Cambiar de amber-900 a red-900 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow" // Cambiar de amber-200 a red-200
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                {isAdmin ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                      className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                      placeholder="Nombre del plato"
                    />
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProduct(product.id, "price", Number.parseFloat(e.target.value))}
                      className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                      step="0.01"
                      placeholder="Precio"
                    />
                    <input
                      type="text"
                      value={product.image || ""}
                      onChange={(e) => updateProduct(product.id, "image", e.target.value)}
                      className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                      placeholder="URL de imagen"
                    />
                    {product.description !== undefined && (
                      <textarea
                        value={product.description || ""}
                        onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                        className="w-full p-2 border border-red-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm" // Cambiar de amber-300 a red-300
                        placeholder="Descripción del plato"
                        rows={2}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-red-900 text-lg">{product.name}</h3>{" "}
                    {/* Cambiar de amber-900 a red-900 */}
                    <p className="text-red-600 font-bold text-xl">€{product.price}</p>
                    {product.description && <p className="text-red-600 text-sm mt-1">{product.description}</p>}{" "}
                    {/* Cambiar de amber-700 a red-600 */}
                  </div>
                )}
              </div>
            ))}
          </div>
          {isAdmin && (
            <div className="mt-6 text-center">
              <button
                onClick={saveProducts}
                disabled={saving}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar Productos"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
