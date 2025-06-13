
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import GlowingSphere from './GlowingSphere';

interface TechParticlesProps {
  count?: number;
}

const TechParticles: React.FC<TechParticlesProps> = ({ count = 30 }) => {
  const group = useRef<THREE.Group>(null!);
  const particles = useMemo(() => {
    const temp = [];
    // Reduced count for better performance
    const actualCount = Math.min(count, 15);
    
    for (let i = 0; i < actualCount; i++) {
      // Random position in a sphere
      const radius = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({
        position: [x, y, z] as [number, number, number],
        size: 0.05 + Math.random() * 0.1,
        color: Math.random() > 0.5 ? "#8B5CF6" : 
              (Math.random() > 0.5 ? "#00E5FF" : "#06D6A0")
      });
    }
    return temp;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.03;
  });
  
  return (
    <group ref={group}>
      {particles.map((particle, i) => (
        <GlowingSphere 
          key={i}
          position={particle.position}
          size={particle.size}
          color={particle.color}
        />
      ))}
    </group>
  );
};

export default TechParticles;
