import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Skills.module.css'

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', icon: '⚛️', level: 90 },
            { name: 'JavaScript', icon: '📜', level: 95 },
            { name: 'TypeScript', icon: '🔷', level: 85 },
            { name: 'HTML/CSS', icon: '🎨', level: 95 },
            { name: 'Next.js', icon: '▲', level: 80 },
        ]
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: '🟢', level: 88 },
            { name: 'Python', icon: '🐍', level: 85 },
            { name: 'Express', icon: '🚂', level: 85 },
            { name: 'MongoDB', icon: '🍃', level: 80 },
            { name: 'PostgreSQL', icon: '🐘', level: 75 },
        ]
    },
    {
        title: 'Tools & Others',
        skills: [
            { name: 'Git', icon: '📦', level: 90 },
            { name: 'Docker', icon: '🐳', level: 75 },
            { name: 'Linux', icon: '🐧', level: 85 },
            { name: 'AWS', icon: '☁️', level: 70 },
            { name: 'Figma', icon: '🎯', level: 80 },
        ]
    }
]

function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="skills" className={`section ${styles.skills}`}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className={styles.sectionTag}>My Skills</span>
                    <h2 className={styles.title}>
                        Technologies I <span className="gradient-text">Work With</span>
                    </h2>
                    <p className={styles.subtitle}>
                        I'm constantly learning and expanding my toolkit to build better solutions
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    className={styles.categoriesGrid}
                >
                    {skillCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            className={styles.category}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ delay: catIndex * 0.2 }}
                        >
                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                            <div className={styles.skillsList}>
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        className={styles.skillCard}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ delay: catIndex * 0.2 + skillIndex * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <span className={styles.skillIcon}>{skill.icon}</span>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <div className={styles.skillLevel}>
                                            <motion.div
                                                className={styles.skillProgress}
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{ delay: catIndex * 0.2 + skillIndex * 0.1 + 0.3, duration: 0.8 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
