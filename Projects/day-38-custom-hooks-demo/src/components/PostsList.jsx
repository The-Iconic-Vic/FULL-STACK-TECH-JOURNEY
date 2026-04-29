import 'react'
import useFetch from '../hooks/useFetch'
import styles from './PostsList.module.css'

function PostsList() {
  const { data: posts, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  )

  if (loading) {
    return (
      <div className={styles.card}>
        <h2>📝 Posts</h2>
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
        <h2>📝 Posts</h2>
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
        <h2>📝 Posts</h2>
        <button onClick={refetch} className={styles.refreshBtn}>🔄 Refresh</button>
      </div>
      <div className={styles.list}>
        {posts?.map(post => (
          <div key={post.id} className={styles.item}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 80)}...</p>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <small>Using same useFetch hook as UsersList!</small>
      </div>
    </div>
  )
}

export default PostsList