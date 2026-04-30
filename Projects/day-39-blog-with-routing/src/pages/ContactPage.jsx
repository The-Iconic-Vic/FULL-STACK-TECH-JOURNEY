import  { useState } from 'react'
import styles from './ContactPage.module.css'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 500)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      
      <div className={styles.content}>
        <p className={styles.description}>
          Have questions or feedback? We'd love to hear from you!
        </p>

        {submitted && (
          <div className={styles.success}>
            ✓ Message sent successfully! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>

        <div className={styles.social}>
          <h3>Connect online</h3>
          <div className={styles.socialLinks}>
            <a href="https://x.com/TheIconicVic_" target="_blank" rel="noopener noreferrer">
              🐦 Twitter/X
            </a>
            <a href="https://github.com/The-Iconic-Vic" target="_blank" rel="noopener noreferrer">
              📂 GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage