
import { motion } from 'framer-motion'
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
        description: "Completed comprehensive cybersecurity training covering Network Security, Cloud Security, and SOC operations. Gained hands-on experience with industry-standard security protocols.",
        skills: ["Network Security", "Cloud Security", "SOC", "Prisma Cloud"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-paloaltonetworks-virtualinternship-activity-7251896001270042624-LQEE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9jGL0BFl_4ZtOzROAOLsKEnN_tfXUp8Z0",
        icon: <Shield />,
        color: "primary"
    },
    {
        id: 1,
        role: "Cyber Security Project Manager Lead",
        company: "RecuritNxt Technologies",
        date: "Nov 2023 – May 2024",
        description: "Led security projects and managed vulnerability assessments. Orchestrated team efforts to identify and mitigate critical security risks.",
        skills: ["Project Management", "Vulnerability Assessment", "Team Leadership"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_cybersecurity-projectmanagement-teamwork-activity-7240375012514275330-64AV?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9jGL0BFl_4ZtOzROAOLsKEnN_tfXUp8Z0",
        icon: <Target />,
        color: "primary"
    },
    {
        id: 2,
        role: "Android Penetration Tester",
        company: "THECYBERHOST Pvt. Ltd.",
        date: "Aug 2023 – Sep 2023",
        description: "Conducted in-depth penetration testing on Android applications. Identified security flaws and provided remediation strategies.",
        skills: ["Android Studio", "MobSF", "Burp Suite", "ADB"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_android-cybersecurity-vapt-activity-7240356634386931712-h20e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9jGL0BFl_4ZtOzROAOLsKEnN_tfXUp8Z0",
        icon: <Shield />,
        color: "secondary"
    },
    {
        id: 3,
        role: "Software Developer",
        company: "AirosSpace R&D Pvt. Ltd.",
        date: "Mar 2023 – Jun 2023",
        description: "Developed robust software solutions and contributed to R&D initiatives. Focused on performance optimization and scalable code.",
        skills: ["Python", "C++", "Software Architecture"],
        link: "https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_airospace-softwaredevelopment-qt-activity-7240355243736113152-v9ce?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD9jGL0BFl_4ZtOzROAOLsKEnN_tfXUp8Z0",
        icon: <Code />,
        color: "accent"
    }
]

const ExperienceCard = ({ exp, index }) => {
    return (
        <motion.div
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right} `}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
        >
            <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card} ${styles[exp.color]} `}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
            >
                <div className={styles.cardHeader}>
                    <div className={`${styles.iconBox} ${styles[exp.color]} `}>
                        {exp.icon}
                    </div>
                    <div className={styles.headerText}>
                        <h3>{exp.role}</h3>
                        <h4>{exp.company}</h4>
                    </div>
                </div>

                <div className={styles.date}>
                    <Calendar />
                    <span>{exp.date}</span>
                </div>

                <p className={styles.description}>
                    {exp.description}
                </p>

                <div className={styles.skills}>
                    {exp.skills.map((skill, i) => (
                        <span key={i} className={styles.skillTag}>
                            {skill}
                        </span>
                    ))}
                </div>
            </a>

            <div className={`${styles.timelineDot} ${styles[exp.color]} `}></div>
        </motion.div>
    )
}

const Experience = () => {
    return (
        <section id="experience" className={styles.section}>
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

                <div className={styles.timeline}>
                    <div className={styles.timelineLine}></div>
                    {experiences.map((exp, index) => (
                        <ExperienceCard key={exp.id} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
