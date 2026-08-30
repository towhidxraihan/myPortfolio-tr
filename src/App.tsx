import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HelmetProvider } from "react-helmet-async";
import Journey from "./sections/Journey";
import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import HeroBackground from "./canvas/HeroBackground";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import { ReactLenis } from 'lenis/react';

function App() {

  const [started, setStarted] = useState(false);

  return (
    <HelmetProvider>
      <SEO />

    <ReactLenis root>
      <div className="relative w-full min-h-screen bg-base-bg font-sans selection:bg-accent selection:text-base-bg">
        
        <AnimatePresence mode="wait">
          {!started && <Loader setStarted={setStarted} />}
        </AnimatePresence>
        
        <CustomCursor />

        {/* LAYER 1: The 3D Canvas */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <HeroBackground />
        </div>

        {/* LAYER 2: The HTML Content */}
        <main className="relative z-10 w-full flex flex-col items-center">
          <Navbar />
          <Hero /> 
          <About /> 
          <Journey />
          <Projects /> 
          <Experience />
          <Contact />

          {/* A footer to close out my portfolio webpage */}
          <footer className="relative z-10 w-full py-8 flex justify-center border-t border-surface mt-auto bg-base-bg">
            <p className="text-text-muted text-sm font-medium">
              © {new Date().getFullYear()} Towhid Raihan. All rights reserved.
            </p>
          </footer>

        </main>
      </div>
    </ReactLenis>
    </HelmetProvider>
  );
}

export default App;