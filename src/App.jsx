import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NebulaBackground from './components/NebulaBackground'

function App() {
    return (
        <div className="min-h-screen bg-[#0a0514] text-white relative">
            <NebulaBackground />

            <Header />

            <div className="pt-16 relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </div>
    )
}

export default App