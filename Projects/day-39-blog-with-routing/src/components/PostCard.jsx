import 'react'
import { Link } from 'react-router-dom'
import styles from './PostCard.module.css'

function PostCard({ post }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/post/${post.id}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h2>
        <p className={styles.body}>{post.body.substring(0, 120)}...</p>
        <div className={styles.meta}>
          <span className={styles.postId}>Post #{post.id}</span>
          <Link to={`/post/${post.id}`} className={styles.readMore}>
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard