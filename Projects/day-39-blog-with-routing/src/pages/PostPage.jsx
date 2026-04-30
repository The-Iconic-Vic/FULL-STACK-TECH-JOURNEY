import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import styles from './PostPage.module.css'

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )

  const goBack = () => {
    navigate(-1)
  }

  const goToNextPost = () => {
    const nextId = parseInt(id) + 1
    if (nextId <= 100) {
      navigate(`/post/${nextId}`)
    }
  }

  const goToPrevPost = () => {
    const prevId = parseInt(id) - 1
    if (prevId >= 1) {
      navigate(`/post/${prevId}`)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonMeta}></div>
          <div className={styles.skeletonBody}></div>
          <div className={styles.skeletonBody}></div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Post Not Found</h2>
          <p>The post you're looking for doesn't exist.</p>
          <Link to="/" className={styles.homeLink}>← Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <button onClick={goBack} className={styles.backBtn}>
        ← Back
      </button>

      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.postId}>Post #{post.id}</span>
        </div>
        <p className={styles.body}>{post.body}</p>
      </article>

      <div className={styles.navigation}>
        <button
          onClick={goToPrevPost}
          disabled={parseInt(id) === 1}
          className={styles.navBtn}
        >
          ← Previous Post
        </button>
        <Link to="/" className={styles.homeBtn}>
          All Posts
        </Link>
        <button
          onClick={goToNextPost}
          disabled={parseInt(id) === 100}
          className={styles.navBtn}
        >
          Next Post →
        </button>
      </div>
    </div>
  )
}

export default PostPage