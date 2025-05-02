
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { colors } from './SceneConfig';

// Simplified particle type
type Particle = {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  size: number;
  color: string;
  speedFactor: number;
  phaseOffset: number;
};

const NetworkParticles = () => {
  // Use refs for groups
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles with simplified approach
  const particleCount = 60; // Reduced for better performance
  
  // Create all particles
  const particles = useMemo(() => {
    const temp: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Random size between 0.05 and 0.15
      const particleSize = 0.05 + Math.random() * 0.1;
      
      // Position particles in a reasonable volume
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      // Choose color with bias toward electric blue
      let color;
      const colorRand = Math.random();
      if (colorRand < 0.6) {
        color = colors.cyan; // More electric blue
      } else if (colorRand < 0.85) {
        color = colors.teal; // Some teal
      } else {
        color = colors.purple; // Few purple accents
      }
      
      // Animation parameters
      const speedFactor = 0.05 + Math.random() * 0.1;
      const phaseOffset = Math.random() * Math.PI * 2;
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        size: particleSize,
        color,
        speedFactor,
        phaseOffset,
      });
    }
    
    return temp;
  }, []);
  
  // Calculate connections between nearby particles
  const connections = useMemo(() => {
    const maxDistance = 8;
    const lines: { 
      points: [number, number, number, number, number, number]; 
      color: string; 
      opacity: number; 
    }[] = [];
    
    // Create connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / maxDistance);
          
          // Store connection data with points in flat array format for Line component
          lines.push({
            points: [
              particles[i].position.x, 
              particles[i].position.y, 
              particles[i].position.z,
              particles[j].position.x,
              particles[j].position.y,
              particles[j].position.z
            ],
            color: particles[i].color,
            opacity: opacity * 0.5
          });
        }
      }
    }
    
    return lines;
  }, [particles]);
  
  // Animation loop
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle rotation of the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.05;
    }
    
    // Update each particle position
    particles.forEach((particle) => {
      const { originalPosition, speedFactor, phaseOffset } = particle;
      
      // Create subtle organic motion for each particle
      particle.position.x = originalPosition.x + Math.sin(t * speedFactor + phaseOffset) * 0.5;
      particle.position.y = originalPosition.y + Math.cos(t * speedFactor + phaseOffset) * 0.5;
      particle.position.z = originalPosition.z + Math.sin(t * speedFactor * 0.8 + phaseOffset) * 0.5;
    });
  });
  
  return (
    <group ref={groupRef}>
      {/* Render particles */}
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.position.x, particle.position.y, particle.position.z]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Render connections as simple lines */}
      {connections.map((connection, i) => (
        <line key={i + particles.length}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(connection.points)}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={connection.color} transparent opacity={connection.opacity} />
        </line>
      ))}
    </group>
  );
};

export default NetworkParticles;
