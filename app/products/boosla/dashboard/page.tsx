"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Wallet,
  TrendingUp,
  Users,
  Warehouse,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  BarChart3,
  Activity,
  Truck,
  Settings,
} from "lucide-react"
import { DashboardLayoutWithSidebar } from "@/components/dashboard-layout-with-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

interface User {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  role: string
}

type ExpandedCard = 'orders' | 'drivers' | 'warehouses' | 'zones' | 'integrations' | 'settings' | null

// Sample data for charts
const ordersData = [
  { name: 'يناير', orders: 45, revenue: 12000 },
  { name: 'فبراير', orders: 52, revenue: 15000 },
  { name: 'مارس', orders: 48, revenue: 13500 },
  { name: 'أبريل', orders: 61, revenue: 18000 },
  { name: 'مايو', orders: 55, revenue: 16500 },
  { name: 'يونيو', orders: 67, revenue: 19500 },
]

const driversData = [
  { name: 'أحمد محمد', deliveries: 45, rating: 4.8, status: 'نشط' },
  { name: 'فاطمة علي', deliveries: 38, rating: 4.9, status: 'نشط' },
  { name: 'سعد الخالدي', deliveries: 42, rating: 4.7, status: 'نشط' },
  { name: 'نورا أحمد', deliveries: 35, rating: 4.6, status: 'متوقف' },
]

const warehouseData = [
  { name: 'المستودع الرئيسي', capacity: 85, utilization: 75 },
  { name: 'مستودع الشمال', capacity: 60, utilization: 45 },
  { name: 'مستودع الجنوب', capacity: 40, utilization: 30 },
]

