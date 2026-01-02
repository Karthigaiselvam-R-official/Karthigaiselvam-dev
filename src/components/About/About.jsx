import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'

function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className="container">
                <motion.div
                    ref={ref}
                    className={styles.aboutGrid}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Image Side */}
                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className={styles.imageContainer}>
                            <div className={styles.imagePlaceholder}>
                                <span>👨‍💻</span>
                            </div>
                            <div className={styles.imageDecor}></div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            className={styles.statsCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>3+</span>
                                <span className={styles.statLabel}>Years Experience</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span className={styles.sectionTag}>About Me</span>
                        <h2 className={styles.title}>
                            Crafting Digital Experiences with{' '}
                            <span className="gradient-text">Passion & Precision</span>
                        </h2>

                        <p className={styles.description}>
                            I'm a Full Stack Developer based in India, passionate about creating
                            beautiful, functional, and user-centered digital experiences. With a
                            background in computer science and a love for clean code, I bring ideas
                            to life through thoughtful design and robust development.
                        </p>

                        <p className={styles.description}>
                            When I'm not coding, you'll find me exploring new technologies,
                            contributing to open source, or sharing knowledge with the developer
                            community.
                        </p>

                        <div className={styles.highlights}>
                            <div className={styles.highlight}>
                                <div className={styles.highlightIcon}>🎯</div>
                                <div>
                                    <h4>Problem Solver</h4>
                                    <p>Turning complex challenges into elegant solutions</p>
                                </div>
                            </div>
                            <div className={styles.highlight}>
                                <div className={styles.highlightIcon}>⚡</div>
                                <div>
                                    <h4>Fast Learner</h4>
                                    <p>Quickly adapting to new technologies and frameworks</p>
                                </div>
                            </div>
                        </div>

                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download Resume
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
