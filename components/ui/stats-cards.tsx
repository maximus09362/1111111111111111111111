import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="hover:scale-[1.02] transition-transform duration-200 ease-in-out">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
      </div>

      <div className="hover:scale-[1.02] transition-transform duration-200 ease-in-out">
        <Card>
          <CardHeader>
            <CardTitle>Ventas hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$3,200</p>
          </CardContent>
        </Card>
      </div>

      {/* Agrega más cards si quieres */}
    </div>
  )
}
