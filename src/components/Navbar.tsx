import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest < 100) {
      setHidden(false);
      return;
    }
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // 1. The Scroll Helper Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full mt-6 px-6 pointer-events-none"
    >
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-4 bg-surface/50 backdrop-blur-md border border-surface-hover rounded-full pointer-events-auto shadow-2xl">
        
        {/* Logo / Name - Clicking this scrolls back to the very top */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-bold tracking-widest uppercase text-text-main cursor-pointer hover:text-accent transition-colors"
        >
          TR<span className="text-text-muted">.DEV</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <li onClick={() => scrollToSection('about')} className="hover:text-text-main transition-colors cursor-pointer">About</li>
          <li onClick={() => scrollToSection('journey')} className="hover:text-text-main transition-colors cursor-pointer">Journey</li>
          <li onClick={() => scrollToSection('projects')} className="hover:text-text-main transition-colors cursor-pointer">Projects</li>
          <li onClick={() => scrollToSection('experience')} className="hover:text-text-main transition-colors cursor-pointer">Experience</li>
        </ul>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          {/* GitHub */}
          <a 
            href="https://github.com/towhidxraihan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-main transition-transform hover:scale-110"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.26c3-.34 6-1.54 6-6.38A5.2 5.2 0 0 0 18.7 6.4a4.9 4.9 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.9 5.4 3.2 5.4 3.2a4.9 4.9 0 0 0-.1 3.2A5.2 5.2 0 0 0 4 8.36c0 4.84 3 6.04 6 6.38a4.8 4.8 0 0 0-1 3.26v4"></path>
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/towhid-raihan-6bb535188" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-[#0ea5e9] transition-transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>

      </nav>
    </motion.header>
  );
};

export default Navbar;