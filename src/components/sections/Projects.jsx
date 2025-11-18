import {motion} from 'framer-motion';
import {Github, ExternalLink, Code2} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import projectsData from '../../data/projects.json';

const ProjectCard = ({project, index}) => {
    return (<motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.5, delay: index * 0.1}}
    >
        <Card className="h-full flex flex-col">
            {/* Image placeholder */}
            <div className="relative group overflow-hidden rounded-lg bg-accent/40 aspect-video mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 className="text-primary/30" size={60}/>
                </div>
                {/* Hover overlay */}
                <div
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300"></div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-light">
                    {project.title}
                </h3>

                <p className="text-light/70 mb-4 flex-1">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (<span
                        key={tag}
                        className="px-2 py-1 bg-accent/60 text-light/90 rounded text-xs border border-primary/20"
                    >
                {tag}
              </span>))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {project.github && (<a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        <Github size={18}/>
                        Code
                    </a>)}
                    {project.demo && (<a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        <ExternalLink size={18}/>
                        Demo
                    </a>)}
                </div>
            </div>
        </Card>
    </motion.div>);
};

const Projects = () => {
    const projects = projectsData.projects;

    return (<section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <SectionTitle
                title="Mes Projets"
                subtitle="Une sélection de mes réalisations en développement web et game dev"
            />

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (<ProjectCard key={project.id} project={project} index={index}/>))}
            </div>

            {/* GitHub CTA */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.3}}
                className="text-center mt-12"
            >
                <p className="text-light/70 mb-4">
                    Envie d'en voir plus ?
                </p>
                <Button
                    href="https://github.com/Enoxboo"
                    variant="outline"
                    target="_blank"
                >
                    <Github size={20}/>
                    Voir tous mes projets sur GitHub
                </Button>
            </motion.div>
        </div>
    </section>);
};

export default Projects;