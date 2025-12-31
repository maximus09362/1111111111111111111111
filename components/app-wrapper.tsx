"use client"

import type React from "react"
import { CartProvider } from "@/components/cart-provider"
import { OrdersTodayProvider } from "@/components/orders-today-provider"
import { Header } from "@/components/layout/header"
import { CartSidebar } from "@/components/ui/cart-sidebar"
import { CartMiniPreview } from "@/components/ui/cart-mini-preview"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  return (
    <OrdersTodayProvider>
      <CartProvider initialCart={[]}>
        <div className="min-h-screen">
          <Header />
          <CartSidebar />
          <CartMiniPreview />
          {children}
        </div>
      </CartProvider>
    </OrdersTodayProvider>
  )
}
