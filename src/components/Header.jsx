import {useState, useEffect} from 'react'

/**
 * Header component with sticky navigation and mobile menu
 * Features:
 * - Sticky header with backdrop blur effect on scroll
 * - Responsive mobile menu with animated burger icon
 * - Smooth scroll to sections
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
function Header() {
    // Constants
    const SCROLL_THRESHOLD = 50
    const MOBILE_MENU_ANIMATION_DELAY = 50

    // State
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Handle scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > SCROLL_THRESHOLD)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle mobile menu state and body scroll lock
    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'

        // Close menu on scroll
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('scroll', handleScroll)
        }
    }, [mobileMenuOpen])

    /**
     * Smooth scroll to a section by ID
     * @param {string} id - Section ID to scroll to
     */
    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
            setMobileMenuOpen(false)
        }
    }

    /**
     * Scroll to top of page
     */
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    // Navigation items configuration
    const navItems = [
        {id: 'about', label: 'À propos', ariaLabel: 'Aller à la section À propos'},
        {id: 'skills', label: 'Compétences', ariaLabel: 'Aller à la section Compétences'},
        {id: 'projects', label: 'Projets', ariaLabel: 'Aller à la section Projets'},
        {id: 'contact', label: 'Contact', ariaLabel: 'Aller à la section Contact'}
    ]

    return (
        <>
            {/* Main header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-dark-surface/80 backdrop-blur-md border-b border-dark-border'
                        : 'bg-transparent'
                }`}
                role="banner"
            >
                <nav
                    className="container mx-auto px-4 sm:px-6 py-3 sm:py-4"
                    role="navigation"
                    aria-label="Navigation principale"
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={scrollToTop}
                            className="text-lg sm:text-xl font-bold text-ethereal-400 hover:text-ethereal-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded px-2 py-1 relative z-60"
                            aria-label="Retour en haut de la page"
                        >
                            MM
                        </button>

                        {/* Desktop navigation */}
                        <ul className="hidden md:flex gap-6 lg:gap-8">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-sm lg:text-base text-gray-400 hover:text-ethereal-400 transition-colors duration-200 relative group focus:outline-none focus:text-ethereal-400"
                                        aria-label={item.ariaLabel}
                                    >
                                        {item.label}
                                        <span
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ethereal-400 transition-all duration-200 group-hover:w-full group-focus:w-full"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile menu toggle button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded relative z-60"
                            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {/* Animated burger icon */}
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span
                                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                                        mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                                        mobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                                        mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile menu overlay */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-40 bg-dark-bg transition-all duration-300 ${
                    mobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                inert={!mobileMenuOpen || undefined}
            >
                {/* Header spacer */}
                <div className="h-14.25 sm:h-16.25" aria-hidden="true"/>

                <nav
                    className="container mx-auto px-4 py-8 h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] overflow-y-auto"
                    role="navigation"
                    aria-label="Navigation mobile"
                >
                    <ul className="flex flex-col gap-6">
                        {navItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`transition-all duration-300 ${
                                    mobileMenuOpen
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-4'
                                }`}
                                style={{
                                    transitionDelay: mobileMenuOpen ? `${index * MOBILE_MENU_ANIMATION_DELAY}ms` : '0ms'
                                }}
                            >
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="w-full text-left text-2xl font-medium text-gray-300 hover:text-ethereal-400 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-dark-surface/50 focus:outline-none focus:bg-dark-surface/50 focus:text-ethereal-400"
                                    aria-label={item.ariaLabel}
                                    tabIndex={mobileMenuOpen ? 0 : -1}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Footer */}
                    <div className="mt-8 pt-8 border-t border-dark-border">
                        <p className="text-sm text-gray-500 text-center">
                            Matteo Marquant — Portfolio 2026
                        </p>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header
