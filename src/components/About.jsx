import {useEffect, useRef, useState} from 'react'

/**
 * About component - Personal introduction section
 * Features:
 * - Intersection Observer for scroll animation with cleanup
 * - Responsive layout with stats grid
 * - Enhanced accessibility (ARIA labels, semantic HTML, reduced motion support)
 * - Performance optimizations (memoization, threshold tuning)
 */
function About() {
    const INTERSECTION_THRESHOLD = 0.1
    const INTERSECTION_ROOT_MARGIN = '0px 0px -10% 0px'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const [isVisible, setIsVisible] = useState(prefersReducedMotion)
    const sectionRef = useRef(null)

    useEffect(() => {
        const currentRef = sectionRef.current
        if (!currentRef) return

        if (prefersReducedMotion) {
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
    }, [isVisible, prefersReducedMotion])

    const stats = [
        {
            value: '8+',
            label: 'Technologies',
            ariaLabel: 'Plus de 8 technologies maîtrisées incluant JavaScript, Python, et Go'
        },
        {
            value: '3',
            label: 'Projets majeurs',
            ariaLabel: '3 projets majeurs réalisés en développement web et jeu vidéo'
        },
        {
            value: '21',
            label: 'Ans',
            ariaLabel: "21 ans d'âge"
        }
    ]

    return (
        <section
            id="about"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="about-heading"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`max-w-6xl transition-all duration-700 ease-out ${
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
                            À propos
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="about-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 lg:mb-10 text-white leading-[1.1] tracking-tight"
                    >
                        Comprendre avant{' '}
                        <span className="text-ethereal-400 inline-block">d’optimiser</span>
                    </h2>

                    {/* Description */}
                    <div className="space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                        <p>
                            Étudiant en{' '}
                            <span className="text-ethereal-400 font-semibold">informatique</span>{' '}
                            et développeur en formation, ce qui me motive le plus dans le code n’est
                            pas seulement de faire fonctionner quelque chose, mais de{' '}
                            <span className="text-white font-semibold">comprendre pourquoi ça fonctionne</span>.
                        </p>

                        <p>
                            J’ai travaillé sur des projets variés, notamment des jeux vidéo avec{' '}
                            <span className="text-white font-semibold">Godot</span>, ainsi que des
                            applications web. J’aime partir d’idées simples et les pousser jusqu’à
                            un résultat fini, même imparfait.
                        </p>

                        <p>
                            J’apprends principalement par l’expérimentation : tester, casser,
                            recommencer, documenter. Les zones floues et les bugs difficiles à
                            comprendre sont ce qui me frustre le plus, mais aussi ce qui me fait
                            le plus progresser.
                        </p>
                    </div>

                    {/* Stats grid */}
                    <div
                        className="grid grid-cols-3 gap-6 sm:gap-10 lg:gap-12 mt-10 sm:mt-14 lg:mt-16 pt-10 sm:pt-14 lg:pt-16 border-t border-dark-border/50"
                        role="list"
                        aria-label="Statistiques professionnelles"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className={`text-center transition-all duration-500 ease-out ${
                                    isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{
                                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                                }}
                                role="listitem"
                            >
                                <div
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ethereal-400 mb-2 sm:mb-3 tabular-nums"
                                    aria-label={stat.ariaLabel}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    className="text-gray-400 text-xs sm:text-sm lg:text-base uppercase tracking-wider font-medium">
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