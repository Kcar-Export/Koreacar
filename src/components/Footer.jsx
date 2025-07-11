import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-2">Koreacar</h2>
          <p className="text-sm text-gray-300">
            Connecting Korea’s finest vehicles with World’s future. Trusted by hundreds, driven by values.
          </p>
        </div>
{/* Quick Links */}
<div>
  <h3 className="font-semibold mb-3">Quick Links</h3>
  <ul className="text-sm space-y-1">
    <li>
      <Link to="/" className="hover:underline">Home</Link>
    </li>
    <li>
      <Link to="/contact" className="hover:underline">Contact</Link>
    </li>
    <li>
      <Link to="/about" className="hover:underline">About Us</Link>
    </li>
  </ul>
</div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">Email: kcarexport4@gmail.com</p>
          <p className="text-sm mb-3">Phone: +821089964152</p>

          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Twitter size={20} /></a>
            <a href="mailto:contact@kcarexport.com" className="hover:text-gray-400"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2025 Korea Koreacar. All rights reserved. | Built with passion in Seoul 🇰🇷
      </div>
    </footer>
  );
};

export default Footer;
