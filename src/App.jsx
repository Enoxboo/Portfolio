import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'

function App() {
    return (
        <div className="min-h-screen bg-[var(--color-dark-bg)] text-white relative">
            {/* Background ethereal global */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-ethereal-600)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[var(--color-ethereal-800)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[var(--color-ethereal-700)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
            </div>

            <Header />

            <div className="pt-16 relative z-10">
                <Hero />
                <About />

                <section id="skills" className="min-h-screen container mx-auto px-6 flex items-center">
                    <h2 className="text-4xl font-bold">Section Compétences</h2>
                </section>

                <section id="projects" className="min-h-screen container mx-auto px-6 flex items-center">
                    <h2 className="text-4xl font-bold">Section Projets</h2>
                </section>

                <section id="contact" className="min-h-screen container mx-auto px-6 flex items-center">
                    <h2 className="text-4xl font-bold">Section Contact</h2>
                </section>
            </div>
        </div>
    )
}

export default App