import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './Intro.module.css'

const Intro = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Total intro duration: 3.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false)
            if (onComplete) onComplete()
        }, 3500)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.intro}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Lightning Flash - Multiple flashes */}
                    <motion.div
                        className={styles.lightning}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0, 0.3, 0, 0.1, 0]
                        }}
                        transition={{
                            duration: 0.8,
                            times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 1],
                            ease: "easeOut"
                        }}
                    />

                    {/* Cyan Edge Glow */}
                    <motion.div
                        className={styles.edgeGlow}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    />

                    {/* Vertical Grid Lines */}
                    <div className={styles.gridLines}>
                        {[...Array(25)].map((_, i) => (
                            <motion.span
                                key={i}
                                className={styles.line}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 + i * 0.02, duration: 0.5 }}
                            />
                        ))}
                    </div>

                    {/* Name - Smooth 1.5s zoom out */}
                    <motion.h1
                        className={styles.name}
                        initial={{
                            scale: 5,
                            opacity: 0,
                            filter: 'blur(10px)'
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            filter: 'blur(0px)'
                        }}
                        transition={{
                            duration: 1.5,
                            ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
                        }}
                    >
                        KARTHIGAISELVAM R
                    </motion.h1>

                    {/* Role - Fade in after name settles */}
                    <motion.p
                        className={styles.role}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                    >
                        SECURITY RESEARCHER — BUILDING SECURE SYSTEMS.
                        <br />
                        BREAKING VULNERABILITIES: PRECISE, METHODICAL, IMPACTFUL.
                    </motion.p>

                    {/* Pulsing Dot */}
                    <motion.div
                        className={styles.dot}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0, duration: 0.4, type: 'spring' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Intro
