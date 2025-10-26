"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ModernSidebar } from "./modern-sidebar"

interface DashboardLayoutWithSidebarProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayoutWithSidebar({ 
  children, 
  className 
}: DashboardLayoutWithSidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load sidebar state from localStorage
  useEffect(() => {
    setIsMounted(true)
    const savedState = localStorage.getItem('sidebar-collapsed')
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Listen for sidebar state changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('sidebar-collapsed')
      if (savedState !== null) {
        setSidebarCollapsed(JSON.parse(savedState))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950" dir="rtl">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950" dir="rtl">
      {/* Modern Sidebar */}
      <ModernSidebar />
      
      {/* Main Content Area */}
      <motion.main
        className={cn(
          "min-h-screen transition-all duration-400 ease-in-out",
          "lg:mr-0", // No margin by default since sidebar is fixed
          className
        )}
        animate={{
          paddingRight: sidebarCollapsed ? 0 : 280,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

// Helper function for className concatenation
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
