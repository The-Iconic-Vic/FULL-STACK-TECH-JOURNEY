import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import api from '../services/api'

function ProfilePage() {
  const { user, logout } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleUpdateName = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      // In a real app, you would have an endpoint to update name
      // For now, we'll just show a message
      setMessage('Name update feature coming soon')
    } catch (err) {
      setError('Failed to update name')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      // In a real app, you would have an endpoint to update password
      setMessage('Password update feature coming soon')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Profile</h1>
            
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
            
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
            
            <form onSubmit={handleUpdateName}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary">
                Update Name
              </button>
            </form>
          </div>
          
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Change Password</h2>
            
            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button type="submit" disabled={loading} className="btn btn-primary">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage