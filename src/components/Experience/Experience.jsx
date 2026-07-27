import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'
import styles from './Experience.module.css'

// Detect if we are on a "real" desktop/laptop (> 768px)
const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') return true
        return window.innerWidth > 768
    })
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 769px)')
        const handler = (e) => setIsDesktop(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])
    return isDesktop
}

// Icons
const Briefcase = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const Calendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const Shield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const Code = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

const Target = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const experiences = [
    {
        id: 0,
        role: "Cybersecurity Intern",
        company: "Learnflu",
        date: "Jan 2025 - May 2025",
        skills: ["Defensive Security", "Threat Intelligence", "SOC Analysis", "Incident Response"],
        image: "/images/Karthigaiselvam RLearnflu.png",
        icon: <Briefcase />,
        color: '#ffaa00'
    },
    {
        id: 1,
        role: "Cybersecurity Virtual Intern",
        company: "Palo Alto Networks",
        date: "Jul 2024 – Sep 2024",
        skills: ["Network Security", "Cloud Security", "SOC", "Prisma Cloud"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-paloaltonetworks-virtualinternship-activity-7251896001270042624-LQEE",
        icon: <Shield />,
        color: '#00ff88'
    },
    {
        id: 2,
        role: "Cyber Security Project Lead",
        company: "RecuritNxt Technologies",
        date: "Nov 2023 – May 2024",
        skills: ["Project Management", "VAPT", "Team Leadership"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-projectmanagement-teamwork-activity-7240375012514275330-64AV",
        icon: <Target />,
        color: '#00d4ff'
    },
    {
        id: 3,
        role: "Android Penetration Tester",
        company: "THECYBERHOST Pvt. Ltd.",
        date: "Aug 2023 – Sep 2023",
        skills: ["MobSF", "Burp Suite", "ADB"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_android-cybersecurity-vapt-activity-7240356634386931712-h20e",
        icon: <Shield />,
        color: '#bd00ff'
    },
    {
        id: 4,
        role: "Software Developer",
        company: "AirosSpace R&D Pvt. Ltd.",
        date: "Mar 2023 – Jun 2023",
        skills: ["Python", "C++", "Qt6/QML"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_airospace-softwaredevelopment-qt-activity-7240355243736113152-v9ce",
        icon: <Code />,
        color: '#ff6b6b'
    }
]

// --- WAVE PHYSICS CONSTANTS ---
const WAVE_AMPLITUDE_X = 360      // Horizontal swing width
const ROTATION_INTENSITY_Y = 50   // Y-axis rotation degrees
const ROTATION_INTENSITY_Z = 8    // Z-axis tilt degrees
const SPACING_FACTOR = 1.2        // Spacing between cards in scroll units

/**
 * WAVE CARD COMPONENT
 * Physics-based animation with vertical climb, horizontal oscillation
 */
const WaveCard = ({ exp, index, totalItems, scrollYProgress, onCardClick, isDesktop }) => {
    const Icon = exp.icon?.type || Shield
    const lastIndex = totalItems - 1
    const totalTravelDistance = lastIndex * SPACING_FACTOR

    // Phase: represents card's position relative to scroll "camera"
    const phase = useTransform(scrollYProgress, (val) => {
        const cameraPosition = val * totalTravelDistance
        const itemStartOffset = index * SPACING_FACTOR
        return cameraPosition - itemStartOffset
    })

    // Y position: vertical climb with oscillating dip
    const y = useTransform(phase, (p) => {
        const climb = p * 96
        const dip = Math.abs(Math.sin(p)) * 64
        return -(climb - dip)
    })

    // X position: horizontal wave oscillation
    const x = useTransform(phase, (p) => {
        return -Math.sin(p) * WAVE_AMPLITUDE_X
    })

    // Scale: depth-based scaling (front = large, back = small)
    const scale = useTransform(phase, (p) => {
        const depth = Math.cos(p)
        return 0.55 + (depth + 1) * 0.45
    })

    // RotateY: card rotation based on wave position
    const rotateY = useTransform(phase, (p) => {
        return Math.sin(p) * ROTATION_INTENSITY_Y
    })

    // RotateZ: slight tilt
    const rotateZ = useTransform(phase, (p) => {
        return Math.sin(p) * -ROTATION_INTENSITY_Z
    })

    // Z-Index: layering
    const zIndex = useTransform(phase, (p) => {
        return 100 - Math.round(Math.abs(p) * 10)
    })

    // Opacity: fade distant cards
    const opacity = useTransform(phase, (p) => {
        const dist = Math.abs(p)
        if (dist > 4) return 0
        return 1 - (dist / 5)
    })

    // Blur: sharp center focus
    const blur = useTransform(phase, (p) => {
        const dist = Math.abs(p)
        if (dist < 0.35) return 'blur(0px)'
        return `blur(${(dist - 0.35) * 6}px)`
    })

    // Spring configs for smooth motion
    const springConfig = { damping: 18, stiffness: 80, mass: 0.3 }
    const springY = useSpring(y, springConfig)
    const springX = useSpring(x, springConfig)
    const springScale = useSpring(scale, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)

    // MOBILE PHYSICS (Native Scroll for Flat List)
    // We use a local scroll tracker so each card unblurs smoothly exactly like the Vercel physics!
    const cardRef = useRef(null)
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start 90%", "end 10%"]
    })

    // Map scroll progress smoothly exactly like the Vercel physics!
    // 0 = bottom of screen (blurred), 0.35 = center (clear), 0.65 = center (clear), 1 = top of screen (blurred)
    const mobileOpacity = useTransform(cardProgress, [0, 0.35, 0.65, 1], [0.2, 1, 1, 0.2])
    const mobileBlur = useTransform(cardProgress, [0, 0.35, 0.65, 1], ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'])
    const mobileScale = useTransform(cardProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.9])

    // Apply 3D wave on desktop, local scroll physics on mobile
    const animatedStyle = isDesktop ? {
        y: springY,
        x: springX,
        scale: springScale,
        rotateY: springRotateY,
        rotateZ: rotateZ,
        opacity: opacity,
        filter: blur,
        zIndex: zIndex,
        borderColor: exp.color,
        boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${exp.color}30`
    } : {
        opacity: mobileOpacity,
        filter: mobileBlur,
        scale: mobileScale,
        borderColor: exp.color,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 30px ${exp.color}20`
    }

    return (
        <motion.div
            ref={cardRef}
            onClick={() => onCardClick(exp)}
            className={styles.waveCard}
            style={animatedStyle}
            whileHover={{
                boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 80px ${exp.color}50`,
                borderColor: exp.color
            }}
            transition={{ duration: 0.3 }}
        >
            {/* Card Glow */}
            <div
                className={styles.cardGlow}
                style={{ background: `linear-gradient(135deg, ${exp.color}30, transparent 60%)` }}
            />

            {/* Card Content */}
            <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                    <div className={styles.cardIcon} style={{ color: exp.color, borderColor: `${exp.color}50` }}>
                        <Icon />
                    </div>
                    <span className={styles.cardDate} style={{ color: exp.color }}>
                        <Calendar /> {exp.date}
                    </span>
                </div>
                <h3 className={styles.cardRole}>{exp.role}</h3>
                <p className={styles.cardCompany}>{exp.company}</p>
                <div className={styles.cardSkills}>
                    {exp.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className={styles.skillTag} style={{ borderColor: `${exp.color}40` }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

/**
 * PARTICLE SYSTEM - Background ambiance
 */
const ParticleSystem = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.1,
            duration: Math.random() * 15 + 10,
        }))
    }, [])

    return (
        <div className={styles.particleContainer}>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className={styles.particle}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        opacity: [p.opacity, p.opacity * 0.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}

/**
 * MAIN EXPERIENCE COMPONENT
 */
const Experience = () => {
    const containerRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    
    // Time-based popup logic
    const [showBadge, setShowBadge] = useState(false)
    const showBadgeRef = useRef(false)
    const badgeTimeoutRef = useRef(null)
    const prevProgressRef = useRef(0) // Track scroll direction
    
    const isDesktop = useIsDesktop()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // Smooth the scroll progress across the entire container
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 15,
        stiffness: 90,
        mass: 0.2
    })

    // Sync ref with state to avoid re-subscribing
    useEffect(() => {
        showBadgeRef.current = showBadge
    }, [showBadge])

    // Robust, crash-proof listener for older framer-motion versions
    useEffect(() => {
        const unsubscribe = smoothProgress.onChange((latest) => {
            const isScrollingDown = latest > prevProgressRef.current

            // Trigger at 0.98 ONLY if scrolling DOWN (prevents showing when scrolling up from next section)
            if (latest > 0.98 && !showBadgeRef.current && isScrollingDown) {
                setShowBadge(true)
                // Auto-hide after 3 seconds for perfect reading time
                if (badgeTimeoutRef.current) clearTimeout(badgeTimeoutRef.current)
                badgeTimeoutRef.current = setTimeout(() => setShowBadge(false), 3000)
            } 
            // Hide immediately if they scroll back up
            else if (latest < 0.95 && showBadgeRef.current) {
                setShowBadge(false)
                if (badgeTimeoutRef.current) clearTimeout(badgeTimeoutRef.current)
            }

            prevProgressRef.current = latest
        })
        return () => unsubscribe()
    }, [smoothProgress])

    return (
        <section
            id="experience"
            className={styles.experienceWrapper}
            ref={containerRef}
            style={isDesktop ? { height: '500vh' } : {}}
        >
            <div className={styles.stickyContainer}>
                {/* Background Effects */}
                <div className={styles.backgroundEffects}>
                    <div className={styles.glowOrb1} />
                    <div className={styles.glowOrb2} />
                    <div className={styles.gridOverlay} />
                    <ParticleSystem />
                </div>

                {/* Header */}
                <div className={styles.sectionHeader}>
                    <span className={styles.tag}>
                        <Briefcase />
                        Career Path
                    </span>
                    <h2 className={styles.title}>
                        <span className="gradient-text">Professional Experience</span>
                    </h2>
                </div>

                {/* Wave Cards Container */}
                <div className={styles.waveContainer}>
                    {experiences.map((exp, index) => (
                        <WaveCard
                            key={`${isDesktop ? 'desktop' : 'mobile'}-${exp.id}`}
                            exp={exp}
                            index={index}
                            totalItems={experiences.length}
                            scrollYProgress={smoothProgress}
                            isDesktop={isDesktop}
                            onCardClick={(e) => {
                                if (e.image) {
                                    setSelectedImage(e.image)
                                } else if (e.link) {
                                    window.open(e.link, '_blank')
                                }
                            }}
                        />
                    ))}
                </div>

                {/* Completion Indicator (Notification Popup) */}
                <AnimatePresence>
                    {showBadge && (
                        <motion.div
                            className={styles.completionBadge}
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Shield /> All Experience Viewed
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className={styles.lightboxOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                className={styles.lightboxContent}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setSelectedImage(null)}
                                    aria-label="Close details"
                                >
                                    <CloseIcon />
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Internship Details"
                                    className={styles.lightboxImage}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section >
    )
}

export default Experience
