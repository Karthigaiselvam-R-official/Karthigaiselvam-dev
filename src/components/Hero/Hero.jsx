import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import styles from './Hero.module.css'

// SVG Icons
const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)

const Terminal = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
)

const Shield = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const Lock = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

// Typewriter effect for roles
const roles = [
    "Security Researcher",
    "Penetration Tester",
    "Software Developer",
    "Cyber Security Enthusiast",
]

// ============================================
// HOLOGRAPHIC CYBER TERMINAL - NEW DESIGN
// ============================================

// Animated typing terminal with real cursor
const HoloTerminal = () => {
    const [lines, setLines] = useState([])
    const [currentLine, setCurrentLine] = useState(0)
    const [currentChar, setCurrentChar] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    const codeLines = [
        { text: '> Initializing security scan...', color: '#888', delay: 0 },
        { text: '> Target: Karthigaiselvam.dev', color: '#00ff88', delay: 100 },
        { text: '', color: '#fff', delay: 50 },
        { text: 'class SecurityResearcher:', color: '#ff79c6', delay: 80 },
        { text: '    def __init__(self):', color: '#8be9fd', delay: 80 },
        { text: '        self.name = "Karthigaiselvam"', color: '#f1fa8c', delay: 60 },
        { text: '        self.role = "Security Researcher"', color: '#f1fa8c', delay: 60 },
        { text: '        self.status = "ACTIVE"', color: '#50fa7b', delay: 60 },
        { text: '', color: '#fff', delay: 50 },
        { text: '> Scan complete. No vulnerabilities found.', color: '#00ff88', delay: 100 },
        { text: '> System secured ✓', color: '#50fa7b', delay: 150 },
    ]

    // Cursor blink
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])

    // Typing animation
    useEffect(() => {
        if (currentLine >= codeLines.length) return

        const line = codeLines[currentLine]

        if (currentChar < line.text.length) {
            const timeout = setTimeout(() => {
                setCurrentChar(prev => prev + 1)
            }, 30 + Math.random() * 20)
            return () => clearTimeout(timeout)
        } else {
            // Line complete, add to lines and move to next
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, { ...line, text: line.text }])
                setCurrentLine(prev => prev + 1)
                setCurrentChar(0)
            }, line.delay)
            return () => clearTimeout(timeout)
        }
    }, [currentLine, currentChar])

    return (
        <div className={styles.holoTerminal}>
            {/* Corner accents */}
            <div className={`${styles.cornerAccent} ${styles.topLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.topRight}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomRight}`} />

            {/* Scan lines */}
            <div className={styles.holoScanlines} />

            {/* Glowing border */}
            <div className={styles.holoBorder} />

            {/* Header */}
            <div className={styles.holoHeader}>
                <div className={styles.holoHeaderLeft}>
                    <span className={styles.holoStatus} />
                    <span className={styles.holoTitle}>SYSTEM TERMINAL</span>
                </div>
                <div className={styles.holoHeaderRight}>
                    <span>v2.0.26</span>
                    <span className={styles.holoTime}>
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </span>
                </div>
            </div>

            {/* Terminal body */}
            <div className={styles.holoBody}>
                {/* Completed lines */}
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        className={styles.holoLine}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className={styles.lineNumber}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: line.color }}>{line.text}</span>
                    </motion.div>
                ))}

                {/* Currently typing line */}
                {currentLine < codeLines.length && (
                    <div className={styles.holoLine}>
                        <span className={styles.lineNumber}>
                            {String(lines.length + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: codeLines[currentLine].color }}>
                            {codeLines[currentLine].text.slice(0, currentChar)}
                        </span>
                        <span className={`${styles.holoCursor} ${showCursor ? styles.visible : ''}`}>█</span>
                    </div>
                )}
            </div>

            {/* Footer status bar */}
            <div className={styles.holoFooter}>
                <span className={styles.holoFooterItem}>
                    <span className={styles.pulsingDot} /> CONNECTED
                </span>
                <span className={styles.holoFooterItem}>ENCRYPTION: AES-256</span>
                <span className={styles.holoFooterItem}>FIREWALL: ACTIVE</span>
            </div>
        </div>
    )
}

// Radar/Network visualization behind terminal
const NetworkRadar = () => {
    return (
        <div className={styles.radarContainer}>
            {/* Radar circles */}
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className={styles.radarCircle}
                    style={{
                        width: `${i * 100}px`,
                        height: `${i * 100}px`,
                    }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            ))}

            {/* Radar sweep */}
            <motion.div
                className={styles.radarSweep}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Network nodes */}
            {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const radius = 80 + Math.random() * 60
                return (
                    <motion.div
                        key={i}
                        className={styles.networkNode}
                        style={{
                            left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                            top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            delay: i * 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                )
            })}
        </div>
    )
}

