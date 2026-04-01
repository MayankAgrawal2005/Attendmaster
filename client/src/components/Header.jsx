
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/10 ${
      scrolled ? 'bg-[#070b14]/80 backdrop-blur-xl border-b border-white/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex justify-between items-center">

        <Link to="/">
          <h1 className="font-bold  text-white text-lg md:text-2xl">
            Attend<span className="text-violet-400">Master</span>
          </h1>
        </Link>
        
                <nav className=" hidden shimmer-text lg:flex gap-8 hero-title text-sm text-gray-400">
          {['Features', 'Why Us', 'Stats', 'Testimonials'].map(n => (
            <a
              key={n}
              href={`#${n.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition hover:underline underline-offset-4 decoration-violet-500"
            >
              {n}
            </a>
          ))}
        </nav>

        <Link to="/login">
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white">
            Get Started →
          </button>
        </Link>

      </div>
    </header>
  );
};