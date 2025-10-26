import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: zoneId } = params

    console.log("[v0] Fetching drivers for zone:", zoneId)

    const supabase = await createClient()

    const { data: drivers, error } = await supabase
      .from("zone_drivers")
      .select(
        `
        driver_id,
        drivers (
          id,
          name,
          phone
        )
      `,
      )
      .eq("zone_id", zoneId)

    if (error) {
      console.error("[v0] Error fetching zone drivers:", error)
      return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 })
    }

    console.log("[v0] Zone drivers fetched successfully:", drivers?.length || 0)

    return NextResponse.json({ drivers: drivers || [] })
  } catch (error) {
    console.error("[v0] Error fetching zone drivers:", error)
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: zoneId } = params
    const body = await request.json()
    const { driverId, driverIds } = body

    const idsToAssign = driverIds || (driverId ? [driverId] : [])

    console.log("[v0] Assigning drivers to zone:", { zoneId, count: idsToAssign.length })

    if (idsToAssign.length === 0) {
      return NextResponse.json({ error: "Driver ID(s) required" }, { status: 400 })
    }

    const supabase = await createClient()

    const assignments = idsToAssign.map((id: string) => ({
      zone_id: zoneId,
      driver_id: id,
    }))

    const { data, error } = await supabase.from("zone_drivers").insert(assignments).select()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ message: "One or more drivers already assigned to this zone" }, { status: 200 })
      }
      console.error("[v0] Error assigning drivers:", error)
      return NextResponse.json({ error: "Failed to assign drivers" }, { status: 500 })
    }

    console.log("[v0] Drivers assigned successfully")

    return NextResponse.json({ assignments: data }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error assigning drivers:", error)
    return NextResponse.json({ error: "Failed to assign drivers" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: zoneId } = params
    const { searchParams } = new URL(request.url)
    const driverId = searchParams.get("driverId")

    console.log("[v0] Removing driver from zone:", { zoneId, driverId })

    if (!driverId) {
      return NextResponse.json({ error: "Driver ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from("zone_drivers").delete().eq("zone_id", zoneId).eq("driver_id", driverId)

    if (error) {
      console.error("[v0] Error removing driver:", error)
      return NextResponse.json({ error: "Failed to remove driver" }, { status: 500 })
    }

    console.log("[v0] Driver removed successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error removing driver:", error)
    return NextResponse.json({ error: "Failed to remove driver" }, { status: 500 })
  }
}
