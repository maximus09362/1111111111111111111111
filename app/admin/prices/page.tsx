import { getUserRole } from "@/app/actions/auth"
import { PriceManager } from "@/components/admin/price-manager"
import { redirect } from "next/navigation"

export default async function AdminPricesPage() {
  const userRole = await getUserRole()

  if (userRole !== "admin") {
    redirect("/profile")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PriceManager userRole={userRole} />
    </div>
  )
}
