import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Projects.module.css'

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: '🛒',
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 2,
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team workspaces.',
        tags: ['React', 'Firebase', 'Tailwind'],
        image: '📋',
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 3,
        title: 'AI Chat Assistant',
        description: 'An intelligent chatbot powered by OpenAI API with conversation history, context awareness, and multiple personality modes.',
        tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
        image: '🤖',
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        id: 4,
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with React and Framer Motion featuring smooth animations and dark theme.',
        tags: ['React', 'Vite', 'Framer Motion'],
        image: '🌐',
        github: 'https://github.com',
        live: 'https://example.com',
    },
]

function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="projects" className={`section ${styles.projects}`}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className={styles.sectionTag}>My Work</span>
                    <h2 className={styles.title}>
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Here are some of the projects I've worked on recently
                    </p>
                </motion.div>

                <motion.div ref={ref} className={styles.projectsGrid}>
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            className={styles.projectCard}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={styles.projectImage}>
                                <span className={styles.projectEmoji}>{project.image}</span>
                                <div className={styles.projectOverlay}>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.projectLink}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.projectLink}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div className={styles.projectContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectDescription}>{project.description}</p>
                                <div className={styles.projectTags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    className={styles.viewMore}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        View All Projects
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
