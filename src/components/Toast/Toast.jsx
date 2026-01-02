import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import styles from './Toast.module.css'

const CheckCircle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const XCircle = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
)

const X = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const Toast = ({ isVisible, message, type = 'success', onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isVisible, onClose])

    return (
        <div className={styles.toastWrapper}>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={`${styles.toast} ${styles[type]}`}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <div className={styles.icon}>
                            {type === 'success' ? <CheckCircle /> : <XCircle />}
                        </div>
                        <div className={styles.content}>
                            <h4 className={styles.title}>
                                {type === 'success' ? 'Success' : 'Error'}
                            </h4>
                            <p className={styles.message}>{message}</p>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Toast
