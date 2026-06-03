'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition ${
              pathname === item.href
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
