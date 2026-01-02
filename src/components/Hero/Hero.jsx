import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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

const Code = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

// Typewriter effect for roles
const roles = [
    "Security Researcher",
    "Penetration Tester",
    "Software Developer",
    "Cyber Security Enthusiast",
]

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

                    {/* Simplified & Solid Name Structure */}
                    <motion.div
                        className={styles.nameWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className={styles.name}>
                            <span className={styles.firstName}>
                                {firstName}
                            </span>
                            <span className={styles.lastName}>
                                {lastName}
                            </span>
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

                {/* Hero Visual - Terminal */}
                <motion.div
                    className={styles.heroVisual}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className={`terminal ${styles.codeBlock}`}>
                        <div className="terminal-header">
                            <span className="terminal-dot red"></span>
                            <span className="terminal-dot yellow"></span>
                            <span className="terminal-dot green"></span>
                            <span className="terminal-title">security_researcher.py</span>
                        </div>
                        <div className="terminal-body">
                            <code>
                                <span className={styles.keyword}>class</span>{' '}
                                <span className={styles.className}>SecurityResearcher</span>:<br />
                                <br />
                                {'    '}<span className={styles.keyword}>def</span>{' '}
                                <span className={styles.function}>__init__</span>(self):<br />
                                {'        '}self.<span className={styles.property}>name</span> = <span className={styles.string}>"Karthigaiselvam"</span><br />
                                {'        '}self.<span className={styles.property}>role</span> = <span className={styles.string}>"Security Researcher"</span><br />
                                {'        '}self.<span className={styles.property}>focus</span> = [<br />
                                {'            '}<span className={styles.string}>"Red Teaming"</span>,<br />
                                {'            '}<span className={styles.string}>"Vulnerability Assessment"</span>,<br />
                                {'            '}<span className={styles.string}>"Tool Development"</span><br />
                                {'        '}]<br />
                            </code>
                        </div>
                    </div>

                    {/* Floating Icons */}
                    <motion.div
                        className={`${styles.floatingIcon} ${styles.icon1}`}
                        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <Shield />
                    </motion.div>
                    <motion.div
                        className={`${styles.floatingIcon} ${styles.icon2}`}
                        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        <Lock />
                    </motion.div>
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
