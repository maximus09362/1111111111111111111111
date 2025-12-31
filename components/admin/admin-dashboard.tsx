"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, ShoppingBag, Package, Activity, TrendingUp } from "lucide-react"
import { getAllUsers } from "@/app/actions/auth"
import { getAllPriceSettings } from "@/app/actions/prices"
import { lomoMenu, burgerMenu, empanadaMenu, pizzaMenu } from "@/lib/menu-data"
import { useOrdersToday } from "@/components/orders-today-provider"
import Link from "next/link"

interface AdminDashboardProps {
  userRole: string
}

export function AdminDashboard({ userRole }: AdminDashboardProps) {
  const [users, setUsers] = useState<any[]>([])
  const [priceSettings, setPriceSettings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { ordersToday, isLoading: ordersLoading } = useOrdersToday()

  const allMenuItems = [...lomoMenu, ...burgerMenu, ...empanadaMenu, ...pizzaMenu]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [usersData, pricesData] = await Promise.all([getAllUsers(), getAllPriceSettings()])
      setUsers(usersData)
      setPriceSettings(pricesData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalOrdersToday =
    (ordersToday["lomo-1"] || 0) +
    (ordersToday["lomo-2"] || 0) +
    (ordersToday["lomo-3"] || 0) +
    (ordersToday["lomo-4"] || 0)

  const totalEmpanadasToday =
    (ordersToday["empanada-1"] || 0) +
    (ordersToday["empanada-2"] || 0) +
    (ordersToday["empanada-3"] || 0) +
    (ordersToday["empanada-4"] || 0) +
    (ordersToday["empanada-5"] || 0) +
    (ordersToday["empanada-6"] || 0) +
    (ordersToday["empanada-7"] || 0) +
    (ordersToday["empanada-8"] || 0) +
    (ordersToday["empanada-9"] || 0) +
    (ordersToday["empanada-10"] || 0) +
    (ordersToday["empanada-11"] || 0) +
    (ordersToday["empanada-12"] || 0)

  const stats = [
    {
      title: "Total Usuarios",
      value: users.length.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Usuarios registrados",
    },
    {
      title: "Productos en Menú",
      value: allMenuItems.length.toString(),
      change: "4 categorías",
      changeType: "neutral" as const,
      icon: Package,
      description: "Items disponibles",
    },
    {
      title: "Precios Personalizados",
      value: priceSettings.length.toString(),
      change: `${Math.round((priceSettings.length / allMenuItems.length) * 100)}%`,
      changeType: "neutral" as const,
      icon: DollarSign,
      description: "Del total de productos",
    },
    {
      title: "Pedidos Hoy",
      value: ordersLoading ? "..." : (totalOrdersToday + totalEmpanadasToday).toString(),
      change: "En tiempo real",
      changeType: totalOrdersToday + totalEmpanadasToday > 0 ? ("positive" as const) : ("neutral" as const),
      icon: ShoppingBag,
      description: "Lomos y empanadas",
    },
  ]

  const recentActivity = [
    {
      action: "Usuario registrado",
      user: "nuevo@email.com",
      time: "Hace 2 horas",
      type: "user",
    },
    {
      action: "Precio actualizado",
      user: "Lomo Completo",
      time: "Hace 4 horas",
      type: "price",
    },
    {
      action: "Sistema iniciado",
      user: "Admin Panel",
      time: "Hace 1 día",
      type: "system",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-text">Dashboard</h1>
          <p className="dashboard-muted">Bienvenido al panel de administración</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
            <Activity className="h-3 w-3 mr-1" />
            Sistema Activo
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="dashboard-card border-dashboard-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm dashboard-muted">{stat.title}</p>
                  <p className="text-2xl font-bold dashboard-text">{stat.value}</p>
                  <p className="text-xs dashboard-muted mt-1">{stat.description}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-600/20">
                  <stat.icon className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === "positive" ? "bg-green-600/20 text-green-400" : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dashboard-text flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              Pedidos Hoy - Sr. Lomo
            </CardTitle>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">Actualización cada 10s</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* SUPERCHARGER */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-600/10 to-orange-600/10 border border-red-600/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-red-400">SUPERCHARGER</h3>
                <ShoppingBag className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-3xl font-bold dashboard-text">
                {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["lomo-1"] || 0}
              </div>
              <p className="text-xs dashboard-muted mt-1">pedidos hoy</p>
            </div>

            {/* SR. LOMO */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-blue-400">SR. LOMO</h3>
                <ShoppingBag className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold dashboard-text">
                {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["lomo-2"] || 0}
              </div>
              <p className="text-xs dashboard-muted mt-1">pedidos hoy</p>
            </div>

            {/* SUPER-DUPER */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-600/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-green-400">SUPER-DUPER</h3>
                <ShoppingBag className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-3xl font-bold dashboard-text">
                {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["lomo-3"] || 0}
              </div>
              <p className="text-xs dashboard-muted mt-1">pedidos hoy</p>
            </div>

            {/* PROMO SUPER-DUPER (COMEN 4) */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-600/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-yellow-400">PROMO SUPER-DUPER</h3>
                <ShoppingBag className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold dashboard-text">
                {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["lomo-4"] || 0}
              </div>
              <p className="text-xs dashboard-muted mt-1">pedidos hoy (Comen 4)</p>
            </div>
          </div>

          {/* Resumen total lomos */}
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm dashboard-muted">Total de Pedidos de Lomos Hoy</p>
                <p className="text-2xl font-bold text-orange-400">
                  {ordersLoading ? <span className="animate-pulse">Cargando...</span> : totalOrdersToday}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dashboard-text flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Pedidos Hoy - Sra. Empanada
            </CardTitle>
            <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Actualización cada 10s</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Empanadas Arabes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold dashboard-text mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              Arabes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-yellow-400">Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-1"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-yellow-400">Media Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-2"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-yellow-400">Unidad</h4>
                  <ShoppingBag className="h-3 w-3 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-3"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
            </div>
          </div>

          {/* Empanadas Jamón y Mozzarella */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold dashboard-text mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              Jamón y Mozzarella
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-orange-400">Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-orange-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-4"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-orange-400">Media Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-orange-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-5"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-orange-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-orange-400">Unidad</h4>
                  <ShoppingBag className="h-3 w-3 text-orange-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-6"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
            </div>
          </div>

          {/* Empanadas Queso Roquefort */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold dashboard-text mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Queso Roquefort
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-blue-400">Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-blue-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-7"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-blue-400">Media Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-blue-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-8"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-blue-400">Unidad</h4>
                  <ShoppingBag className="h-3 w-3 text-blue-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-9"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
            </div>
          </div>

          {/* Empanadas Capresse */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold dashboard-text mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Capresse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-green-400">Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-green-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-10"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-green-400">Media Docena</h4>
                  <ShoppingBag className="h-3 w-3 text-green-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-11"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-600/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-green-400">Unidad</h4>
                  <ShoppingBag className="h-3 w-3 text-green-400" />
                </div>
                <div className="text-2xl font-bold dashboard-text">
                  {ordersLoading ? <span className="animate-pulse">...</span> : ordersToday["empanada-12"] || 0}
                </div>
                <p className="text-xs dashboard-muted">pedidos hoy</p>
              </div>
            </div>
          </div>

          {/* Resumen total empanadas */}
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm dashboard-muted">Total de Pedidos de Empanadas Hoy</p>
                <p className="text-2xl font-bold text-green-400">
                  {ordersLoading ? <span className="animate-pulse">Cargando...</span> : totalEmpanadasToday}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="dashboard-card border-dashboard-border">
          <CardHeader>
            <CardTitle className="dashboard-text">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="w-full justify-start dashboard-card border-dashboard-border hover:bg-white/5 bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Gestionar Usuarios
              </Button>
            </Link>
            <Link href="/admin/prices">
              <Button
                variant="outline"
                className="w-full justify-start dashboard-card border-dashboard-border hover:bg-white/5 bg-transparent"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Actualizar Precios
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button
                variant="outline"
                className="w-full justify-start dashboard-card border-dashboard-border hover:bg-white/5 bg-transparent"
              >
                <Package className="h-4 w-4 mr-2" />
                Gestionar Productos
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start dashboard-card border-dashboard-border hover:bg-white/5 bg-transparent"
              disabled
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Ver Pedidos
              <Badge className="ml-auto bg-yellow-600/20 text-yellow-400 text-xs">Próximamente</Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="dashboard-card border-dashboard-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="dashboard-text">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "user"
                        ? "bg-blue-600/20"
                        : activity.type === "price"
                          ? "bg-green-600/20"
                          : "bg-gray-600/20"
                    }`}
                  >
                    {activity.type === "user" && <Users className="h-4 w-4 text-blue-400" />}
                    {activity.type === "price" && <DollarSign className="h-4 w-4 text-green-400" />}
                    {activity.type === "system" && <Activity className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm dashboard-text">{activity.action}</p>
                    <p className="text-xs dashboard-muted">{activity.user}</p>
                  </div>
                  <span className="text-xs dashboard-muted">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Overview */}
      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <CardTitle className="dashboard-text">Resumen del Menú</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-red-600/10 border border-red-600/20">
              <Package className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{lomoMenu.length}</p>
              <p className="text-sm dashboard-muted">Sr. Lomo</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <Package className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">{burgerMenu.length}</p>
              <p className="text-sm dashboard-muted">Sra. Burguer</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-600/10 border border-green-600/20">
              <Package className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{empanadaMenu.length}</p>
              <p className="text-sm dashboard-muted">Sra. Empanada</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-600/10 border border-yellow-600/20">
              <Package className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">{pizzaMenu.length}</p>
              <p className="text-sm dashboard-muted">Sra. Pizza</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
