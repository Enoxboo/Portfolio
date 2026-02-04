import {useEffect, useRef, useState} from 'react'

/**
 * Skills component - Technical skills showcase section
 * Features:
 * - Intersection Observer for scroll animation with reduced motion support
 * - Responsive grid layout with optimal breakpoints
 * - Enhanced hover effects with glow and scale animations
 * - Categorized skills with visual indicators
 * - Full accessibility (ARIA labels, keyboard navigation, semantic HTML)
 * - Performance optimizations
 */
function Skills() {
    const INTERSECTION_THRESHOLD = 0.1
    const INTERSECTION_ROOT_MARGIN = '0px 0px -10% 0px'
    const STAGGER_DELAY = 80 // en ms

    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const currentRef = sectionRef.current
        if (!currentRef) return

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            {
                threshold: INTERSECTION_THRESHOLD,
                rootMargin: INTERSECTION_ROOT_MARGIN
            }
        )

        observer.observe(currentRef)

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
            observer.disconnect()
        }
    }, [isVisible])

    const skills = [
        {
            name: 'GDScript',
            category: 'Game Dev',
            icon: '🎮',
            color: 'from-indigo-500 to-purple-600',
            level: 'Avancé',
            description: 'Godot Engine, Scenes, Signals'
        },
        {
            name: 'Python',
            category: 'Backend',
            icon: '🐍',
            color: 'from-blue-500 to-indigo-600',
            level: 'Avancé',
            description: 'OOP, Data structures, Tkinter'
        },
        {
            name: 'Tailwind',
            category: 'Frontend',
            icon: '💨',
            color: 'from-teal-400 to-cyan-600',
            level: 'Avancé',
            description: 'Utility-first, Responsive, Custom'
        },
        {
            name: 'Git',
            category: 'DevOps',
            icon: '🔀',
            color: 'from-orange-600 to-red-700',
            level: 'Avancé',
            description: 'Versionning, Branches, Workflow'
        },
        {
            name: 'HTML5',
            category: 'Frontend',
            icon: '🌐',
            color: 'from-orange-500 to-red-600',
            level: 'Avancé',
            description: 'Sémantique, Accessibilité'
        },
        {
            name: 'JavaScript',
            category: 'Full Stack',
            icon: '⚡',
            color: 'from-yellow-400 to-yellow-600',
            level: 'Intermédiaire',
            description: 'ES6+, Async/Await, DOM'
        },
        {
            name: 'React',
            category: 'Frontend',
            icon: '⚛️',
            color: 'from-cyan-400 to-blue-600',
            level: 'Intermédiaire',
            description: 'Hooks, Context, Performance'
        },
        {
            name: 'CSS3',
            category: 'Frontend',
            icon: '🎨',
            color: 'from-pink-500 to-rose-600',
            level: 'Intermédiaire',
            description: 'Flexbox, Grid, Animations'
        },
        {
            name: 'C++',
            category: 'Systems',
            icon: '⚙️',
            color: 'from-slate-500 to-blue-700',
            level: 'Intermédiaire',
            description: 'POO, Pointeurs, STL'
        },
        {
            name: 'Java',
            category: 'Backend',
            icon: '☕',
            color: 'from-red-600 to-orange-700',
            level: 'Intermédiaire',
            description: 'OOP, Spring basics'
        },
        {
            name: 'Go',
            category: 'Backend',
            icon: '🔷',
            color: 'from-cyan-600 to-blue-700',
            level: 'Débutant',
            description: 'Concurrency, API REST'
        },
        {
            name: 'SQL',
            category: 'Database',
            icon: '🗄️',
            color: 'from-emerald-500 to-teal-700',
            level: 'Débutant',
            description: 'Queries, Joins, Optimization'
        }
    ]

    const levelColors = {
        'Expert': 'text-green-400',
        'Avancé': 'text-blue-400',
        'Intermédiaire': 'text-yellow-400',
        'Débutant': 'text-gray-400'
    }

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="skills-heading"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Section badge */}
                    <div
                        className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-full"
                        role="status"
                        aria-live="polite"
                    >
                        <span className="text-sm sm:text-base text-ethereal-400 font-medium">
                            🛠️ Compétences
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="skills-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-[1.1] tracking-tight"
                    >
                        Technologies{' '}
                        <span className="text-ethereal-400 inline-block">maîtrisées</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 sm:mb-16 lg:mb-20 max-w-3xl leading-relaxed">
                        Une palette diversifiée de langages et technologies pour concevoir des solutions
                        complètes et performantes, du backend à l'interface utilisateur.
                    </p>

                    {/* Skills grid */}
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                        role="list"
                        aria-label="Liste des compétences techniques"
                    >
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className={`group transition-all duration-500 ease-out ${
                                    isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                }`}
                                style={{
                                    transitionDelay: isVisible ? `${index * STAGGER_DELAY}ms` : '0ms'
                                }}
                                role="listitem"
                            >
                                <div className="relative h-full">
                                    {/* Main card */}
                                    <div
                                        className="relative h-full p-5 sm:p-6 lg:p-8 bg-dark-surface/50 backdrop-blur-sm border border-dark-border/50 rounded-2xl transition-all duration-300 hover:border-ethereal-600/50 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-ethereal-600/10 focus-within:border-ethereal-600/50 focus-within:-translate-y-2 cursor-pointer"
                                        tabIndex="0"
                                        aria-label={`${skill.name} - ${skill.category} - Niveau ${skill.level}`}
                                        role="button"
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div
                                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                                            aria-hidden="true"
                                        />

                                        {/* Glow effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl bg-ethereal-600 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none"
                                            aria-hidden="true"
                                        />

                                        <div className="relative flex flex-col items-center text-center gap-3 sm:gap-4">
                                            {/* Icon */}
                                            <div
                                                className="text-4xl sm:text-5xl lg:text-6xl transform group-hover:scale-110 transition-transform duration-300"
                                                role="img"
                                                aria-label={`Icône ${skill.name}`}
                                            >
                                                {skill.icon}
                                            </div>

                                            {/* Technology name */}
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-ethereal-400 transition-colors duration-300">
                                                {skill.name}
                                            </h3>

                                            {/* Category badge */}
                                            <span
                                                className="px-2.5 py-1 text-xs sm:text-sm bg-dark-bg/80 text-gray-400 rounded-full border border-dark-border/50 font-medium uppercase tracking-wider">
                                                {skill.category}
                                            </span>

                                            {/* Level indicator */}
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex gap-1"
                                                     aria-label={`Niveau de compétence: ${skill.level}`}>
                                                    {[1, 2, 3, 4].map((dot) => {
                                                        const filled =
                                                            (skill.level === 'Expert' && dot <= 4) ||
                                                            (skill.level === 'Avancé' && dot <= 3) ||
                                                            (skill.level === 'Intermédiaire' && dot <= 2) ||
                                                            (skill.level === 'Débutant' && dot <= 1)

                                                        return (
                                                            <div
                                                                key={dot}
                                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                                    filled
                                                                        ? 'bg-ethereal-400 group-hover:bg-ethereal-300'
                                                                        : 'bg-dark-border'
                                                                }`}
                                                                aria-hidden="true"
                                                            />
                                                        )
                                                    })}
                                                </div>
                                                <span className={`text-xs font-medium ${levelColors[skill.level]}`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Description on hover (hidden on mobile) */}
                                            <p className="hidden sm:block text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 mt-2 leading-relaxed opacity-0 group-hover:opacity-100">
                                                {skill.description}
                                            </p>
                                        </div>

                                        {/* Bottom accent gradient */}
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div
                        className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-10 border-t border-dark-border/50">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((dot) => (
                                    <div
                                        key={dot}
                                        className="w-2 h-2 rounded-full bg-ethereal-400"
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">Expert</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((dot) => (
                                    <div
                                        key={dot}
                                        className={`w-2 h-2 rounded-full ${dot <= 3 ? 'bg-ethereal-400' : 'bg-dark-border'}`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">Avancé</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((dot) => (
                                    <div
                                        key={dot}
                                        className={`w-2 h-2 rounded-full ${dot <= 2 ? 'bg-ethereal-400' : 'bg-dark-border'}`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">Intermédiaire</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((dot) => (
                                    <div
                                        key={dot}
                                        className={`w-2 h-2 rounded-full ${dot <= 1 ? 'bg-ethereal-400' : 'bg-dark-border'}`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">Débutant</span>
                        </div>
                    </div>

                    {/* Additional info */}
                    <p className="text-center text-sm sm:text-base text-gray-500 mt-8">
                        Toujours en apprentissage continu pour explorer de nouvelles technologies 🚀
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Skills