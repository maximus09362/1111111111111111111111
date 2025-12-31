"use client"

import { useCart } from "@/components/cart-provider"

export function CartQuickActions() {
  const { cart } = useCart()

  if (cart.length === 0) return null

  return null
}
