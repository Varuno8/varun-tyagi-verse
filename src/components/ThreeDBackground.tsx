
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NetworkParticles from './three/NetworkParticles';
import { colors } from './three/SceneConfig';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]} // Lower DPR for better performance
      >
        <color attach="background" args={['#070b11']} />
        <fog attach="fog" args={['#070b11', 20, 40]} />
        
        {/* Simple lighting setup */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color={colors.purple} intensity={0.3} />
        
        {/* Simplified particle network */}
        <NetworkParticles />
        
        {/* Post-processing with simplified settings */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
