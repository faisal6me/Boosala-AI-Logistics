"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"

export default function Home() {
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    router.replace("/products/boosla")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  )
}
