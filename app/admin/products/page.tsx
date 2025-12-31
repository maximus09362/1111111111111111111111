import { redirect } from "next/navigation"
import { getUserRole } from "@/app/actions/auth"
import { ProductManager } from "@/components/admin/product-manager"

export default async function ProductsPage() {
  const userRole = await getUserRole()

  if (userRole !== "admin") {
    redirect("/profile")
  }

  return (
    <div className="min-h-screen dashboard-bg">
      <ProductManager userRole={userRole} />
    </div>
  )
}
