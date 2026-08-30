import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. The Evolving 3D Geometry Component
const EvolvingJourneyGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Material references to smoothly crossfade the opacities
  const bdMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const italyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const ukMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    // Find the journey section on the screen
    const journeyEl = document.getElementById('journey');
    if (!journeyEl || !groupRef.current) return;

    const rect = journeyEl.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress from 0.0 to 1.0 strictly within this section
    let progress = (windowHeight - rect.top) / (rect.height + windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    // Rotate the entire entity slowly
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x += 0.001;

    // Determine which shape should be visible based on scroll position
    const showBD = progress < 0.4 ? 0.6 : 0;
    const showItaly = progress >= 0.4 && progress < 0.7 ? 0.6 : 0;
    const showUK = progress >= 0.7 ? 0.6 : 0;

    // Smoothly animate the opacities so they morph into one another
    if (bdMaterialRef.current) bdMaterialRef.current.opacity = THREE.MathUtils.lerp(bdMaterialRef.current.opacity, showBD, 0.05);
    if (italyMaterialRef.current) italyMaterialRef.current.opacity = THREE.MathUtils.lerp(italyMaterialRef.current.opacity, showItaly, 0.05);
    if (ukMaterialRef.current) ukMaterialRef.current.opacity = THREE.MathUtils.lerp(ukMaterialRef.current.opacity, showUK, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        
        {/* PHASE 1: BANGLADESH */}
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial ref={bdMaterialRef} color="#10b981" transparent opacity={0} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#f59e0b" transparent opacity={0} />
          {/* We tie the inner sphere's opacity to the outer ring's opacity */}
          <meshStandardMaterial ref={bdMaterialRef} color="#f59e0b" transparent opacity={0} />
        </mesh>

        {/* PHASE 2: ITALY */}
        <mesh scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial ref={italyMaterialRef} color="#ef4444" wireframe transparent opacity={0} />
        </mesh>

        {/* PHASE 3: UK */}
        <mesh scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial ref={ukMaterialRef} color="#0ea5e9" wireframe transparent opacity={0} />
        </mesh>

      </Float>
    </group>
  );
};

// 2. The Journey Data
const journeyData = [
  {
    id: "bd",
    country: "Bangladesh",
    title: "The Beginning",
    timeline: "Birth – Early Years",
    description: "Where my story started. The foundation of my curiosity and drive.",
    image: "/images/journey-bd.jpg", 
    align: "left"
  },
  {
    id: "italy",
    country: "Italy",
    title: "European Expansion",
    timeline: "The Middle Chapter",
    description: "Experiencing a new culture, adapting to new environments, and broadening my global perspective.",
    image: "/images/journey-italy.jpg",
    align: "right"
  },
  {
    id: "uk",
    country: "United Kingdom",
    title: "Professional Ascent",
    timeline: "Present Day",
    description: "Now based in London, transitioning my operational leadership experience into full-stack software engineering and AI.",
    image: "/images/journey-uk.jpg",
    align: "left"
  }
];

const Journey = () => {
  const containerRef = useRef(null);

  // Track scroll to control the crossfade from the main website into this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Crossfade opacity: Fades the 3D Canvas in early, stays solid, fades out at the end
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="journey" className="relative w-full py-32 px-6 flex flex-col items-center border-b border-surface overflow-hidden">
      
      {/* THE 3D BACKGROUND OVERLAY */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-[-5] flex justify-center items-center pointer-events-none bg-base-bg"
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Cap the DPR to keep mobile performance smooth */}
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <EvolvingJourneyGeometry />
          </Canvas>
        </div>
      </motion.div>

      {/* Section Header */}
      <div className="relative z-10 max-w-2xl w-full text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-main mb-6"
        >
          My Journey
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-text-muted text-lg"
        >
          Three countries, distinct cultures, one relentless pursuit of growth.
        </motion.p>
      </div>

      {/* The Timeline Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        
        {/* The Central Glowing Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-surface-hover -translate-x-1/2 hidden md:block">
          <motion.div 
            className="w-full bg-accent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        {/* The Journey Cards */}
        {journeyData.map((item) => {
          const isLeft = item.align === "left";
          
          return (
            <div key={item.id} className={`relative flex flex-col md:flex-row items-center w-full mb-16 md:mb-24 last:mb-0 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
              
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-base-bg border-2 border-accent -translate-x-1/2 z-10 hidden md:block" />

              <div className={`w-full md:w-1/2 flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full max-w-md bg-surface/30 backdrop-blur-md border border-surface-hover rounded-2xl overflow-hidden hover:border-accent/50 transition-colors"
                >
                  <div className="w-full h-48 md:h-56 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-base-bg/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={item.image} 
                      alt={item.country} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="text-accent text-sm font-bold tracking-widest uppercase mb-1">{item.timeline}</div>
                    <h3 className="text-2xl font-bold text-text-main mb-2">{item.country} <span className="text-text-muted text-lg font-normal">| {item.title}</span></h3>
                    <p className="text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Journey;