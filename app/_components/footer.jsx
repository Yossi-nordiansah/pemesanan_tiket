import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const MetaVFestFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-cyan-500/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">MetaVFest</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Join the future of virtual reality and digital experiences at MetaVFest 2025.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/agenda" className="text-gray-300 hover:text-cyan-400 transition">Agenda</a></li>
              <li><a href="/partners" className="text-gray-300 hover:text-cyan-400 transition">Partners</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-cyan-400 transition">FAQ</a></li>
              <li><a href="/join" className="text-gray-300 hover:text-cyan-400 transition">Join Partner</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Surabaya, Indonesia</li>
              <li className="text-gray-300">info@metavfest.com</li>
              <li className="text-gray-300">+62 812 3456 7890</li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Stay Updated</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
              />
              <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-r text-white transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
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

        <div className="mt-6 text-center text-gray-400">
          <p>&copy; 2025 MetaVFest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MetaVFestFooter;