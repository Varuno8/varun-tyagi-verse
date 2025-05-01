
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface AchievementBadgeProps {
  position: [number, number, number];
  color: string;
  value: string;
}

// Small particles orbiting around the achievement
const ParticlesRing = ({ count, radius, color }: { count: number; radius: number; color: string }) => {
  const particles = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (!particles.current) return;
    particles.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  
  // Create particles at regular intervals around a circle
  const items = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return { position: [x, 0, z] as [number, number, number], size: 0.06 };
  });
  
  return (
    <group ref={particles}>
      {items.map((item, i) => (
        <mesh key={i} position={item.position}>
          <sphereGeometry args={[item.size, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ position, color, value }) => {
  const badgeGroup = useRef<THREE.Group>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  
  // More engaging animation for the badge
  useFrame((state) => {
    if (!badgeGroup.current || !octahedronRef.current || !ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Group movement - gentle floating
    badgeGroup.current.position.y = position[1] + Math.sin(time * 0.5) * 0.1;
    
    // Octahedron rotation - constant spinning with varying speed
    octahedronRef.current.rotation.y = time * 0.3;
    octahedronRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
    
    // Ring animation - counter rotation
    ringRef.current.rotation.y = -time * 0.2;
    ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    
    // Pulse effect for the material opacity
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(time * 2) * 0.2;
    }
  });
  
  const colorObj = new THREE.Color(color);
  const lightColorObj = new THREE.Color(color).multiplyScalar(1.5);
  
  // Set material properties
  React.useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = true;
      materialRef.current.transparent = true;
      materialRef.current.opacity = 0.7;
      materialRef.current.color = colorObj;
      materialRef.current.emissive = colorObj;
      materialRef.current.emissiveIntensity = 0.5;
    }
  }, [color]);
  
  return (
    <group ref={badgeGroup} position={position}>
      {/* Main badge geometry */}
      <mesh ref={octahedronRef}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial ref={materialRef} />
      </mesh>
      
      {/* Decorative ring */}
      <mesh ref={ringRef} scale={1.2}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        <meshStandardMaterial color={lightColorObj} emissive={lightColorObj} emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
      
      {/* Simple number display - using mesh instead of Text */}
      <mesh position={[0, 0, 1]} scale={0.5}>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Particles around the badge */}
      <ParticlesRing count={6} radius={1.1} color={color} />
    </group>
  );
};

export default AchievementBadge;
