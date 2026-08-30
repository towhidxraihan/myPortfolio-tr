import { motion } from 'motion/react';

const Hero = () => {
  // Animation variants for a staggered, cinematic text reveal
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  // Custom cubic-bezier easing for a smooth, heavy sliding effect
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // min-h-screen to perfectly fill the viewport on load
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6">
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center z-10 mt-16"
      >
        <motion.p variants={item} className="text-text-muted tracking-widest uppercase text-sm mb-4 font-semibold">
          Computer Science Student
        </motion.p>
        
        <motion.h1 variants={item} className="text-6xl md:text-8xl font-extrabold tracking-tighter text-text-main mb-6">
          Towhid Raihan
        </motion.h1>
        
        <motion.p variants={item} className="max-w-2xl text-text-muted text-lg md:text-xl mb-10 leading-relaxed">
          Building scalable full-stack applications and artificial intelligence to solve complex real-world problems.
        </motion.p>
        
        <motion.div variants={item} className="flex gap-4">
          <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-text-main text-base-bg font-semibold rounded-full hover:bg-text-muted transition-colors cursor-pointer">
            View Projects
          </button>
          <button onClick={() => scrollToSection('contact')} className="px-8 py-3 border border-surface-hover text-text-main font-semibold rounded-full hover:bg-surface transition-colors cursor-pointer">
            Contact Me
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;