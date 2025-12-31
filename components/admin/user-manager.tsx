"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Shield, User, Crown, AlertCircle, ArrowLeft } from "lucide-react"
import { getAllUsers, updateUserRole } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UserManagerProps {
  userRole: string
}

export function UserManager({ userRole }: UserManagerProps) {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const userData = await getAllUsers()
      setUsers(userData)
    } catch (error) {
      console.error("Error loading users:", error)
      setMessage("Error al cargar los usuarios")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId)
    try {
      const success = await updateUserRole(userId, newRole)
      if (success) {
        setUsers((prev) => prev.map((user) => (user.user_id === userId ? { ...user, role: newRole } : user)))
        setMessage("Rol actualizado correctamente")
      } else {
        setMessage("Error al actualizar el rol")
      }
    } catch (error) {
      console.error("Error updating role:", error)
      setMessage("Error al cambiar el rol")
    } finally {
      setUpdating(null)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "manager":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { color: "bg-red-600/20 text-red-400 border-red-600/30", label: "Administrador" },
      manager: { color: "bg-blue-600/20 text-blue-400 border-blue-600/30", label: "Gerente" },
      customer: { color: "bg-gray-600/20 text-gray-400 border-gray-600/30", label: "Cliente" },
    }

    const roleConfig = config[role as keyof typeof config] || config.customer

    return (
      <Badge className={roleConfig.color}>
        {getRoleIcon(role)}
        <span className="ml-1">{roleConfig.label}</span>
      </Badge>
    )
  }

  if (userRole !== "admin") {
    return (
      <Card className="dashboard-card border-dashboard-border">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 dashboard-text">Acceso Restringido</h3>
          <p className="dashboard-muted">No tienes permisos para acceder a esta sección.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="dashboard-card border-dashboard-border bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold dashboard-text">Gestión de Usuarios</h1>
          <p className="dashboard-muted">Administra los roles y permisos de los usuarios</p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-600/20 text-red-400 border border-red-600/30"
              : "bg-green-600/20 text-green-400 border border-green-600/30"
          }`}
        >
          {message}
        </div>
      )}

      <Card className="dashboard-card border-dashboard-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dashboard-text">
            <Users className="h-5 w-5" />
            Usuarios Registrados
          </CardTitle>
          <div className="flex items-center gap-4 text-sm dashboard-muted">
            <span>Total: {users.length}</span>
            <span>Admins: {users.filter((u) => u.role === "admin").length}</span>
            <span>Clientes: {users.filter((u) => u.role === "customer").length}</span>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 dashboard-muted">Cargando usuarios...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="dashboard-muted">No hay usuarios registrados</p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-dashboard-border hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-600/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 dashboard-muted" />
                    </div>
                    <div>
                      <div className="font-medium dashboard-text">{user.email || "Email no disponible"}</div>
                      <div className="text-sm dashboard-muted">
                        Registrado: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {getRoleBadge(user.role)}

                    <Select
                      value={user.role}
                      onValueChange={(newRole) => handleRoleChange(user.user_id, newRole)}
                      disabled={updating === user.user_id}
                    >
                      <SelectTrigger className="w-40 dashboard-card border-dashboard-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dashboard-card border-dashboard-border">
                        <SelectItem value="customer">Cliente</SelectItem>
                        <SelectItem value="manager">Gerente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>

                    {updating === user.user_id && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-card border-dashboard-border bg-blue-600/10 border-blue-600/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Información sobre Roles</h4>
          <div className="space-y-2 text-sm text-blue-300">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <strong>Administrador:</strong> Acceso completo al sistema, gestión de usuarios y precios
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <strong>Gerente:</strong> Gestión de pedidos y reportes (próximamente)
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <strong>Cliente:</strong> Realizar pedidos y ver historial personal
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
