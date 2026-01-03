import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import styles from './Projects.module.css'

// ... (Keep existing SVG Icons and Constants: Github, Star, GitFork, Folder, ArrowRight, Loader, FEATURED_REPOS, GITHUB_USERNAME, projectDescriptions, projectImages) ...

// Keep SVG Icons
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

const FEATURED_REPOS = [
    'AsusTufFanControl_Linux',
    'Smart_Attendance',
    '403-bypass3r',
    'Vulnerability_Scanner',
    'Land_Registry_Using_BlockChain',
]

const GITHUB_USERNAME = 'Karthigaiselvam-R-official'

const projectDescriptions = {
    'AsusTufFanControl_Linux': 'A powerful, expert-level system control utility for ASUS TUF and ROG laptops on Linux. Features advanced Fan Control, Battery Health management, and Aura Sync RGB customization with Qt6/QML.',
    'Vulnerability_Scanner': 'Automated security scanning tool for modern web applications. Detects SQLi, XSS, CSRF, and SSRF vulnerabilities with high accuracy.',
    '403-bypass3r': 'Advanced script to bypass 403 Forbidden errors during penetration testing and bug bounty hunting. Multiple bypass techniques implemented.',
    'Smart_Attendance': 'Face recognition based attendance system using Python and OpenCV. Efficient, accurate, and automated for classrooms/offices.',
    'Land_Registry_Using_BlockChain': 'Blockchain-based land registry system built with Solidity, Web3.js, and Truffle Suite for secure, decentralized property transactions.',
}

const projectImages = {
    'AsusTufFanControl_Linux': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/AsusTufFanControl_Linux/main/resources/SystemInfo.png',
    '403-bypass3r': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/403-bypass3r/main/Pasted%20image.png',
    'Smart_Attendance': 'https://raw.githubusercontent.com/Karthigaiselvam-R-official/Smart_Attendance/main/Screenshot%202024-10-06%20194055.png',
}

function Projects() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef })
    // Only scroll the featured projects slider horizontally
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch repos from GitHub API
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)

                if (!response.ok) {
                    throw new Error('Failed to fetch repos')
                }

                const allRepos = await response.json()

                // Filter to featured repos and add descriptions
                const featuredRepos = FEATURED_REPOS.map(repoName => {
                    const repo = allRepos.find(r => r.name === repoName)
                    if (repo) {
                        return {
                            ...repo,
                            customDescription: projectDescriptions[repoName] || repo.description,
                            image: projectImages[repoName],
                            featured: FEATURED_REPOS.indexOf(repoName) < 3
                        }
                    }
                    return null
                }).filter(Boolean)

                setRepos(featuredRepos)
                setError(null)
            } catch (err) {
                console.error('Error fetching repos:', err)
                setError(err.message)
                // Fallback to static data
                setRepos(FEATURED_REPOS.map((name, i) => ({
                    name,
                    html_url: `https://github.com/${GITHUB_USERNAME}/${name}`,
                    stargazers_count: 0,
                    forks_count: 0,
                    language: 'Unknown',
                    customDescription: projectDescriptions[name],
                    image: projectImages[name],
                    featured: i < 3
                })))
            } finally {
                setLoading(false)
            }
        }

        fetchRepos()

        // Refresh every 5 minutes
        const interval = setInterval(fetchRepos, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const getLanguageColor = (language) => {
        const colors = {
            'Python': '#3572A5',
            'QML': '#44a51c',
            'Shell': '#89e051',
            'HTML': '#e34c26',
            'JavaScript': '#f1e05a',
            'C++': '#f34b7d',
            'C': '#555555',
            'Solidity': '#AA6746',
        }
        return colors[language] || '#8892a0'
    }

    const featuredProjects = repos.filter(r => r.featured)
    const otherProjects = repos.filter(r => !r.featured)

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
                            Featured <span className="gradient-text">Project Vault</span>
                        </h2>
                        <p className="section-subtitle">
                            Security tools and applications - fetched live from GitHub
                            {loading && <Loader />}
                        </p>
                    </motion.div>
                </div>

                <div className={styles.sliderContainer}>
                    <motion.div className={styles.slider} style={{ x }}>
                        {featuredProjects.map((repo, index) => (
                            <motion.article
                                key={repo.name}
                                className={styles.projectCard}
                                whileHover={{ scale: 1.02, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Project Image */}
                                {repo.image && (
                                    <div className={styles.projectImageWrapper}>
                                        <img src={repo.image} alt={repo.name} className={styles.projectImage} />
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
                                            aria-label="View on GitHub"
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
                                    >
                                        View Code
                                        <ArrowRight />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Other Projects Section (Static below the scroll) */}
            <div className="container" style={{ paddingBottom: '100px' }}>
                <div className={styles.otherProjects}>
                    <h3 className={styles.otherTitle}>More Archives</h3>
                    <div className={styles.otherGrid}>
                        {otherProjects.map((repo, index) => (
                            <motion.a
                                key={repo.name}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.otherCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                            >
                                <div className={styles.otherHeader}>
                                    <Folder />
                                    <h4>{repo.name.replace(/_/g, ' ')}</h4>
                                </div>
                                <p>{repo.customDescription}</p>
                                <div className={styles.otherMeta}>
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
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
                {/* View All Button */}
                <div className={styles.viewMore}>
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        <Github />
                        View All Projects
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Projects
