import Header from './components/Header'
import Hero from './components/Hero'

function App() {
    return (
        <div className="min-h-screen bg-[var(--color-dark-bg)] text-white">
            <Header />

            <div className="pt-16">
                <Hero />

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