import {useEffect, useRef, useState} from 'react'

/**
 * Contact component - Contact form and social links section
 * Features:
 * - Intersection Observer for scroll animation
 * - Form validation and submission via Formspree
 * - Success/error status feedback
 * - Social media links with hover effects
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
function Contact() {
    // Constants
    const INTERSECTION_THRESHOLD = 0.2
    const ANIMATION_DURATION = 1000
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqezovvr'

    // State
    const [isVisible, setIsVisible] = useState(false)
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const sectionRef = useRef(null)

    // Handle scroll-triggered animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {threshold: INTERSECTION_THRESHOLD}
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    /**
     * Handle form input changes
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
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
            console.error('Erreur lors de l\'envoi du formulaire:', error)
            setSubmitStatus('error')

        } finally {
            setIsSubmitting(false)
        }
    }

    // Social links configuration
    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/yourusername',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"/>
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/yourprofile',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
            aria-labelledby="contact-heading"
        >
            <div className="container mx-auto">
                <div className={`max-w-4xl mx-auto transition-all duration-${ANIMATION_DURATION} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Section badge */}
                    <div
                        className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-dark-surface border border-dark-border rounded-full"
                        role="status"
                        aria-label="Section actuelle"
                    >
                        <span className="text-xs sm:text-sm text-ethereal-400">
                            Contact
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="contact-heading"
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight"
                    >
                        Travaillons
                        <span className="text-ethereal-400"> ensemble</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl leading-relaxed">
                        Un projet en tête ? Une question ? N'hésitez pas à me contacter.
                        Je serai ravi d'échanger avec vous.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                        {/* Contact form */}
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 sm:space-y-6"
                                noValidate
                            >
                                {/* Name input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-400 mb-2"
                                    >
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20 transition-colors duration-200"
                                        placeholder="Votre nom"
                                        aria-required="true"
                                    />
                                </div>

                                {/* Email input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-400 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20 transition-colors duration-200"
                                        placeholder="votre@email.com"
                                        aria-required="true"
                                    />
                                </div>

                                {/* Message textarea */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-400 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20 transition-colors duration-200 resize-none"
                                        placeholder="Votre message..."
                                        aria-required="true"
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-ethereal-600 hover:bg-ethereal-500 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg"
                                    aria-label={isSubmitting ? 'Envoi en cours' : 'Envoyer le message'}
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                                </button>

                                {/* Success message */}
                                {submitStatus === 'success' && (
                                    <div
                                        className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        <p className="text-green-400 text-sm">
                                            ✓ Message envoyé avec succès !
                                        </p>
                                    </div>
                                )}

                                {/* Error message */}
                                {submitStatus === 'error' && (
                                    <div
                                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        <p className="text-red-400 text-sm">
                                            ✗ Une erreur est survenue. Réessayez.
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Social links */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                                Retrouvez-moi
                            </h3>

                            <nav
                                className="space-y-4"
                                aria-label="Liens vers les réseaux sociaux"
                            >
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-4 p-4 bg-dark-surface border border-dark-border rounded-lg hover:border-ethereal-600 transition-all duration-200 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20"
                                        aria-label={`Visiter mon profil ${link.name}`}
                                    >
                                        <div
                                            className="text-gray-400 group-hover:text-ethereal-400 transition-colors duration-200">
                                            {link.icon}
                                        </div>
                                        <span
                                            className="text-sm sm:text-base text-white font-medium group-hover:text-ethereal-400 transition-colors duration-200">
                                            {link.name}
                                        </span>
                                        <span
                                            className="ml-auto text-gray-600 transform group-hover:translate-x-1 transition-transform duration-200"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </a>
                                ))}
                            </nav>

                            {/* Location info */}
                            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-dark-border">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Basé à Toulouse, France 🇫🇷
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
