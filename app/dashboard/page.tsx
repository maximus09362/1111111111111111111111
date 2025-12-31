"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("dashboard-auth")
    if (auth !== "true") {
      router.push("/login-dashboard")
    }
  }, [router])

  return (
    <div>
      <Dashboard />
    </div>
  )
}
