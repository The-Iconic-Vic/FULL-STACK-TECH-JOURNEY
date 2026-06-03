'use client'
import { useRouter } from 'next/navigation'

export default function DashboardNav() {
  const router = useRouter()

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Welcome back, Victor</h1>
      <button
        onClick={() => router.push('/')}
        className="text-gray-600 hover:text-blue-600 transition"
      >
        View Site →
      </button>
    </nav>
  )
}
