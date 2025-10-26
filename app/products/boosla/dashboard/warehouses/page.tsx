"use client"

import { useEffect, useState } from "react"
import { DashboardLayoutWithSidebar } from "@/components/dashboard-layout-with-sidebar"
import { useLanguage } from "@/hooks/use-language"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Search, Warehouse, MapPin, Phone, Users, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface Warehouse {
  id: string
  name: string
  description: string
  address: string
  city: string
  latitude: number
  longitude: number
  phone: string
  email: string
  manager_name: string
  manager_phone: string
  working_hours: any
  capacity: number
  current_load: number
  warehouse_type: string
  features: any
  is_active: boolean
  created_at: string
  zone_id?: string
  zones?: {
    id: string
    name: string
    color: string
  }
}

export default function WarehousesPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const router = useRouter()
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchWarehouses()
  }, [])

  const fetchWarehouses = async () => {
    try {
      console.log("[v0] Fetching warehouses")
      const response = await fetch("/api/warehouses")
      const data = await response.json()

      if (data.warehouses) {
        console.log("[v0] Warehouses fetched:", data.warehouses.length)
        setWarehouses(data.warehouses)
      }
    } catch (error) {
      console.error("[v0] Error fetching warehouses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warehouse.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warehouse.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warehouse.manager_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getWarehouseTypeLabel = (type: string) => {
    const types = {
      standard: isRTL ? "عادي" : "Standard",
      pickup_point: isRTL ? "نقطة استلام" : "Pickup Point",
      distribution_center: isRTL ? "مركز توزيع" : "Distribution Center"
    }
    return types[type as keyof typeof types] || type
  }

  const getWarehouseTypeColor = (type: string) => {
    const colors = {
      standard: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      pickup_point: "bg-green-500/10 text-green-500 border-green-500/20",
      distribution_center: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    }
    return colors[type as keyof typeof colors] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
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
            <h2 className="text-2xl font-bold">{isRTL ? "المستودعات" : "Warehouses"}</h2>
            <p className="text-muted-foreground">
              {isRTL ? "إدارة المستودعات ونقاط الاستلام" : "Manage warehouses and pickup points"}
            </p>
          </div>
          <Button onClick={() => router.push("/products/boosla/dashboard/warehouses/add")} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة مستودع" : "Add Warehouse"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="w-5 h-5" />
                {isRTL ? "جميع المستودعات" : "All Warehouses"}
                <Badge variant="secondary" className="ml-2">
                  {filteredWarehouses.length}
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
            {filteredWarehouses.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Warehouse className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-lg font-medium">{isRTL ? "لا يوجد مستودعات" : "No warehouses found"}</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? "ابدأ بإضافة مستودع جديد" : "Start by adding a new warehouse"}
                </p>
                <Button onClick={() => router.push("/products/boosla/dashboard/warehouses/add")} className="gap-2 mt-4 bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  {isRTL ? "إضافة مستودع" : "Add Warehouse"}
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredWarehouses.map((warehouse) => (
                  <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Warehouse className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                            <Badge 
                              variant={warehouse.is_active ? "default" : "secondary"} 
                              className={`text-xs mt-1 ${getWarehouseTypeColor(warehouse.warehouse_type)}`}
                            >
                              {getWarehouseTypeLabel(warehouse.warehouse_type)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{warehouse.address}, {warehouse.city}</span>
                        </div>
                        
                        {warehouse.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{warehouse.phone}</span>
                          </div>
                        )}

                        {warehouse.manager_name && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{warehouse.manager_name}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{warehouse.current_load}/{warehouse.capacity} {isRTL ? "طلب" : "orders"}</span>
                        </div>
                      </div>

                      {/* Warehouse Type and Zone */}
                      <div className="pt-2 border-t space-y-2">
                        <div>
                          <p className="text-sm font-medium mb-1">{isRTL ? "نوع المستودع:" : "Warehouse Type:"}</p>
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                          >
                            {getWarehouseTypeLabel(warehouse.warehouse_type)}
                          </Badge>
                        </div>
                        
                        {warehouse.zones && (
                          <div>
                            <p className="text-sm font-medium mb-1">{isRTL ? "المنطقة المخصصة:" : "Assigned Zone:"}</p>
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              style={{ 
                                borderColor: warehouse.zones.color, 
                                color: warehouse.zones.color 
                              }}
                            >
                              {warehouse.zones.name}
                            </Badge>
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
