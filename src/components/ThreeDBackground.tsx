
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AdaptiveDpr } from '@react-three/drei';
import NetworkParticles from './three/NetworkParticles';
import { colors } from './three/SceneConfig';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <fog attach="fog" args={['#070b11', 20, 40]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color={colors.purple} intensity={0.3} />
        <pointLight position={[0, 5, 5]} color={colors.cyan} intensity={0.3} />
        
        {/* Abstract Network of Particles */}
        <NetworkParticles />
        
        {/* Post-processing effects for glow */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
        </EffectComposer>
        
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
