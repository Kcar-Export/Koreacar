import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Use Lucide icons

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-10 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" aria-label="Go to Home">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 w-auto object-contain cursor-pointer"
          />
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
        <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;