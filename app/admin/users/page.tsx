import { getUserRole } from "@/app/actions/auth"
import { UserManager } from "@/components/admin/user-manager"
import { redirect } from "next/navigation"

export default async function AdminUsersPage() {
  const userRole = await getUserRole()

  if (userRole !== "admin") {
    redirect("/profile")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <UserManager userRole={userRole} />
    </div>
  )
}
