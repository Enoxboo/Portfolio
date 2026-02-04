import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NebulaBackground from './components/NebulaBackground'

/**
 * App component - Main application layout
 * Features:
 * - Semantic HTML structure with proper landmarks
 * - Skip to main content link for accessibility
 * - Fixed background with proper z-index management
 * - Optimized rendering with component organization
 */
function App() {
    return (
        <div className="min-h-screen bg-dark-bg text-white relative overflow-x-hidden">
            {/* Skip to main content link for keyboard navigation */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-6 focus:py-3 focus:bg-ethereal-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
                Aller au contenu principal
            </a>

            {/* Animated background - Fixed position */}
            <NebulaBackground />

            {/* Header - Fixed navigation */}
            <Header />

            {/* Main content wrapper */}
            <div className="pt-16 sm:pt-20 relative z-10">
                {/* Hero section as main landmark */}
                <main id="main-content" tabIndex="-1">
                    <Hero />
                </main>

                {/* Other sections */}
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default App