import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqezovvr'
const STATUS_AUTO_DISMISS_DELAY = 5000

function Contact() {
    const { isVisible, sectionRef } = useScrollAnimation()
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const statusTimeoutRef = useRef(null)

    useEffect(() => {
        if (submitStatus) {
            statusTimeoutRef.current = setTimeout(() => {
                setSubmitStatus(null)
            }, STATUS_AUTO_DISMISS_DELAY)
        }

        return () => {
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current)
            }
        }
    }, [submitStatus])

    /**
     * Validate form field
     * @param {string} name - Field name
     * @param {string} value - Field value
     * @returns {string|null} Error message or null
     */
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Le nom est requis'
                if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères'
                return null
            case 'email': {
                if (!value.trim()) return "L'email est requis"
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) return "L'email n'est pas valide"
                return null
            }
            case 'message':
                if (!value.trim()) return 'Le message est requis'
                if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères'
                return null
            default:
                return null
        }
    }

    /**
     * Handle form input changes with validation
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))

        if (touched[name]) {
            const error = validateField(name, value)
            setFormErrors(prev => ({
                ...prev,
                [name]: error
            }))
        }
    }

    /**
     * Handle field blur for validation
     * @param {Event} e - Blur event
     */
    const handleBlur = (e) => {
        const { name, value } = e.target
        setTouched(prev => ({
            ...prev,
            [name]: true
        }))

        const error = validateField(name, value)
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }

    /**
     * Handle form submission with validation
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = {}
        Object.keys(formState).forEach(key => {
            const error = validateField(key, formState[key])
            if (error) errors[key] = error
        })

        setFormErrors(errors)
        setTouched({
            name: true,
            email: true,
            message: true
        })

        if (Object.keys(errors).length > 0) {
            return
        }

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
                setFormState({ name: '', email: '', message: '' })
                setFormErrors({})
                setTouched({})
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

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/Enoxboo',
            icon: <GitHubIcon className="w-6 h-6" />
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/matteo-marquant-67469a266/',
            icon: <LinkedInIcon className="w-6 h-6" />
        }
    ]

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="contact-heading"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Section badge */}
                    <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-full">
                        <span className="text-sm sm:text-base text-ethereal-400 font-medium">
                            Contact
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="contact-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-[1.1] tracking-tight"
                    >
                        Travaillons{' '}
                        <span className="text-ethereal-400 inline-block">ensemble</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 sm:mb-16 lg:mb-20 max-w-2xl leading-relaxed">
                        Un projet en tête ? Une question ? N'hésitez pas à me contacter.
                        Je serai ravi d'échanger avec vous sur vos idées et besoins.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
                        {/* Contact form */}
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                noValidate
                                aria-label="Formulaire de contact"
                            >
                                {/* Honeypot field — hidden from users, catches bots (Formspree native support) */}
                                <input
                                    type="text"
                                    name="_gotcha"
                                    style={{ display: 'none' }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                />
                                {/* Name input */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-300 mb-2"
                                    >
                                        Nom <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={`w-full px-4 py-3.5 bg-dark-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            formErrors.name && touched.name
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                : 'border-dark-border focus:border-ethereal-600 focus:ring-ethereal-600/20'
                                        }`}
                                        placeholder="Votre nom complet"
                                        aria-required="true"
                                        aria-invalid={!!(formErrors.name && touched.name)}
                                        aria-describedby={formErrors.name && touched.name ? 'name-error' : undefined}
                                    />
                                    {formErrors.name && touched.name && (
                                        <p
                                            id="name-error"
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                            role="alert"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {formErrors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-300 mb-2"
                                    >
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={`w-full px-4 py-3.5 bg-dark-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                            formErrors.email && touched.email
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                : 'border-dark-border focus:border-ethereal-600 focus:ring-ethereal-600/20'
                                        }`}
                                        placeholder="votre@email.com"
                                        aria-required="true"
                                        aria-invalid={!!(formErrors.email && touched.email)}
                                        aria-describedby={formErrors.email && touched.email ? 'email-error' : undefined}
                                    />
                                    {formErrors.email && touched.email && (
                                        <p
                                            id="email-error"
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                            role="alert"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {formErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Message textarea */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-semibold text-gray-300 mb-2"
                                    >
                                        Message <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        rows="5"
                                        className={`w-full px-4 py-3.5 bg-dark-surface border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                                            formErrors.message && touched.message
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                                : 'border-dark-border focus:border-ethereal-600 focus:ring-ethereal-600/20'
                                        }`}
                                        placeholder="Parlez-moi de votre projet..."
                                        aria-required="true"
                                        aria-invalid={!!(formErrors.message && touched.message)}
                                        aria-describedby={formErrors.message && touched.message ? 'message-error' : undefined}
                                    />
                                    {formErrors.message && touched.message && (
                                        <p
                                            id="message-error"
                                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                                            role="alert"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {formErrors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-ethereal-600 hover:bg-ethereal-500 active:bg-ethereal-700 rounded-lg transition-all duration-200 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg shadow-lg shadow-ethereal-600/20 hover:shadow-ethereal-500/30"
                                    aria-label={isSubmitting ? 'Envoi en cours' : 'Envoyer le message'}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </span>
                                    ) : (
                                        'Envoyer le message'
                                    )}
                                </button>

                                {/* Success message */}
                                {submitStatus === 'success' && (
                                    <div
                                        className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-green-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-green-400 font-medium">Message envoyé avec succès !</p>
                                                <p className="text-green-300/80 text-sm mt-1">Je vous répondrai dans les plus brefs délais.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error message */}
                                {submitStatus === 'error' && (
                                    <div
                                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <p className="text-red-400 font-medium">Une erreur est survenue</p>
                                                <p className="text-red-300/80 text-sm mt-1">Veuillez réessayer ou me contacter directement via mes réseaux sociaux.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Social links */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
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
                                        className="group flex items-center gap-4 p-5 bg-dark-surface/50 backdrop-blur-sm border border-dark-border rounded-xl hover:border-ethereal-600 hover:bg-dark-surface/80 transition-all duration-200 focus:outline-none focus:border-ethereal-600 focus:ring-2 focus:ring-ethereal-600/20 hover:-translate-y-0.5"
                                        aria-label={`Visiter mon profil ${link.name} (ouvre dans un nouvel onglet)`}
                                    >
                                        <div className="text-gray-400 group-hover:text-ethereal-400 transition-colors duration-200">
                                            {link.icon}
                                        </div>
                                        <span className="text-base sm:text-lg text-white font-semibold group-hover:text-ethereal-400 transition-colors duration-200">
                                            {link.name}
                                        </span>
                                        <span
                                            className="ml-auto text-gray-500 transform group-hover:translate-x-1 group-hover:text-ethereal-400 transition-all duration-200"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </a>
                                ))}
                            </nav>

                            {/* Location info */}
                            <div className="mt-8 pt-8 border-t border-dark-border/50">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="text-sm sm:text-base">
                                        Basé à <span className="text-white font-medium">Toulouse, France</span> 🇫🇷
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact