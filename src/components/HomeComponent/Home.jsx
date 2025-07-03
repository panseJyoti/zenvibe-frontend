import Footer from '../FooterComponent/Footer';
import Navbar from './Navbar';
import About from './About';
import Features from './Features';
import Contact  from './Contact';
import Hero from './Hero';

function Home(){
return (
    <div className="min-h-screen font-sans bg-white text-gray-900">
      <Navbar />
      <Hero/>
      <Features/>
      <About />
      <Contact/>
      <Footer />
    </div>
  );
}

export default Home;