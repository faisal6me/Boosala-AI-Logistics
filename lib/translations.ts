export type Language = "en" | "ar"

export const translations = {
  // Common
  "common.save": {
    en: "Save",
    ar: "حفظ"
  },
  "common.cancel": {
    en: "Cancel", 
    ar: "إلغاء"
  },
  "common.delete": {
    en: "Delete",
    ar: "حذف"
  },
  "common.edit": {
    en: "Edit",
    ar: "تعديل"
  },
  "common.add": {
    en: "Add",
    ar: "إضافة"
  },
  "common.search": {
    en: "Search...",
    ar: "بحث..."
  },
  "common.loading": {
    en: "Loading...",
    ar: "جاري التحميل..."
  },
  "common.error": {
    en: "Error",
    ar: "خطأ"
  },
  "common.success": {
    en: "Success",
    ar: "نجح"
  },
  
  // Dashboard
  "dashboard.title": {
    en: "Dashboard",
    ar: "لوحة التحكم"
  },
  "dashboard.drivers": {
    en: "Drivers",
    ar: "السائقين"
  },
  "dashboard.zones": {
    en: "Zones", 
    ar: "المناطق"
  },
  "dashboard.warehouses": {
    en: "Warehouses",
    ar: "المستودعات"
  },
  
  // Drivers
  "drivers.title": {
    en: "Driver Management",
    ar: "إدارة السائقين"
  },
  "drivers.add": {
    en: "Add Driver",
    ar: "إضافة سائق"
  },
  "drivers.all": {
    en: "All Drivers",
    ar: "جميع السائقين"
  },
  "drivers.none": {
    en: "No drivers found",
    ar: "لا يوجد سائقين"
  },
  "drivers.start": {
    en: "Start by adding a new driver",
    ar: "ابدأ بإضافة سائق جديد"
  },
  "drivers.active": {
    en: "Active",
    ar: "نشط"
  },
  "drivers.inactive": {
    en: "Inactive",
    ar: "غير نشط"
  },
  "drivers.view_details": {
    en: "View Details",
    ar: "عرض التفاصيل"
  },
  
  // Zones
  "zones.title": {
    en: "Zone Management",
    ar: "إدارة المناطق"
  },
  "zones.delivery_zones": {
    en: "Delivery Zones",
    ar: "مناطق التوصيل"
  },
  "zones.create": {
    en: "Create New Zone",
    ar: "إنشاء منطقة جديدة"
  },
  "zones.edit": {
    en: "Edit Zone",
    ar: "تعديل المنطقة"
  },
  "zones.name": {
    en: "Zone Name",
    ar: "اسم المنطقة"
  },
  "zones.description": {
    en: "Description (optional)",
    ar: "الوصف (اختياري)"
  },
  "zones.color": {
    en: "Color",
    ar: "اللون"
  },
  "zones.assigned_drivers": {
    en: "Assigned Drivers",
    ar: "السائقين المعينين"
  },
  "zones.no_drivers": {
    en: "No drivers assigned",
    ar: "لا يوجد سائقين معينين"
  },
  "zones.assign_driver": {
    en: "Assign Driver",
    ar: "تعيين السائق"
  },
  "zones.select_driver": {
    en: "Select driver",
    ar: "اختر سائق"
  },
  
  // Warehouses
  "warehouses.title": {
    en: "Warehouse Management",
    ar: "إدارة المستودعات"
  },
  "warehouses.add": {
    en: "Add Warehouse",
    ar: "إضافة مستودع"
  },
  "warehouses.all": {
    en: "All Warehouses",
    ar: "جميع المستودعات"
  },
  "warehouses.none": {
    en: "No warehouses found",
    ar: "لا يوجد مستودعات"
  },
  "warehouses.start": {
    en: "Start by adding a new warehouse",
    ar: "ابدأ بإضافة مستودع جديد"
  },
  "warehouses.type": {
    en: "Warehouse Type",
    ar: "نوع المستودع"
  },
  "warehouses.assigned_zone": {
    en: "Assigned Zone",
    ar: "المنطقة المخصصة"
  },
  "warehouses.view_details": {
    en: "View Details",
    ar: "عرض التفاصيل"
  },
  "warehouses.standard": {
    en: "Standard",
    ar: "عادي"
  },
  "warehouses.pickup_point": {
    en: "Pickup Point",
    ar: "نقطة استلام"
  },
  "warehouses.distribution_center": {
    en: "Distribution Center",
    ar: "مركز توزيع"
  }
} as const
