import { useState } from 'react'
import styles from './UserCard.module.css'

function UserCard({ user }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <div className={styles.avatarPlaceholder}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.email}>✉️ {user.email}</p>
        <p className={styles.phone}>📞 {user.phone}</p>
        
        {expanded && (
          <div className={styles.expandedInfo}>
            <p className={styles.company}>
              🏢 <strong>Company:</strong> {user.company.name}
            </p>
            <p className={styles.website}>
              🌐 <strong>Website:</strong> {user.website}
            </p>
            <p className={styles.address}>
              📍 <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
            </p>
          </div>
        )}
        
        <button 
          className={styles.expandBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}

export default UserCard