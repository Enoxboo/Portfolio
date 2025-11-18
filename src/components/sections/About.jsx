import {motion} from 'framer-motion';
import {Code2, Gamepad2, Rocket, Download} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';

const About = () => {
    const skills = [{
        icon: Code2, title: 'Développement Web', items: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
    }, {
        icon: Gamepad2,
        title: 'Game Development',
        items: ['Unity/Unreal', 'C#/C++', 'Game Design', 'Gameplay Programming'],
    }, {
        icon: Rocket, title: 'Outils & Workflow', items: ['Git', 'Vite', 'VS Code', 'Agile'],
    },];

    return (<section id="about" className="py-24 md:py-32 bg-dark">
        <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
                <SectionTitle
                    title="À propos"
                    subtitle="Développeur passionné par la création d'expériences interactives"
                />

                <div className="grid md:grid-cols-2 gap-12 items-start mt-16">
                    {/* Bio */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5}}
                    >
                        <Card>
                            <h3 className="text-2xl font-bold mb-6 text-primary">
                                Bonjour ! 👋
                            </h3>
                            <div className="space-y-4 text-light/80 leading-relaxed">
                                <p>
                                    Je suis <span className="text-primary font-semibold">Matteo Marquant</span>,
                                    également connu sous le pseudo <span
                                    className="text-primary font-semibold">Enoxboo</span>.
                                    Actuellement étudiant en B2 Informatique à Toulouse, je suis passionné par le
                                    développement web et la création de jeux vidéo.
                                </p>
                                <p>
                                    Ce qui me motive ? <span className="text-primary">Créer ce que j'aimerais utiliser ou jouer</span>.
                                    Si une application ou un jeu que j'imagine n'existe pas, je le code. Cette
                                    philosophie
                                    me pousse à constamment apprendre et à relever de nouveaux défis.
                                </p>
                                <p>
                                    Je cherche actuellement une <span
                                    className="text-primary font-semibold">alternance</span> pour
                                    mettre mes compétences au service de projets concrets et continuer à grandir en
                                    tant que développeur.
                                </p>
                            </div>

                            {/* CV Download Button */}
                            <div className="mt-8">
                                <Button
                                    href="/assets/cv/CV_Matteo_Marquant.pdf"
                                    variant="primary"
                                    download
                                >
                                    <Download size={20}/>
                                    Télécharger mon CV
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.2}}
                        className="space-y-6"
                    >
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (<motion.div
                                key={skill.title}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5, delay: index * 0.15}}
                            >
                                <Card>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                                            <Icon className="text-primary" size={28}/>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold mb-4">
                                                {skill.title}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map((item) => (<span
                                                    key={item}
                                                    className="px-4 py-2 bg-accent/40 text-light/90 rounded-full text-sm border border-primary/20 hover:border-primary/50 transition-colors"
                                                >
                                {item}
                              </span>))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>);
                        })}
                    </motion.div>
                </div>
            </div>
        </div>
    </section>);
};

export default About;