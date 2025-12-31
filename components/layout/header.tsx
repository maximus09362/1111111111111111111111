"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { ChefHat, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { UserButton } from "@/components/auth/user-button" // Import UserButton

export function Header() {
  const { getTotalItems, getTotalPrice, setIsOpen } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-800 p-2 rounded-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-red-800">Sr Lomo</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Delicias auténticas</p>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            {/* User Button */}
            <UserButton /> {/* Integrated UserButton */}
            {/* Cart Button */}
            <Button
              onClick={() => setIsOpen(true)}
              variant="outline"
              className="relative group hover:bg-red-50 hover:border-red-300 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5 mr-2 group-hover:text-red-800" />
              <span className="hidden sm:inline group-hover:text-red-800">Carrito</span>

              {getTotalItems() > 0 && (
                <>
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs animate-pulse">
                    {getTotalItems()}
                  </Badge>
                  <div className="hidden sm:block ml-2 text-sm font-medium text-green-600">
                    ${getTotalPrice().toLocaleString()}
                  </div>
                </>
              )}
            </Button>
            {/* Mobile Menu Button */}
          </div>
        </div>
      </div>
    </header>
  )
}
