"use client"

import { useEffect, useState } from "react"
import { DashboardLayoutWithSidebar } from "@/components/dashboard-layout-with-sidebar"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MapPin, Plus, Edit, Trash2, Loader2, Save, Users } from "lucide-react"
import dynamic from "next/dynamic"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const ZoneMapComponent = dynamic(() => import("@/components/zones/zone-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-muted rounded-lg">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
})

interface Zone {
  id: string
  user_id: string
  name: string
  description: string
  geometry: any
  color: string
  is_active: boolean
  created_at: string
}

interface Driver {
  id: string
  name: string
  email: string
  phone?: string
}

interface ZoneDriver {
  driver_id: string
  users: Driver
}

export default function ZonesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const { toast } = useToast()
  const [zones, setZones] = useState<Zone[]>([])
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [drawnGeometry, setDrawnGeometry] = useState<any>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDriverDialog, setShowDriverDialog] = useState(false)
  const [zoneName, setZoneName] = useState("")
  const [zoneDescription, setZoneDescription] = useState("")
  const [zoneColor, setZoneColor] = useState("#3B82F6")
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([])
  const [zoneDrivers, setZoneDrivers] = useState<ZoneDriver[]>([])
  const [selectedDriverId, setSelectedDriverId] = useState<string>("")

  useEffect(() => {
    fetchZones()
    fetchDrivers()
  }, [])

  const fetchZones = async () => {
    try {
      console.log("[v0] ===== CLIENT: Fetching zones =====")
      const response = await fetch("/api/zones")
      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Error response:", errorText)
        throw new Error(`Failed to fetch zones: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("[v0] Response data:", JSON.stringify(data, null, 2))
      console.log("[v0] Zones in response:", data.zones?.length || 0)

      if (data.zones) {
        console.log("[v0] Setting zones state with:", data.zones.length, "zones")
        setZones(data.zones)

        // Show success toast if zones were loaded
        if (data.zones.length > 0) {
          toast({
            title: isRTL ? "تم تحميل المناطق" : "Zones loaded",
            description: isRTL ? `تم تحميل ${data.zones.length} منطقة` : `Loaded ${data.zones.length} zones`,
          })
        } else {
          console.log("[v0] No zones found in database")
          toast({
            title: isRTL ? "لا توجد مناطق" : "No zones",
            description: isRTL ? "لم يتم العثور على مناطق في قاعدة البيانات" : "No zones found in database",
            variant: "default",
          })
        }
      }
      console.log("[v0] ===== CLIENT: End fetching zones =====")
    } catch (error) {
      console.error("[v0] Error fetching zones:", error)
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل في تحميل المناطق" : "Failed to load zones",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchDrivers = async () => {
    try {
      const response = await fetch("/api/users?role=driver")
      const data = await response.json()
      if (data.users) {
        setAvailableDrivers(data.users)
      }
    } catch (error) {
      console.error("[v0] Error fetching drivers:", error)
    }
  }

  const fetchZoneDrivers = async (zoneId: string) => {
    try {
      const response = await fetch(`/api/zones/${zoneId}/drivers`)
      const data = await response.json()
      if (data.drivers) {
        setZoneDrivers(data.drivers)
      }
    } catch (error) {
      console.error("[v0] Error fetching zone drivers:", error)
    }
  }

  const handlePolygonCreated = (geometry: any) => {
    console.log("[v0] Polygon created, opening dialog:", geometry)
    setDrawnGeometry(geometry)
    setTimeout(() => {
      setShowCreateDialog(true)
    }, 100)
  }

  const handlePolygonUpdated = (zoneId: string, geometry: any) => {
    console.log("[v0] Polygon updated:", geometry)
    updateZoneGeometry(zoneId, geometry)
  }

  const updateZoneGeometry = async (zoneId: string, geometry: any) => {
    try {
      await fetch(`/api/zones/${zoneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ geometry }),
      })
      console.log("[v0] Zone geometry updated")
      fetchZones()
    } catch (error) {
      console.error("[v0] Error updating geometry:", error)
    }
  }

  const handleCreateZone = async () => {
    if (!zoneName || !drawnGeometry) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "الرجاء إدخال اسم المنطقة" : "Please enter zone name",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch("/api/zones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name: zoneName,
          description: zoneDescription,
          geometry: drawnGeometry,
          color: zoneColor,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Zone created successfully:", data.zone)

        toast({
          title: isRTL ? "تم الإنشاء" : "Created",
          description: isRTL ? `تم إنشاء منطقة ${zoneName} بنجاح` : `Zone ${zoneName} created successfully`,
        })

        setShowCreateDialog(false)
        resetForm()
        await fetchZones()
      } else {
        const error = await response.json()
        console.error("[v0] Zone creation failed:", error)
        toast({
          title: isRTL ? "فشل في إنشاء المنطقة" : "Failed to create zone",
          description: error.details || error.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error creating zone:", error)
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "حدث خطأ أثناء إنشاء المنطقة" : "An error occurred while creating the zone",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateZone = async () => {
    if (!selectedZone || !zoneName) return

    setSaving(true)
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/zones/${selectedZone.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name: zoneName,
          description: zoneDescription,
          color: zoneColor,
        }),
      })

      if (response.ok) {
        console.log("[v0] Zone updated successfully")
        setShowEditDialog(false)
        resetForm()
        fetchZones()
      } else {
        alert(isRTL ? "فشل في تحديث المنطقة" : "Failed to update zone")
      }
    } catch (error) {
      console.error("[v0] Error updating zone:", error)
      alert(isRTL ? "حدث خطأ" : "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteZone = async () => {
    if (!selectedZone) return

    setSaving(true)
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/zones/${selectedZone.id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (response.ok) {
        console.log("[v0] Zone deleted successfully")
        setShowDeleteDialog(false)
        setSelectedZone(null)
        fetchZones()
      } else {
        alert(isRTL ? "فشل في حذف المنطقة" : "Failed to delete zone")
      }
    } catch (error) {
      console.error("[v0] Error deleting zone:", error)
      alert(isRTL ? "حدث خطأ" : "An error occurred")
    } finally {
      setSaving(false)
    }
  }

  const openEditDialog = (zone: Zone) => {
    setSelectedZone(zone)
    setZoneName(zone.name)
    setZoneDescription(zone.description || "")
    setZoneColor(zone.color)
    setShowEditDialog(true)
  }

  const openDeleteDialog = (zone: Zone) => {
    setSelectedZone(zone)
    setShowDeleteDialog(true)
  }

  const openDriverDialog = async (zone: Zone) => {
    setSelectedZone(zone)
    await fetchZoneDrivers(zone.id)
    setShowDriverDialog(true)
  }

  const handleAssignDriver = async () => {
    if (!selectedZone || !selectedDriverId) return

    setSaving(true)
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/zones/${selectedZone.id}/drivers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
        body: JSON.stringify({ driverIds: [selectedDriverId] }),
      })

      if (response.ok) {
        await fetchZoneDrivers(selectedZone.id)
        setSelectedDriverId("")
      } else {
        alert(isRTL ? "فشل في تعيين السائق" : "Failed to assign driver")
      }
    } catch (error) {
      console.error("[v0] Error assigning driver:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveDriver = async (driverId: string) => {
    if (!selectedZone) return

    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/zones/${selectedZone.id}/drivers?driverId=${driverId}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (response.ok) {
        await fetchZoneDrivers(selectedZone.id)
      } else {
        alert(isRTL ? "فشل في إزالة السائق" : "Failed to remove driver")
      }
    } catch (error) {
      console.error("[v0] Error removing driver:", error)
    }
  }

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone)
  }

  const resetForm = () => {
    setZoneName("")
    setZoneDescription("")
    setZoneColor("#3B82F6")
    setDrawnGeometry(null)
  }

  if (loading) {
    return (
      <DashboardLayoutWithSidebar>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayoutWithSidebar>
    )
  }

  return (
    <DashboardLayoutWithSidebar>
      <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{isRTL ? "مناطق التوصيل" : "Delivery Zones"}</h2>
            <p className="text-muted-foreground">
              {isRTL ? "ارسم وأدر مناطق التوصيل على الخريطة" : "Draw and manage delivery zones on the map"}
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {zones.length} {isRTL ? "منطقة" : zones.length === 1 ? "Zone" : "Zones"}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <ZoneMapComponent
                  zones={zones}
                  selectedZone={selectedZone}
                  onPolygonCreated={handlePolygonCreated}
                  onPolygonUpdated={handlePolygonUpdated}
                  onZoneClick={handleZoneClick}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {isRTL ? "المناطق المتاحة" : "Available Zones"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {zones.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      {isRTL
                        ? "لا توجد مناطق بعد. انقر على 'Draw Zone' لإنشاء منطقة جديدة"
                        : "No zones yet. Click 'Draw Zone' to create one"}
                    </p>
                  </div>
                ) : (
                  zones.map((zone) => (
                    <div
                      key={zone.id}
                      onClick={() => handleZoneClick(zone)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedZone?.id === zone.id ? "border-primary bg-primary/5 shadow-sm" : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: zone.color }}
                          />
                          <h4 className="font-semibold">{zone.name}</h4>
                        </div>
                        <Badge variant={zone.is_active ? "default" : "secondary"} className="text-xs">
                          {zone.is_active ? (isRTL ? "نشط" : "Active") : isRTL ? "غير نشط" : "Inactive"}
                        </Badge>
                      </div>
                      {zone.description && <p className="text-sm text-muted-foreground mb-2">{zone.description}</p>}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {selectedZone && (
              <Card className="border-primary/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{isRTL ? "تفاصيل المنطقة" : "Zone Details"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedZone.color }} />
                      <h4 className="font-semibold text-lg">{selectedZone.name}</h4>
                    </div>
                    {selectedZone.description && (
                      <p className="text-sm text-muted-foreground">{selectedZone.description}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-1 bg-transparent"
                      onClick={() => openDriverDialog(selectedZone)}
                    >
                      <Users className="w-4 h-4" />
                      {isRTL ? "السائقين" : "Drivers"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 flex-1 bg-transparent"
                      onClick={() => openEditDialog(selectedZone)}
                    >
                      <Edit className="w-4 h-4" />
                      {isRTL ? "تعديل" : "Edit"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      onClick={() => openDeleteDialog(selectedZone)}
                    >
                      <Trash2 className="w-4 h-4" />
                      {isRTL ? "حذف" : "Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>{isRTL ? "إنشاء منطقة جديدة" : "Create New Zone"}</DialogTitle>
            <DialogDescription>
              {isRTL ? "أدخل تفاصيل المنطقة التي رسمتها" : "Enter details for the zone you drew"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{isRTL ? "اسم المنطقة" : "Zone Name"}</Label>
              <Input
                id="name"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                placeholder={isRTL ? "مثال: شمال الرياض" : "e.g., North Riyadh"}
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="description">{isRTL ? "الوصف (اختياري)" : "Description (optional)"}</Label>
              <Textarea
                id="description"
                value={zoneDescription}
                onChange={(e) => setZoneDescription(e.target.value)}
                placeholder={isRTL ? "وصف المنطقة..." : "Zone description..."}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="color">{isRTL ? "اللون" : "Color"}</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={zoneColor}
                  onChange={(e) => setZoneColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input value={zoneColor} onChange={(e) => setZoneColor(e.target.value)} className="flex-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false)
                resetForm()
              }}
            >
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleCreateZone} disabled={saving || !zoneName}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {isRTL ? "حفظ المنطقة" : "Save Zone"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>{isRTL ? "تعديل المنطقة" : "Edit Zone"}</DialogTitle>
            <DialogDescription>{isRTL ? "تحديث تفاصيل المنطقة" : "Update zone details"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">{isRTL ? "اسم المنطقة" : "Zone Name"}</Label>
              <Input id="edit-name" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="edit-description">{isRTL ? "الوصف (اختياري)" : "Description (optional)"}</Label>
              <Textarea
                id="edit-description"
                value={zoneDescription}
                onChange={(e) => setZoneDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="edit-color">{isRTL ? "اللون" : "Color"}</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-color"
                  type="color"
                  value={zoneColor}
                  onChange={(e) => setZoneColor(e.target.value)}
                  className="w-20 h-10"
                />
                <Input value={zoneColor} onChange={(e) => setZoneColor(e.target.value)} className="flex-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleUpdateZone} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {isRTL ? "حفظ" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>{isRTL ? "هل أنت متأكد؟" : "Are you sure?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isRTL
                ? "سيتم حذف المنطقة نهائياً. لا يمكن التراجع عن هذا الإجراء."
                : "This will permanently delete the zone. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isRTL ? "إلغاء" : "Cancel"}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteZone} className="bg-destructive">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : isRTL ? "حذف" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showDriverDialog} onOpenChange={setShowDriverDialog}>
        <DialogContent className="max-w-md z-[9999]">
          <DialogHeader>
            <DialogTitle>{isRTL ? "إدارة السائقين" : "Manage Drivers"}</DialogTitle>
            <DialogDescription>
              {isRTL ? "تعيين السائقين لهذه المنطقة" : "Assign drivers to this zone"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Select value={selectedDriverId} onValueChange={setSelectedDriverId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={isRTL ? "اختر سائق" : "Select driver"} />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers
                    .filter((driver) => !zoneDrivers.some((zd) => zd.driver_id === driver.id))
                    .map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} ({driver.email})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAssignDriver} disabled={!selectedDriverId || saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {isRTL ? "تعيين السائق" : "Assign Driver"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label>{isRTL ? "السائقين المعينين" : "Assigned Drivers"}</Label>
              {zoneDrivers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {isRTL ? "لا يوجد سائقين معينين" : "No drivers assigned"}
                </p>
              ) : (
                <div className="space-y-2">
                  {zoneDrivers.map((zd) => (
                    <div key={zd.driver_id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{zd.users.name}</p>
                        <p className="text-sm text-muted-foreground">{zd.users.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDriver(zd.driver_id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDriverDialog(false)}>
              {isRTL ? "إغلاق" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayoutWithSidebar>
  )
}
