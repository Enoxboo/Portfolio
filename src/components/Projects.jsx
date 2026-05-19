import { memo } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { GitHubIcon } from './icons/GitHubIcon'

const STAGGER_DELAY = 100

function Projects() {
    const { isVisible, sectionRef } = useScrollAnimation()

    const projects = [
        {
            title: 'Jeu Godot - Project R',
            description: 'Un jeu d\'aventure immersif développé avec le moteur Godot Engine. Exploration d\'un monde interactif avec des mécaniques de gameplay innovantes, un système de quêtes dynamique et une narration qui s\'adapte aux choix du joueur.',
            tags: ['GDScript', 'Godot 4.x', 'Game Design', '2D'],
            link: 'https://github.com/Enoxboo/Project-R',
            icon: '🎮',
            color: 'from-blue-500 to-purple-600'
        },
        {
            title: 'Site Photographe Pro',
            description: 'Portfolio professionnel responsive pour un photographe avec galerie dynamique, interface élégante et optimisée. Intègre un système de filtrage par catégories, lightbox personnalisée et performances optimisées pour le chargement des images haute résolution.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive'],
            link: 'https://github.com/Enoxboo/sandysart-photo',
            icon: '📸',
            color: 'from-pink-500 to-rose-600'
        },
        {
            title: 'Sprout Island - Survival Game',
            description: 'Jeu de survie stratégique basé sur des choix où vous devez gérer vos ressources pour survivre sur une île déserte pendant 20 jours. Interface Tkinter soignée avec gestion de la faim, hydratation, énergie et événements aléatoires qui testent votre capacité d\'adaptation.',
            tags: ['Python', 'Tkinter', 'Game Dev', 'OOP'],
            link: 'https://github.com/Enoxboo/Sprout-Island',
            icon: '🏝️',
            color: 'from-green-500 to-emerald-600'
        }
    ]

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="projects-heading"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Section badge */}
                    <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-dark-surface/80 backdrop-blur-sm border border-dark-border rounded-full">
                        <span className="text-sm sm:text-base text-ethereal-400 font-medium">
                            💼 Réalisations
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="projects-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-[1.1] tracking-tight"
                    >
                        Projets{' '}
                        <span className="text-ethereal-400 inline-block">remarquables</span>
                    </h2>

                    {/* Description */}
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 sm:mb-16 lg:mb-20 max-w-3xl leading-relaxed">
                        Une sélection de projets qui illustrent ma polyvalence technique et ma passion
                        pour créer des expériences numériques innovantes et engageantes.
                    </p>

                    {/* Projects grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                        role="list"
                        aria-label="Liste des projets"
                    >
                        {projects.map((project, index) => (
                            <article
                                key={project.title}
                                className={`group transition-all duration-500 ease-out ${
                                    isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                }`}
                                style={{
                                    transitionDelay: isVisible ? `${index * STAGGER_DELAY}ms` : '0ms'
                                }}
                                role="listitem"
                            >
                                <div
                                    className="relative h-full flex flex-col bg-dark-surface/50 backdrop-blur-sm border border-dark-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-ethereal-600/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ethereal-600/10 focus-within:border-ethereal-600/50 focus-within:-translate-y-2">

                                    {/* Gradient overlay on hover */}
                                    <div
                                        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                                        aria-hidden="true"
                                    />

                                    {/* Glow effect */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-ethereal-600 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <div className="relative flex-1 flex flex-col p-6 sm:p-8">
                                        {/* Icon + Title */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="text-4xl sm:text-5xl" role="img"
                                                 aria-label={`Icône du projet ${project.title}`}>
                                                {project.icon}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-ethereal-400 transition-colors duration-300 flex-1 leading-tight">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Project description */}
                                        <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 leading-relaxed mb-6 flex-1 transition-colors duration-300">
                                            {project.description}
                                        </p>

                                        {/* Technology tags */}
                                        <div
                                            className="flex flex-wrap gap-2 mb-6"
                                            role="list"
                                            aria-label="Technologies utilisées"
                                        >
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1.5 text-xs sm:text-sm bg-dark-bg/80 text-ethereal-400 rounded-full border border-dark-border/50 font-medium backdrop-blur-sm transition-all duration-200 hover:border-ethereal-600/50 hover:bg-ethereal-600/10"
                                                    role="listitem"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Project link */}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm sm:text-base text-ethereal-400 hover:text-ethereal-300 font-semibold transition-all duration-200 group/link focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-surface rounded-lg px-3 py-2 -mx-3 hover:bg-ethereal-600/10"
                                            aria-label={`Voir le projet ${project.title} sur GitHub (ouvre dans un nouvel onglet)`}
                                        >
                                            <GitHubIcon />
                                            <span>Voir sur GitHub</span>
                                            <span
                                                className="transform group-hover/link:translate-x-1 transition-transform duration-200 text-lg"
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </a>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`h-1 bg-linear-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                        aria-hidden="true"
                                    />
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Call to action */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
                        <p className="text-gray-400 mb-6 text-base sm:text-lg">
                            Envie de découvrir plus de projets ?
                        </p>
                        <a
                            href="https://github.com/Enoxboo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-dark-surface/80 backdrop-blur-sm border border-dark-border hover:border-ethereal-600 rounded-xl transition-all duration-200 group hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ethereal-400 focus:ring-offset-2 focus:ring-offset-dark-bg hover:shadow-xl hover:shadow-ethereal-600/20"
                            aria-label="Visiter mon profil GitHub pour voir tous mes projets (ouvre dans un nouvel onglet)"
                        >
                            <GitHubIcon className="w-6 h-6 text-gray-400 group-hover:text-ethereal-400 transition-colors duration-200" />
                            <span className="font-semibold text-white text-base sm:text-lg">
                                Voir tous mes projets
                            </span>
                            <span
                                className="text-gray-500 group-hover:text-ethereal-400 transform group-hover:translate-x-1 transition-all duration-200"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(Projects)