import {motion} from 'framer-motion';
import {Github, Linkedin, Mail, ArrowDown} from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
    const socialLinks = [{icon: Github, url: 'https://github.com/Enoxboo', label: 'GitHub'}, {
        icon: Linkedin, url: 'www.linkedin.com/in/matteo-marquant-67469a266', label: 'LinkedIn'
    }, {icon: Mail, url: 'mailto:matteo.marquant@ynov.com', label: 'Email'},];

    return (<section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                {/* Animated greeting */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <p className="text-primary text-lg md:text-xl mb-4">
                        Salut, je suis
                    </p>
                </motion.div>

                {/* Main title with gradient */}
                <motion.h1
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.1}}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Matteo Marquant
                </motion.h1>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                    className="text-2xl md:text-3xl text-primary/90 mb-4"
                >
                    aka <span className="font-bold">Enoxboo</span>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.3}}
                    className="text-xl md:text-2xl text-light/80 mb-8 max-w-3xl mx-auto"
                >
                    Développeur Web & Game Dev passionné
                </motion.p>

                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.4}}
                    className="text-lg text-light/60 mb-12 max-w-2xl mx-auto"
                >
                    Étudiant en B2 Informatique à Toulouse, je transforme des idées en projets fonctionnels.
                    Si ça n'existe pas, je le code.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <Button href="#projects" variant="primary">
                        Voir mes projets
                    </Button>
                    <Button href="#contact" variant="outline">
                        Me contacter
                    </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.6}}
                    className="flex items-center justify-center gap-6"
                >
                    {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (<motion.a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light/60 hover:text-primary transition-colors duration-200"
                            aria-label={link.label}
                            whileHover={{scale: 1.2}}
                            whileTap={{scale: 0.9}}
                        >
                            <Icon size={28}/>
                        </motion.a>);
                    })}
                </motion.div>
            </div>
        </div>

        {/* Scroll indicator */}
        <motion.a
            href="#about"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary/60 hover:text-primary transition-colors"
            animate={{y: [0, 10, 0]}}
            transition={{duration: 2, repeat: Infinity}}
        >
            <ArrowDown size={32}/>
        </motion.a>
    </section>);
};

export default Hero;