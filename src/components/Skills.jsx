import { useEffect, useRef, useState } from 'react'

function Skills() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const skills = [
        { name: 'GDScript', category: 'Game Dev' },
        { name: 'Python', category: 'Backend' },
        { name: 'JavaScript', category: 'Full Stack' },
        { name: 'HTML', category: 'Frontend' },
        { name: 'CSS', category: 'Frontend' },
        { name: 'C++', category: 'Systems' },
        { name: 'Go', category: 'Backend' },
        { name: 'Java', category: 'Backend' }
    ]

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20"
        >
            <div className="container mx-auto px-6">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Tag section */}
                    <div className="inline-block mb-4 px-4 py-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full">
            <span className="text-sm text-[var(--color-ethereal-400)]">
              Compétences
            </span>
                    </div>

                    {/* Titre */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Technologies
                        <span className="text-[var(--color-ethereal-400)]"> maîtrisées</span>
                    </h2>

                    <p className="text-lg text-gray-400 mb-16 max-w-2xl">
                        Une palette de langages et technologies pour créer des solutions complètes,
                        du backend à l'interface utilisateur.
                    </p>

                    {/* Grid des compétences */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="group relative"
                                style={{
                                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                                }}
                            >
                                <div className="relative p-8 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-2xl transition-all duration-300 hover:border-[var(--color-ethereal-600)] hover:-translate-y-2">
                                    {/* Glow effect au hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-[var(--color-ethereal-600)] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />

                                    <div className="relative">
                                        {/* Nom de la techno */}
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-ethereal-400)] transition-colors duration-200">
                                            {skill.name}
                                        </h3>

                                        {/* Catégorie */}
                                        <p className="text-sm text-gray-500 uppercase tracking-wider">
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