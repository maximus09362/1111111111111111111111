"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Crown, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserButton() {
  const [userRole, setUserRole] = useState<string>("guest") // Can be: guest, customer, manager, admin
  const [userName, setUserName] = useState<string>("")

  const handleLogin = (role: string, name: string) => {
    setUserRole(role)
    setUserName(name)
  }

  const handleLogout = () => {
    setUserRole("guest")
    setUserName("")
  }

  if (userRole === "guest") {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          {userRole === "admin" && <Crown className="h-4 w-4 text-red-600" />}
          {userRole === "manager" && <Shield className="h-4 w-4 text-blue-600" />}
          {userRole === "customer" && <User className="h-4 w-4" />}
          <span className="hidden sm:inline">{userName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {userRole === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Crown className="h-4 w-4 mr-2 text-red-600" />
              Panel Admin
            </Link>
          </DropdownMenuItem>
        )}
        {(userRole === "manager" || userRole === "customer") && (
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="h-4 w-4 mr-2" />
              Mi Perfil
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
