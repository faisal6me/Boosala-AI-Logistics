import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/service"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching all drivers")

    const supabase = createServiceClient()

    const { data: drivers, error } = await supabase
      .from("drivers")
      .select(`
        *,
        zones:zone_drivers(
          zone_id,
          zones(
            id,
            name,
            color
          )
        )
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching drivers:", error)
      return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 })
    }

    console.log("[v0] Drivers fetched successfully:", drivers.length)

    return NextResponse.json({ drivers })
  } catch (error) {
    console.error("[v0] Error fetching drivers:", error)
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating new driver")

    const body = await request.json()
    const {
      name,
      phone,
      password,
      warehouse_id,
      zone_ids,
      identity_type,
      identity_number,
      version_release_number,
      vehicle_plate_type,
      operation_card_expiry_date,
      document_hijri_expiry_date,
      manufacturing_company,
      vehicle_brand,
      vehicle_plate_left_letter,
      vehicle_plate_middle_letter,
      vehicle_plate_right_letter,
      vehicle_plate_numbers,
    } = body

    console.log("[v0] Driver data:", { name, phone, zone_ids })

    const supabase = createServiceClient()

    const cleanWarehouseId = warehouse_id && !warehouse_id.startsWith("warehouse") ? warehouse_id : null

    const driverData = {
      user_id: "user-1", // TODO: Get from authenticated user
      name,
      phone,
      password,
      identity_type: identity_type || null,
      identity_number: identity_number || null,
      version_release_number: version_release_number || null,
      vehicle_plate_type: vehicle_plate_type || null,
      operation_card_expiry_date: operation_card_expiry_date || null,
      document_hijri_expiry_date: document_hijri_expiry_date || null,
      manufacturing_company: manufacturing_company || null,
      vehicle_brand: vehicle_brand || null,
      vehicle_plate_left_letter: vehicle_plate_left_letter || null,
      vehicle_plate_middle_letter: vehicle_plate_middle_letter || null,
      vehicle_plate_right_letter: vehicle_plate_right_letter || null,
      vehicle_plate_numbers: vehicle_plate_numbers || null,
      is_active: true,
    }

    // Create driver record
    const { data: driver, error: driverError } = await supabase.from("drivers").insert(driverData).select().single()

    if (driverError) {
      console.error("[v0] Error creating driver:", driverError)
      return NextResponse.json({ error: "Failed to create driver", details: driverError.message }, { status: 500 })
    }

    console.log("[v0] Driver created successfully:", driver.id)

    // Assign zones to driver if provided
    if (zone_ids && zone_ids.length > 0) {
      const zoneAssignments = zone_ids.map((zone_id: string) => ({
        driver_id: driver.id,
        zone_id,
      }))

      const { error: zoneError } = await supabase.from("zone_drivers").insert(zoneAssignments)

      if (zoneError) {
        console.error("[v0] Error assigning zones:", zoneError)
        // Don't fail the request, just log the error
      } else {
        console.log("[v0] Zones assigned successfully:", zone_ids.length)
      }
    }

    return NextResponse.json({ driver }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating driver:", error)
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 })
  }
}
