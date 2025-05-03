
import React from 'react';
import { Canvas } from '@react-three/fiber';
import CodeCube from './three/CodeCube';
import GlowingSphere from './three/GlowingSphere';
import Lines from './three/Lines';
import TechParticles from './three/TechParticles';
import { cubePositions, spherePositions, colors } from './three/SceneConfig';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#070b11', 15, 35]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color={colors.purple} intensity={0.3} />
        <pointLight position={[0, 5, 5]} color={colors.cyan} intensity={0.3} />
        
        {/* 3D cubes */}
        {cubePositions.map((position, idx) => (
          <CodeCube 
            key={idx} 
            position={position} 
            size={1 + Math.random() * 0.5} 
            color={
              idx % 3 === 0 ? colors.purple : 
              idx % 3 === 1 ? colors.cyan : 
                             colors.teal
            }
            speed={0.4 + Math.random() * 0.3}
            wireframe={idx % 3 === 0}
          />
        ))}
        
        {/* Glowing spheres */}
        {spherePositions.map((position, idx) => (
          <GlowingSphere
            key={idx}
            position={position}
            size={0.5 + Math.random() * 0.3}
            color={idx % 2 === 0 ? colors.purple : colors.cyan}
            intensity={0.8 + Math.random() * 0.5}
          />
        ))}
        
        {/* Connected lines */}
        <Lines 
          points={[...cubePositions, ...spherePositions]} 
          colorA={colors.purple} 
          colorB={colors.cyan} 
        />
        
        {/* Tech particles in background - reduced count */}
        <TechParticles count={15} />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
