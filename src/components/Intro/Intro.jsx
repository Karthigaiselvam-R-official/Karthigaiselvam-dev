import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import styles from './Intro.module.css'

const Counter = ({ onReady }) => {
    const count = useMotionValue(0)
    const targetLenRef = useRef(6)
    
    const formatted = useTransform(count, (latest) => {
        return Math.round(latest).toString().padStart(targetLenRef.current, '0')
    })

    const [finalCount, setFinalCount] = useState(null)
    const [glitchText, setGlitchText] = useState("000000")

    useEffect(() => {
        const chars = "0123456789!@#$%^&*"
        const glitchInterval = setInterval(() => {
            let res = ""
            for(let j=0; j<targetLenRef.current; j++) res += chars.charAt(Math.floor(Math.random() * chars.length))
            setGlitchText(res)
        }, 50)

        // Prevent double-counting in React StrictMode or on page reloads
        // const hasVisited = localStorage.getItem('has_visited_portfolio')
        // const endpoint = hasVisited 
        //     ? 'https://api.counterapi.dev/v1/karthigaiselvam-dev-portfolio/visits/'
        //     : 'https://api.counterapi.dev/v1/karthigaiselvam-dev-portfolio/visits/up'

        // In production (Vercel): /api/visits hits our self-owned GitHub Gist counter.
        // In local dev: vercel dev serves /api routes alongside the Vite frontend.
        // 5s hard timeout — if the API hangs, abort and fall back gracefully
        // so the intro never freezes on the name screen.
        const controller = new AbortController()
        const fetchTimeout = setTimeout(() => controller.abort(), 5000)

        fetch('/api/visits', { signal: controller.signal })
            .then(res => { clearTimeout(fetchTimeout); return res.json() })
            .then(data => {
                if (data && typeof data.count === 'number') {
                    targetLenRef.current = Math.max(6, data.count.toString().length)
                    setTimeout(() => {
                        clearInterval(glitchInterval)
                        setFinalCount(data.count)
                        const anim = animate(count, data.count, { duration: 0.4, ease: "easeOut" })
                        anim.then(() => {
                            if (onReady) onReady()
                        })
                    }, 1400)
                } else {
                    throw new Error("Invalid count data")
                }
            })
            .catch(() => {
                clearTimeout(fetchTimeout)
                // Glitch runs for at least 1.4s then exits gracefully
                setTimeout(() => {
                    clearInterval(glitchInterval)
                    setFinalCount(0)
                    const anim = animate(count, 0, { duration: 0.4, ease: "easeOut" })
                    anim.then(() => {
                        if (onReady) onReady()
                    })
                }, 1400)
            })

        return () => {
            clearTimeout(fetchTimeout)
            controller.abort()
            clearInterval(glitchInterval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px',
        }}>
            <div style={{ 
                color: 'var(--text-secondary)', 
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: '1rem',
                fontWeight: '600',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                {/* TOTAL UNIQUE VISITORS */}
                TOTAL VISITORS
            </div>
            
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '8px 24px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                background: 'rgba(0, 255, 136, 0.02)',
                borderRadius: '4px',
                boxShadow: '0 0 15px rgba(0, 255, 136, 0.05) inset',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Cyberpunk corner brackets */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '6px', borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '6px', height: '6px', borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' }}></div>
                
                <span style={{ 
                    color: finalCount !== null ? '#ffffff' : 'var(--text-muted)', 
                    fontWeight: 'bold',
                    letterSpacing: '6px',
                    fontSize: '1.2rem',
                    textShadow: finalCount !== null ? '0 0 10px rgba(255, 255, 255, 0.6)' : 'none',
                    marginRight: '-6px' // compensate for letter spacing on last char
                }}>
                    {finalCount !== null ? <motion.span>{formatted}</motion.span> : glitchText}
                </span>
            </div>
        </div>
    )
}

const Intro = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isCountReady, setIsCountReady] = useState(false)

    useEffect(() => {
        let timer;
        if (isCountReady) {
            // Once the count finishes animating, wait 1500ms for the user to read it
            timer = setTimeout(() => {
                setIsVisible(false)
                if (onComplete) onComplete()
            }, 1500)
        } else {
            // Fallback timeout in case the network fails or is extremely slow
            timer = setTimeout(() => {
                setIsVisible(false)
                if (onComplete) onComplete()
            }, 6000)
        }
        return () => clearTimeout(timer)
    }, [isCountReady, onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.intro}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Lightning Flash - Accelerated */}
                    <motion.div
                        className={styles.lightning}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0, 0.3, 0, 0.1, 0]
                        }}
                        transition={{
                            delay: 1.0,
                            duration: 0.5,
                            times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 1],
                            ease: "easeOut"
                        }}
                    />

                    {/* Cyan Edge Glow */}
                    <motion.div
                        className={styles.edgeGlow}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    />

                    {/* Vertical Grid Lines */}
                    <div className={styles.gridLines}>
                        {[...Array(15)].map((_, i) => (
                            <motion.span
                                key={i}
                                className={styles.line}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.05 + i * 0.01, duration: 0.4 }}
                            />
                        ))}
                    </div>

                    {/* Name - Staggered Letter Animation (No Blur for Speed) */}
                    <motion.h1
                        className={styles.name}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.04,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                    >
                        {Array.from("KARTHIGAISELVAM R").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                        scale: 1.2
                                        // Removed blur for mobile performance
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }
                                }}
                                className={styles.gradientChar}
                                style={{
                                    display: 'inline-block',
                                    whiteSpace: 'pre',
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
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

                    {/* Visitor Log Counter */}
                    <motion.div
                        className={styles.visitorLog}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        style={{
                            marginTop: '40px',
                            fontFamily: '"JetBrains Mono", monospace'
                        }}
                    >
                        <Counter onReady={() => setIsCountReady(true)} />
                    </motion.div>

                    {/* Pulsing Dot */}
                    <motion.div
                        className={styles.dot}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Intro
