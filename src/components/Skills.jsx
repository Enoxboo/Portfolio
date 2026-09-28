import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { TechIcon } from './icons/TechIcon'

const STAGGER_DELAY = 80

const masteredSkills = [
    { name: 'GDScript',    category: 'Game Dev',  icon: 'godotengine', color: 'from-indigo-500 to-purple-600', level: 'Avancé',        description: 'Godot Engine, Scenes, Signals' },
    { name: 'Python',      category: 'Backend',   icon: 'python',      color: 'from-blue-500 to-indigo-600',   level: 'Avancé',        description: 'OOP, Data structures, Tkinter' },
    { name: 'Tailwind',    category: 'Frontend',  icon: 'tailwindcss', color: 'from-teal-400 to-cyan-600',     level: 'Avancé',        description: 'Utility-first, Responsive, Custom' },
    { name: 'Git',         category: 'DevOps',    icon: 'git',         color: 'from-orange-600 to-red-700',    level: 'Avancé',        description: 'Versionning, Branches, Workflow' },
    { name: 'HTML5',       category: 'Frontend',  icon: 'html5',       color: 'from-orange-500 to-red-600',    level: 'Avancé',        description: 'Sémantique, Accessibilité' },
    { name: 'JavaScript',  category: 'Full Stack', icon: 'javascript', color: 'from-yellow-400 to-yellow-600', level: 'Intermédiaire', description: 'ES6+, Async/Await, DOM' },
    { name: 'React',       category: 'Frontend',  icon: 'react',       color: 'from-cyan-400 to-blue-600',    level: 'Intermédiaire', description: 'Hooks, Context, Performance' },
    { name: 'CSS3',        category: 'Frontend',  icon: 'css',         color: 'from-pink-500 to-rose-600',     level: 'Intermédiaire', description: 'Flexbox, Grid, Animations' },
    { name: 'C++',         category: 'Systems',   icon: 'cplusplus',   color: 'from-slate-500 to-blue-700',   level: 'Intermédiaire', description: 'POO, Pointeurs, STL' },
    { name: 'Java',        category: 'Backend',   icon: 'openjdk',     color: 'from-red-600 to-orange-700',    level: 'Intermédiaire', description: 'OOP, Spring basics' },
]

const exploringSkills = [
    { name: 'Go',  category: 'Backend',  icon: 'go',       color: 'from-cyan-600 to-blue-700',    level: 'Débutant', description: 'Concurrency, API REST' },
    { name: 'SQL', category: 'Database', icon: 'database', color: 'from-emerald-500 to-teal-700', level: 'Débutant', description: 'Queries, Joins, Optimization' },
]

const levelColors = {
    'Expert':        'text-green-400',
    'Avancé':        'text-blue-400',
    'Intermédiaire': 'text-yellow-400',
    'Débutant':      'text-gray-400',
}

