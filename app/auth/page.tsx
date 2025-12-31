import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="bg-amber-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para sincronizar tu carrito y ver tus pedidos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input id="email" type="email" placeholder="Email" required />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <Input id="password" type="password" placeholder="Contraseña" required />
            </div>
            <Button className="w-full bg-red-800 hover:bg-red-900">
              <User className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
            <Button variant="link" className="w-full">
              ¿No tienes cuenta? Regístrate
            </Button>
            <div className="text-center">
              <Link href="/">
                <Button variant="ghost">Continuar sin cuenta</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
