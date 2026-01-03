import { useState } from 'react'
import Intro from './components/Intro/Intro'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import AchievementCarousel from './components/AchievementCarousel/AchievementCarousel'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Playground from './components/Playground/Playground'
import Tools from './components/Tools/Tools'
import Connect from './components/Connect/Connect'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import styles from './App.module.css'

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
                <About />
                <AchievementCarousel />
                <Experience />
                <Skills />
                <Projects />
                <Playground />
                <Tools />
                <Connect />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
