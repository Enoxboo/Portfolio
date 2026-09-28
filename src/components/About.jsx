import { useScrollAnimation } from '../hooks/useScrollAnimation'
import avatarUrl from '../assets/avatar.jpg'

function About() {
    const { isVisible, sectionRef } = useScrollAnimation()

    return (
        <section
            id="about"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="about-heading"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Section badge */}
                    <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-full">
                        <span className="text-sm sm:text-base text-ethereal-400 font-medium">
                            À propos
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="about-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 sm:mb-12 lg:mb-16 text-white leading-[1.1] tracking-tight"
                    >
                        Comprendre avant{' '}
                        <span className="text-ethereal-400 inline-block">d'optimiser</span>
                    </h2>

                    {/* Photo + Content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-12 lg:gap-16 items-start">
                        {/* Avatar */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative">
                                <img
                                    src={avatarUrl}
                                    alt="Matteo Marquant"
                                    className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-2xl object-cover border border-dark-border/50 shadow-2xl"
                                />
                                {/* Glow */}
                                <div
                                    className="absolute -inset-4 rounded-2xl bg-ethereal-600/12 blur-3xl -z-10"
                                    aria-hidden="true"
                                />
                                {/* Decorative offset border */}
                                <div
                                    className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border border-ethereal-600/25 -z-10"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Text + Stats */}
                        <div>
                            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                <p>
                                    Étudiant en{' '}
                                    <span className="text-ethereal-400 font-semibold">informatique</span>{' '}
                                    et développeur en formation, ce qui me motive le plus dans le code n'est
                                    pas seulement de faire fonctionner quelque chose, mais de{' '}
                                    <span className="text-white font-semibold">comprendre pourquoi ça fonctionne</span>.
                                </p>

                                <p>
                                    J'ai travaillé sur des projets variés, notamment des jeux vidéo avec{' '}
                                    <span className="text-white font-semibold">Godot</span>, ainsi que des
                                    applications web. J'aime partir d'idées simples et les pousser jusqu'à
                                    un résultat fini, même imparfait.
                                </p>

                                <p>
                                    J'apprends principalement par l'expérimentation : tester, casser,
                                    recommencer, documenter. Les zones floues et les bugs difficiles à
                                    comprendre sont ce qui me frustre le plus, mais aussi ce qui me fait
                                    le plus progresser.
                                </p>
                            </div>

                            {/* Availability callout */}
                            <div
                                className={`inline-flex items-center gap-3 mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-dark-border/50 w-full transition-all duration-500 ease-out ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            >
                                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                                </span>
                                <p className="text-sm sm:text-base text-gray-300">
                                    <span className="text-white font-semibold">Disponible pour une alternance</span>
                                    {' '}— à partir de septembre 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
