import { motion } from 'framer-motion'
import styles from './Hero.module.css'

function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        className={styles.greeting}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Hello, I'm
                    </motion.p>

                    <motion.h1
                        className={styles.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Karthigaiselvam <span className="gradient-text">R</span>
                    </motion.h1>

                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Full Stack Developer
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        I craft exceptional digital experiences through clean code and creative design.
                        Passionate about building scalable web applications that make a difference.
                    </motion.p>

                    <motion.div
                        className={styles.buttons}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.a
                            href="#projects"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View My Work
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch
                        </motion.a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.heroVisual}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className={styles.codeBlock}>
                        <div className={styles.codeHeader}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                        <pre className={styles.code}>
                            <code>
                                {`const developer = {
  name: "Karthigaiselvam R",
  role: "Full Stack Developer",
  skills: [
    "React", "Node.js",
    "TypeScript", "Python"
  ],
  passion: "Building amazing
            web experiences"
};`}
                            </code>
                        </pre>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        className={`${styles.floatingIcon} ${styles.icon1}`}
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        ⚛️
                    </motion.div>
                    <motion.div
                        className={`${styles.floatingIcon} ${styles.icon2}`}
                        animate={{ y: [10, -10, 10] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        🚀
                    </motion.div>
                    <motion.div
                        className={`${styles.floatingIcon} ${styles.icon3}`}
                        animate={{ y: [-5, 15, -5] }}
                        transition={{ repeat: Infinity, duration: 3.5 }}
                    >
                        💻
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span>Scroll Down</span>
                <motion.div
                    className={styles.scrollMouse}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <div className={styles.scrollWheel}></div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
