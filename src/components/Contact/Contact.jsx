import emailjs from '@emailjs/browser'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Toast from '../Toast/Toast'
import styles from './Contact.module.css'

// ... existing icons (Github, LinkedIn, Mail, Phone, Send, MessageCircle) ...
const Github = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const LinkedIn = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
)

const Mail = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)

const Phone = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

const Send = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
)

const MessageCircle = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
)

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/Karthigaiselvam-R-official',
        icon: <Github />,
        color: 'primary'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/karthigaiselvam-r-7b9197258/',
        icon: <LinkedIn />,
        color: 'secondary'
    },
    {
        name: 'Email',
        url: 'mailto:karthigaiselvamr.cs2022@gmail.com',
        icon: <Mail />,
        color: 'accent'
    },
]

const languages = [
    "வாங்க வேலை செய்வோம்", // Tamil - shorter
    "साथ मिलकर काम करें", // Hindi - shorter
    "Trabajemos Juntos", // Spanish
    "Travaillons Ensemble", // French
    "Zusammenarbeiten!", // German - shorter
    "一緒に働こう", // Japanese - shorter
    "함께 하자", // Korean - shorter
    "Работаем вместе", // Russian - shorter
    "一起工作吧", // Chinese - shorter
    "Lavoriamo Insieme", // Italian - NEW
    "Vamos Trabalhar", // Portuguese - NEW
    "Let's Work Together" // English (Last one)
]

function Contact() {
    const ref = useRef(null)
    const formRef = useRef(null)
    const isInView = useInView(ref, { margin: "-100px" })
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' })
    const [currentLangIndex, setCurrentLangIndex] = useState(0)

    // Continuous language cycling animation
    useEffect(() => {
        if (!isInView) return

        const interval = setInterval(() => {
            setCurrentLangIndex(prev => {
                const next = prev + 1
                // Loop back to 0 after reaching the end
                if (next >= languages.length) {
                    return 0 // Restart from beginning
                }
                return next
            })
        }, currentLangIndex === languages.length - 1 ? 3000 : 250) // Pause 3s on English, 250ms otherwise

        return () => clearInterval(interval)
    }, [isInView, currentLangIndex])

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type })
    }

    const closeToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        emailjs.sendForm(
            'service_9z9ogh7',
            'template_schoo5j',
            formRef.current,
            'tu8byCu5xNqBawxIB'
        )
            .then((result) => {
                showToast('Message sent successfully! I will get back to you soon.', 'success')
                setFormData({ name: '', email: '', message: '' })
            }, (error) => {
                console.log(error.text)
                showToast('Failed to send message. Please try again.', 'error')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <section id="contact" className={`section ${styles.contact}`}>
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
            <div className="hex-grid"></div>
            <div className="container">
                <motion.div
                    ref={ref}
                    className={styles.contactGrid}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                >
                    {/* Left Side - Info */}
                    <motion.div
                        className={styles.contactInfo}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                            <span className="section-tag">
                                <MessageCircle />
                                Get In Touch
                            </span>
                            <h2 className="section-title" style={{ minHeight: '1.2em', minWidth: '350px', textAlign: 'center' }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentLangIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.05 }}
                                        className="gradient-text"
                                        style={{
                                            display: 'inline-block',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {languages[currentLangIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </h2>
                        </div>

                        <p className={styles.description}>
                            I'm currently available for internships, freelance work, and full-time opportunities.
                            Whether you need a security assessment, want to collaborate on a project,
                            or just want to connect - feel free to reach out!
                        </p>

                        <div className={styles.contactDetails}>
                            <div className={styles.detailItem}>
                                <Mail />
                                <a href="mailto:karthigaiselvamr.cs2022@gmail.com">
                                    karthigaiselvamr.cs2022@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={styles.socialLinks}>
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.socialLink} ${styles[link.color]}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    aria-label={`Visit my ${link.name} profile`}
                                >
                                    <span className={styles.socialIcon}>{link.icon}</span>
                                    <span className={styles.socialName}>{link.name}</span>
                                    <span className={styles.socialArrow}>→</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.form
                        ref={formRef}
                        className={styles.contactForm}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Terminal Header */}
                        <div className={styles.formHeader}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.formPath}>~/contact-form</span>
                        </div>

                        <div className={styles.formBody}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">
                                    <span className={styles.labelPrompt}>$</span> name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">
                                    <span className={styles.labelPrompt}>$</span> email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">
                                    <span className={styles.labelPrompt}>$</span> message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    rows="5"
                                    required
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send />
                            </motion.button>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
