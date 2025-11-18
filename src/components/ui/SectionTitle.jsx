const SectionTitle = ({title, subtitle, centered = false}) => {
    return (<div className={`mb-12 ${centered ? 'text-center' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">#</span> {title}
        </h2>
        {subtitle && (<p className="text-light/70 text-lg max-w-2xl">
            {subtitle}
        </p>)}
    </div>);
};

export default SectionTitle;