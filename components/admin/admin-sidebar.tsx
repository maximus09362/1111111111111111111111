"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Users, DollarSign, ShoppingBag, BarChart3, Settings, ChefHat, Menu, X, Package } from 'lucide-react'
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Gestión de Usuarios",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Gestión de Precios",
    href: "/admin/prices",
    icon: DollarSign,
  },
  {
    name: "Gestión de Productos",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Pedidos",
    href: "/admin/orders",
    icon: ShoppingBag,
    badge: "Próximamente",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: "Próximamente",
  },
  {
    name: "Configuración",
    href: "/admin/settings",
    icon: Settings,
    badge: "Próximamente",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="dashboard-card border-dashboard-border"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 dashboard-card border-r border-dashboard-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-dashboard-border">
            <div className="bg-red-600 p-2 rounded-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold dashboard-text">Admin Panel</h1>
              <p className="text-xs dashboard-muted">Sr Lomo</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                      : "dashboard-muted hover:dashboard-text hover:bg-white/5",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-dashboard-border">
            <Link href="/" className="flex items-center gap-2 text-sm dashboard-muted hover:dashboard-text">
              <ChefHat className="h-4 w-4" />
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
