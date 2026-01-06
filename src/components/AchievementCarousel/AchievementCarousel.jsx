import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './AchievementCarousel.module.css'

const Trophy = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
)

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

// Achievements Data
const achievements = [
    {
        id: 0,
        title: 'Hack4Purpose 2024',
        place: 'Top 100 Winning Teams',
        prize: 'National Level Recognition',
        description: 'Developed an innovative security solution for protecting digital infrastructure. Competed against 500+ teams nationwide.',
        images: [
            '/images/hack4purpose_1.png',
            '/images/hack4purpose_2.png',
            '/images/hack4purpose_3.png',
            '/images/hack4purpose_4.png'
        ],
        link: 'https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_hello-everyone-i-am-thrilled-to-activity-7240367648004300802-xcs7',
        color: '#00ff88'
    },
    {
        id: 1,
        title: 'IIIT-Delhi Pitch-Cafe 7.0',
        place: 'First Runner-up (2nd)',
        prize: '₹20,000 Cash Prize',
        description: 'Pitched a cybersecurity startup idea focused on automated vulnerability detection using AI/ML techniques.',
        images: [
            '/images/pitchcafe_1.png',
            '/images/pitchcafe_2.png',
            '/images/pitchcafe_3.png'
        ],
        link: 'https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_im-pleased-to-announce-that-our-team-achieved-activity-7240364228069441537-H7Wm',
        color: '#00d4ff'
    },
    {
        id: 2,
        title: 'Y2E Ideathon',
        place: 'First Runner-up (2nd)',
        prize: '₹10,000 Cash Prize',
        description: 'Presented an entrepreneurial solution combining cybersecurity with emerging technologies for enterprise protection.',
        images: [
            '/images/y2e_1.png',
            '/images/y2e_2.png',
            '/images/y2e_3.png',
            '/images/y2e_4.png'
        ],
        link: 'https://www.linkedin.com/posts/karthigaiselvam-r-7b9197258_entrepreneurship-cybersecurity-innovation-activity-7240362391954186240--oqp',
        color: '#bd00ff'
    }
]

const AchievementCarousel = () => {
    const [activeAchievement, setActiveAchievement] = useState(0)
    const [imageIndex, setImageIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImage, setLightboxImage] = useState('')

    const currentAchievement = achievements[activeAchievement]
    const currentImages = currentAchievement.images

    // Auto-rotate achievements every 6 seconds (pause when lightbox open)
    useEffect(() => {
        if (lightboxOpen) return
        const interval = setInterval(() => {
            setActiveAchievement((prev) => (prev + 1) % achievements.length)
            setImageIndex(0)
        }, 6000)
        return () => clearInterval(interval)
    }, [lightboxOpen])

    // Auto-rotate images within current achievement every 2 seconds
    useEffect(() => {
        if (lightboxOpen) return
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % currentImages.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [activeAchievement, currentImages.length, lightboxOpen])

    const openLightbox = (image) => {
        setLightboxImage(image)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setLightboxImage('')
        // Immediately move to next image when closing
        setImageIndex((prev) => (prev + 1) % currentImages.length)
    }

    const getCardStyle = (index) => {
        const totalImages = currentImages.length
        const diff = index - imageIndex
        const normalizedDiff = ((diff % totalImages) + totalImages) % totalImages

        if (normalizedDiff === 0) {
            return {
                transform: 'translateZ(0px) rotateY(0deg) scale(1)',
                opacity: 1,
                zIndex: 10
            }
        } else if (normalizedDiff === 1) {
            return {
                transform: 'translateX(55%) translateZ(-120px) rotateY(-25deg) scale(0.8)',
                opacity: 0.5,
                zIndex: 5
            }
        } else if (normalizedDiff === totalImages - 1) {
            return {
                transform: 'translateX(-55%) translateZ(-120px) rotateY(25deg) scale(0.8)',
                opacity: 0.5,
                zIndex: 5
            }
        } else {
            return {
                transform: 'translateZ(-200px) scale(0.6)',
                opacity: 0,
                zIndex: 0
            }
        }
    }

    return (
        <section className={styles.carouselSection}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="gradient-text">Key Achievements</span>
                </motion.h2>

                <div className={styles.carouselWrapper}>
                    {/* Left Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`left-${activeAchievement}`}
                            className={styles.leftContent}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={styles.achievementHeader}>
                                <Trophy />
                                <h3 style={{ color: currentAchievement.color }}>{currentAchievement.title}</h3>
                            </div>
                            <p className={styles.achievementDescription}>
                                {currentAchievement.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* 3D Carousel for current achievement's images */}
                    <div className={styles.carousel3D}>
                        <AnimatePresence mode="sync">
                            {currentImages.map((image, index) => (
                                <motion.div
                                    key={`${activeAchievement}-${index}`}
                                    className={styles.carouselCard}
                                    style={{
                                        borderColor: index === imageIndex ? currentAchievement.color : 'rgba(255,255,255,0.1)'
                                    }}
                                    onClick={() => {
                                        if (index === imageIndex) {
                                            openLightbox(image)
                                        } else {
                                            setImageIndex(index)
                                        }
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={getCardStyle(index)}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <img
                                        src={image}
                                        alt={`${currentAchievement.title} - ${index + 1}`}
                                        className={styles.cardImage}
                                    />
                                    <div
                                        className={styles.cardGlow}
                                        style={{ boxShadow: `0 0 50px ${currentAchievement.color}40` }}
                                    />
                                    {index === imageIndex && (
                                        <div className={styles.clickHint}>
                                            Click to view full image
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Image Dot Indicators */}
                        <div className={styles.imageIndicators}>
                            {currentImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.imageDotWrapper} ${index === imageIndex ? styles.activeImageDotWrapper : ''}`}
                                    onClick={() => setImageIndex(index)}
                                    aria-label={`View image ${index + 1} of ${currentImages.length}`}
                                >
                                    <span
                                        className={styles.imageDot}
                                        style={{
                                            backgroundColor: index === imageIndex ? currentAchievement.color : 'rgba(255,255,255,0.3)'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`right-${activeAchievement}`}
                            className={styles.rightContent}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={styles.achievementStats}>
                                <span className={styles.place}>{currentAchievement.place}</span>
                                <span className={styles.prize} style={{ color: currentAchievement.color }}>
                                    {currentAchievement.prize}
                                </span>
                            </div>
                            <motion.a
                                href={currentAchievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.knowMoreBtn}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ borderColor: currentAchievement.color, color: currentAchievement.color }}
                                aria-label={`View ${currentAchievement.title} details on LinkedIn`}
                            >
                                VIEW ON LINKEDIN
                            </motion.a>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Achievement Navigation Dots */}
                <div className={styles.achievementIndicators}>
                    {achievements.map((achievement, index) => (
                        <button
                            key={index}
                            className={`${styles.achievementDot} ${index === activeAchievement ? styles.activeAchievementDot : ''}`}
                            onClick={() => {
                                setActiveAchievement(index)
                                setImageIndex(0)
                            }}
                            style={{
                                backgroundColor: index === activeAchievement ? achievement.color : 'rgba(255,255,255,0.2)',
                                borderColor: achievement.color
                            }}
                            aria-label={`View achievement: ${achievement.title}`}
                        >
                            <span className={styles.dotLabel}>{index + 1}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className={styles.lightboxOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className={styles.lightboxContent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeBtn}
                                onClick={closeLightbox}
                                aria-label="Close full size view"
                            >
                                <CloseIcon />
                            </button>
                            <img
                                src={lightboxImage}
                                alt="Full size achievement"
                                className={styles.lightboxImage}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default AchievementCarousel
