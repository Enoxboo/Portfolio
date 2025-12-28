import {useEffect, useRef, useState} from 'react'

/**
 * About component - Personal introduction section
 * Features:
 * - Intersection Observer for scroll animation
 * - Responsive layout with stats grid
 * - Accessibility features (ARIA labels, semantic HTML)
 */
function About() {
    // Constants
    const INTERSECTION_THRESHOLD = 0.2
    const ANIMATION_DURATION = 1000

    // State
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    // Handle scroll-triggered animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {threshold: INTERSECTION_THRESHOLD}
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Stats configuration
    const stats = [
        {value: '8+', label: 'Technologies', ariaLabel: 'Plus de 8 technologies maîtrisées'},
        {value: '3', label: 'Projets majeurs', ariaLabel: '3 projets majeurs réalisés'},
        {value: '21', label: 'Ans', ariaLabel: '21 ans'}
    ]

    return (
        <section
            id="about"
            ref={sectionRef}
            className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
            aria-labelledby="about-heading"
        >
            <div className="container mx-auto">
                <div className={`max-w-4xl mx-auto transition-all duration-${ANIMATION_DURATION} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Section badge */}
                    <div
                        className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-dark-surface border border-dark-border rounded-full"
                        role="status"
                        aria-label="Section actuelle"
                    >
                        <span className="text-xs sm:text-sm text-ethereal-400">
                            À propos
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="about-heading"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight"
                    >
                        Créer des expériences
                        <span className="text-ethereal-400"> numériques</span>
                    </h2>

                    {/* Description */}
                    <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-400 leading-relaxed">
                        <p>
                            Étudiant en <span className="text-ethereal-400 font-medium">B2 Informatique</span>,
                            je suis passionné par le développement logiciel et la création d'expériences interactives.
                        </p>

                        <p>
                            Mon parcours m'a permis d'explorer différents domaines : du développement de jeux vidéo
                            avec <span className="text-white font-medium">Godot</span> et <span
                            className="text-white font-medium">Python</span>,
                            à la création de sites web modernes et performants.
                        </p>

                        <p>
                            Je m'intéresse particulièrement à l'architecture logicielle, aux interfaces utilisateur
                            intuitives et à l'optimisation des performances. Chaque projet est pour moi une opportunité
                            d'apprendre et de repousser mes limites techniques.
                        </p>
                    </div>

                    {/* Stats grid */}
                    <div
                        className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-dark-border"
                        role="list"
                        aria-label="Statistiques"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center sm:text-left"
                                role="listitem"
                            >
                                <div
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-ethereal-400 mb-1 sm:mb-2"
                                    aria-label={stat.ariaLabel}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
