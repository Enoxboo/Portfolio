const Button = ({
                    children, variant = 'primary', href, onClick, className = '', ...props
                }) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2';

    const variants = {
        primary: 'bg-primary text-dark hover:bg-primary/90 hover:scale-105',
        secondary: 'bg-secondary text-light hover:bg-secondary/90 hover:scale-105',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-dark',
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (<a href={href} className={classes} {...props}>
            {children}
        </a>);
    }

    return (<button onClick={onClick} className={classes} {...props}>
        {children}
    </button>);
};

export default Button;