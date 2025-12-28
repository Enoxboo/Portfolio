import { useState, useEffect } from 'react'

function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fermer le menu mobile lors du scroll et gérer le body overflow
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Fermer le menu si on scroll
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

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setMobileMenuOpen(false)
        }
    }

    const navItems = [
        { id: 'about', label: 'À propos', ariaLabel: 'Aller à la section À propos' },
        { id: 'skills', label: 'Compétences', ariaLabel: 'Aller à la section Compétences' },
        { id: 'projects', label: 'Projets', ariaLabel: 'Aller à la section Projets' },
        { id: 'contact', label: 'Contact', ariaLabel: 'Aller à la section Contact' }
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[var(--color-dark-surface)]/80 backdrop-blur-md border-b border-[var(--color-dark-border)]'
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
                        {/* Logo/Nom */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-lg sm:text-xl font-bold text-[var(--color-ethereal-400)] hover:text-[var(--color-ethereal-300)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ethereal-400)] focus:ring-offset-2 focus:ring-offset-[var(--color-dark-bg)] rounded px-2 py-1 relative z-[60]"
                            aria-label="Retour en haut de la page"
                        >
                            MM
                        </button>

                        {/* Navigation Desktop - Hidden on mobile */}
                        <ul className="hidden md:flex gap-6 lg:gap-8">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-sm lg:text-base text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 relative group focus:outline-none focus:text-[var(--color-ethereal-400)]"
                                        aria-label={item.ariaLabel}
                                    >
                                        {item.label}
                                        <span
                                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-ethereal-400)] transition-all duration-200 group-hover:w-full group-focus:w-full"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Burger Menu Button - Visible on mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-ethereal-400)] focus:ring-offset-2 focus:ring-offset-[var(--color-dark-bg)] rounded relative z-[60]"
                            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {/* Burger Icon animé */}
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

            {/* Mobile Menu - Séparé du header pour éviter les problèmes de positionnement */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-40 bg-[var(--color-dark-bg)] transition-all duration-300 ${
                    mobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!mobileMenuOpen}
            >
                {/* Espace pour le header */}
                <div className="h-[57px] sm:h-[65px]" aria-hidden="true" />

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
                                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms'
                                }}
                            >
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="w-full text-left text-2xl font-medium text-gray-300 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-[var(--color-dark-surface)]/50 focus:outline-none focus:bg-[var(--color-dark-surface)]/50 focus:text-[var(--color-ethereal-400)]"
                                    aria-label={item.ariaLabel}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Ligne décorative */}
                    <div className="mt-8 pt-8 border-t border-[var(--color-dark-border)]">
                        <p className="text-sm text-gray-500 text-center">
                            Matteo Marquant — Portfolio 2024
                        </p>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header