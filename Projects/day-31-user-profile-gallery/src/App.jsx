import React, { useState } from 'react'
import UserCard from './components/UserCard'
import Container from './components/Container'
import styles from './App.module.css'

// Sample user data array
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    email: "alice@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    location: "New York, USA",
    bio: "Frontend developer who loves React and building beautiful UIs. Coffee enthusiast ☕",
    followers: 1234
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 32,
    email: "bob@example.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    location: "London, UK",
    bio: "Full-stack developer with a passion for backend technologies. Gaming fan 🎮",
    followers: 892
  },
  {
    id: 3,
    name: "Carol Davis",
    age: 25,
    email: "carol@example.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    location: "Toronto, Canada",
    bio: "UI/UX designer who codes. Loves creating accessible experiences 🎨",
    followers: 2100
  },
  {
    id: 4,
    name: "David Wilson",
    age: 35,
    email: "david@example.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    location: "Sydney, Australia",
    bio: "DevOps engineer and open source contributor. Cloud native enthusiast ☁️",
    followers: 567
  },
  {
    id: 5,
    name: "Emma Brown",
    age: 29,
    email: "emma@example.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    location: "Berlin, Germany",
    bio: "Mobile developer (React Native). Loves traveling and photography 📱",
    followers: 3456
  },
  {
    id: 6,
    name: "Frank Miller",
    age: 31,
    email: "frank@example.com",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    location: "Tokyo, Japan",
    bio: "AI/ML engineer. Building the future with neural networks 🤖",
    followers: 789
  }
]

function App() {
  const [followedUsers, setFollowedUsers] = useState({})

  const handleFollowToggle = (userId) => {
    setFollowedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  return (
    <Container>
      <div className={styles.header}>
        <h1>👥 User Profile Gallery</h1>
        <p>Meet our community members</p>
        <div className={styles.stats}>
          <span>Total Users: {users.length}</span>
          <span>Following: {Object.values(followedUsers).filter(Boolean).length}</span>
        </div>
      </div>

      <div className={styles.grid}>
        {users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            age={user.age}
            email={user.email}
            avatar={user.avatar}
            location={user.location}
            bio={user.bio}
            followers={user.followers}
            isFollowed={!!followedUsers[user.id]}
            onFollowToggle={handleFollowToggle}
          />
        ))}
      </div>
    </Container>
  )
}

export default App