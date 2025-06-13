
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CodeCubeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  speed?: number;
  wireframe?: boolean;
}

const CodeCube: React.FC<CodeCubeProps> = ({ 
  position, 
  size = 1, 
  color = 'white', 
  speed = 1, 
  wireframe = true 
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  
  // Create unique rotation pattern for each cube
  const rotationPattern = useMemo(() => ({
    x: Math.random() * 0.02 - 0.01,
    y: Math.random() * 0.02 - 0.01,
    z: Math.random() * 0.01 - 0.005,
  }), []);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // More complex rotation animation
    mesh.current.rotation.x += rotationPattern.x * speed;
    mesh.current.rotation.y += rotationPattern.y * speed;
    mesh.current.rotation.z += rotationPattern.z * speed;
    
    // Floating animation using sin and cos for more organic movement
    const time = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(time * 0.5 * speed) * 0.2;
    mesh.current.position.x = position[0] + Math.cos(time * 0.3 * speed) * 0.1;
    
    // Subtle scale pulsing
    const scale = 1 + Math.sin(time * speed) * 0.05;
    mesh.current.scale.set(scale, scale, scale);
  });
  
  const colorObj = new THREE.Color(color);
  
  // Setup material properties
  React.useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = wireframe;
      materialRef.current.transparent = true;
      materialRef.current.opacity = 0.7;
      materialRef.current.color = colorObj;
      materialRef.current.emissive = colorObj;
      materialRef.current.emissiveIntensity = 0.4;
      materialRef.current.roughness = 0.3;
      materialRef.current.metalness = 0.8;
    }
  }, [color, wireframe]);
  
  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial ref={materialRef} />
    </mesh>
  );
};

export default CodeCube;