// Data stream effect
const DataStream = () => {
    return (
        <div className={styles.dataStream}>
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className={styles.streamLine}
                    style={{ left: `${10 + i * 15}%` }}
                    animate={{
                        y: ['-100%', '100%'],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    )
}

function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [githubStats, setGithubStats] = useState({ repos: 0, stars: 0 })

    const firstName = "Karthigaiselvam"
    const lastName = "R"

    // Fetch GitHub stats
    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Karthigaiselvam-R-official')
                if (response.ok) {
                    const data = await response.json()
                    setGithubStats(prev => ({ ...prev, repos: data.public_repos }))
                }
            } catch (err) {
                console.error('Error fetching GitHub stats:', err)
            }
        }
        fetchGitHubStats()
    }, [])

    useEffect(() => {
        const currentRole = roles[roleIndex]
        const speed = isDeleting ? 50 : 100

        if (!isDeleting && displayText === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000)
            return
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
            return
        }

        const timeout = setTimeout(() => {
            setDisplayText(prev =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentRole.slice(0, prev.length + 1)
            )
        }, speed)

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, roleIndex])

    return (
        <section id="home" className={styles.hero}>
            {/* Background Effects */}
            <div className={styles.matrixBg}></div>
            <div className={styles.glowOrb1}></div>
            <div className={styles.glowOrb2}></div>
            <div className="scanline"></div>

            <div className={`container ${styles.heroContainer}`}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Status Badge */}
                    <motion.div
                        className={styles.statusBadge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className={styles.statusDot}></span>
                        <span>Available for Work</span>
                    </motion.div>

                    {/* Name */}
                    <motion.div
                        className={styles.nameWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className={styles.name}>
                            <span className={styles.firstName}>{firstName}</span>
                            <span className={styles.lastName}>{lastName}</span>
                        </h1>
                    </motion.div>

                    {/* Typewriter Role */}
                    <motion.div
                        className={styles.roleContainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <span className={styles.rolePrefix}>{'>'} </span>
                        <span className={styles.role}>{displayText}</span>
                        <span className={styles.cursor}></span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        B.E. Computer Science (Cyber Security) at <span className={styles.highlight}>Chennai Institute of Technology</span>.
                        Specializing in <span className={styles.highlight}>penetration testing</span>,
                        <span className={styles.highlight}> web application security</span>, and building tools that matter.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className={styles.buttons}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.a
                            href="#projects"
                            className={`btn ${styles.btnPrimary}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Terminal />
                            View Projects
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get In Touch
                            <ArrowRight />
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>9.09</span>
                            <span className={styles.statLabel}>CGPA</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>990+</span>
                            <span className={styles.statLabel}>LeetCode</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{githubStats.repos || '10'}+</span>
                            <span className={styles.statLabel}>GitHub Repos</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ====== NEW HOLOGRAPHIC TERMINAL VISUAL ====== */}
                <motion.div
                    className={styles.heroVisual}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
                >
                    {/* Background radar effect */}
                    <NetworkRadar />

                    {/* Data streams */}
                    <DataStream />

                    {/* Main holographic terminal */}
                    <HoloTerminal />

                    {/* === CREATIVE FLOATING ELEMENTS === */}

                    {/* Floating Terminal Commands */}
                    <motion.div
                        className={`${styles.floatingCmd} ${styles.cmdTop}`}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        $ nmap -sV
                    </motion.div>

                    <motion.div
                        className={`${styles.floatingCmd} ${styles.cmdBottom}`}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        $ sudo ./exploit
                    </motion.div>

                    {/* Port Badge - Left Side */}
                    <motion.div
                        className={styles.portBadge}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <span className={styles.portLabel}>PORT</span>
                        <span className={styles.portNumber}>443</span>
                        <span className={styles.portStatus}>OPEN</span>
                    </motion.div>



                    {/* CVE Badge */}
                    <motion.div
                        className={styles.cveBadge}
                        animate={{
                            y: [-3, 3, -3],
                            boxShadow: [
                                '0 0 15px rgba(255,0,100,0.3)',
                                '0 0 25px rgba(255,0,100,0.5)',
                                '0 0 15px rgba(255,0,100,0.3)'
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <span className={styles.cveText}>CVE-2026</span>
                    </motion.div>

                    {/* Circuit Lines */}
                    <svg className={styles.circuitLines} viewBox="0 0 100 100">
                        <motion.path
                            d="M0 50 H30 L40 30 H70 L80 50 H100"
                            stroke="rgba(0,255,136,0.3)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <motion.circle
                            cx="40"
                            cy="30"
                            r="3"
                            fill="#00ff88"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.circle
                            cx="70"
                            cy="30"
                            r="3"
                            fill="#00d4ff"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                        />
                    </svg>
                </motion.div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className={styles.scrollLine}></div>
                <span>Scroll</span>
            </motion.div>
        </section>
    )
}

export default Hero
