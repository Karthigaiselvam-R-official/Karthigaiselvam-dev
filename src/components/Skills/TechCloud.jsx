import { useEffect, useRef } from 'react'
import TagCloud from 'TagCloud'
import styles from './Skills.module.css'

const mySkills = [
    'JavaScript', 'React', 'Node.js', 'Python',
    'C++', 'Git', 'Linux', 'Docker',
    'Figma', 'Burp Suite', 'Metasploit', 'Nmap',
    'Wireshark', 'Bash', 'SQL', 'MongoDB',
    'Tailwind', 'Framer', 'Three.js', 'Vite'
]

const TechCloud = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            // Container must be a direct DOM element for TagCloud
            const container = containerRef.current

            // Cleanup previous instance if strict mode causes double render
            container.innerHTML = ''

            TagCloud(container, mySkills, {
                radius: 300,
                maxSpeed: 'fast',
                initSpeed: 'normal',
                direction: 135,
                keep: true,
                useContainerInlineStyles: false,
                containerClass: 'tagcloud',
                itemClass: 'tagcloud-item'
            })
        }
    }, [])

    return (
        <div className={styles.cloudWrapper}>
            <div ref={containerRef} className={styles.cloudContainer}></div>
        </div>
    )
}

export default TechCloud
