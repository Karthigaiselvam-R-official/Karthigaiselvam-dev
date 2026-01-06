import { useState, lazy, Suspense } from 'react'
import Intro from './components/Intro/Intro'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import styles from './App.module.css'

// Lazy Load heavy components below the fold
const About = lazy(() => import('./components/About/About'))
const AchievementCarousel = lazy(() => import('./components/AchievementCarousel/AchievementCarousel'))
const Experience = lazy(() => import('./components/Experience/Experience'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))

function App() {
    const [introComplete, setIntroComplete] = useState(false)

    return (
        <div className={styles.app}>
            {/* Full-Screen Intro Animation */}
            {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

            <div className="bg-glow"></div>
            <Navbar />
            <main>
                <Hero />

                {/* Defer loading of non-critical sections */}
                <Suspense fallback={<div style={{ height: '100px' }}></div>}>
                    <About />
                    <AchievementCarousel />
                    <Experience />
                    <Skills />
                    <Projects />
                    <Contact />
                </Suspense>
            </main>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    )
}

export default App
