import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const MetaVFestFooter = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-24 border-t border-cyan-500/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Flex untuk Mobile, Grid untuk Desktop */}
        <div className="flex flex-col">

          {/* Logo & Deskripsi */}
          <div className='mb-2'>
            <h2 className="text-2xl font-bold text-cyan-400 mb-1">MetaVFest</h2>
            <p className="text-gray-300">
              Join the future of virtual reality and digital experiences at MetaVFest 2025.
            </p>
          </div>

          {/* Quick Links & Contact Us Inline di Mobile */}
          <div className="flex md:flex-row justify-between">

            {/* Quick Links */}
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-1 text-cyan-400">Quick Links</h3>
              <ul className="md:space-y-2">
                <li><a href="/agenda" className="text-gray-300 hover:text-cyan-400 transition">Agenda</a></li>
                <li><a href="/partners" className="text-gray-300 hover:text-cyan-400 transition">Partners</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-cyan-400 transition">FAQ</a></li>
                <li><a href="/join" className="text-gray-300 hover:text-cyan-400 transition">Join Partner</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-1 text-cyan-400">Contact Us</h3>
              <ul className="md:space-y-2">
                <li className="text-gray-300">Surabaya, Indonesia</li>
                <li className="text-gray-300">info@metavfest.com</li>
                <li className="text-gray-300">+62 812 3456 7890</li>
              </ul>
            </div>

            <div className='sm:block hidden'>
              <h3 className="text-lg font-semibold mb-1 text-cyan-400 mt-5">Stay Updated</h3>
              <form className="flex flex-col sm:flex-row items-start sm:items-center">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l sm:rounded-none sm:rounded-l-md focus:outline-none w-full sm:w-auto mb-2 sm:mb-0"
                />
                <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded sm:rounded-r-md text-white transition w-full sm:w-auto">
                  Subscribe
                </button>
              </form>
            </div>

          </div>

          {/* Form Subscribe */}
          <div className='sm:hidden'>
            <h3 className="text-lg font-semibold mb-1 text-cyan-400 mt-5">Stay Updated</h3>
            <form className="flex flex-col sm:flex-row items-start sm:items-center">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l sm:rounded-none sm:rounded-l-md focus:outline-none w-full sm:w-auto mb-2 sm:mb-0"
              />
              <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded sm:rounded-r-md text-white transition w-full sm:w-auto">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Icon Sosial Media */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://facebook.com/metavfest" className="text-gray-400 hover:text-cyan-400 transition">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com/metavfest" className="text-gray-400 hover:text-cyan-400 transition">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com/metavfest" className="text-gray-400 hover:text-cyan-400 transition">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/metavfest" className="text-gray-400 hover:text-cyan-400 transition">
              <Linkedin size={24} />
            </a>
            <a href="https://youtube.com/metavfest" className="text-gray-400 hover:text-cyan-400 transition">
              <Youtube size={24} />
            </a>
            <a href="mailto:info@metavfest.com" className="text-gray-400 hover:text-cyan-400 transition">
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-400">
          <p>&copy; 2025 MetaVFest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MetaVFestFooter;
