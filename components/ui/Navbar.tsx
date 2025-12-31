import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div>
        <Button variant="default">Acción</Button>
      </div>
    </header>
  )
}
