import Header from './components/Header'

function App() {
    return (
        <div className="min-h-screen bg-[var(--color-dark-bg)] text-white">
            <Header />

            {/* Contenu temporaire pour tester le scroll */}
            <div className="pt-20">
                <section id="hero" className="min-h-screen container mx-auto px-6 flex items-center">
                    <div>
                        <h1 className="text-6xl font-bold text-[var(--color-ethereal-400)]">
                            Matteo Marquant
                        </h1>
                        <p className="mt-4 text-xl text-gray-400">
                            Header avec navigation ✓
                        </p>
                    </div>
                </section>

                <section id="about" className="min-h-screen container mx-auto px-6 flex items-center">
                    <h2 className="text-4xl font-bold">Section À propos</h2>
                </section>

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