
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlowingSphereProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  intensity?: number;
}

const GlowingSphere: React.FC<GlowingSphereProps> = ({ 
  position, 
  size = 1, 
  color = '#ffffff',
  intensity = 1 
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    
    // Pulse effect
    const scale = 1 + Math.sin(t * 0.8) * 0.1;
    mesh.current.scale.set(scale, scale, scale);
  });
  
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

export default GlowingSphere;
