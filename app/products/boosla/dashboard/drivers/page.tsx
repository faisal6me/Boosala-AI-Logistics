"use client"

import { useEffect, useState } from "react"
import { DashboardLayoutWithSidebar } from "@/components/dashboard-layout-with-sidebar"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search, User, Phone, Truck } from "lucide-react"
import { useRouter } from "next/navigation"

interface Driver {
  id: string
  name: string
  phone: string
  identity_type: string
  identity_number: string
  vehicle_brand: string
  vehicle_plate_numbers: string
  is_active: boolean
  created_at: string
}

export default function DriversPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const router = useRouter()
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchDrivers()
  }, [])

  const fetchDrivers = async () => {
    try {
      console.log("[v0] Fetching drivers")
      const response = await fetch("/api/drivers")
      const data = await response.json()

      if (data.drivers) {
        console.log("[v0] Drivers fetched:", data.drivers.length)
        setDrivers(data.drivers)
      }
    } catch (error) {
      console.error("[v0] Error fetching drivers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone?.includes(searchQuery) ||
      driver.identity_number?.includes(searchQuery),
  )

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
            <h2 className="text-2xl font-bold">{isRTL ? "السائقين" : "Drivers"}</h2>
            <p className="text-muted-foreground">
              {isRTL ? "إدارة السائقين ومناطق التوصيل" : "Manage drivers and delivery zones"}
            </p>
          </div>
          <Button onClick={() => router.push("/products/boosla/dashboard/drivers/add")} className="gap-2">
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة سائق" : "Add Driver"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {isRTL ? "جميع السائقين" : "All Drivers"}
                <Badge variant="secondary" className="ml-2">
                  {filteredDrivers.length}
                </Badge>
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? "بحث..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredDrivers.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <User className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-lg font-medium">{isRTL ? "لا يوجد سائقين" : "No drivers found"}</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? "ابدأ بإضافة سائق جديد" : "Start by adding a new driver"}
                </p>
                <Button onClick={() => router.push("/products/boosla/dashboard/drivers/add")} className="gap-2 mt-4">
                  <Plus className="w-4 h-4" />
                  {isRTL ? "إضافة سائق" : "Add Driver"}
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDrivers.map((driver) => (
                  <Card key={driver.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{driver.name}</h3>
                            <Badge variant={driver.is_active ? "default" : "secondary"} className="text-xs mt-1">
                              {driver.is_active ? (isRTL ? "نشط" : "Active") : isRTL ? "غير نشط" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{driver.phone}</span>
                        </div>
                        {driver.vehicle_brand && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Truck className="w-4 h-4" />
                            <span>{driver.vehicle_brand}</span>
                          </div>
                        )}
                        {driver.identity_type && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium">{driver.identity_type}:</span>
                            <span>{driver.identity_number}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          {isRTL ? "عرض التفاصيل" : "View Details"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutWithSidebar>
  )
}
