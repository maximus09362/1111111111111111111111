"use server"

export async function getUserRole(): Promise<string> {
  try {
    // Mock user role - in a real app this would come from session/cookies
    // For demo purposes, return "customer" to show authenticated state
    return "customer"
  } catch (error) {
    console.error("Error in getUserRole:", error)
    return "guest"
  }
}

export async function updateUserRole(userId: string, role: string): Promise<boolean> {
  try {
    console.log(`Mock: Updating user ${userId} to role ${role}`)
    return true
  } catch (error) {
    console.error("Error in updateUserRole:", error)
    return false
  }
}

export async function getAllUsers(): Promise<any[]> {
  try {
    return [
      {
        user_id: "1",
        role: "admin",
        email: "admin@restaurant.com",
        created_at: new Date().toISOString(),
      },
      {
        user_id: "2",
        role: "customer",
        email: "customer@example.com",
        created_at: new Date().toISOString(),
      },
    ]
  } catch (error) {
    console.error("Error in getAllUsers:", error)
    return []
  }
}
