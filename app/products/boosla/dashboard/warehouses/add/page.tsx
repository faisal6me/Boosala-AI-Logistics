"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ArrowLeft } from "lucide-react"

export default function AddWarehousePage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [assignedZone, setAssignedZone] = useState<{name: string, color: string} | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "Saudi Arabia",
    postal_code: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    manager_name: "",
    manager_phone: "",
    capacity: 100,
    warehouse_type: "standard"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-detect zone when coordinates are entered
    if ((field === 'latitude' || field === 'longitude') && 
        formData.latitude && formData.longitude) {
      findZoneByCoordinates()
    }
  }

  const findZoneByCoordinates = async () => {
    if (!formData.latitude || !formData.longitude) return
    
    try {
      const response = await fetch('/api/zones')
      const data = await response.json()
      
      if (data.zones && data.zones.length > 0) {
        // Simple distance calculation to find closest zone
        let closestZone = null
        let minDistance = Infinity
        
        data.zones.forEach((zone: any) => {
          if (zone.geometry && zone.geometry.coordinates) {
            // Calculate distance (simplified)
            const zoneLat = zone.geometry.coordinates[1]
            const zoneLng = zone.geometry.coordinates[0]
            const distance = Math.sqrt(
              Math.pow(parseFloat(formData.latitude) - zoneLat, 2) + 
              Math.pow(parseFloat(formData.longitude) - zoneLng, 2)
            )
            
            if (distance < minDistance) {
              minDistance = distance
              closestZone = zone
            }
          }
        })
        
        if (closestZone) {
          setAssignedZone({
            name: closestZone.name,
            color: closestZone.color || '#3b82f6'
          })
        }
      }
    } catch (error) {
      console.error('Error finding zone:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("[v0] Creating warehouse:", formData)

      const response = await fetch("/api/warehouses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Warehouse created successfully:", data.warehouse)
        router.push("/products/boosla/dashboard/warehouses")
      } else {
        console.error("[v0] Error creating warehouse:", data.error)
        alert(isRTL ? "خطأ في إنشاء المستودع" : "Error creating warehouse: " + data.error)
      }
    } catch (error) {
      console.error("[v0] Error creating warehouse:", error)
      alert(isRTL ? "خطأ في إنشاء المستودع" : "Error creating warehouse")
    } finally {
      setLoading(false)
    }
  }

  const warehouseTypes = [
    { value: "standard", label: isRTL ? "عادي" : "Standard" },
    { value: "pickup_point", label: isRTL ? "نقطة استلام" : "Pickup Point" },
    { value: "distribution_center", label: isRTL ? "مركز توزيع" : "Distribution Center" }
  ]

  return (
    <div className="min-h-screen bg-slate-950 p-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? "العودة" : "Back"}
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {isRTL ? "إضافة مستودع جديد" : "Add New Warehouse"}
          </h1>
          <p className="text-gray-400 mt-2">
            {isRTL ? "أدخل تفاصيل المستودع الجديد" : "Enter details for the new warehouse"}
          </p>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">
              {isRTL ? "معلومات المستودع" : "Warehouse Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    {isRTL ? "اسم المستودع" : "Warehouse Name"} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={isRTL ? "مستودع الرياض الرئيسي" : "Riyadh Main Warehouse"}
                    required
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warehouse_type" className="text-white">
                    {isRTL ? "نوع المستودع" : "Warehouse Type"}
                  </Label>
                  <Select 
                    value={formData.warehouse_type} 
                    onValueChange={(value) => handleInputChange("warehouse_type", value)}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouseTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  {isRTL ? "الوصف" : "Description"}
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder={isRTL ? "وصف المستودع..." : "Warehouse description..."}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={3}
                />
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {isRTL ? "معلومات العنوان" : "Address Information"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      {isRTL ? "العنوان" : "Address"} *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder={isRTL ? "طريق الملك فهد، الرياض" : "King Fahd Road, Riyadh"}
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">
                      {isRTL ? "المدينة" : "City"} *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder={isRTL ? "الرياض" : "Riyadh"}
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">
                      {isRTL ? "المنطقة" : "State"}
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder={isRTL ? "منطقة الرياض" : "Riyadh Region"}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postal_code" className="text-white">
                      {isRTL ? "الرمز البريدي" : "Postal Code"}
                    </Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => handleInputChange("postal_code", e.target.value)}
                      placeholder="12345"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Location Coordinates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {isRTL ? "الإحداثيات" : "Coordinates"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude" className="text-white">
                      {isRTL ? "خط العرض" : "Latitude"} *
                    </Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange("latitude", e.target.value)}
                      placeholder="24.7136"
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude" className="text-white">
                      {isRTL ? "خط الطول" : "Longitude"} *
                    </Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange("longitude", e.target.value)}
                      placeholder="46.6753"
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
                
                {/* Assigned Zone Display */}
                {assignedZone && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: assignedZone.color }}
                      ></div>
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        {isRTL ? "المنطقة المخصصة:" : "Assigned Zone:"} {assignedZone.name}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      {isRTL ? "سيتم تعيين هذا المستودع تلقائياً إلى أقرب منطقة" : "This warehouse will be automatically assigned to the closest zone"}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {isRTL ? "معلومات الاتصال" : "Contact Information"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      {isRTL ? "رقم الهاتف" : "Phone"}
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+966112345678"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      {isRTL ? "البريد الإلكتروني" : "Email"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="warehouse@boosla.com"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manager_name" className="text-white">
                      {isRTL ? "اسم المدير" : "Manager Name"}
                    </Label>
                    <Input
                      id="manager_name"
                      value={formData.manager_name}
                      onChange={(e) => handleInputChange("manager_name", e.target.value)}
                      placeholder={isRTL ? "أحمد السعيد" : "Ahmed Al-Saeed"}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manager_phone" className="text-white">
                      {isRTL ? "هاتف المدير" : "Manager Phone"}
                    </Label>
                    <Input
                      id="manager_phone"
                      value={formData.manager_phone}
                      onChange={(e) => handleInputChange("manager_phone", e.target.value)}
                      placeholder="+966501234567"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-white">
                  {isRTL ? "السعة اليومية" : "Daily Capacity"}
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", e.target.value)}
                  placeholder="100"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {loading 
                    ? (isRTL ? "جاري الحفظ..." : "Saving...") 
                    : (isRTL ? "حفظ المستودع" : "Save Warehouse")
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
