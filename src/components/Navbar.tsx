import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on navigation
  const handleNavigate = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full px-8 md:px-16 py-8 flex justify-between items-center pointer-events-none mix-blend-difference">
        {/* Left Nav - Desktop */}
        <div className="hidden md:flex gap-8 text-[10px] md:text-xs uppercase tracking-[0.3em] font-light pointer-events-auto text-white/50 hover:text-white transition-all w-1/3">
          <Link to="/letter" className="hover:text-white transition-colors duration-500">Letter</Link>
          <Link to="/gallery" className="hover:text-white transition-colors duration-500">Gallery</Link>
          <Link to="/todo" className="hover:text-white transition-colors duration-500">To-Do</Link>
        </div>
        
        {/* Center Elegant Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto mt-4 md:mt-0 z-[60]">
          <Link to="/" onClick={handleNavigate} className="font-serif italic text-3xl md:text-4xl tracking-widest text-[#d4af37] hover:text-white transition-colors duration-700 flex items-center gap-3">
            T <span className="text-xl md:text-2xl font-light opacity-60 text-white">&amp;</span> A
          </Link>
        </div>

        {/* Right Nav (Empty space forces the logo exactly into the true center via flex-between balance) */}
        <div className="hidden md:flex w-1/3 justify-end pointer-events-none"></div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden pointer-events-auto text-white/50 hover:text-white transition-colors z-[60] relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto md:hidden">
          <div className="flex flex-col gap-12 text-center text-sm uppercase tracking-[0.4em] font-light text-white/70">
            <Link to="/" onClick={handleNavigate} className="hover:text-white hover:scale-105 transition-all duration-300">Home</Link>
            <Link to="/letter" onClick={handleNavigate} className="hover:text-white hover:scale-105 transition-all duration-300">Letter</Link>
            <Link to="/gallery" onClick={handleNavigate} className="hover:text-white hover:scale-105 transition-all duration-300">Gallery</Link>
            <Link to="/todo" onClick={handleNavigate} className="hover:text-white hover:scale-105 transition-all duration-300">To-Do</Link>
          </div>
        </div>
      )}
    </>
  );
}
