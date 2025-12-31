"use client"

import type React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted text-muted-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r p-6 space-y-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <nav className="space-y-2">
          <a href="#" className="block hover:text-primary">
            Inicio
          </a>
          <a href="#" className="block hover:text-primary">
            Usuarios
          </a>
          <a href="#" className="block hover:text-primary">
            Ajustes
          </a>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}
