import PostCard from '../components/PostCard'
import useFetch from '../hooks/useFetch'
import styles from './HomePage.module.css'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function HomePage() {
  const { data: posts, loading, error, refetch } = useFetch(API_URL)

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Latest Posts</h1>
        <div className={styles.skeleton}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonBody}></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Latest Posts</h1>
        <div className={styles.error}>
          <p>Error loading posts: {error}</p>
          <button onClick={refetch} className={styles.retryBtn}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest Posts</h1>
      <p className={styles.subtitle}>Browse through our collection of articles</p>
      <div className={styles.postsList}>
        {posts?.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default HomePage