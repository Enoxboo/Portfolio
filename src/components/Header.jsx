import { useState, useEffect, useCallback } from 'react'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'

/**
 * Header component with sticky navigation and mobile menu
 * Features:
 * - Sticky header with backdrop blur effect on scroll
 * - Responsive mobile menu with animated burger icon
 * - Smooth scroll to sections with focus management
 * - Enhanced accessibility (ARIA labels, keyboard navigation, focus trap)
 * - Performance optimizations (useCallback, passive event listeners)
 * - Scroll lock when mobile menu is open
 */
function Header() {
    const SCROLL_THRESHOLD = 20
    const MOBILE_MENU_ANIMATION_DELAY = 50

    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > SCROLL_THRESHOLD)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
                const firstMenuItem = document.querySelector('#mobile-menu button')
                if (firstMenuItem) {
                    firstMenuItem.focus()
                }
            }, 100)
        } else {
            document.body.style.overflow = 'unset'
        }

        const handleEscape = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false)
                const menuButton = document.querySelector('[aria-controls="mobile-menu"]')
                if (menuButton) {
                    menuButton.focus()
                }
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener('keydown', handleEscape)
        }
    }, [mobileMenuOpen])

    /**
     * Smooth scroll to a section by ID with focus management
     * @param {string} id - Section ID to scroll to
     */
    const scrollToSection = useCallback((id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setMobileMenuOpen(false)

            setTimeout(() => {
                element.focus({ preventScroll: true })
            }, 300)
        }
    }, [])

    /**
     * Scroll to top of page with focus management
     */
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setMobileMenuOpen(false)

        setTimeout(() => {
            const main = document.querySelector('main, [role="main"]')
            if (main) {
                main.focus({ preventScroll: true })
            }
        }, 300)
    }, [])

    /**
     * Toggle mobile menu
     */
    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev)
    }, [])

    const navItems = [
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'projects', label: 'Projets' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <>
            {/* Main header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-dark-surface/90 backdrop-blur-md border-b border-dark-border/50 shadow-lg shadow-black/5'
                        : 'bg-transparent'
                }`}
                role="banner"
            >
                <nav
                    className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
                    role="navigation"
                    aria-label="Navigation principale"
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={scrollToTop}
                            className="group text-xl sm:text-2xl font-bold text-ethereal-400 hover:text-ethereal-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg rounded-lg px-3 py-2 relative z-[60]"
                            aria-label="Matteo Marquant - Retour en haut de la page"
                        >
                            <span className="inline-block group-hover:scale-110 transition-transform duration-200">
                                MM
                            </span>
                        </button>

                        {/* Desktop navigation */}
                        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-sm lg:text-base text-gray-300 hover:text-ethereal-400 transition-colors duration-200 relative group focus:outline-none focus:text-ethereal-400 py-2"
                                        aria-label={`Aller à la section ${item.label}`}
                                    >
                                        {item.label}
                                        <span
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ethereal-400 transition-all duration-300 group-hover:w-full group-focus:w-full"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button - Desktop only */}
                        <div className="hidden md:block">
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-5 lg:px-6 py-2.5 lg:py-3 bg-ethereal-600 hover:bg-ethereal-500 active:bg-ethereal-700 text-white text-sm lg:text-base font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg shadow-lg shadow-ethereal-600/20 hover:shadow-ethereal-500/30 hover:-translate-y-0.5"
                                aria-label="Me contacter"
                            >
                                Me contacter
                            </button>
                        </div>

                        {/* Mobile menu toggle button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2.5 text-gray-300 hover:text-ethereal-400 hover:bg-dark-surface/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg relative z-[60]"
                            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {/* Animated burger icon */}
                            <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
                                <span
                                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                                        mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                                />
                                <span
                                    className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                                        mobileMenuOpen ? 'opacity-0' : 'opacity-100'
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
                className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
                    mobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!mobileMenuOpen}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-dark-bg/95 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />

                {/* Menu content */}
                <div className="relative h-full flex flex-col">
                    {/* Header spacer */}
                    <div className="h-20" aria-hidden="true" />

                    <nav
                        className="flex-1 container mx-auto px-4 py-8 overflow-y-auto"
                        role="navigation"
                        aria-label="Navigation mobile"
                    >
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className={`transition-all duration-300 ${
                                        mobileMenuOpen
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 -translate-y-4'
                                    }`}
                                    style={{
                                        transitionDelay: mobileMenuOpen
                                            ? `${index * MOBILE_MENU_ANIMATION_DELAY}ms`
                                            : '0ms'
                                    }}
                                >
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="w-full text-left text-2xl sm:text-3xl font-semibold text-gray-200 hover:text-ethereal-400 active:text-ethereal-300 transition-all duration-200 py-4 px-4 rounded-xl hover:bg-dark-surface/50 active:bg-dark-surface/70 focus:outline-none focus:bg-dark-surface/50 focus:text-ethereal-400 focus:ring-2 focus:ring-ethereal-400/50"
                                        aria-label={`Aller à la section ${item.label}`}
                                        tabIndex={mobileMenuOpen ? 0 : -1}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* CTA in mobile menu */}
                        <div
                            className={`mt-8 transition-all duration-300 ${
                                mobileMenuOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 -translate-y-4'
                            }`}
                            style={{
                                transitionDelay: mobileMenuOpen
                                    ? `${navItems.length * MOBILE_MENU_ANIMATION_DELAY}ms`
                                    : '0ms'
                            }}
                        >
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="w-full px-6 py-4 bg-ethereal-600 hover:bg-ethereal-500 active:bg-ethereal-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 shadow-lg shadow-ethereal-600/20"
                                tabIndex={mobileMenuOpen ? 0 : -1}
                                aria-label="Me contacter"
                            >
                                Me contacter
                            </button>
                        </div>

                        {/* Footer in mobile menu */}
                        <div
                            className={`mt-auto pt-8 border-t border-dark-border/50 transition-all duration-300 ${
                                mobileMenuOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'
                            }`}
                            style={{
                                transitionDelay: mobileMenuOpen
                                    ? `${(navItems.length + 1) * MOBILE_MENU_ANIMATION_DELAY}ms`
                                    : '0ms'
                            }}
                        >
                            <p className="text-sm text-gray-500 text-center">
                                Matteo Marquant — Portfolio {new Date().getFullYear()}
                            </p>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <a
                                    href="https://github.com/Enoxboo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 rounded-lg"
                                    aria-label="Visiter mon profil GitHub (ouvre dans un nouvel onglet)"
                                    tabIndex={mobileMenuOpen ? 0 : -1}
                                >
                                    <GitHubIcon />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/matteo-marquant-67469a266/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-ethereal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ethereal-400 rounded-lg"
                                    aria-label="Visiter mon profil LinkedIn (ouvre dans un nouvel onglet)"
                                    tabIndex={mobileMenuOpen ? 0 : -1}
                                >
                                    <LinkedInIcon />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Header