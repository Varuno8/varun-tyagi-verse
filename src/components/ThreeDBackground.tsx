
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import NetworkParticles from './three/NetworkParticles';
import { colors } from './three/SceneConfig';

// Scene camera control for subtle movement
const CameraControl = () => {
  const cameraRef = useRef<any>();
  
  useFrame(({ clock, mouse }) => {
    if (cameraRef.current) {
      // Very subtle camera movement based on mouse
      cameraRef.current.position.x = Math.sin(mouse.x * 0.5) * 2;
      cameraRef.current.position.y = Math.sin(mouse.y * 0.5) * 2;
    }
  });
  
  return null;
};

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]} // Lower DPR for better performance
      >
        {/* Dark space background */}
        <color attach="background" args={[colors.darkBlue]} />
        <fog attach="fog" args={[colors.darkBlue, 15, 50]} />
        
        {/* Ambient lighting for base illumination */}
        <ambientLight intensity={0.15} />
        
        {/* Strategic point lights for depth */}
        <pointLight position={[10, 10, 10]} intensity={0.4} color={colors.cyan} />
        <pointLight position={[-10, -10, -10]} color={colors.purple} intensity={0.3} />
        <pointLight position={[0, 5, -15]} color={colors.teal} intensity={0.2} />
        
        {/* Camera control for subtle movement */}
        <CameraControl />
        
        {/* Enhanced network particles */}
        <NetworkParticles />
        
        {/* Enhanced post-processing for visual depth */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
          />
          <Noise
            opacity={0.02}
            blendFunction={BlendFunction.ADD}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
