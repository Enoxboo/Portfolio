import { useEffect, useState } from 'react'

function Hero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Contenu principal */}
            <div className="container mx-auto px-6 relative z-10">
                <div className={`max-w-4xl transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Petit tag au dessus */}
                    <div className="inline-block mb-4 px-4 py-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full">
            <span className="text-sm text-[var(--color-ethereal-400)]">
              Développeur Full Stack
            </span>
                    </div>

                    {/* Nom */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-[var(--color-ethereal-400)] via-[var(--color-ethereal-300)] to-[var(--color-ethereal-500)] bg-clip-text text-transparent">                        Matteo Marquant
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
                        Étudiant en B2 Informatique passionné par le développement.
                        <br />
                        De la création de jeux à l'architecture web.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 flex-wrap">
                        <button
                            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                            className="group px-8 py-4 bg-[var(--color-ethereal-600)] hover:bg-[var(--color-ethereal-500)] rounded-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <span className="font-medium">Voir mes projets</span>
                            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </button>

                        <button
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 border border-[var(--color-dark-border)] hover:border-[var(--color-ethereal-600)] rounded-lg transition-colors duration-200"
                        >
                            <span className="font-medium text-gray-300">Me contacter</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero