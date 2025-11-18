import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import FeaturedProject from './components/sections/FeaturedProject';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
    return (
        <Layout>
            <Hero />
            <About />
            <FeaturedProject />
            <Projects />
            <Contact />
        </Layout>
    );
}

export default App;