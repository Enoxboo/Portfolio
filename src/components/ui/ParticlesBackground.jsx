import {useCallback} from 'react';
import Particles from 'react-tsparticles';
import {loadSlim} from 'tsparticles-slim';

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (<Particles
        id="tsparticles"
        init={particlesInit}
        options={{
            background: {
                color: {
                    value: 'transparent',
                },
            }, fpsLimit: 60, particles: {
                color: {
                    value: '#f5c752',
                }, links: {
                    color: '#FFFFFF', distance: 150, enable: true, opacity: 0.3, width: 1,
                }, move: {
                    direction: 'none', enable: true, outModes: {
                        default: 'bounce',
                    }, random: false, speed: 1, straight: false,
                }, number: {
                    density: {
                        enable: true, area: 800,
                    }, value: 50,
                }, opacity: {
                    value: 0.5,
                }, shape: {
                    type: 'circle',
                }, size: {
                    value: {min: 1, max: 3},
                },
            }, detectRetina: true,
        }}
        className="absolute inset-0"
    />);
};

export default ParticlesBackground;