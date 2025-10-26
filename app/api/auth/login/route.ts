import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
})

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login API called")

    const body = await request.json()
    console.log("[v0] Request body parsed:", { email: body.email })

    // Validate input
    const validatedData = loginSchema.parse(body)
    console.log("[v0] Data validated")

    const supabase = await createClient()
    console.log("[v0] Supabase client created")

    console.log("[v0] Fetching user from custom users table...")
    const { data: user, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", validatedData.email)
      .single()

    if (dbError || !user) {
      console.log("[v0] User not found in database")
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    console.log("[v0] Verifying password...")
    const passwordMatch = await bcrypt.compare(validatedData.password, user.password)

    if (!passwordMatch) {
      console.log("[v0] Password mismatch")
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      console.log("[v0] User account is inactive")
      return NextResponse.json({ error: "الحساب غير نشط. يرجى التواصل مع الدعم" }, { status: 403 })
    }

    console.log("[v0] Creating JWT token...")
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .setIssuedAt()
      .sign(JWT_SECRET)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    })

    const cookieOptions = {
      httpOnly: true,
      secure: false, // Disabled for debugging in v0 preview
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    }

    console.log("[v0] Setting cookie with options:", cookieOptions)
    response.cookies.set("auth-token", token, cookieOptions)
    console.log("[v0] Cookie set successfully")

    console.log("[v0] Login successful with JWT token created")
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("[v0] Validation error:", error.errors)
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("[v0] Login error:", error)
    return NextResponse.json(
      {
        error: "حدث خطأ أثناء تسجيل الدخول",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
