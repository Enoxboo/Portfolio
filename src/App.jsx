import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";

function App() {
    return (
        <div className="min-h-screen bg-[var(--color-dark-bg)] text-white relative">
            {/* Background ethereal global */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-ethereal-600)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[var(--color-ethereal-800)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[var(--color-ethereal-700)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
            </div>

            <Header />

            <div className="pt-16 relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>
        </div>
    )
}

export default App