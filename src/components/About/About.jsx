import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'

// SVG Icons
const Target = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const Award = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
)

const Shield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const Code = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

const Download = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)


const highlights = [
    {
        icon: <Target />,
        title: 'Problem Solver',
        description: '990+ LeetCode problems solved',
        color: 'primary'
    },
    {
        icon: <Shield />,
        title: 'Security Expert',
        description: 'Pen testing & vulnerability research',
        color: 'accent'
    },
    {
        icon: <Code />,
        title: 'Full Stack Dev',
        description: 'Python, C++, JavaScript, Qt',
        color: 'warning'
    }
]


function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className="hex-grid"></div>
            <div className="container">
                <motion.div
                    ref={ref}
                    className={styles.aboutGrid}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Terminal Side */}
                    <motion.div
                        className={styles.terminalWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className={`terminal ${styles.aboutTerminal}`}>
                            <div className="terminal-header">
                                <span className="terminal-dot red"></span>
                                <span className="terminal-dot yellow"></span>
                                <span className="terminal-dot green"></span>
                                <span className="terminal-title">~/about-me</span>
                            </div>
                            <div className="terminal-body">
                                <span className="terminal-line">
                                    <span className="terminal-prompt">$ </span>
                                    <span className="terminal-command">cat profile.txt</span>
                                </span>
                                <br /><br />
                                <span className={styles.outputSection}>
                                    <span className={styles.outputKey}>Name:</span> Karthigaiselvam R<br />
                                    <span className={styles.outputKey}>Role:</span> Security Researcher<br />
                                    <span className={styles.outputKey}>Education:</span> B.E. CS (Cyber Security)<br />
                                    <span className={styles.outputKey}>College:</span> Chennai Institute of Tech<br />
                                    <span className={styles.outputKey}>CGPA:</span> 9.09 / 10<br />
                                    <span className={styles.outputKey}>Batch:</span> 2022 - 2026<br />
                                </span>
                                <br />
                                <span className="terminal-line">
                                    <span className="terminal-prompt">$ </span>
                                    <span className="terminal-command">cat quote.txt</span>
                                </span>
                                <br /><br />
                                <span className="terminal-output">
                                    "Security is not a product,<br />
                                    but a process."<br />
                                    — Bruce Schneier
                                </span>
                            </div>
                        </div>

                        {/* Experience Badge */}
                        <motion.div
                            className={styles.expBadge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className={styles.expNumber}>3+</span>
                            <span className={styles.expLabel}>Industry<br />Internships</span>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                            <span className="section-tag">
                                <Shield />
                                About Me
                            </span>
                            <h2 className="section-title">
                                <span className="gradient-text">Security Researcher &<br />Software Developer</span>
                            </h2>
                        </div>

                        <p className={styles.bio}>
                            I'm <strong>Karthigaiselvam R</strong>, a B.E. Computer Science (Cyber Security) student at
                            <strong> Chennai Institute of Technology</strong> with a 9.09 CGPA. I specialize in
                            penetration testing, web application security, and building secure applications.
                        </p>

                        {/* Highlights Grid */}
                        <div className={styles.highlightsGrid}>
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className={`${styles.highlightCard} ${styles[item.color]}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <div className={styles.highlightIcon}>
                                        {item.icon}
                                    </div>
                                    <div className={styles.highlightContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            href="https://drive.google.com/file/d/1TfsRE5sKNhvGdxzgWtq-4RAZnt-JfFSO/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ marginTop: '20px' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download />
                            Download Resume
                        </motion.a>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}

export default About


