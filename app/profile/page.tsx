import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Crown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserRole } from "@/app/actions/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const userRole = await getUserRole()

  if (userRole === "admin") {
    redirect("/admin")
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return { icon: Crown, label: "Administrador", color: "bg-red-500" }
      case "manager":
        return { icon: Shield, label: "Gerente", color: "bg-blue-500" }
      default:
        return { icon: User, label: "Cliente", color: "bg-gray-500" }
    }
  }

  const roleInfo = getRoleInfo(userRole)
  const RoleIcon = roleInfo.icon

  return (
    <div className="bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-800 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu cuenta y configuraciones</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RoleIcon className="h-10 w-10 text-red-800" />
              </div>
              <CardTitle className="text-lg">
                {userRole === "guest" ? "Usuario Invitado" : "Usuario Registrado"}
              </CardTitle>
              <Badge className={`${roleInfo.color} text-white`}>
                <RoleIcon className="h-4 w-4 mr-1" />
                {roleInfo.label}
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {userRole === "guest" ? (
                <>
                  <p className="text-gray-600">Inicia sesión para acceder a todas las funciones de tu perfil</p>

                  <div className="space-y-2">
                    <Link href="/auth">
                      <Button className="w-full bg-red-800 hover:bg-red-900">
                        <User className="h-4 w-4 mr-2" />
                        Iniciar Sesión
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button variant="outline" className="w-full bg-transparent">
                        Volver al inicio
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600">Bienvenido de vuelta. Gestiona tu cuenta desde aquí.</p>

                  <div className="space-y-2">
                    <Link href="/">
                      <Button className="w-full bg-red-800 hover:bg-red-900">Ver Menú</Button>
                    </Link>

                    <Link href="/auth">
                      <Button variant="outline" className="w-full bg-transparent">
                        Cerrar Sesión
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-blue-800 mb-2">Próximas Funciones</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Historial de pedidos</li>
                  <li>• Direcciones guardadas</li>
                  <li>• Preferencias de entrega</li>
                  {userRole === "admin" && <li>• Panel de administración disponible</li>}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
