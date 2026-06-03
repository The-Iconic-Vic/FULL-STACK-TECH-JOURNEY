export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">{children}</main>
        <aside className="md:w-80">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">About This Blog</h3>
            <p className="text-gray-600 text-sm">
              I document my journey as a developer, sharing insights, tutorials, and lessons learned along the way.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
