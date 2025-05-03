
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import NetworkParticles from './three/NetworkParticles';
import { colors } from './three/SceneConfig';

// Scene camera control for subtle movement
const CameraControl = () => {
  const cameraRef = useRef<any>();
  
  useFrame(({ clock, mouse, camera }) => {
    // Very subtle camera movement based on mouse
    if (camera && typeof camera.position !== 'undefined') {
      camera.position.x = Math.sin(mouse.x * 0.5) * 2;
      camera.position.y = Math.sin(mouse.y * 0.5) * 2;
    }
  });
  
  return null;
};

// Fallback component for loading/error state
const Fallback = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 16, 16]} />
    <meshBasicMaterial color={colors.cyan} wireframe />
  </mesh>
);

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
        dpr={[0.8, 1.2]} // Even lower DPR for better performance
        style={{ background: colors.darkBlue }}
        onCreated={({ gl }) => {
          // Add additional WebGL context attributes for stability
          gl.localClippingEnabled = true;
          gl.outputEncoding = 3000; // sRGB encoding
        }}
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
        
        {/* Enhanced network particles with error handling */}
        <Suspense fallback={<Fallback />}>
          <NetworkParticles />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
