import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Get current user API called")

    const authHeader = request.headers.get("authorization")
    console.log("[v0] Authorization header:", authHeader ? "Present" : "Missing")

    let token: string | undefined

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
      console.log("[v0] Token extracted from Authorization header")
    } else {
      // Fallback to cookie for backward compatibility
      token = request.cookies.get("auth-token")?.value
      console.log("[v0] Checking cookie fallback:", token ? "Token found in cookie" : "No token in cookie")
    }

    if (!token) {
      console.log("[v0] No auth token found")
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    console.log("[v0] Auth token found, verifying...")
    const { payload } = await jwtVerify(token, JWT_SECRET)

    if (!payload.userId) {
      console.log("[v0] Invalid token payload")
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    }

    const supabase = await createClient()

    console.log("[v0] Fetching user from database...")
    const { data: user, error: dbError } = await supabase.from("users").select("*").eq("id", payload.userId).single()

    if (dbError || !user) {
      console.log("[v0] User not found")
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    console.log("[v0] User authenticated successfully:", userWithoutPassword.email)
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return NextResponse.json(
      {
        error: "حدث خطأ",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
