"use client"
import React from "react";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-white lg:h-screen py-10 overflow-hidden pt-10 pb-20 lg:pb-32 bg-hero-gradient">
      {/* Background Image */}
      <img
        src="/images/hero-1.png"
        alt="hero background"
        className="mt-20 absolute top-0 left-1/2 -translate-x-1/2 w-[95vw] lg:w-[85vw] md:w-[75vw] sm:w-[65vw] h-auto max-w-none object-cover"
      />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-4">
        {/* Floating Logo (Hero-2) */}
        <img
          src="/images/hero-2.png"
          alt="floating title"
          className="w-[95vw] lg:w-[85vw] md:w-[75vw] sm:w-[65vw] max-w-none h-auto animate-float mt-auto lg:mt-32"
        />
      </div>
    </div>
  );
};

export default Hero;