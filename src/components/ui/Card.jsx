const Card = ({children, className = '', hover = true}) => {
    return (<div
        className={`
        bg-accent/20 backdrop-blur-sm rounded-lg p-6 border border-secondary/20
        ${hover ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300' : ''}
        ${className}
      `}
    >
        {children}
    </div>);
};

export default Card;