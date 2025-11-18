const Card = ({children, className = '', hover = true}) => {
    return (<div
        className={`
        bg-accent/20 backdrop-blur-md rounded-lg p-6 border border-secondary/20
        shadow-xl
        ${hover ? 'hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
        {children}
    </div>);
};

export default Card;