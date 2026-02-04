import { useEffect, useState, useCallback } from 'react'

/**
 * Hero component - Main landing section
 * Features:
 * - Staggered fade-in animation on mount with reduced motion support
 * - Responsive text sizing with optimal readability
 * - CTA buttons with smooth scroll and enhanced interactions
 * - Scroll indicator for better UX
 * - Full accessibility (ARIA labels, focus states, semantic HTML)
 * - Performance optimizations
 */
function Hero() {
    const ANIMATION_DELAY = 100
    const TYPING_SPEED = 100
    const TYPING_PAUSE = 2000

    const [isVisible, setIsVisible] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

    const phrases = [
        "Explorer, comprendre, recommencer.",
        "Du code, des systèmes, des erreurs et des progrès.",
        "Apprendre en construisant des jeux."
    ]

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            setIsVisible(true)
            setTypedText(phrases[0])
        } else {
            const timer = setTimeout(() => setIsVisible(true), ANIMATION_DELAY)
            return () => clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return

        let currentIndex = 0
        const currentPhrase = phrases[currentPhraseIndex]

        const typingInterval = setInterval(() => {
            if (currentIndex <= currentPhrase.length) {
                setTypedText(currentPhrase.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(typingInterval)

                setTimeout(() => {
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
                }, TYPING_PAUSE)
            }
        }, TYPING_SPEED)

        return () => clearInterval(typingInterval)
    }, [currentPhraseIndex])

    /**
     * Smooth scroll to a section by ID
     * @param {string} id - Section ID to scroll to
     */
    const scrollToSection = useCallback((id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })

            setTimeout(() => {
                element.focus({ preventScroll: true })
            }, 300)
        }
    }, [])

    /**
     * Scroll down to next section
     */
    const scrollDown = useCallback(() => {
        const nextSection = document.getElementById('about')
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [])

    return (
        <section
            className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
            role="main"
            aria-label="Section d'introduction"
        >
            {/* Main content */}
            <div className="container mx-auto max-w-7xl relative z-10 py-20 sm:py-24">
                <div
                    className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    {/* Role badge */}
                    <div
                        className={`inline-block mb-6 sm:mb-8 px-4 sm:px-5 py-2 sm:py-2.5 bg-dark-surface/80 backdrop-blur-sm border border-dark-border/50 rounded-full transition-all duration-700 delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        role="status"
                        aria-live="polite"
                    >
                        <span className="text-sm sm:text-base text-ethereal-400 font-semibold tracking-wide">
                            👨‍💻 Développeur en formation, orienté systèmes & création
                        </span>
                    </div>

                    {/* Name heading with gradient */}
                    <h1
                        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-ethereal-300 via-ethereal-400 to-ethereal-500 bg-clip-text text-transparent leading-[1.1] tracking-tight transition-all duration-700 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Matteo Marquant
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-4 sm:mb-6 transition-all duration-700 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Étudiant en <span className="text-white font-bold">B2 Informatique</span> passionné par le développement.
                    </p>

                    {/* Typing effect description */}
                    <div
                        className={`text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 lg:mb-16 leading-relaxed min-h-[3.5rem] sm:min-h-[4rem] transition-all duration-700 delay-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <span className="inline-block">
                            {typedText}
                            <span className="inline-block w-0.5 h-6 sm:h-7 bg-ethereal-400 ml-1 animate-pulse" aria-hidden="true" />
                        </span>
                    </div>

                    {/* CTA buttons */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 sm:gap-5 transition-all duration-700 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-ethereal-600 hover:bg-ethereal-500 active:bg-ethereal-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg shadow-xl shadow-ethereal-600/25 hover:shadow-ethereal-500/40 hover:-translate-y-1 overflow-hidden"
                            aria-label="Voir mes projets"
                        >
                            {/* Gradient overlay on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-ethereal-500 to-ethereal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                            <span className="relative font-semibold text-base sm:text-lg text-white">
                                Voir mes projets
                            </span>
                            <span
                                className="relative transform group-hover:translate-x-1 transition-transform duration-200 text-white text-xl"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </button>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-dark-border hover:border-ethereal-600 bg-transparent hover:bg-ethereal-600/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg backdrop-blur-sm hover:-translate-y-1"
                            aria-label="Me contacter"
                        >
                            <span className="font-semibold text-base sm:text-lg text-gray-200 group-hover:text-white transition-colors duration-200">
                                Me contacter
                            </span>
                        </button>
                    </div>

                    {/* Stats - Quick info */}
                    <div
                        className={`flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 lg:mt-20 pt-12 sm:pt-16 border-t border-dark-border/50 transition-all duration-700 delay-600 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ethereal-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ethereal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg sm:text-xl font-bold text-white">8+</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Technologies</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ethereal-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ethereal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg sm:text-xl font-bold text-white">3</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Projets majeurs</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ethereal-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ethereal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg sm:text-xl font-bold text-white">Toulouse</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">France 🇫🇷</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={scrollDown}
                className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 p-2 text-gray-400 hover:text-ethereal-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-full group animate-bounce hover:animate-none ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Défiler vers le bas"
                style={{ transitionDelay: '800ms' }}
            >
                <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 transform group-hover:translate-y-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="sr-only">Défiler vers la section suivante</span>
            </button>

            {/* Decorative gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-64 h-64 bg-ethereal-600/20 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
            <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-ethereal-500/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" style={{ animationDelay: '1s' }} />
        </section>
    )
}

export default Hero