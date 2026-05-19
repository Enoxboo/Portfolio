import { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error('Portfolio error:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold text-[#c084fc] mb-4">
                            Quelque chose s&apos;est mal passé
                        </h1>
                        <p className="text-gray-400 mb-6">
                            Une erreur inattendue est survenue. Veuillez rafraîchir la page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-[#9333ea] hover:bg-[#a855f7] rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c084fc] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
                        >
                            Rafraîchir la page
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
