'use client'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
  })
  const [isSaved, setIsSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {isSaved && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">Settings saved successfully!</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive email updates</p>
          </div>
          <button
            type="button"
            onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
            className={`w-12 h-6 rounded-full transition ${settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full transition transform ${
                settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <button type="submit" className="btn-primary">Save Settings</button>
      </form>
    </div>
  )
}
