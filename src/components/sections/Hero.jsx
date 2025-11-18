import {motion} from 'framer-motion';
import {Github, Linkedin, Mail, ArrowDown} from 'lucide-react';
import Button from '../ui/Button';
import profilePic from '../../assets/profile.jpg';

const Hero = () => {
    const socialLinks = [{icon: Github, url: 'https://github.com/Enoxboo', label: 'GitHub'}, {
        icon: Linkedin, url: 'www.linkedin.com/in/matteo-marquant-67469a266', label: 'LinkedIn'
    }, {icon: Mail, url: 'mailto:matteo.marquant@ynov.com', label: 'Email'},];

    return (<section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div
                className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse"
                style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Left side - Text Content */}
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6}}
                    className="text-center md:text-left"
                >
                    {/* Animated greeting */}
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                        className="text-primary text-lg md:text-xl mb-4"
                    >
                        Salut, je suis
                    </motion.p>

                    {/* Main title */}
                    <motion.h1
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.3}}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Matteo Marquant
                    </motion.h1>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                        className="text-xl md:text-2xl mb-6"
                    >
                        aka <span
                        className="font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent animate-gradient bg-300%">Enoxboo</span>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.5}}
                        className="text-lg md:text-xl text-light/80 mb-6"
                    >
                        Développeur Web & Game Dev passionné
                    </motion.p>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.6}}
                        className="text-base text-light/60 mb-8"
                    >
                        Étudiant en B2 Informatique à Toulouse, je transforme des idées en projets fonctionnels.
                        Si ça n'existe pas, je le code.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.7}}
                        className="flex flex-wrap items-center gap-4 mb-8 justify-center md:justify-start"
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
                        transition={{duration: 0.5, delay: 0.8}}
                        className="flex items-center gap-6 justify-center md:justify-start"
                    >
                        {socialLinks.map((link) => {
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
                </motion.div>

                {/* Right side - Profile Picture */}
                <motion.div
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6, delay: 0.3}}
                    className="flex items-center justify-center"
                >
                    <div className="relative">
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110"></div>

                        {/* Profile image */}
                        <img
                            src={profilePic}
                            alt="Matteo Marquant - Enoxboo"
                            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-primary/30 shadow-2xl shadow-primary/20"
                        />
                    </div>
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