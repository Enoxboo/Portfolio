import {useEffect, useRef, useState} from 'react'

/**
 * Skills component - Technical skills showcase section
 * Features:
 * - Intersection Observer for scroll animation
 * - Responsive grid layout
 * - Hover effects with glow animation
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
function Skills() {
    // Constants
    const INTERSECTION_THRESHOLD = 0.2
    const ANIMATION_DURATION = 1000
    const STAGGER_DELAY = 0.1

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

    // Skills configuration
    const skills = [
        {name: 'GDScript', category: 'Game Dev', ariaLabel: 'GDScript pour le développement de jeux'},
        {name: 'Python', category: 'Backend', ariaLabel: 'Python pour le développement backend'},
        {name: 'JavaScript', category: 'Full Stack', ariaLabel: 'JavaScript pour le développement full stack'},
        {name: 'HTML', category: 'Frontend', ariaLabel: 'HTML pour le développement frontend'},
        {name: 'CSS', category: 'Frontend', ariaLabel: 'CSS pour le développement frontend'},
        {name: 'C++', category: 'Systems', ariaLabel: 'C++ pour la programmation système'},
        {name: 'Go', category: 'Backend', ariaLabel: 'Go pour le développement backend'},
        {name: 'Java', category: 'Backend', ariaLabel: 'Java pour le développement backend'}
    ]

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
            aria-labelledby="skills-heading"
        >
            <div className="container mx-auto">
                <div className={`max-w-6xl mx-auto transition-all duration-${ANIMATION_DURATION} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Section badge */}
                    <div
                        className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-dark-surface border border-dark-border rounded-full"
                        role="status"
                        aria-label="Section actuelle"
                    >
                        <span className="text-xs sm:text-sm text-ethereal-400">
                            Compétences
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="skills-heading"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight"
                    >
                        Technologies
                        <span className="text-ethereal-400"> maîtrisées</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-400 mb-12 sm:mb-16 max-w-2xl leading-relaxed">
                        Une palette de langages et technologies pour créer des solutions complètes,
                        du backend à l'interface utilisateur.
                    </p>

                    {/* Skills grid */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
                        role="list"
                        aria-label="Liste des compétences techniques"
                    >
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="group relative"
                                role="listitem"
                                style={{
                                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * STAGGER_DELAY}s both` : 'none'
                                }}
                            >
                                <div
                                    className="relative p-6 sm:p-8 bg-dark-surface border border-dark-border rounded-2xl transition-all duration-300 hover:border-ethereal-600 hover:-translate-y-2 focus-within:border-ethereal-600 focus-within:-translate-y-2"
                                    tabIndex="0"
                                    aria-label={skill.ariaLabel}
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-ethereal-600 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <div className="relative">
                                        {/* Technology name */}
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-ethereal-400 transition-colors duration-200">
                                            {skill.name}
                                        </h3>

                                        {/* Category */}
                                        <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                                            {skill.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
