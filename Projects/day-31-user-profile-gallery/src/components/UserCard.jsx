import React from 'react'
import Button from './Button'
import styles from './UserCard.module.css'

function UserCard({ 
  id,
  name, 
  age, 
  email, 
  avatar, 
  location, 
  bio, 
  followers,
  isFollowed,
  onFollowToggle 
}) {
  const handleFollowClick = () => {
    onFollowToggle(id)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img 
          src={avatar} 
          alt={name}
          className={styles.avatar}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/100x100?text=User'
          }}
        />
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.location}>📍 {location}</p>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Age:</span>
          <span>{age} years</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email:</span>
          <span>{email}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Followers:</span>
          <span>{(followers / 1000).toFixed(1)}K</span>
        </div>
      </div>

      <p className={styles.bio}>"{bio}"</p>

      <div className={styles.footer}>
        <Button 
          variant={isFollowed ? "secondary" : "primary"}
          size="medium"
          onClick={handleFollowClick}
        >
          {isFollowed ? "Following ✓" : "Follow"}
        </Button>
      </div>
    </div>
  )
}

export default UserCard