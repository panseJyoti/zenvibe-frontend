import ThemeToggle from '../ThemeToggle';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="w-full px-4 md:px-10 py-3 bg-white dark:bg-gray-900 shadow-sm fixed top-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
          ZenVibe
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mb-4 md:mb-0">
          <a href="#hero" className="hover:text-[#FF00CC] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#FF00CC] transition-colors">About</a>
          <a href="#features" className="hover:text-[#FF00CC] transition-colors">Features</a>
          <a href="#contact" className="hover:text-[#FF00CC] transition-colors">Contact</a>

          {/* Join Button */}
          <Link to="/sign-in">
            <button className="bg-gradient-to-r from-[#FF00CC] to-[#481D39] text-white px-5 py-1 rounded-full text-sm hover:opacity-90 transition">
              Join
            </button>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Spacing below navbar */}
      <div className="mt-5"></div>
    </nav>
  );
};

export default Navbar;
