import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import SkillGraph from './SkillGraph'
import styles from './Skills.module.css'

const Skills = () => {
    return (
        <section id="skills" className={styles.skills}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span className="section-tag">
                        <Cpu size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'text-bottom' }} />
                        Technical Arsenal
                    </span>
                    <h2 className="section-title">
                        <span className="gradient-text">Skill Matrix</span>
                    </h2>
                    <p className="section-subtitle">
                        Visualizing my core competencies and toolset
                    </p>
                </div>

                <SkillGraph />
            </div>

            {/* Background ambiance */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, #000 80%)',
                pointerEvents: 'none',
                zIndex: 1
            }} />
        </section>
    )
}

export default Skills
