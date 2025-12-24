import {useEffect, useRef, useState} from 'react'

function Contact() {
    const [isVisible, setIsVisible] = useState(false)
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {threshold: 0.2}
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            // Remplace par ton endpoint FormSpree
            const response = await fetch('https://formspree.io/f/mqezovvr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormState({name: '', email: '', message: ''})
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/Enoxboo',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"/>
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/matteo-marquant-67469a266/',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            )
        }
    ]

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20"
        >
            <div className="container mx-auto px-6">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Tag section */}
                    <div
                        className="inline-block mb-4 px-4 py-2 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-full">
            <span className="text-sm text-[var(--color-ethereal-400)]">
              Contact
            </span>
                    </div>

                    {/* Titre */}
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                        Travaillons
                        <span className="text-[var(--color-ethereal-400)]"> ensemble</span>
                    </h2>

                    <p className="text-lg text-gray-400 mb-12 max-w-2xl">
                        Un projet en tête ? Une question ? N'hésitez pas à me contacter.
                        Je serai ravi d'échanger avec vous.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Formulaire */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-ethereal-600)] transition-colors duration-200"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-ethereal-600)] transition-colors duration-200"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-ethereal-600)] transition-colors duration-200 resize-none"
                                        placeholder="Votre message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-[var(--color-ethereal-600)] hover:bg-[var(--color-ethereal-500)] rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                                </button>

                                {submitStatus === 'success' && (
                                    <p className="text-green-400 text-sm">Message envoyé avec succès !</p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-red-400 text-sm">Une erreur est survenue. Réessayez.</p>
                                )}
                            </form>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Retrouvez-moi
                            </h3>

                            <div className="space-y-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-[var(--color-dark-surface)] border border-[var(--color-dark-border)] rounded-lg hover:border-[var(--color-ethereal-600)] transition-all duration-200"
                                    >
                                        <div
                                            className="text-gray-400 group-hover:text-[var(--color-ethereal-400)] transition-colors duration-200">
                                            {link.icon}
                                        </div>
                                        <span
                                            className="text-white font-medium group-hover:text-[var(--color-ethereal-400)] transition-colors duration-200">
                {link.name}
            </span>
                                        <span
                                            className="ml-auto text-gray-600 transform group-hover:translate-x-1 transition-transform duration-200">
                →
            </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
