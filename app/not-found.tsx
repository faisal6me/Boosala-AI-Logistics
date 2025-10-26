import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">404</h2>
        <p className="text-xl text-gray-400 mb-6">الصفحة غير موجودة</p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  )
}
