import { useEffect, useRef, useState } from 'react'

function About() {
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

    return (
        <section
            id="about"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20"
        >
            <div className="container mx-auto px-6">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Tag section */}
                    <div className="inline-block mb-4 px-4 py-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full">
            <span className="text-sm text-[var(--color-ethereal-400)]">
              À propos
            </span>
                    </div>

                    {/* Titre */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
                        Créer des expériences
                        <span className="text-[var(--color-ethereal-400)]"> numériques</span>
                    </h2>

                    {/* Description */}
                    <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                        <p>
                            Étudiant en <span className="text-[var(--color-ethereal-400)] font-medium">B2 Informatique</span>,
                            je suis passionné par le développement logiciel et la création d'expériences interactives.
                        </p>

                        <p>
                            Mon parcours m'a permis d'explorer différents domaines : du développement de jeux vidéo
                            avec <span className="text-white font-medium">Godot</span> et <span className="text-white font-medium">Python</span>,
                            à la création de sites web modernes et performants.
                        </p>

                        <p>
                            Je m'intéresse particulièrement à l'architecture logicielle, aux interfaces utilisateur
                            intuitives et à l'optimisation des performances. Chaque projet est pour moi une opportunité
                            d'apprendre et de repousser mes limites techniques.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-[var(--color-dark-border)]">
                        <div>
                            <div className="text-4xl font-bold text-[var(--color-ethereal-400)] mb-2">
                                8+
                            </div>
                            <div className="text-gray-500 text-sm uppercase tracking-wider">
                                Technologies
                            </div>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-[var(--color-ethereal-400)] mb-2">
                                3
                            </div>
                            <div className="text-gray-500 text-sm uppercase tracking-wider">
                                Projets majeurs
                            </div>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-[var(--color-ethereal-400)] mb-2">
                                21
                            </div>
                            <div className="text-gray-500 text-sm uppercase tracking-wider">
                                Ans
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About