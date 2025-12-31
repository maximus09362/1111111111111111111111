"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginDashboardPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Simple authentication check
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("dashboard-auth", "true")
      router.push("/dashboard")
    } else {
      setError("Credenciales incorrectas. Usa admin/admin123")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Acceso al Dashboard</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder al panel de administración</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Iniciar Sesión
            </Button>
            <div className="text-center text-sm text-gray-500">
              <p>Credenciales de prueba:</p>
              <p>
                <strong>Usuario:</strong> admin
              </p>
              <p>
                <strong>Contraseña:</strong> admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
