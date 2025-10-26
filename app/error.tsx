"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">حدث خطأ!</h2>
        <p className="text-gray-400 mb-6">عذراً، حدث خطأ غير متوقع</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  )
}
