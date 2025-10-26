import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    console.log("[v0] Fetching zone:", id)

    const supabase = await createClient()

    const { data: zone, error } = await supabase
      .from("zones")
      .select(`
        *,
        zone_drivers (
          driver_id,
          users (
            name,
            email
          )
        )
      `)
      .eq("id", id)
      .single()

    if (error || !zone) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 })
    }

    const transformedZone = {
      ...zone,
      assigned_drivers:
        zone.zone_drivers?.map((zd: any) => ({
          driver_id: zd.driver_id,
          driver_name: zd.users?.name,
          driver_email: zd.users?.email,
        })) || [],
    }

    return NextResponse.json({ zone: transformedZone })
  } catch (error) {
    console.error("[v0] Error fetching zone:", error)
    return NextResponse.json({ error: "Failed to fetch zone" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, polygon, color, isActive } = body

    console.log("[v0] Updating zone:", id)

    const supabase = await createClient()

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (polygon !== undefined) updateData.polygon = polygon
    if (color !== undefined) updateData.color = color
    if (isActive !== undefined) updateData.is_active = isActive

    const { data: zone, error } = await supabase.from("zones").update(updateData).eq("id", id).select().single()

    if (error || !zone) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 })
    }

    console.log("[v0] Zone updated successfully")

    return NextResponse.json({ zone })
  } catch (error) {
    console.error("[v0] Error updating zone:", error)
    return NextResponse.json({ error: "Failed to update zone" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    console.log("[v0] Deleting zone:", id)

    const supabase = await createClient()

    const { error } = await supabase.from("zones").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting zone:", error)
      return NextResponse.json({ error: "Failed to delete zone" }, { status: 500 })
    }

    console.log("[v0] Zone deleted successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting zone:", error)
    return NextResponse.json({ error: "Failed to delete zone" }, { status: 500 })
  }
}
