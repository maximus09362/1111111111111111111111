import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen dashboard-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
