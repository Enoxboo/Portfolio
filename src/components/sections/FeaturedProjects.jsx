import {motion} from 'framer-motion';
import {Github, ExternalLink, Code2} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import projectsData from '../../data/projects.json';

const FeaturedProject = () => {
    const project = projectsData.featured;

    return (<section className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-6">
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-primary">⭐</span> Projet Phare
                </h2>
                <p className="text-light/70 text-lg">
                    Mon projet personnel le plus ambitieux
                </p>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                <Card className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Image */}
                        <div className="relative group overflow-hidden rounded-lg bg-accent/40 aspect-video">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Code2 className="text-primary/30" size={80}/>
                                <span className="absolute bottom-4 right-4 text-xs text-light/50">
                    Preview bientôt disponible
                  </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h3 className="text-3xl font-bold">{project.title}</h3>
                                <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                    {project.status}
                  </span>
                            </div>

                            <p className="text-light/80 mb-6 leading-relaxed">
                                {project.longDescription}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag) => (<span
                                    key={tag}
                                    className="px-3 py-1 bg-secondary/20 text-light/90 rounded-full text-sm border border-secondary/30"
                                >
                      {tag}
                    </span>))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
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
    </section>);
};

export default FeaturedProject;