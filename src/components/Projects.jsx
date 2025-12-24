import {useEffect, useRef, useState} from 'react'

function Projects() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {threshold: 0.2}
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const projects = [
        {
            title: 'Jeu Godot',
            description: 'Un jeu d\'aventure développé avec le moteur Godot Engine. Exploration d\'un monde interactif avec des mécaniques de gameplay innovantes et une narration immersive.',
            tags: ['GDScript', 'Godot', 'Game Design'],
            link: '#'
        },
        {
            title: 'Site Photographe Pro',
            description: 'Portfolio professionnel pour un photographe avec galerie dynamique, interface élégante et optimisée pour présenter des travaux photographiques de haute qualité.',
            tags: ['JavaScript', 'HTML', 'CSS'],
            link: '#'
        },
        {
            title: 'Jeu Python',
            description: 'Jeu développé en Python avec une architecture modulaire. Expérimentation avec la logique de jeu, l\'intelligence artificielle et les algorithmes de pathfinding.',
            tags: ['Python', 'Pygame', 'Algorithms'],
            link: '#'
        }
    ]

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20"
        >
            <div className="container mx-auto px-6">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Tag section */}
                    <div
                        className="inline-block mb-4 px-4 py-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full">
            <span className="text-sm text-[var(--color-ethereal-400)]">
              Réalisations
            </span>
                    </div>

                    {/* Titre */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Projets
                        <span className="text-[var(--color-ethereal-400)]"> remarquables</span>
                    </h2>

                    <p className="text-lg text-gray-400 mb-16 max-w-2xl">
                        Une sélection de projets qui illustrent ma polyvalence et ma passion
                        pour le développement.
                    </p>

                    {/* Grid des projets */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="group"
                                style={{
                                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : 'none'
                                }}
                            >
                                <div
                                    className="relative h-full p-8 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-ethereal-600)] hover:-translate-y-2 flex flex-col">
                                    {/* Glow effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-[var(--color-ethereal-600)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"/>

                                    <div className="relative flex-1 flex flex-col">
                                        {/* Titre */}
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-ethereal-400)] transition-colors duration-200">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 mb-6 leading-relaxed flex-1">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-sm bg-[var(--color-dark-bg)] text-[var(--color-ethereal-400)] rounded-full border border-[var(--color-dark-border)]"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>

                                        {/* Lien */}
                                        <a
                                            href={project.link}
                                            className="inline-flex items-center gap-2 text-[var(--color-ethereal-400)] hover:text-[var(--color-ethereal-300)] transition-colors duration-200 group/link"
                                        >
                                            <span className="font-medium">Voir le projet</span>
                                            <span
                                                className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                                        </a>

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

export default Projects