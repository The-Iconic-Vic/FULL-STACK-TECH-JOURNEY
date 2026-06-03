export default function DashboardPage() {
  const stats = [
    { label: 'Total Projects', value: '12', change: '+2', color: 'bg-blue-500' },
    { label: 'Blog Posts', value: '24', change: '+5', color: 'bg-green-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4`} />
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-green-600 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
