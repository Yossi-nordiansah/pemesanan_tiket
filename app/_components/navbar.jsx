"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    setIsAtTop(currentScrollY < 10);
    setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out
        ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        fixed
        bottom-5 md:bottom-auto md:top-1
        left-1/2 -translate-x-1/2
        flex
        lg:h-fit items-center md:w-fit w-5/6
        px-6 py-2
        shadow-xl rounded-xl border
        md:gap-7 lg:gap-16
        md:justify-center justify-between
        font-semibold z-[100]
        ${isAtTop ? 'bg-slate-300 shadow-lg border-none md:bg-transparent md:border-none md:shadow-none' : 'bg-slate-300'}`}
    >
      <a href="#highlights" className="sm:block hidden scroll-smooth">Highlights</a>
      <a href="#partner" className="sm:block hidden scroll-smooth">Partner</a>
      <a href="#faq" className="sm:block hidden scroll-smooth">FAQ</a>
      <img src="/images/burger-menu.svg" alt="Menu" className="w-10 sm:hidden" />
      <button
        className="p-2 rounded-md font-semibold text-nowrap sm:bg-transparent bg-primary"
        onClick={() => router.push('/join-partner')}
      >
        Join Partner
      </button>
    </div>
  );
};

export default Navbar;
