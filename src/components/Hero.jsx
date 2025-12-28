import {useEffect, useState} from 'react'

/**
 * Hero component - Main landing section
 * Features:
 * - Fade-in animation on mount
 * - Responsive text sizing
 * - CTA buttons with smooth scroll
 * - Accessibility features (ARIA labels, focus states)
 */
function Hero() {
    // Constants
    const ANIMATION_DELAY = 100

    // State
    const [isVisible, setIsVisible] = useState(false)

    // Handle entry animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), ANIMATION_DELAY)
        return () => clearTimeout(timer)
    }, [])

    /**
     * Smooth scroll to a section by ID
     * @param {string} id - Section ID to scroll to
     */
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <section
            className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 sm:px-6"
            role="main"
            aria-label="Section d'introduction"
        >
            {/* Main content */}
            <div className="container mx-auto relative z-10">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Role badge */}
                    <div
                        className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-dark-surface border border-dark-border rounded-full"
                        role="status"
                        aria-label="Rôle professionnel"
                    >
                        <span className="text-xs sm:text-sm text-ethereal-400">
                            Développeur Full Stack
                        </span>
                    </div>

                    {/* Name heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-ethereal-400 via-ethereal-300 to-ethereal-500 bg-clip-text text-transparent leading-tight">
                        Matteo Marquant
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                        Étudiant en B2 Informatique passionné par le développement.
                        <br className="hidden sm:block"/>
                        <span className="block sm:inline"> </span>
                        De la création de jeux à l'architecture web.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-ethereal-600 hover:bg-ethereal-500 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg"
                            aria-label="Voir mes projets"
                        >
                            <span className="font-medium text-sm sm:text-base">Voir mes projets</span>
                            <span
                                className="transform group-hover:translate-x-1 transition-transform duration-200"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </button>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-dark-border hover:border-ethereal-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg hover:bg-dark-surface/30"
                            aria-label="Me contacter"
                        >
                            <span className="font-medium text-gray-300 text-sm sm:text-base">Me contacter</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
