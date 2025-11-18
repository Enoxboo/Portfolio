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
        href: 'www.linkedin.com/in/matteo-marquant-67469a266',
        color: 'text-[#0A66C2]',
    }, {
        icon: MapPin, title: 'Localisation', value: 'Toulouse, France', href: null, color: 'text-secondary',
    },];

    return (<section id="contact" className="py-20 md:py-32 bg-accent/5">
        <div className="container mx-auto px-6">
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
                className="max-w-4xl mx-auto"
            >
                <div className="grid md:grid-cols-2 gap-6">
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
                                <Card className="group cursor-pointer">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`p-3 bg-accent/40 rounded-lg ${method.color} group-hover:scale-110 transition-transform`}>
                                            <Icon size={24}/>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1 text-light/90">
                                                {method.title}
                                            </h3>
                                            <p className="text-light/70 group-hover:text-primary transition-colors">
                                                {method.value}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </a>) : (<Card>
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 bg-accent/40 rounded-lg ${method.color}`}>
                                        <Icon size={24}/>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1 text-light/90">
                                            {method.title}
                                        </h3>
                                        <p className="text-light/70">
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
                    <Card className="max-w-2xl mx-auto bg-primary/10 border-primary/30">
                        <p className="text-light/90 text-lg">
                            💼 Actuellement à la recherche d'une <span
                            className="text-primary font-semibold">alternance</span> pour septembre 2026
                        </p>
                        <p className="text-light/70 mt-2">
                            Développement web • Game dev • Projets innovants
                        </p>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    </section>);
};

export default Contact;