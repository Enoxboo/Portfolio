import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { useScrollToSection } from '../hooks/useScrollToSection'

const SCROLL_BEHAVIOR = 'smooth'

function Footer() {
    const currentYear = new Date().getFullYear()
    const scrollToSection = useScrollToSection()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: SCROLL_BEHAVIOR })
        setTimeout(() => {
            document.querySelector('header')?.focus({ preventScroll: true })
        }, 300)
    }

    const navItems = [
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'projects', label: 'Projets' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <footer
            className="relative border-t border-dark-border/50 bg-dark-surface/30 backdrop-blur-sm py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
            aria-label="Pied de page"
        >
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 mb-10 sm:mb-12">
                    <div className="text-center md:text-left">
                        <button
                            onClick={scrollToTop}
                            className="group text-2xl sm:text-3xl font-bold text-ethereal-400 hover:text-ethereal-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg px-3 py-2"
                            aria-label="Retour en haut de la page"
                        >
                            <span className="inline-block group-hover:scale-110 transition-transform duration-200">
                                MM
                            </span>
                        </button>
                        <p className="text-sm sm:text-base text-gray-400 mt-2 font-medium">
                            Développeur en formation
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Étudiant B2 Informatique
                        </p>
                    </div>

                    <nav
                        className="hidden sm:flex flex-wrap justify-center gap-6 lg:gap-8"
                        aria-label="Navigation secondaire"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-sm lg:text-base text-gray-400 hover:text-ethereal-400 transition-all duration-200 focus:outline-none focus:text-ethereal-400 relative group py-1"
                                aria-label={`Aller à la section ${item.label}`}
                            >
                                {item.label}
                                <span
                                    className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-ethereal-400 transition-all duration-200 group-hover:w-full group-focus:w-full"
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="https://github.com/Enoxboo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-ethereal-400 hover:bg-dark-surface/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg"
                            aria-label="Visiter mon profil GitHub (ouvre dans un nouvel onglet)"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/matteo-marquant-67469a266/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-gray-400 hover:text-ethereal-400 hover:bg-dark-surface/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg"
                            aria-label="Visiter mon profil LinkedIn (ouvre dans un nouvel onglet)"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>

                <nav
                    className="sm:hidden flex flex-wrap justify-center gap-4 mb-8 pb-8 border-b border-dark-border/50"
                    aria-label="Navigation mobile secondaire"
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:text-ethereal-400 relative group py-1"
                            aria-label={`Aller à la section ${item.label}`}
                        >
                            {item.label}
                            <span
                                className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-ethereal-400 transition-all duration-200 group-hover:w-full group-focus:w-full"
                                aria-hidden="true"
                            />
                        </button>
                    ))}
                </nav>

                <div className="md:hidden flex items-center justify-center gap-4 mb-8 pb-8 border-b border-dark-border/50">
                    <a
                        href="https://github.com/Enoxboo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-400 hover:text-ethereal-400 hover:bg-dark-surface/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400"
                        aria-label="Visiter mon profil GitHub (ouvre dans un nouvel onglet)"
                    >
                        <GitHubIcon className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/matteo-marquant-67469a266/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-gray-400 hover:text-ethereal-400 hover:bg-dark-surface/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400"
                        aria-label="Visiter mon profil LinkedIn (ouvre dans un nouvel onglet)"
                    >
                        <LinkedInIcon className="w-6 h-6" />
                    </a>
                </div>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={scrollToTop}
                        className="group p-3.5 bg-dark-surface/50 backdrop-blur-sm border border-dark-border/50 rounded-full hover:border-ethereal-600 hover:bg-ethereal-600/10 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20 shadow-lg hover:shadow-ethereal-600/20"
                        aria-label="Remonter en haut de la page"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-ethereal-400 transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-dark-border/50">
                    <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        © {currentYear} Matteo Marquant. Tous droits réservés.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-right flex items-center gap-2">
                        <span>Conçu avec</span>
                        <span className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-ethereal-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span className="text-gray-500">avec</span>
                        </span>
                        <span className="font-medium text-gray-400">React & Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
