import {useEffect, useRef, useState} from 'react'

/**
 * Projects component - Portfolio projects showcase section
 * Features:
 * - Intersection Observer for scroll animation
 * - Responsive grid layout (1/2/3 columns)
 * - Hover effects with glow animation
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
function Projects() {
    // Constants
    const INTERSECTION_THRESHOLD = 0.2
    const ANIMATION_DURATION = 1000
    const STAGGER_DELAY = 0.15

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

    // Projects configuration
    const projects = [
        {
            title: 'Jeu Godot',
            description: 'Un jeu d\'aventure développé avec le moteur Godot Engine. Exploration d\'un monde interactif avec des mécaniques de gameplay innovantes et une narration immersive.',
            tags: ['GDScript', 'Godot', 'Game Design'],
            link: '#',
            ariaLabel: 'Voir le projet Jeu Godot'
        },
        {
            title: 'Site Photographe Pro',
            description: 'Portfolio professionnel pour un photographe avec galerie dynamique, interface élégante et optimisée pour présenter des travaux photographiques de haute qualité.',
            tags: ['JavaScript', 'HTML', 'CSS'],
            link: '#',
            ariaLabel: 'Voir le projet Site Photographe Pro'
        },
        {
            title: 'Jeu Python',
            description: 'Jeu développé en Python avec une architecture modulaire. Expérimentation avec la logique de jeu, l\'intelligence artificielle et les algorithmes de pathfinding.',
            tags: ['Python', 'Pygame', 'Algorithms'],
            link: '#',
            ariaLabel: 'Voir le projet Jeu Python'
        }
    ]

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
            aria-labelledby="projects-heading"
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
                            Réalisations
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="projects-heading"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight"
                    >
                        Projets
                        <span className="text-ethereal-400"> remarquables</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-400 mb-12 sm:mb-16 max-w-2xl leading-relaxed">
                        Une sélection de projets qui illustrent ma polyvalence et ma passion
                        pour le développement.
                    </p>

                    {/* Projects grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        role="list"
                        aria-label="Liste des projets"
                    >
                        {projects.map((project, index) => (
                            <article
                                key={project.title}
                                className="group"
                                role="listitem"
                                style={{
                                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * STAGGER_DELAY}s both` : 'none'
                                }}
                            >
                                <div
                                    className="relative h-full p-6 sm:p-8 bg-dark-surface border border-dark-border rounded-2xl transition-all duration-300 hover:border-ethereal-600 hover:-translate-y-2 focus-within:border-ethereal-600 focus-within:-translate-y-2 flex flex-col"
                                    tabIndex="0"
                                    aria-label={project.title}
                                >
                                    {/* Glow effect on hover */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-ethereal-600 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <div className="relative flex-1 flex flex-col">
                                        {/* Project title */}
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-ethereal-400 transition-colors duration-200">
                                            {project.title}
                                        </h3>

                                        {/* Project description */}
                                        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed flex-1">
                                            {project.description}
                                        </p>

                                        {/* Technology tags */}
                                        <div
                                            className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                                            role="list"
                                            aria-label="Technologies utilisées"
                                        >
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-dark-bg text-ethereal-400 rounded-full border border-dark-border"
                                                    role="listitem"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Project link */}
                                        <a
                                            href={project.link}
                                            className="inline-flex items-center gap-2 text-sm sm:text-base text-ethereal-400 hover:text-ethereal-300 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-ethereal-400 rounded px-2 py-1 -mx-2"
                                            aria-label={project.ariaLabel}
                                        >
                                            <span className="font-medium">Voir le projet</span>
                                            <span
                                                className="transform group-hover/link:translate-x-1 transition-transform duration-200"
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects
