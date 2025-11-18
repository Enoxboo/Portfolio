import {motion} from 'framer-motion';
import {Github, ExternalLink, Code2} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import projectsData from '../../data/projects.json';

const FeaturedProject = () => {
    const project = projectsData.featured;

    return (<section className="py-24 md:py-32 bg-accent/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-primary">⭐</span> Projet Phare
                    </h2>
                    <p className="text-light/70 text-lg max-w-2xl mx-auto">
                        Mon projet personnel le plus ambitieux
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    <Card className="overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Image */}
                            <div className="relative group overflow-hidden rounded-lg bg-accent/40 aspect-video">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Code2 className="text-primary/30" size={80}/>
                                    <span className="absolute bottom-4 right-4 text-xs text-light/50">
                      Preview bientôt disponible
                    </span>
                                </div>
                                {/* Hover effect */}
                                <div
                                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                                    <span
                                        className="px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full">
                      {project.status}
                    </span>
                                </div>

                                <p className="text-light/80 text-lg leading-relaxed">
                                    {project.longDescription}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (<span
                                        key={tag}
                                        className="px-4 py-2 bg-secondary/20 text-light/90 rounded-full text-sm border border-secondary/30 hover:border-secondary/60 transition-colors"
                                    >
                        {tag}
                      </span>))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4">
                                    {project.github && (<Button href={project.github} variant="primary" target="_blank">
                                        <Github size={20}/>
                                        Code source
                                    </Button>)}
                                    {project.demo && (<Button href={project.demo} variant="outline" target="_blank">
                                        <ExternalLink size={20}/>
                                        Démo live
                                    </Button>)}
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    </section>);
};

export default FeaturedProject;