function Footer() {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative border-t border-[var(--color-dark-border)] py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo/Nom */}
                    <div>
                        <button
                            onClick={scrollToTop}
                            className="text-2xl font-bold text-[var(--color-ethereal-400)] hover:text-[var(--color-ethereal-300)] transition-colors duration-200"
                        >
                            MM
                        </button>
                        <p className="text-gray-500 text-sm mt-2">
                            Développeur Full Stack
                        </p>
                    </div>

                    {/* Navigation rapide */}
                    <div className="flex gap-8">
                        <button
                            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                            className="text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 text-sm"
                        >
                            À propos
                        </button>
                        <button
                            onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
                            className="text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 text-sm"
                        >
                            Compétences
                        </button>
                        <button
                            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                            className="text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 text-sm"
                        >
                            Projets
                        </button>
                        <button
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                            className="text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 text-sm"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-500 text-sm">
                        © {currentYear} Matteo Marquant
                    </div>
                </div>

                {/* Bouton retour en haut */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={scrollToTop}
                        className="group p-3 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full hover:border-[var(--color-ethereal-600)] transition-all duration-200 hover:-translate-y-1"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-ethereal-400)] transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer