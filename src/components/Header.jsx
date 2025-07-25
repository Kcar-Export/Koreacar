import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex justify-between items-center">
        {/* Text Logo */}
        <Link to="/" aria-label="Go to Home" className="group">
          <div className="flex items-center">
            <div className="text-white font-bold tracking-wider transform transition-all duration-300 group-hover:scale-105">
              <span className="text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                KC
              </span>
              <span className="text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                AR
              </span>
              <span className="text-3xl md:text-4xl font-extrabold tracking-widest text-white">
                EXPORT
              </span>
            </div>
          </div>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex space-x-6 text-sm md:text-base">
          <Link to="/" className="hover:text-pink-500 transition">Accueil</Link>
          <Link to="/about" className="hover:text-red-500 transition">À propos</Link>
          <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden px-4 pb-4 space-y-2 text-sm bg-black text-white">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-pink-500 transition"
          >
            Accueil
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-red-500 transition"
          >
            À propos
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-red-500 transition"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;