import { useState, useEffect } from 'react'

function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const navItems = [
        { id: 'about', label: 'À propos' },
        { id: 'skills', label: 'Compétences' },
        { id: 'projects', label: 'Projets' },
        { id: 'contact', label: 'Contact' }
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[var(--color-dark-surface)]/80 backdrop-blur-md border-b border-[var(--color-dark-border)]'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Nom */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-xl font-bold text-[var(--color-ethereal-400)] hover:text-[var(--color-ethereal-300)] transition-colors duration-200"
                    >
                        MM
                    </button>

                    {/* Navigation */}
                    <ul className="flex gap-8">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-gray-400 hover:text-[var(--color-ethereal-400)] transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-ethereal-400)] transition-all duration-200 group-hover:w-full" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header