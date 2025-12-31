"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const supabase = createSupabaseBrowserClient()

  const handleAuth = async (type: "signin" | "signup") => {
    setLoading(true)
    setMessage("")

    const { error } =
      type === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage(
        type === "signup"
          ? "¡Registro exitoso! Revisa tu email para confirmar."
          : "¡Inicio de sesión exitoso! Redirigiendo...",
      )
      // Optionally redirect or refresh page after successful login
      if (type === "signin") {
        window.location.reload() // Simple reload to trigger cart merge
      }
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{isSignUp ? "Regístrate" : "Inicia Sesión"}</CardTitle>
        <CardDescription>
          {isSignUp ? "Crea una cuenta para sincronizar tu carrito." : "Accede a tu cuenta para ver tus pedidos."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>{message}</p>
        )}
        <Button
          onClick={() => handleAuth(isSignUp ? "signup" : "signin")}
          disabled={loading}
          className="w-full bg-red-800 hover:bg-red-900"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cargando...
            </>
          ) : isSignUp ? (
            "Registrarse"
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
        <Button variant="link" className="w-full" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate"}
        </Button>
      </CardContent>
    </Card>
  )
}
