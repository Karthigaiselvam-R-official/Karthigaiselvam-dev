import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TechCloud from './TechCloud'
import styles from './Skills.module.css'

// SVG Icons for Skills
const icons = {
    // Security
    Shield: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Bug: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 4l4 4 4-4M3 10h4m10 0h4M7 10c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v9a5 5 0 0 1-10 0v-9z" />
            <path d="M12 18v-6M9 14l-4-3m10 3 4-3" />
        </svg>
    ),
    Globe: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Lock: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    // Development - Languages
    Code: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    Terminal: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
    ),
    Cpu: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    ),
    FileCode: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m10 13-2 2 2 2" />
            <path d="m14 17 2-2-2-2" />
        </svg>
    ),
    // Tools
    Linux: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <circle cx="9" cy="10" r="1" />
            <circle cx="15" cy="10" r="1" />
            <path d="M9 15s1.5 2 3 2 3-2 3-2" />
        </svg>
    ),
    Git: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M6 21V9a9 9 0 0 0 9 9" />
        </svg>
    ),
    Box: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    Settings: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
}

const skillCategories = [
    {
        title: 'Cyber Security',
        color: 'primary',
        skills: [
            { name: 'Penetration Testing', icon: 'Shield' },
            { name: 'Web App Security', icon: 'Globe' },
            { name: 'Android Pentesting', icon: 'Bug' },
            { name: 'Network Security', icon: 'Lock' },
        ]
    },
    {
        title: 'Development',
        color: 'secondary',
        skills: [
            { name: 'Python', icon: 'Code' },
            { name: 'C++', icon: 'Cpu' },
            { name: 'JavaScript', icon: 'FileCode' },
            { name: 'Bash/Shell', icon: 'Terminal' },
        ]
    },
    {
        title: 'Tools & Frameworks',
        color: 'accent',
        skills: [
            { name: 'Linux (Kali/Parrot)', icon: 'Linux' },
            { name: 'Git & Docker', icon: 'Git' },
            { name: 'Qt6 / QML', icon: 'Box' },
            { name: 'Burp Suite', icon: 'Settings' },
        ]
    }
]

function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const getIcon = (iconName) => {
        const Icon = icons[iconName]
        return Icon ? <Icon /> : null
    }

    return (
        <section id="skills" className={`section ${styles.skills}`}>
            <div className="hex-grid"></div>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className="section-tag">
                        <icons.Settings />
                        Technical Skills
                    </span>
                    <h2 className="section-title">
                        Technologies & <span className="gradient-text">Expertise</span>
                    </h2>
                    <p className="section-subtitle">
                        Specialized in security research and software development
                    </p>
                </motion.div>

                {/* 3D Tech Cloud */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                    className={styles.cloudSection}
                >
                    <TechCloud />
                </motion.div>

                <motion.div ref={ref} className={styles.skillsGrid}>
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            className={`${styles.category} ${styles[category.color]}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ delay: catIndex * 0.15 + 0.3 }}
                        >
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryLine}></span>
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                                <span className={styles.categoryLine}></span>
                            </div>

                            <div className={styles.skillsList}>
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        className={styles.skillCard}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ delay: catIndex * 0.15 + skillIndex * 0.08 + 0.3 }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)'
                                        }}
                                    >
                                        <div className={styles.skillIcon}>
                                            {getIcon(skill.icon)}
                                        </div>
                                        <span className={styles.skillName}>{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Skills Bar */}
                <motion.div
                    className={styles.additionalSkills}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.6 }}
                >
                    <span className={styles.additionalLabel}>Also experienced with:</span>
                    <div className={styles.additionalTags}>
                        {['Solidity', 'Web3.js', 'Truffle', 'OpenCV', 'FastAPI', 'Metasploit', 'Wireshark', 'Nmap', 'CMake'].map((skill) => (
                            <span key={skill} className={styles.skillTag}>{skill}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
