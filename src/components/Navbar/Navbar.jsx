import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Scroll Lock when Mobile Menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }

        // Cleanup ensures we don't leave the page locked if component unmounts
        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    return (
        <motion.nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`container ${styles.navContainer}`}>
                <motion.a
                    href="#home"
                    className={styles.logo}
                    whileHover={{ scale: 1.02 }}
                >
                    <span className={styles.logoSymbol}>&lt;</span>
                    <span className={styles.logoText}>Karthi</span>
                    <span className={styles.logoAccent}>...R</span>
                    <span className={styles.logoSymbol}>/&gt;</span>
                </motion.a>

                {/* Desktop Menu */}
                <ul className={styles.navLinks}>
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a href={link.href} className={styles.navLink}>
                                <span className={styles.linkNumber}>0{index + 1}.</span>
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                </ul>

                <motion.a
                    href="#contact"
                    className={`btn btn-primary ${styles.ctaBtn}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Hire Me
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
                initial={false}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
            >
                <ul className={styles.mobileLinks}>
                    {navLinks.map((link, index) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                <span className={styles.linkNumber}>0{index + 1}</span>
                            </a>
                        </li>
                    ))}

                    {/* Mobile CTA Button */}
                    <li style={{ width: '100%', listStyle: 'none' }}>
                        <a
                            href="#contact"
                            className={styles.mobileCta}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Start Project
                        </a>
                    </li>
                </ul>
            </motion.div>
        </motion.nav>
    )
}

export default Navbar
