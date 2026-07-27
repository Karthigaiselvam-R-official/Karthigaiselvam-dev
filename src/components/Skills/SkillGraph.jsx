import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import styles from './Skills.module.css'

const Fingerprint = () => (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10v.8c0 1.25-.97 2.2-2.12 2.2-1.03 0-1.88-.84-1.88-1.88V12c0-3.31-2.69-6-6-6s-6 2.69-6 6v2.5c0 1.5 1.13 2.7 2.63 2.7h.37c2.2 0 4-1.8 4-4 0-1.1-.9-2-2-2s-2 .9-2 2v2" />
    </svg>
)

// Skill Data Structure
const skillData = {
    id: 'core',
    label: 'Karthigaiselvam',
    type: 'core',
    children: [
        {
            id: 'security',
            label: 'Cyber Security',
            type: 'category',
            color: '#00ff88',
            children: [
                { id: 'pentest', label: 'Pentesting', type: 'skill' },
                { id: 'websec', label: 'Web App Security', type: 'skill' },
                { id: 'network', label: 'Network Security', type: 'skill' },
                { id: 'malware', label: 'Malware Analysis', type: 'skill' },
                { id: 'reveng', label: 'Reverse Engineering', type: 'skill' },
                { id: 'burp', label: 'Burp Suite', type: 'skill' },
                { id: 'meta', label: 'Metasploit', type: 'skill' },
                { id: 'nmap', label: 'Nmap', type: 'skill' },
                { id: 'wireshark', label: 'Wireshark', type: 'skill' },
                { id: 'nessus', label: 'Nessus', type: 'skill' },
            ]
        },
        {
            id: 'dev',
            label: 'Development',
            type: 'category',
            color: '#00d4ff',
            children: [
                { id: 'python', label: 'Python', type: 'skill' },
                { id: 'cpp', label: 'C++', type: 'skill' },
                { id: 'go', label: 'Go', type: 'skill' },
                { id: 'bash', label: 'Bash', type: 'skill' },
                { id: 'js', label: 'JavaScript', type: 'skill' },
                { id: 'react', label: 'React', type: 'skill' },
                { id: 'node', label: 'Node.js', type: 'skill' },
                { id: 'sql', label: 'SQL', type: 'skill' },
                { id: 'solidity', label: 'Solidity', type: 'skill' },
            ]
        },
        {
            id: 'ops',
            label: 'Ops & Tools',
            type: 'category',
            color: '#bd00ff',
            children: [
                { id: 'linux', label: 'Linux', type: 'skill' },
                { id: 'git', label: 'Git', type: 'skill' },
                { id: 'docker', label: 'Docker', type: 'skill' },
                { id: 'risk', label: 'Risk Management', type: 'skill' },
                { id: 'incident', label: 'Incident Response', type: 'skill' },
            ]
        }
    ]
}

const SkillGraph = () => {
    // Generate Positions (Radial Layout)
    const nodes = useMemo(() => {
        const nodeList = []
        const edgesList = []

        // Center
        nodeList.push({ ...skillData, x: 51.5, y: 50, level: 0 })

        // Categories (Level 1)
        const catCount = skillData.children.length
        skillData.children.forEach((cat, i) => {
            let angle = (i / catCount) * 2 * Math.PI - Math.PI / 2
            
            // Shift bottom clusters down to make room for the wide Cyber Security fan at the top
            if (cat.id === 'dev') {
                angle += 0.2 // Shift Dev clockwise (towards bottom center)
            } else if (cat.id === 'ops') {
                angle -= 0.2 // Shift Ops counter-clockwise (towards bottom center)
            }

            const radius = 30 // Increased from 26% to 30% to make the line from Core to Categories longer
            const x = 51.5 + Math.cos(angle) * radius 
            const y = 50 + Math.sin(angle) * radius

            nodeList.push({ ...cat, x, y, level: 1, parentId: 'core' })
            edgesList.push({ from: 'core', to: cat.id, color: cat.color })

            // Skills (Level 2)
            const skillCount = cat.children.length
            const angleSpan = (2 * Math.PI) / catCount // Span for this category
            const startAngle = angle - angleSpan / 2

            cat.children.forEach((skill, j) => {
                // Fix: Custom spread for each category based on density/preference
                const isSecurity = cat.id === 'security'
                const isOps = cat.id === 'ops'

                let spreadFactor = 0.65 // Default (Dev) - Reduced slightly to avoid bottom collision
                let startOffset = 0.15 // Default offset

                if (isSecurity) {
                    spreadFactor = 1.25 // Wide for Security
                    startOffset = -0.12 
                } else if (isOps) {
                    spreadFactor = 0.6 // Reduce gap for Ops 
                    startOffset = 0.2 // Shifted slightly towards top to clear bottom
                }

                const skillAngle = startAngle + (j / (skillCount - 1)) * angleSpan * spreadFactor + (angleSpan * startOffset)
                const skillRadius = 46 // 46% from center
                const sx = 51.5 + Math.cos(skillAngle) * skillRadius 
                const sy = 50 + Math.sin(skillAngle) * skillRadius

                nodeList.push({ ...skill, x: sx, y: sy, level: 2, parentId: cat.id, color: cat.color })
                edgesList.push({ from: cat.id, to: skill.id, color: cat.color })
            })
        })
        return { nodeList, edgesList }
    }, [])

    return (
        <div className={styles.graphContainer}>
            <svg className={styles.connections} aria-hidden="true">
                {nodes.edgesList.map((edge, i) => {
                    const fromNode = nodes.nodeList.find(n => n.id === edge.from)
                    const toNode = nodes.nodeList.find(n => n.id === edge.to)

                    if (!fromNode || !toNode) return null

                    return (
                        <motion.line
                            key={i}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            stroke={edge.color}
                            strokeWidth="2"
                            strokeOpacity="0.8"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    )
                })}
            </svg>

            {nodes.nodeList.map((node) => (
                <Node key={node.id} node={node} />
            ))}
        </div>
    )
}

const Node = ({ node }) => {
    return (
        <motion.div
            className={`${styles.node} ${styles[node.type]}`}
            style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: node.color,
                boxShadow: `0 0 20px ${node.color}40`,
                transform: 'translate(-50%, -50%)' /* FORCE CENTER */
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
                type: 'spring',
                duration: 1,
                delay: node.level * 0.2
            }}
            whileHover={{ scale: 1.2, zIndex: 100 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            role="img"
            aria-label={node.label}
        >
            <div className={styles.nodeContent} style={{ color: node.color || '#fff' }}>
                {node.level === 0 ? <div style={{ marginBottom: 5 }}><Fingerprint /></div> : null}
                <span className={styles.nodeLabel}>{node.label}</span>
            </div>
            {/* Orbiting particles for flair */}
            {node.level < 2 && (
                <motion.div
                    className={styles.orbitRing}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ borderColor: node.color }}
                    aria-hidden="true"
                />
            )}
        </motion.div>
    )
}

export default SkillGraph
