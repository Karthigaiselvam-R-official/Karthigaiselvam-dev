import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import styles from './Experience.module.css'

// Icons
const Briefcase = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const Calendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
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

const Target = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const experiences = [
    {
        id: 0,
        role: "Cybersecurity Virtual Intern",
        company: "Palo Alto Networks",
        date: "Jul 2024 – Sep 2024",
        skills: ["Network Security", "Cloud Security", "SOC", "Prisma Cloud"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-paloaltonetworks-virtualinternship-activity-7251896001270042624-LQEE",
        icon: <Shield />,
        color: '#00ff88'
    },
    {
        id: 1,
        role: "Cyber Security Project Lead",
        company: "RecuritNxt Technologies",
        date: "Nov 2023 – May 2024",
        skills: ["Project Management", "VAPT", "Team Leadership"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-projectmanagement-teamwork-activity-7240375012514275330-64AV",
        icon: <Target />,
        color: '#00d4ff'
    },
    {
        id: 2,
        role: "Android Penetration Tester",
        company: "THECYBERHOST Pvt. Ltd.",
        date: "Aug 2023 – Sep 2023",
        skills: ["MobSF", "Burp Suite", "ADB"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_android-cybersecurity-vapt-activity-7240356634386931712-h20e",
        icon: <Shield />,
        color: '#bd00ff'
    },
    {
        id: 3,
        role: "Software Developer",
        company: "AirosSpace R&D Pvt. Ltd.",
        date: "Mar 2023 – Jun 2023",
        skills: ["Python", "C++", "Qt6/QML"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_airospace-softwaredevelopment-qt-activity-7240355243736113152-v9ce",
        icon: <Code />,
        color: '#ff6b6b'
    }
]

/**
 * TILTED ELLIPTICAL RING CARD
 * 
 * Based on detailed analysis of 14 scroll sequence images:
 * - Cards orbit on a tilted ellipse (like Saturn's rings viewed at ~35° angle)
 * - FRONT (0°): Large, facing camera, bottom-center
 * - RIGHT (90°): Tilted +60°, right side
 * - BACK (180°): Small, showing BACKFACE (text mirrored), top
 * - LEFT (270°): Tilted -60°, left side
 */
const RingCard = ({ exp, index, totalCards, scrollRotation }) => {
    const springConfig = { stiffness: 60, damping: 20 }

    // Ring geometry - tilted ellipse
    const radiusX = 350      // Horizontal spread
    const radiusZ = 200      // Depth (front-back distance)
    const ringTilt = 0.4     // How much the ring is tilted (affects Y position)
    const radiusY = 150      // Vertical spread of the tilted ellipse

    // Each card starts at a fixed angle (evenly distributed)
    // 4 cards = 90° apart: 0°, 90°, 180°, 270°
    const baseAngle = (index * 360) / totalCards

    // Current angle = base angle + scroll rotation
    // As user scrolls, the entire ring rotates
    const currentAngle = useTransform(scrollRotation, (rotation) => {
        return (baseAngle + rotation) % 360
    })

    // Convert to radians for math
    const angleRad = useTransform(currentAngle, (deg) => (deg * Math.PI) / 180)

    // X position: horizontal position on the ellipse
    // sin(0°) = 0 (center), sin(90°) = 1 (right), sin(180°) = 0, sin(270°) = -1 (left)
    const x = useTransform(angleRad, (rad) => Math.sin(rad) * radiusX)

    // Y position: vertical position (tilted ring effect)
    // Cards at BACK (180°) are HIGHER (negative Y), cards at FRONT (0°) are LOWER (positive Y)
    const y = useTransform(angleRad, (rad) => {
        // cos(0°) = 1 (front, lower), cos(180°) = -1 (back, higher)
        return -Math.cos(rad) * radiusY * ringTilt + 50
    })

    // Z position: depth (front-back)
    // cos(0°) = 1 (front, closest), cos(180°) = -1 (back, furthest)
    const z = useTransform(angleRad, (rad) => Math.cos(rad) * radiusZ)

    // RotateY: card rotation to face outward from ring center
    // At FRONT (0°): rotateY = 0° (faces camera)
    // At RIGHT (90°): rotateY = 60° (tilted right)
    // At BACK (180°): rotateY = 180° (shows backface - text mirrored!)
    // At LEFT (270°): rotateY = -60° (tilted left)
    const rotateY = useTransform(currentAngle, (deg) => {
        // Direct mapping: angle on ring = rotateY of card
        // This makes cards at back show their backface (180°)
        return deg
    })

    // RotateX: slight tilt based on position (tilted ring effect)
    const rotateX = useTransform(angleRad, (rad) => {
        return Math.sin(rad) * 10  // ±10° tilt
    })

    // Scale: front cards larger, back cards smaller
    // map Z from [-200, +200] to [0.6, 1.1]
    const scale = useTransform(z, [-radiusZ, radiusZ], [0.6, 1.15])

    // Opacity: front cards fully visible, back cards faded
    const opacity = useTransform(z, [-radiusZ, radiusZ], [0.45, 1])

    // Z-index based on Z position (front cards on top)
    const zIndex = useTransform(z, (val) => Math.round(100 + val))

    // Springs for smooth animation
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)
    const springScale = useSpring(scale, springConfig)

    return (
        <motion.a
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ringCard}
            style={{
                x: springX,
                y: springY,
                z: z,
                rotateY: springRotateY,
                rotateX: rotateX,
                scale: springScale,
                opacity: opacity,
                zIndex: zIndex,
                borderColor: exp.color,
                boxShadow: `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${exp.color}25`
            }}
            whileHover={{
                scale: 1.15,
                boxShadow: `0 35px 80px rgba(0,0,0,0.6), 0 0 60px ${exp.color}50`
            }}
            transition={{ duration: 0.3 }}
        >
            {/* Card Glow Effect */}
            <div
                className={styles.cardGlow}
                style={{ background: `linear-gradient(135deg, ${exp.color}35, transparent 65%)` }}
            />

            {/* Card Content */}
            <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                    <div className={styles.cardIcon} style={{ color: exp.color, borderColor: `${exp.color}40` }}>
                        {exp.icon}
                    </div>
                    <span className={styles.cardDate} style={{ color: exp.color }}>
                        <Calendar /> {exp.date}
                    </span>
                </div>
                <h4 className={styles.cardRole}>{exp.role}</h4>
                <p className={styles.cardCompany}>{exp.company}</p>
                <div className={styles.cardSkills}>
                    {exp.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className={styles.skillTag} style={{ borderColor: `${exp.color}35` }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.a>
    )
}

const Experience = () => {
    const containerRef = useRef(null)

    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Map scroll progress to rotation
    // Full scroll = 360° (one complete orbit around the ring)
    const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360])

    return (
        <section id="experience" className={styles.section} ref={containerRef}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <span className={styles.tag}>
                        <Briefcase />
                        Career Path
                    </span>
                    <h2 className={styles.title}>
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                </div>

                {/* 3D Tilted Ring Container */}
                <div className={styles.ringContainer}>
                    {experiences.map((exp, index) => (
                        <RingCard
                            key={exp.id}
                            exp={exp}
                            index={index}
                            totalCards={experiences.length}
                            scrollRotation={scrollRotation}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
