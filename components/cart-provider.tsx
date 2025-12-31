"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { CartItem, MenuItem } from "@/lib/types"

interface CartContextType {
  cart: CartItem[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  initialCart: CartItem[]
  children: React.ReactNode
}

export function CartProvider({ initialCart, children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate cart from localStorage on client side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart))
        } catch (error) {
          console.error("Error parsing saved cart:", error)
          setCart([])
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage (getItem) during hydration:", error)
      setCart([]) // Ensure cart is empty if localStorage access fails
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Error accessing localStorage (setItem) when updating cart:", error)
      }
    }
  }, [cart, isHydrated])

  const addToCart = useCallback((item: MenuItem, quantity = 1, notes?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity, notes } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity, notes }]
      }
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }, [])

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId)
        return
      }

      setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const value = {
    cart,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isHydrated,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