const zoneData = [
  { name: 'المنطقة الشمالية', coverage: 95, orders: 120 },
  { name: 'المنطقة الجنوبية', coverage: 88, orders: 95 },
  { name: 'المنطقة الشرقية', coverage: 92, orders: 110 },
  { name: 'المنطقة الغربية', coverage: 78, orders: 85 },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      console.log("[v0] Checking auth with token from localStorage:", token ? "Token found" : "No token")

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })

      console.log("[v0] Auth check response status:", response.status)

      if (!response.ok) {
        throw new Error("Not authenticated")
      }

      const data = await response.json()
      console.log("[v0] User authenticated:", data.user.email)
      setUser(data.user)
    } catch (error) {
      console.log("[v0] Auth check failed, redirecting to login")
      // Redirect to login if not authenticated
      router.push("/products/boosla/login")
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = (cardType: ExpandedCard) => {
    setExpandedCard(expandedCard === cardType ? null : cardType)
  }

  const closeExpandedCard = () => {
    setExpandedCard(null)
  }

  const toggleRightPanel = () => {
    setRightPanelCollapsed(!rightPanelCollapsed)
    if (!rightPanelCollapsed) {
      setExpandedCard(null) // Close any expanded card when collapsing panel
    }
  }

  // Detailed view components
  const OrdersDetailView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">تفاصيل الطلبات</h3>
        <button
          onClick={closeExpandedCard}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">إحصائيات الطلبات</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-300">إجمالي الطلبات</span>
              <span className="text-white font-semibold">248</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-300">طلبات اليوم</span>
              <span className="text-green-400 font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50">
              <span className="text-slate-300">متوسط القيمة</span>
              <span className="text-blue-400 font-semibold">450 ريال</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">اتجاه الطلبات</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const DriversDetailView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">تفاصيل السائقين</h3>
        <button
          onClick={closeExpandedCard}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">قائمة السائقين</h4>
          <div className="space-y-3">
            {driversData.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Truck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{driver.name}</p>
                    <p className="text-sm text-slate-400">{driver.deliveries} توصيل</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-semibold">⭐ {driver.rating}</p>
                  <p className={`text-xs ${driver.status === 'نشط' ? 'text-green-400' : 'text-red-400'}`}>
                    {driver.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">أداء السائقين</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={driversData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="deliveries" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const WarehousesDetailView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">تفاصيل المستودعات</h3>
        <button
          onClick={closeExpandedCard}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">حالة المستودعات</h4>
          <div className="space-y-3">
            {warehouseData.map((warehouse, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-white font-medium">{warehouse.name}</h5>
                  <span className="text-cyan-400 font-semibold">{warehouse.utilization}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${warehouse.utilization}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400 mt-1">السعة: {warehouse.capacity}%</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">استخدام المستودعات</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={warehouseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="utilization"
                >
                  {warehouseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#06B6D4', '#0891B2', '#0E7490'][index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const ZonesDetailView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">تفاصيل المناطق</h3>
        <button
          onClick={closeExpandedCard}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">تغطية المناطق</h4>
          <div className="space-y-3">
            {zoneData.map((zone, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-white font-medium">{zone.name}</h5>
                  <span className="text-pink-400 font-semibold">{zone.coverage}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-pink-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${zone.coverage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-400 mt-1">{zone.orders} طلب</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">توزيع الطلبات</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="orders" fill="#EC4899" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-400">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayoutWithSidebar>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">مرحباً، {user.name}! 👋</h1>
          <p className="text-slate-400">إليك نظرة عامة على أعمالك اليوم</p>
        </div>

        {/* Main Stats Grid - Fixed Layout with Proper Containment */}
        <div className="w-full">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ${
            rightPanelCollapsed ? 'lg:grid-cols-1' : expandedCard ? 'lg:grid-cols-12' : 'lg:grid-cols-12'
          }`}>
            {/* Left Column - Key Metrics */}
            <div className={`space-y-6 transition-all duration-500 ${
              rightPanelCollapsed 
                ? 'md:col-span-2 lg:col-span-1' 
                : expandedCard 
                  ? 'md:col-span-2 lg:col-span-4' 
                  : 'md:col-span-2 lg:col-span-7'
            }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-slate-800 bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300">إجمالي الطلبات</CardTitle>
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">248</div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-medium">+12%</span>
                    <span className="text-xs text-slate-500">عن الشهر الماضي</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-gradient-to-br from-green-500/10 to-green-600/20 backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/10 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300">رصيد المحفظة</CardTitle>
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Wallet className="w-5 h-5 text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">12,450 ريال</div>
                  <p className="text-sm text-slate-400">متاح للسحب فوراً</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-slate-800 bg-gradient-to-br from-purple-500/10 to-purple-600/20 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300">السائقين النشطين</CardTitle>
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">8 / 12</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                    <span className="text-sm text-slate-400">66%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm font-medium text-slate-300">المستودعات</CardTitle>
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Warehouse className="w-5 h-5 text-cyan-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    جميعها نشطة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

            {/* Right Column - Interactive Control Panel */}
            {!rightPanelCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`space-y-6 transition-all duration-500 ${
                  expandedCard ? 'md:col-span-2 lg:col-span-8' : 'md:col-span-2 lg:col-span-5'
                }`}
              >
            {/* Control Panel with Interactive Cards */}
            <Card className="border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    لوحة التحكم التفاعلية
                  </CardTitle>
                  <button
                    onClick={toggleRightPanel}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                    title="إخفاء/إظهار اللوحة"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Interactive Cards Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'orders' 
                        ? 'bg-blue-500/20 border border-blue-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('orders')}
                  >
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Package className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">الطلبات</p>
                      <p className="text-xs text-slate-400">8 جديدة اليوم</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'drivers' 
                        ? 'bg-purple-500/20 border border-purple-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('drivers')}
                  >
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">السائقين</p>
                      <p className="text-xs text-slate-400">8 نشطين</p>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Cards Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'warehouses' 
                        ? 'bg-cyan-500/20 border border-cyan-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('warehouses')}
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Warehouse className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">المستودعات</p>
                      <p className="text-xs text-slate-400">3 نشطة</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'zones' 
                        ? 'bg-pink-500/20 border border-pink-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('zones')}
                  >
                    <div className="p-2 rounded-lg bg-pink-500/20">
                      <MapPin className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">المناطق</p>
                      <p className="text-xs text-slate-400">15 منطقة</p>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive Cards Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'integrations' 
                        ? 'bg-emerald-500/20 border border-emerald-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('integrations')}
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">التكاملات</p>
                      <p className="text-xs text-slate-400">2 نشطة</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      expandedCard === 'settings' 
                        ? 'bg-orange-500/20 border border-orange-500/30' 
                        : 'bg-slate-800/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleCardClick('settings')}
                  >
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Settings className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">الإعدادات</p>
                      <p className="text-xs text-slate-400">تخصيص النظام</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Expanded Detail View */}
            <AnimatePresence>
              {expandedCard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <Card className="border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      {expandedCard === 'orders' && <OrdersDetailView />}
                      {expandedCard === 'drivers' && <DriversDetailView />}
                      {expandedCard === 'warehouses' && <WarehousesDetailView />}
                      {expandedCard === 'zones' && <ZonesDetailView />}
                      {expandedCard === 'integrations' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">التكاملات</h3>
                            <button
                              onClick={closeExpandedCard}
                              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                            >
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                          <div className="text-center py-8">
                            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-white mb-2">التكاملات النشطة</h4>
                            <p className="text-slate-400">2 تكامل نشط: زد، واتساب</p>
                          </div>
                        </motion.div>
                      )}
                      {expandedCard === 'settings' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">الإعدادات</h3>
                            <button
                              onClick={closeExpandedCard}
                              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                            >
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                          <div className="text-center py-8">
                            <Settings className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-white mb-2">إعدادات النظام</h4>
                            <p className="text-slate-400">تخصيص إعدادات بوصلة</p>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
              </motion.div>
            )}
            
            {/* Collapsed Panel Toggle Button */}
            {rightPanelCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50"
              >
                <button
                  onClick={toggleRightPanel}
                  className="p-3 rounded-full bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                  title="إظهار لوحة التحكم"
                >
                  <Package className="w-5 h-5 text-white" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Recent Orders - Enhanced */}
        <Card className="border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Package className="w-5 h-5 text-blue-400" />
                </div>
                الطلبات الأخيرة
              </CardTitle>
              <button className="text-sm text-primary hover:text-primary/80 font-medium">
                عرض الكل →
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "#ORD-001", customer: "محمد أحمد", status: "delivered", amount: "450 ريال", time: "منذ 2 ساعة" },
                { id: "#ORD-002", customer: "فاطمة علي", status: "in_transit", amount: "320 ريال", time: "منذ 4 ساعات" },
                { id: "#ORD-003", customer: "سارة خالد", status: "pending", amount: "680 ريال", time: "منذ 6 ساعات" },
                { id: "#ORD-004", customer: "عبدالله محمود", status: "delivered", amount: "290 ريال", time: "منذ 8 ساعات" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors">
                      <Package className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-primary transition-colors">{order.id}</p>
                      <p className="text-sm text-slate-400">{order.customer}</p>
                      <p className="text-xs text-slate-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-bold text-white text-lg">{order.amount}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {order.status === "delivered" && (
                          <>
                            <div className="p-1 rounded-full bg-green-500/20">
                              <CheckCircle2 className="w-3 h-3 text-green-400" />
                            </div>
                            <span className="text-xs text-green-400 font-medium">تم التوصيل</span>
                          </>
                        )}
                        {order.status === "in_transit" && (
                          <>
                            <div className="p-1 rounded-full bg-blue-500/20">
                              <Clock className="w-3 h-3 text-blue-400" />
                            </div>
                            <span className="text-xs text-blue-400 font-medium">قيد التوصيل</span>
                          </>
                        )}
                        {order.status === "pending" && (
                          <>
                            <div className="p-1 rounded-full bg-orange-500/20">
                              <AlertCircle className="w-3 h-3 text-orange-400" />
                            </div>
                            <span className="text-xs text-orange-400 font-medium">قيد الانتظار</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Enhanced */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">الإجراءات السريعة</h2>
            <p className="text-sm text-slate-400">إدارة سريعة لعملياتك</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-slate-800 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors mx-auto mb-4 w-fit">
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">طلب جديد</h3>
                <p className="text-sm text-slate-400">إضافة طلب توصيل جديد</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors mx-auto mb-4 w-fit">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">إضافة سائق</h3>
                <p className="text-sm text-slate-400">تسجيل سائق جديد</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-xl bg-green-500/20 group-hover:bg-green-500/30 transition-colors mx-auto mb-4 w-fit">
                  <MapPin className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">منطقة جديدة</h3>
                <p className="text-sm text-slate-400">تحديد منطقة توصيل</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="p-3 rounded-xl bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors mx-auto mb-4 w-fit">
                  <Warehouse className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">مستودع جديد</h3>
                <p className="text-sm text-slate-400">إضافة نقطة تجميع</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayoutWithSidebar>
  )
}
