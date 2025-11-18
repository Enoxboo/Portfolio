import {Github, Linkedin, Mail} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/Enoxboo',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'www.linkedin.com/in/matteo-marquant-67469a266',
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'matteo.marquant@ynov.com',
        },
    ];

    return (
        <footer className="bg-dark border-t border-secondary/20 py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-light/60 text-sm">
                        © {currentYear} Matteo Marquant (Enoxboo). Tous droits réservés.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-light/60 hover:text-primary transition-colors duration-200"
                                    aria-label={link.name}
                                >
                                    <Icon size={20}/>
                                </a>
                            );
                        })}
                    </div>

                    {/* Location */}
                    <p className="text-light/60 text-sm">
                        📍 Toulouse, France
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;