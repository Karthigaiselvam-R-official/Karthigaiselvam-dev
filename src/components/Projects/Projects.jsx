import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import styles from './Projects.module.css'

// SVG Icons
const Github = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const GitFork = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
        <path d="M12 12v3" />
    </svg>
)

const Folder = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
)

const ArrowRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)

const Loader = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
)

// GitHub Config
const GITHUB_USERNAME = 'Karthigaiselvam-R-official'
// GitHub Token for 5000 requests/hour (set in .env.local as VITE_GITHUB_TOKEN)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

// Custom descriptions for known projects
const projectDescriptions = {
    'AsusTufFanControl_Linux': 'A powerful system control utility for ASUS TUF and ROG laptops on Linux. Features advanced Fan Control, Battery Health, and Aura Sync RGB.',
    'Vulnerability_Scanner': 'Automated security scanning tool for web applications. Detects SQLi, XSS, CSRF, and SSRF vulnerabilities.',
    '403-bypass3r': 'Advanced script to bypass 403 Forbidden errors during penetration testing and bug bounty hunting.',
    'Smart_Attendance': 'Face recognition based attendance system using Python and OpenCV. Efficient and automated.',
    'Land_Registry_Using_BlockChain': 'Blockchain-based land registry system built with Solidity and Web3.js.',
}

// Custom images for known projects
const projectImages = {
    'AsusTufFanControl_Linux': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/AsusTufFanControl_Linux/main/resources/SystemInfo.png',
    '403-bypass3r': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/403-bypass3r/main/Pasted%20image.png',
    'Smart_Attendance': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/Smart_Attendance/main/Screenshot%202024-10-06%20194055.png',
}

// Language colors for GitHub
const getLanguageColor = (language) => {
    const colors = {
        'Python': '#3572A5',
        'QML': '#44a51c',
        'Shell': '#89e051',
        'HTML': '#e34c26',
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C': '#555555',
        'Solidity': '#AA6746',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Java': '#b07219',
    }
    return colors[language] || '#8892a0'
}

