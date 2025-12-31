import { redirect } from "next/navigation"
import { getUserRole } from "@/app/actions/auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const userRole = await getUserRole()

  if (userRole !== "admin") {
    redirect("/profile")
  }

  return (
    <div className="min-h-screen dashboard-bg">
      <AdminDashboard userRole={userRole} />
    </div>
  )
}
