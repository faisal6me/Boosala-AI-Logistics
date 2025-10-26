import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Boosla - بوصلة | منصة ذكية لإدارة التوصيل",
  description: "منصة مدعومة بالذكاء الاصطناعي لإدارة عمليات التوصيل في الميل الأخير بكفاءة عالية",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={ibmPlexSansArabic.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
