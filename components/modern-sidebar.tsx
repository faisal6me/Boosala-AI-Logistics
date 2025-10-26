"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Users,
  MapPin,
  Settings,
  Plug,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  PanelRightClose,
  PanelRightOpen,
  LogOut,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  badge?: number
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    icon: LayoutDashboard,
    href: "/products/boosla/dashboard",
  },
  {
    id: "orders",
    label: "الطلبات",
    icon: Package,
    href: "/products/boosla/dashboard/orders",
    badge: 12,
  },
  {
    id: "warehouses",
    label: "المستودعات",
    icon: Warehouse,
    href: "/products/boosla/dashboard/warehouses",
  },
  {
    id: "drivers",
    label: "السائقون",
    icon: Users,
    href: "/products/boosla/dashboard/drivers",
    badge: 3,
  },
  {
    id: "zones",
    label: "المناطق",
    icon: MapPin,
    href: "/products/boosla/dashboard/zones",
  },
  {
    id: "integrations",
    label: "التكاملات",
    icon: Plug,
    href: "/products/boosla/dashboard/integrations",
  },
  {
    id: "settings",
    label: "الإعدادات",
    icon: Settings,
    href: "/products/boosla/dashboard/settings",
  },
]

interface ModernSidebarProps {
  className?: string
}

export function ModernSidebar({ className }: ModernSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Load state from localStorage on mount
  useEffect(() => {
    setIsMounted(true)
    const savedState = localStorage.getItem('sidebar-collapsed')
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed))
    }
  }, [isCollapsed, isMounted])

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  const handleNavigation = (href: string) => {
    router.push(href)
    if (isMobileOpen) {
      setIsMobileOpen(false)
    }
  }

  const handleLogout = async () => {
    try {
      console.log("[v0] Logging out...")
      
      // Call logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem("auth-token")
        
        // Redirect to login page
        router.push("/products/boosla/login")
        
        console.log("[v0] Logout successful")
      } else {
        console.error("[v0] Logout failed")
      }
    } catch (error) {
      console.error("[v0] Logout error:", error)
      // Still redirect to login page even if API call fails
      localStorage.removeItem("auth-token")
      router.push("/products/boosla/login")
    }
  }

  const sidebarVariants = {
    expanded: {
      width: 280,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as any,
      },
    },
    collapsed: {
      width: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as any,
      },
    },
  }

  const mobileSidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
      },
    },
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl font-bold text-white">بوصلة</h2>
                <p className="text-xs text-slate-400">منصة التوصيل الذكية</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "w-full relative group",
                "transition-all duration-300"
              )}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Active indicator - gradient bar */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-0 top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b from-primary via-primary/80 to-primary/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Button content */}
              <div
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300",
                  "group-hover:shadow-lg group-hover:shadow-slate-900/20",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-lg shadow-primary/10"
                    : "bg-slate-800/30 hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50",
                  isCollapsed && "justify-center px-0"
                )}
              >
                {/* Icon with glow effect on active */}
                <div className="relative">
                  <motion.div
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      repeat: isActive ? Infinity : 0,
                      repeatDelay: 3,
                    }}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-colors duration-300",
                        isActive ? "text-primary" : "text-slate-400 group-hover:text-white"
                      )}
                    />
                  </motion.div>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30 blur-lg"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </div>

                {/* Label and badge */}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between flex-1"
                    >
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                        )}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-0.5 text-xs font-bold text-white bg-primary rounded-full"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Footer - Logout and Collapse toggle */}
      <div className="p-4 border-t border-slate-800/50 space-y-2">
        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className={cn(
            "w-full relative group",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl",
              "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30",
              "transition-all duration-300 group",
              isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-red-400 group-hover:text-red-300 transition-colors"
                >
                  تسجيل الخروج
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
              تسجيل الخروج
            </div>
          )}
        </motion.button>

        {/* Collapse Toggle */}
        <motion.button
          onClick={toggleCollapse}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50",
            "transition-all duration-300 group",
            isCollapsed && "justify-center"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isCollapsed ? (
              <PanelRightOpen className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            ) : (
              <PanelRightClose className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
            )}
          </motion.div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors"
              >
                إخفاء القائمة
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className={cn(
          "hidden lg:flex flex-col fixed right-0 top-0 h-screen",
          "bg-gradient-to-b from-[#0b1120] to-[#0f1629] backdrop-blur-xl",
          "border-l border-slate-800/50 shadow-2xl",
          "z-50 overflow-hidden",
          className
        )}
        style={{
          background: 'linear-gradient(180deg, #0b1120 0%, #0f1629 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="w-full h-full bg-slate-900/20 backdrop-blur-sm">
          <SidebarContent />
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-xl bg-slate-900/90 backdrop-blur-sm border border-slate-800 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isMobileOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobile}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              variants={mobileSidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={cn(
                "lg:hidden fixed right-0 top-0 h-screen w-80",
                "bg-gradient-to-b from-[#0b1120] to-[#0f1629] backdrop-blur-xl",
                "border-l border-slate-800/50 shadow-2xl",
                "z-50 overflow-hidden",
                className
              )}
              style={{
                background: 'linear-gradient(180deg, #0b1120 0%, #0f1629 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="w-full h-full bg-slate-900/20 backdrop-blur-sm">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button for Desktop when Collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCollapse}
            className="hidden lg:flex fixed top-1/2 right-4 transform -translate-y-1/2 z-50 p-3 rounded-full bg-primary hover:bg-primary/90 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <PanelRightOpen className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

