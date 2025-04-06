import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const MetaVFestFooter = () => {
  return (
    <footer className="bg-white text-gray-700 pt-8 pb-24 border-t-4 relative">
      {/* Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500"></div>

      <div className="container mx-auto px-4">
        {/* Icon Sosial Media */}
        <div className="mt-8 pt-6">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://facebook.com/metavfest" className="text-gray-500 hover:text-blue-500 transition">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com/metavfest" className="text-gray-500 hover:text-blue-500 transition">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com/metavfest" className="text-gray-500 hover:text-blue-500 transition">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/metavfest" className="text-gray-500 hover:text-blue-500 transition">
              <Linkedin size={24} />
            </a>
            <a href="https://youtube.com/metavfest" className="text-gray-500 hover:text-blue-500 transition">
              <Youtube size={24} />
            </a>
            <a href="mailto:info@metavfest.com" className="text-gray-500 hover:text-blue-500 transition">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500">
          <p>&copy; 2025 MetaVFest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MetaVFestFooter;
