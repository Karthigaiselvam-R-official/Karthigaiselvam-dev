import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import SkillGraph from './SkillGraph'
import styles from './Skills.module.css'

// Skill data for mobile grid view
const skillCategories = [
    {
        id: 'security',
        label: 'Cyber Security',
        color: '#00ff88',
        skills: ['Pentesting', 'Web Sec', 'Android', 'Network Sec', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark']
    },
    {
        id: 'dev',
        label: 'Development',
        color: '#00d4ff',
        skills: ['Python', 'C++', 'JavaScript', 'React', 'Node.js', 'Qt6 / QML', 'SQL']
    },
    {
        id: 'ops',
        label: 'Ops & Tools',
        color: '#bd00ff',
        skills: ['Linux', 'Bash', 'Git', 'Docker']
    }
]

const Skills = () => {
    return (
        <section id="skills" className={styles.skills}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span className="section-tag">
                        <Cpu size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'text-bottom' }} />
                        Technical Arsenal
                    </span>
                    <h2 className="section-title">
                        <span className="gradient-text">Skill Matrix</span>
                    </h2>
                    <p className="section-subtitle">
                        Visualizing my core competencies and toolset
                    </p>
                </div>

                {/* Desktop: Complex Graph */}
                <SkillGraph />

                {/* Mobile: Simple Grid View */}
                <div className={styles.mobileSkillsGrid}>
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            className={styles.mobileCategory}
                            style={{ borderColor: category.color }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3
                                className={styles.mobileCategoryTitle}
                                style={{ color: category.color }}
                            >
                                {category.label}
                            </h3>
                        </motion.div>
                    ))}
                    {skillCategories.map((category) => (
                        category.skills.map((skill, index) => (
                            <motion.div
                                key={`${category.id}-${skill}`}
                                className={styles.mobileSkillBadge}
                                style={{ borderColor: `${category.color}40` }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {skill}
                            </motion.div>
                        ))
                    )).flat()}
                </div>
            </div>

            {/* Background ambiance */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, #000 80%)',
                pointerEvents: 'none',
                zIndex: 1
            }} />
        </section>
    )
}

export default Skills

