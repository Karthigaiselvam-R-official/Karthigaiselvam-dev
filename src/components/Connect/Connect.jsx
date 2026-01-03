import { motion } from 'framer-motion'
import styles from './Connect.module.css'

const Connect = () => {
    return (
        <section className={styles.connect}>
            {/* Animated Stars Background */}
            <div className={styles.stars}>
                {[...Array(30)].map((_, i) => (
                    <span
                        key={i}
                        className={styles.star}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div className={styles.content}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    That's All, Folks! Intrigued?
                </motion.h2>

                <motion.a
                    href="#contact"
                    className={styles.ctaButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Let's Connect →
                    <span className={styles.cursor}>▶</span>
                </motion.a>

                <motion.p
                    className={styles.warning}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    Warning: Working with me might result in an overload<br />
                    of secure code & smashed vulnerabilities. Proceed with caution.
                </motion.p>
            </div>

            {/* Curved Bottom Edge */}
            <div className={styles.curvedEdge}></div>
        </section>
    )
}

export default Connect
