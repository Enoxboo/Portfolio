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

    return (<section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <SectionTitle
                title="À propos"
                subtitle="Développeur passionné par la création d'expériences interactives"
            />

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Bio */}
                <motion.div
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                >
                    <Card>
                        <h3 className="text-2xl font-bold mb-4 text-primary">
                            Bonjour ! 👋
                        </h3>
                        <div className="space-y-4 text-light/80">
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
                                mettre mes compétences au service de projets concrets et continuer à grandir en tant
                                que développeur.
                            </p>
                        </div>

                        {/* CV Download Button */}
                        <div className="mt-6">
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
                            transition={{duration: 0.5, delay: index * 0.1}}
                        >
                            <Card>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Icon className="text-primary" size={24}/>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-semibold mb-3">
                                            {skill.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.items.map((item) => (<span
                                                key={item}
                                                className="px-3 py-1 bg-accent/40 text-light/90 rounded-full text-sm border border-primary/20"
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
    </section>);
};

export default About;