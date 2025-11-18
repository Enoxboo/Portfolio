import {motion} from 'framer-motion';
import {Mail, Github, Linkedin, MapPin} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

const Contact = () => {
    const contactMethods = [{
        icon: Mail,
        title: 'Email',
        value: 'matteo.marquant@ynov.com',
        href: 'mailto:matteo.marquant@ynov.com',
        color: 'text-primary',
    }, {
        icon: Github, title: 'GitHub', value: '@Enoxboo', href: 'https://github.com/Enoxboo', color: 'text-light',
    }, {
        icon: Linkedin,
        title: 'LinkedIn',
        value: 'Matteo Marquant',
        href: 'https://www.linkedin.com/in/matteo-marquant-67469a266',
        color: 'text-[#0A66C2]',
    }, {
        icon: MapPin, title: 'Localisation', value: 'Toulouse, France', href: null, color: 'text-secondary',
    },];

    return (<section id="contact" className="py-24 md:py-32 bg-accent/5 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <SectionTitle
                    title="Contact"
                    subtitle="N'hésitez pas à me contacter pour un stage, une alternance ou simplement échanger !"
                    centered
                />

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="mt-16"
                >
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {contactMethods.map((method, index) => {
                            const Icon = method.icon;
                            return (<motion.div
                                key={method.title}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                            >
                                {method.href ? (<a href={method.href} target="_blank" rel="noopener noreferrer">
                                    <Card className="group cursor-pointer h-full">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`p-4 bg-accent/40 rounded-lg ${method.color} group-hover:scale-110 transition-transform`}>
                                                <Icon size={28}/>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold mb-2 text-light/90">
                                                    {method.title}
                                                </h3>
                                                <p className="text-light/70 group-hover:text-primary transition-colors text-base">
                                                    {method.value}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </a>) : (<Card className="h-full">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-4 bg-accent/40 rounded-lg ${method.color}`}>
                                            <Icon size={28}/>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2 text-light/90">
                                                {method.title}
                                            </h3>
                                            <p className="text-light/70 text-base">
                                                {method.value}
                                            </p>
                                        </div>
                                    </div>
                                </Card>)}
                            </motion.div>);
                        })}
                    </div>

                    {/* Additional message */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.4}}
                        className="mt-12 text-center"
                    >
                        <Card className="max-w-3xl mx-auto bg-primary/10 border-primary/30">
                            <div className="py-4">
                                <p className="text-light/90 text-xl font-medium mb-2">
                                    💼 Actuellement à la recherche d'une <span
                                    className="text-primary font-semibold">alternance</span> pour septembre 2026
                                </p>
                                <p className="text-light/70 text-lg">
                                    Développement web • Game dev • Projets innovants
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </section>);
};

export default Contact;