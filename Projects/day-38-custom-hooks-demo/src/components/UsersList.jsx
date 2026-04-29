import 'react'
import useFetch from '../hooks/useFetch'
import styles from './UsersList.module.css'

function UsersList() {
  const { data: users, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) {
    return (
      <div className={styles.card}>
        <h2>👥 Users</h2>
        <div className={styles.skeleton}>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.card}>
        <h2>👥 Users</h2>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button onClick={refetch} className={styles.retryBtn}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>👥 Users</h2>
        <button onClick={refetch} className={styles.refreshBtn}>🔄 Refresh</button>
      </div>
      <div className={styles.list}>
        {users?.map(user => (
          <div key={user.id} className={styles.item}>
            <h3>{user.name}</h3>
            <p className={styles.email}>✉️ {user.email}</p>
            <p className={styles.company}>🏢 {user.company.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <small>Data fetched with the same useFetch hook!</small>
      </div>
    </div>
  )
}

export default UsersList