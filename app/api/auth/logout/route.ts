import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("[v0] Logout API called")

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الخروج بنجاح"
    })

    // Clear the auth token cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: false, // Disabled for debugging in v0 preview
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    console.log("[v0] Logout successful, cookie cleared")
    return response
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json(
      {
        error: "حدث خطأ أثناء تسجيل الخروج",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
