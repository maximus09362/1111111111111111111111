import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()

    console.log("Saving title:", title)

    // Simulate successful save
    return NextResponse.json({ success: true, message: "Title saved successfully" })
  } catch (error) {
    console.error("Error saving title:", error)
    return NextResponse.json({ success: false, message: "Error saving title" }, { status: 500 })
  }
}
