import React, { useState, useEffect, useCallback } from 'react'
import UserCard from './UserCard'
import SearchBar from './SearchBar'
import LoadingSkeleton from './LoadingSkeleton'
import ErrorState from './ErrorState'
import styles from './UserDirectory.module.css'

function UserDirectory() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Try multiple approaches for better compatibility
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
      // Fallback to sample data if API fails
      setUsers([])
      setFilteredUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on component mount
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = users.filter(user =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.company?.name?.toLowerCase().includes(term)
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  const handleRetry = () => {
    fetchUsers()
  }

  const handleRefresh = () => {
    fetchUsers()
    setSearchTerm('')
  }

  // Show loading skeleton
  if (loading) {
    return (
      <div className={styles.directory}>
        <div className={styles.header}>
          <h1 className={styles.title}>👥 User Directory</h1>
          <p className={styles.subtitle}>Manage and view your team members</p>
        </div>
        <LoadingSkeleton count={6} />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.directory}>
        <div className={styles.header}>
          <h1 className={styles.title}>👥 User Directory</h1>
          <p className={styles.subtitle}>Manage and view your team members</p>
        </div>
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className={styles.directory}>
      <div className={styles.header}>
        <h1 className={styles.title}>👥 User Directory</h1>
        <p className={styles.subtitle}>Manage and view your team members</p>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        onRefresh={handleRefresh}
      />

      <div className={styles.stats}>
        <span>Total Users: {filteredUsers.length}</span>
        {searchTerm && (
          <span className={styles.filterBadge}>
            Filtered by: "{searchTerm}"
          </span>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No users found</h3>
          <p>Try a different search term</p>
          <button onClick={() => setSearchTerm('')} className={styles.clearBtn}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDirectory