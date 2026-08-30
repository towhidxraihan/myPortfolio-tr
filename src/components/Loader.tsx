import { motion } from 'motion/react';
import { useProgress, Float } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { animate } from 'motion/react';

interface LoaderProps {
  setStarted: (isStarted: boolean) => void;
}

const Loader = ({ setStarted }: LoaderProps) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const animation = animate(0, progress, {
        duration: 0.5,
        ease: "easeOut",
        onUpdate: (latestValue) => {
            setDisplayProgress(Math.round(latestValue));
            }
        });

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, 900);
      return () => clearTimeout(timeout);
    }
    return () => animation.stop();
  }, [progress, setStarted]);

  const shutterEase = [0.76, 0, 0.24, 1] as any;

  return (
    <motion.div
      key="custom-loader"
      className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none"
    >
      {/* PANEL 1: The Top Shutter */}
      <motion.div
        exit={{ y: "-100%", transition: { duration: 1, ease: shutterEase, delay: 0.2 } }}
        className="absolute top-0 left-0 w-full h-1/2 bg-base-bg border-b border-surface"
      />
      
      {/* PANEL 2: The Bottom Shutter */}
      <motion.div
        exit={{ y: "100%", transition: { duration: 1, ease: shutterEase, delay: 0.2 } }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-base-bg border-t border-surface"
      />

      {/* CENTER CONTENT: Fades out slightly before the shutters open */}
      <motion.div
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeOut" } }}
        className="absolute z-10 flex flex-col items-center justify-center w-full h-full"
      >
        {/* The Mini 3D Loading Element */}
        <div className="absolute w-64 h-64 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={1} />
            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
              <mesh>
                <icosahedronGeometry args={[1.2, 0]} />
                <meshStandardMaterial color="#ffffff" wireframe />
              </mesh>
            </Float>
          </Canvas>
        </div>

        {/* The Text & Counter */}
        <div className="z-10 flex flex-col items-center">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-text-muted mb-2">
            Initialising TR's Portfolio
          </div>
          <div className="text-5xl md:text-7xl font-extrabold tracking-tighter tabular-nums text-text-main mix-blend-difference">
            {displayProgress}%
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Loader;