const Footer = () => {
  return (
    <footer className="bg-[#fdfcfd] border-t border-[#FF00CC] py-8 px-6 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo or Copyright */}
        <span className="text-sm text-[#481D39]">
          © 2025 <span className="font-semibold text-[#FF00CC]">ZenVibe</span>. All rights reserved.
        </span>

        {/* Footer Links */}
        <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-[#481D39] font-medium">
          <li>
            <a href="#about" className="hover:text-[#FF00CC] transition">About</a>
          </li>
          <li>
            <a href="#privacy" className="hover:text-[#FF00CC] transition">Privacy Policy</a>
          </li>
          <li>
            <a href="#terms" className="hover:text-[#FF00CC] transition">Terms</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#FF00CC] transition">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
