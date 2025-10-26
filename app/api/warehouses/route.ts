import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching all warehouses")

    const supabase = createServiceClient()

    const { data: warehouses, error } = await supabase
      .from("warehouses")
      .select(`
        *,
        zones(
          id,
          name,
          color
        )
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching warehouses:", error)
      return NextResponse.json({ error: "Failed to fetch warehouses" }, { status: 500 })
    }

    console.log("[v0] Warehouses fetched successfully:", warehouses?.length || 0)

    return NextResponse.json({ warehouses: warehouses || [] })
  } catch (error) {
    console.error("[v0] Error fetching warehouses:", error)
    return NextResponse.json({ error: "Failed to fetch warehouses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating new warehouse")

    const body = await request.json()
    const {
      name,
      description,
      address,
      city,
      state,
      country,
      postal_code,
      latitude,
      longitude,
      phone,
      email,
      manager_name,
      manager_phone,
      working_hours,
      capacity,
      warehouse_type,
      features
    } = body

    console.log("[v0] Warehouse data:", { name, city })

    if (!name || !address || !city || !latitude || !longitude) {
      return NextResponse.json({ 
        error: "Name, address, city, latitude, and longitude are required" 
      }, { status: 400 })
    }

    const supabase = createServiceClient()

    const warehouseData = {
      user_id: "user-1", // TODO: Get from authenticated user
      name,
      description: description || null,
      address,
      city,
      state: state || null,
      country: country || 'Saudi Arabia',
      postal_code: postal_code || null,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      phone: phone || null,
      email: email || null,
      manager_name: manager_name || null,
      manager_phone: manager_phone || null,
      working_hours: working_hours || null,
      capacity: capacity || 100,
      warehouse_type: warehouse_type || 'standard',
      features: features || null,
      is_active: true,
    }

    // Create warehouse record
    const { data: warehouse, error: warehouseError } = await supabase
      .from("warehouses")
      .insert(warehouseData)
      .select()
      .single()

    if (warehouseError) {
      console.error("[v0] Error creating warehouse:", warehouseError)
      return NextResponse.json({ 
        error: "Failed to create warehouse", 
        details: warehouseError.message 
      }, { status: 500 })
    }

    console.log("[v0] Warehouse created successfully:", warehouse.id)

    return NextResponse.json({ warehouse }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating warehouse:", error)
    return NextResponse.json({ error: "Failed to create warehouse" }, { status: 500 })
  }
}
