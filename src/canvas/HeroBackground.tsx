import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Text } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

const FloatingGeometry = () => {
  // 1. References to control the colors via the GPU
  const mainMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const secondaryMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // 2. The Render Loop: Syncs scroll position to color transitions
  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    let targetHex = "#ffffff"; // Default Hero color
    
    if (scrollProgress > 0.15 && scrollProgress < 0.4) {
      targetHex = "#0ea5e9"; // About Section
    } else if (scrollProgress >= 0.4 && scrollProgress < 0.7) {
      targetHex = "#a855f7"; // Projects Section
    } else if (scrollProgress >= 0.7) {
      targetHex = "#10b981"; // Experience & Contact
    }

    const targetColor = new THREE.Color(targetHex);

    // Smoothly transition the colors frame-by-frame
    if (mainMaterialRef.current) {
      mainMaterialRef.current.color.lerp(targetColor, 0.03);
    }
    if (secondaryMaterialRef.current) {
      secondaryMaterialRef.current.color.lerp(targetColor, 0.02); 
    }
  });

  return (
    <>
      {/* 1. AI & Machine Learning Core Geometry */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          {/* Animated Material */}
          <meshStandardMaterial ref={mainMaterialRef} wireframe />
        </mesh>
      </Float>

      {/* 2. Software Engineering (Floating Code Snippets) */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
        <Text
          position={[-3, 1.5, -2]}
          fontSize={0.17}
          color="#a3a3a3"
          anchorX="center"
          anchorY="middle"
        >
          {`import { predict } from 'ml-engine';\nconst result = await predict(dataStream);\nfrom sklearn.ensemble import RandomForestClassifier`}
        </Text>
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={2}>
        <Text
          position={[3.5, -1.5, -3]}
          fontSize={0.15}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          {`from sklearn.metrics import accuracy_score\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train_scaled, y_train)\npredictions = model.predict(X_test_scaled)\nprint(f"Accuracy: {accuracy_score(y_test, predictions)}")`}
        </Text>
      </Float>

      {/* 3. Data Science (A Scatter-Plot Data Cluster) */}
      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <group position={[-3, -2, -3]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#a3a3a3" />
          </mesh>
          <mesh position={[0.5, 0.4, 0.2]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            {/* Animated Material */}
            <meshStandardMaterial ref={secondaryMaterialRef} />
          </mesh>
          <mesh position={[-0.4, -0.3, 0.5]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#404040" />
          </mesh>
        </group>
      </Float>
    </>
  );
};

// Responsive wrapper to handle mobile scaling
const ResponsiveScene = () => {
  const { viewport } = useThree();
  
  // If the viewport width is less than 4 units (mobile), scale everything to 70%
  const scale = viewport.width < 4 ? 0.7 : 1;

  return (
    <group scale={scale}>
      <FloatingGeometry />
    </group>
  );
};

const HeroBackground = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }}
      // Cap the maximum pixel ratio to save mobile battery
      dpr={[1, 1.5]} 
    >
      
      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Environment lighting */}
      <Environment preset="night" />

      {/* Swap out the direct geometry call for our new responsive wrapper */}
      <ResponsiveScene />

      {/* The Post-Processing Pipeline */}
      <EffectComposer>
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.02} 
          bokehScale={15} 
          height={400} 
        />
      </EffectComposer>
      
    </Canvas>
  );
};

export default HeroBackground;