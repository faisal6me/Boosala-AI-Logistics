import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

async function getAuthenticatedUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  let token: string | undefined

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7)
  } else {
    token = request.cookies.get("auth-token")?.value
  }

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.userId as string
  } catch (error) {
    console.error("[v0] JWT verification failed:", error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] ===== FETCHING ZONES =====")
    console.log("[v0] Creating service client...")

    const supabase = createServiceClient()
    console.log("[v0] Service client created successfully")

    console.log("[v0] Querying zones table...")
    // First try with is_active filter
    let { data: zones, error } = await supabase
      .from("zones")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    // If no results and no error, try without is_active filter (for existing data)
    if (!zones || zones.length === 0) {
      console.log("[v0] No active zones found, trying without is_active filter...")
      const fallbackResult = await supabase
        .from("zones")
        .select("*")
        .order("created_at", { ascending: false })
      
      zones = fallbackResult.data
      error = fallbackResult.error
    }

    console.log("[v0] Query completed")
    console.log("[v0] Error:", error)
    console.log("[v0] Zones data:", JSON.stringify(zones, null, 2))
    console.log("[v0] Number of zones:", zones?.length || 0)

    if (error) {
      console.error("[v0] Error fetching zones:", error)
      return NextResponse.json({ error: "Failed to fetch zones", details: error.message }, { status: 500 })
    }

    // Transform zones to ensure consistent field names
    const transformedZones = zones?.map(zone => ({
      ...zone,
      geometry: zone.geometry || zone.polygon, // Use geometry if exists, otherwise polygon
    })) || []

    console.log("[v0] Transformed zones:", transformedZones.length)
    console.log("[v0] Zones fetched successfully:", transformedZones.length)
    console.log("[v0] ===== END FETCHING ZONES =====")

    return NextResponse.json({ zones: transformedZones })
  } catch (error) {
    console.error("[v0] Exception in GET /api/zones:", error)
    return NextResponse.json(
      { error: "Failed to fetch zones", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, geometry, color } = body

    console.log("[v0] Creating new zone:", name)
    console.log("[v0] Geometry received:", JSON.stringify(geometry))

    if (!name || !geometry) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Name and geometry are required" }, { status: 400 })
    }

    const userId = await getAuthenticatedUser(request)

    if (!userId) {
      console.log("[v0] User not authenticated")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] User authenticated:", userId)

    const supabase = createServiceClient()

    const { data: zone, error } = await supabase
      .from("zones")
      .insert({
        user_id: userId,
        name,
        description: description || null,
        geometry,
        color: color || "#3B82F6",
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating zone:", error)
      return NextResponse.json({ error: "Failed to create zone", details: error.message }, { status: 500 })
    }

    console.log("[v0] Zone created successfully:", zone.id)

    return NextResponse.json({ zone }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating zone:", error)
    return NextResponse.json(
      { error: "Failed to create zone", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
