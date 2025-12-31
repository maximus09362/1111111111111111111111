"use client"

import { ProductTable } from "@/components/ui/ProductTable"
import { StatsCards } from "@/components/ui/stats-cards"

export function DashboardContent() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard del Restaurante</h1>
        <p className="text-gray-600">Gestiona tu menú y pedidos desde aquí</p>
      </div>

      <div className="mb-8">
        <StatsCards />
      </div>

      {/* Product Table */}
      <ProductTable />
    </div>
  )
}
