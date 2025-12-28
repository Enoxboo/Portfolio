/**
 * Footer component - Site footer with navigation and back-to-top functionality
 * Features:
 * - Quick navigation to main sections
 * - Smooth scroll to top button
 * - Responsive layout (mobile/desktop variations)
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
function Footer() {
    // Constants
    const SCROLL_BEHAVIOR = 'smooth'
    const SCROLL_TOP_POSITION = 0

    // Current year for copyright
    const currentYear = new Date().getFullYear()

    /**
     * Scroll to the top of the page
     */
    const scrollToTop = () => {
        window.scrollTo({top: SCROLL_TOP_POSITION, behavior: SCROLL_BEHAVIOR})
    }

    /**
     * Smooth scroll to a section by ID
     * @param {string} id - Section ID to scroll to
     */
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({behavior: SCROLL_BEHAVIOR})
        }
    }

    // Navigation items configuration
    const navItems = [
        {id: 'about', label: 'À propos'},
        {id: 'skills', label: 'Compétences'},
        {id: 'projects', label: 'Projets'},
        {id: 'contact', label: 'Contact'}
    ]

    return (
        <footer
            className="relative border-t border-dark-border py-8 sm:py-12 px-4 sm:px-6"
            role="contentinfo"
            aria-label="Pied de page"
        >
            <div className="container mx-auto">
                {/* Main footer content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
                    {/* Logo/Name */}
                    <div className="text-center md:text-left">
                        <button
                            onClick={scrollToTop}
                            className="text-xl sm:text-2xl font-bold text-ethereal-400 hover:text-ethereal-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded px-2 py-1"
                            aria-label="Retour en haut de la page"
                        >
                            MM
                        </button>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                            Développeur Full Stack
                        </p>
                    </div>

                    {/* Quick navigation - Hidden on mobile, visible on tablet+ */}
                    <nav
                        className="hidden sm:flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8"
                        aria-label="Navigation secondaire"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-sm text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:text-ethereal-400 focus:underline"
                                aria-label={`Aller à la section ${item.label}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Copyright - Mobile centered, desktop right-aligned */}
                    <div className="text-xs sm:text-sm text-gray-500 text-center md:text-right order-last md:order-0">
                        © {currentYear} Matteo Marquant
                    </div>
                </div>

                {/* Mobile navigation - Visible only on mobile */}
                <nav
                    className="sm:hidden flex flex-wrap justify-center gap-4 mb-6"
                    aria-label="Navigation mobile secondaire"
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:text-ethereal-400 focus:underline"
                            aria-label={`Aller à la section ${item.label}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Back to top button */}
                <div className="flex justify-center pt-6 sm:pt-8 border-t border-dark-border">
                    <button
                        onClick={scrollToTop}
                        className="group p-3 bg-dark-surface border border-dark-border rounded-full hover:border-ethereal-600 transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20"
                        aria-label="Remonter en haut de la page"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-ethereal-400 transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                        </svg>
                    </button>
                </div>

                {/* Additional text - Centered on all sizes */}
                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-xs text-gray-600">
                        Conçu et développé avec React & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
