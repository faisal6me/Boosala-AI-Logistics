"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  t: (key: keyof typeof translations) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => {
      const newLanguage = current === "ar" ? "en" : "ar"
      localStorage.setItem("language", newLanguage)
      return newLanguage
    })
  }, [])

  const t = useCallback(
    (key: keyof typeof translations) => {
      return translations[key][language]
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