function Projects() {
    const containerRef = useRef(null)
    const sliderRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef })

    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // Fetch ALL repos from GitHub API with automatic README image extraction
    useEffect(() => {
        // Extract ALL valid images from README for 3D carousel
        const extractAllImagesFromReadme = (readmeContent, repoFullName, defaultBranch) => {
            if (!readmeContent) return []

            // Decode base64 README content
            const decodedContent = atob(readmeContent)

            // Find ALL images in the README
            const mdImageRegex = /!\[.*?\]\((.*?)\)/g
            const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/g

            const allImages = []
            let match

            while ((match = mdImageRegex.exec(decodedContent)) !== null) {
                allImages.push(match[1])
            }
            while ((match = htmlImageRegex.exec(decodedContent)) !== null) {
                allImages.push(match[1])
            }

            // Filter out badges and icons, find actual content images
            const badgePatterns = [
                'shields.io',
                'img.shields.io',
                'badge',
                'logo=',
                'style=for-the-badge',
                '.svg'
            ]

            const validImages = allImages.filter(url => {
                const lowerUrl = url.toLowerCase()
                if (badgePatterns.some(pattern => lowerUrl.includes(pattern))) {
                    return false
                }
                if (lowerUrl.includes('.png') || lowerUrl.includes('.jpg') || lowerUrl.includes('.jpeg') || lowerUrl.includes('.gif') || lowerUrl.includes('.webp')) {
                    return true
                }
                return false
            })

            // Convert relative paths to raw GitHub URLs
            return validImages.map(url => {
                if (!url.startsWith('http')) {
                    return `https://raw.githubusercontent.com/${repoFullName}/${defaultBranch}/${url}`
                }
                return url
            })
        }

        const fetchRepos = async () => {
            try {
                setLoading(true)

                // Build headers with optional token for higher rate limits
                const headers = { 'Accept': 'application/vnd.github.v3+json' }
                if (GITHUB_TOKEN) {
                    headers['Authorization'] = `token ${GITHUB_TOKEN}`
                }

                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
                    { headers }
                )

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('Rate limit exceeded. Add VITE_GITHUB_TOKEN to .env.local')
                    }
                    throw new Error(`Failed to fetch repos (${response.status})`)
                }

                const allRepos = await response.json()

                // Filter out forks
                const filteredRepos = allRepos.filter(repo => !repo.fork)


                // Fetch README for each repo to extract ALL images for carousel
                const reposWithImages = await Promise.all(
                    filteredRepos.map(async (repo) => {
                        let images = []

                        // Fetch README with auth token for higher rate limit
                        try {
                            const readmeHeaders = { 'Accept': 'application/vnd.github.v3+json' }
                            if (GITHUB_TOKEN) {
                                readmeHeaders['Authorization'] = `token ${GITHUB_TOKEN}`
                            }

                            const readmeResponse = await fetch(
                                `https://api.github.com/repos/${repo.full_name}/readme`,
                                { headers: readmeHeaders }
                            )
                            if (readmeResponse.ok) {
                                const readmeData = await readmeResponse.json()
                                images = extractAllImagesFromReadme(
                                    readmeData.content,
                                    repo.full_name,
                                    repo.default_branch
                                )
                            }
                        } catch (e) {
                            // Silently fail - some repos may not have README
                        }

                        return {
                            ...repo,
                            customDescription: projectDescriptions[repo.name] || repo.description || 'A project from my GitHub.',
                            images, // Array of all images for carousel
                            image: images[0] || null, // First image for backwards compatibility
                        }
                    })
                )

                // Sort by stars then by update date
                const sortedRepos = reposWithImages.sort((a, b) => {
                    if (b.stargazers_count !== a.stargazers_count) {
                        return b.stargazers_count - a.stargazers_count
                    }
                    return new Date(b.updated_at) - new Date(a.updated_at)
                })

                setRepos(sortedRepos)
                setError(null)
            } catch (err) {
                console.error('Error fetching repos:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchRepos()
        const interval = setInterval(fetchRepos, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    // Calculate scroll transform
    // Card width = 420px, gap = 60px, so each card takes ~480px
    // We want to scroll from 0% to -(100% - viewportWidth/totalWidth)
    // For reliable scrolling, we calculate based on number of cards
    const cardCount = repos.length

    // Track active index based on scroll
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, cardCount - 1)])

    // Simple direct tracking - each scroll position maps to exactly one card
    // Using Math.floor ensures every card index is hit as scroll progresses
    useEffect(() => {
        const unsubscribe = currentIndex.on('change', (latest) => {
            // Floor ensures we don't skip - we stay on a card until fully past it
            const newIndex = Math.max(0, Math.min(Math.floor(latest + 0.5), cardCount - 1))
            setActiveIndex(newIndex)
        })
        return unsubscribe
    }, [currentIndex, cardCount])

    // Transform: scroll horizontally as user scrolls vertically
    // DYNAMIC FORMULA: Using 16% per card to show last repo fully
    const scrollEndPercent = cardCount > 1 ? cardCount * 14.2 : 0
    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${scrollEndPercent}%`])

    return (
        <section id="projects" className={styles.projectsWrapper} ref={containerRef}>
            <div className={styles.stickyContainer}>
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="section-tag">
                            <Folder />
                            My Work
                        </span>
                        <h2 className="section-title">
                            <span className="gradient-text">Featured Project Vault</span>
                        </h2>
                        <p className="section-subtitle">
                            Security tools and applications - fetched live from GitHub
                            {loading && <Loader />}
                            {error && <span style={{ color: '#ff5555', marginLeft: '10px' }}>Error: {error}</span>}
                        </p>
                    </motion.div>
                </div>

                <div className={styles.sliderContainer}>
                    <motion.div
                        className={styles.slider}
                        style={{ x }}
                        ref={sliderRef}
                    >
                        {repos.map((repo, index) => {
                            const isActive = index === activeIndex

                            return (
                                <motion.article
                                    key={repo.id || repo.name}
                                    className={`${styles.projectCard} ${isActive ? styles.activeCard : ''}`}
                                    animate={{
                                        scale: isActive ? 1.1 : 0.9,
                                        zIndex: isActive ? 20 : 1,
                                        opacity: isActive ? 1 : 0.7
                                    }}
                                    whileHover={{ scale: isActive ? 1.12 : 0.95, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Project Images - 3D Carousel if multiple */}
                                    {repo.images && repo.images.length > 0 && (
                                        <div className={styles.projectImageWrapper}>
                                            {repo.images.length === 1 ? (
                                                // Single image
                                                <img src={repo.images[0]} alt={repo.name} className={styles.projectImage} />
                                            ) : (
                                                // 3D Auto-Carousel for multiple images
                                                <div
                                                    className={styles.imageCarousel}
                                                    style={{
                                                        '--total-images': repo.images.length,
                                                        '--animation-duration': `${repo.images.length * 3}s`
                                                    }}
                                                >
                                                    {repo.images.map((img, imgIndex) => (
                                                        <img
                                                            key={imgIndex}
                                                            src={img}
                                                            alt={`${repo.name} ${imgIndex + 1}`}
                                                            className={styles.carouselImage}
                                                            style={{
                                                                animationDelay: `${imgIndex * 3}s`
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            <div className={styles.imageOverlay}></div>
                                        </div>
                                    )}

                                    {/* Terminal Header */}
                                    <div className={styles.cardHeader}>
                                        <div className={styles.dots}>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                        </div>
                                        <span className={styles.cardPath}>~/{repo.name.toLowerCase()}</span>
                                        <div className={styles.cardLinks}>
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.cardLink}
                                                aria-label={`View ${repo.name} on GitHub`}
                                            >
                                                <Github />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.projectTitle}>{repo.name.replace(/_/g, ' ')}</h3>
                                        <p className={styles.projectDescription}>{repo.customDescription}</p>

                                        {/* Tags */}
                                        <div className={styles.projectTags}>
                                            {repo.topics?.slice(0, 4).map((tag) => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            )) || (
                                                    <span className={styles.tag}>{repo.language || 'Code'}</span>
                                                )}
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className={styles.cardFooter}>
                                        <div className={styles.projectMeta}>
                                            <span className={styles.language}>
                                                <span
                                                    className={styles.languageDot}
                                                    style={{ background: getLanguageColor(repo.language) }}
                                                ></span>
                                                {repo.language || 'Unknown'}
                                            </span>
                                            <span className={styles.stars}>
                                                <Star />
                                                {repo.stargazers_count}
                                            </span>
                                            <span className={styles.forks}>
                                                <GitFork />
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.viewProject}
                                            aria-label={`View source code for ${repo.name}`}
                                        >
                                            View Code
                                            <ArrowRight />
                                        </a>
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Projects