function SkillCard({ skill, index, isVisible, dimmed = false }) {
    const dots = { 'Expert': 4, 'Avancé': 3, 'Intermédiaire': 2, 'Débutant': 1 }
    const filled = dots[skill.level] ?? 1

    return (
        <div
            className={`group transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? `${index * STAGGER_DELAY}ms` : '0ms' }}
            role="listitem"
        >
            <div
                className={`relative h-full p-5 sm:p-6 lg:p-8 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-ethereal-600/10 focus-within:-translate-y-2 ${
                    dimmed
                        ? 'bg-dark-surface/30 border-dark-border/30 border-dashed hover:border-ethereal-600/40 focus-within:border-ethereal-600/40'
                        : 'bg-dark-surface/50 border-dark-border/50 hover:border-ethereal-600/50 focus-within:border-ethereal-600/50'
                }`}
                aria-label={`${skill.name} - ${skill.category} - Niveau ${skill.level}`}
            >
                {/* Gradient overlay on hover */}
                <div
                    className={`absolute inset-0 rounded-2xl bg-linear-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                    aria-hidden="true"
                />
                {/* Glow */}
                <div
                    className="absolute inset-0 rounded-2xl bg-ethereal-600 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative flex flex-col items-center text-center gap-3 sm:gap-4">
                    <TechIcon
                        slug={skill.icon}
                        className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-300 group-hover:text-ethereal-400 transition-all duration-300 transform group-hover:scale-110 ${dimmed ? 'opacity-70' : ''}`}
                    />

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-ethereal-400 transition-colors duration-300">
                        {skill.name}
                    </h3>

                    <span className="px-2.5 py-1 text-xs sm:text-sm bg-dark-bg/80 text-gray-400 rounded-full border border-dark-border/50 font-medium uppercase tracking-wider">
                        {skill.category}
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1" aria-label={`Niveau de compétence: ${skill.level}`}>
                            {[1, 2, 3, 4].map((dot) => (
                                <div
                                    key={dot}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        dot <= filled
                                            ? 'bg-ethereal-400 group-hover:bg-ethereal-300'
                                            : 'bg-dark-border'
                                    }`}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <span className={`text-xs font-medium ${levelColors[skill.level]}`}>
                            {skill.level}
                        </span>
                    </div>

                    {/* Description visible on mobile, revealed on hover/focus for desktop */}
                    <p className="text-xs text-gray-500 group-hover:text-gray-400 focus-within:text-gray-400 transition-colors duration-300 mt-2 leading-relaxed sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100">
                        {skill.description}
                    </p>
                </div>

                {/* Bottom accent gradient */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${skill.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
                    aria-hidden="true"
                />
            </div>
        </div>
    )
}

function Skills() {
    const { isVisible, sectionRef } = useScrollAnimation()

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="min-h-screen flex items-center py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
            aria-labelledby="skills-heading"
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
                            Compétences
                        </span>
                    </div>

                    <h2
                        id="skills-heading"
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white leading-[1.1] tracking-tight"
                    >
                        Technologies{' '}
                        <span className="text-ethereal-400 inline-block">pratiquées</span>
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 sm:mb-16 lg:mb-20 max-w-3xl leading-relaxed">
                        Une palette diversifiée de langages et technologies pour concevoir des solutions
                        complètes, du backend à l'interface utilisateur.
                    </p>

                    {/* Maîtrisées group */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-ethereal-400 inline-block" aria-hidden="true" />
                            Maîtrisées
                        </h3>

                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                            role="list"
                            aria-label="Compétences maîtrisées"
                        >
                            {masteredSkills.map((skill, index) => (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill}
                                    index={index}
                                    isVisible={isVisible}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="my-12 sm:my-16 flex items-center gap-4">
                        <div className="flex-1 h-px bg-dark-border/50" />
                        <span className="text-sm text-gray-600 font-medium px-2">En exploration</span>
                        <div className="flex-1 h-px bg-dark-border/50" />
                    </div>

                    {/* En exploration group */}
                    <div>
                        <div
                            className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 max-w-sm sm:max-w-md"
                            role="list"
                            aria-label="Technologies en cours d'exploration"
                        >
                            {exploringSkills.map((skill, index) => (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill}
                                    index={masteredSkills.length + index}
                                    isVisible={isVisible}
                                    dimmed
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-4 ml-1">
                            Apprentissage actif — pas encore en production
                        </p>
                    </div>

                    {/* Legend */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-10 border-t border-dark-border/50">
                        {[['Expert', 4], ['Avancé', 3], ['Intermédiaire', 2], ['Débutant', 1]].map(([label, count]) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((dot) => (
                                        <div
                                            key={dot}
                                            className={`w-2 h-2 rounded-full ${dot <= count ? 'bg-ethereal-400' : 'bg-dark-border'}`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">{label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm sm:text-base text-gray-500 mt-8">
                        Toujours en apprentissage continu pour explorer de nouvelles technologies.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Skills
