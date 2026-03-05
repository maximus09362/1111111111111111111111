import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl mb-6">Mi Dashboard</h2>
      <ul>
        <li className="mb-3">
          <Link href="/dashboard">Inicio</Link>
        </li>
        <li>
          <Link href="/dashboard/productos">Productos</Link>
        </li>
      </ul>
    </aside>
  )
}
