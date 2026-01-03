import { motion } from 'framer-motion'
import styles from './Playground.module.css'

const snippets = [
    { title: 'Bypass-403', lang: 'Python', color: 'blue' },
    { title: 'WiFi-Dumper', lang: 'Bash', color: 'green' },
    { title: 'Keylogger', lang: 'C++', color: 'red' },
    { title: 'Port-Scanner', lang: 'Go', color: 'cyan' },
    { title: 'SQL-Inject', lang: 'SQL', color: 'yellow' },
    { title: 'Shell-Gen', lang: 'Rust', color: 'orange' },
    { title: 'XSS-Payload', lang: 'JS', color: 'purple' },
    { title: 'Hash-Crack', lang: 'Python', color: 'pink' },
    { title: 'Net-Sniff', lang: 'C', color: 'gray' },
]

const Playground = () => {
    return (
        <section className={styles.playground}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>
                        Code <span className={styles.highlight}>Playground</span>
                    </h2>
                    <p className={styles.subtitle}>Experimental Scripts & One-Liners</p>
                </motion.div>

                <div className={styles.gridContainer}>
                    <div className={styles.gridPlane}>
                        {snippets.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`${styles.gridItem} ${styles[item.color]}`}
                                whileHover={{
                                    z: 50,
                                    scale: 1.1,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                    borderColor: 'var(--primary)'
                                }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className={styles.itemContent}>
                                    <span className={styles.lang}>{item.lang}</span>
                                    <h3 className={styles.itemTitle}>{item.title}</h3>
                                    <div className={styles.lines}>
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Playground
