"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface OrdersTodayContextType {
  ordersToday: Record<string, number>
  incrementOrder: (productIdOrCategory: string) => Promise<void>
  isLoading: boolean
}

const OrdersTodayContext = createContext<OrdersTodayContextType | undefined>(undefined)

interface OrdersTodayProviderProps {
  children: React.ReactNode
}

export function OrdersTodayProvider({ children }: OrdersTodayProviderProps) {
  const [ordersToday, setOrdersToday] = useState<Record<string, number>>({
    "lomo-1": 0,
    "lomo-2": 0,
    "lomo-3": 0,
    "lomo-4": 0,
    "lomo-5": 0,
    "lomo-6": 0,
    burger: 0,
    empanada: 0,
    pizza: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  // const fetchOrdersToday = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/orders-today")
  //     if (response.ok) {
  //       const data = await response.json()
  //       setOrdersToday(data)
  //     }
  //   } catch (error) {
  //     console.error("Error obteniendo pedidos del día:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [])

  const incrementOrder = useCallback(async (productIdOrCategory: string) => {
    setOrdersToday((prev) => ({
      ...prev,
      [productIdOrCategory]: (prev[productIdOrCategory] || 0) + 1,
    }))
  }, [])

  // useEffect(() => {
  //   fetchOrdersToday()
  // }, [fetchOrdersToday])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchOrdersToday()
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [fetchOrdersToday])

  const value = {
    ordersToday,
    incrementOrder,
    isLoading,
  }

  return <OrdersTodayContext.Provider value={value}>{children}</OrdersTodayContext.Provider>
}

export function useOrdersToday() {
  const context = useContext(OrdersTodayContext)
  if (context === undefined) {
    throw new Error("useOrdersToday must be used within an OrdersTodayProvider")
  }
  return context
}
