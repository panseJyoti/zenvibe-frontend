import { Link } from 'react-router-dom';
import bgImage from '../../assets/b2.jpg';
import './Navbar.css';

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-[100vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex items-center justify-center"
    >
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center text-center px-4 py-28"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div />

        {/* Content Box */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 ">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Welcome to <span className="text-pink-500">ZenVibe</span>
          </h1>
          <p className="text-md md:text-lg mb-6 leading-relaxed text-gray-800 dark:text-gray-300">
            Mood-based wellness companion — helping you track, reflect, and<br />
            discover mindful activities tailored just for you.
          </p>
          <Link to="/sign-up">
            <button className="bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
