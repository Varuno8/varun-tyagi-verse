
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { colors } from './SceneConfig';
import { Line } from '@react-three/drei';

interface Particle {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  size: number;
  color: string;
  speedFactor: number;
  phaseOffset: number;
}

interface Connection {
  points: THREE.Vector3[];
  colorA: THREE.Color;
  colorB: THREE.Color;
  opacity: number;
}

const NetworkParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.Group>(null!);
  
  // Create particles
  const particleCount = 80;
  const maxDistance = 8;
  
  const particles = useMemo(() => {
    const temp: Particle[] = [];
    
    // Create particles in a 3D space
    for (let i = 0; i < particleCount; i++) {
      const particleSize = 0.05 + Math.random() * 0.1;
      
      // Position particles in a 3D volume
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      
      // Random color from our palette with bias toward electric blue
      const colorIndex = Math.random();
      let color;
      if (colorIndex < 0.6) {
        color = colors.cyan; // More electric blue
      } else if (colorIndex < 0.85) {
        color = colors.teal; // Some teal
      } else {
        color = colors.purple; // Few purple accents
      }
      
      // Add random movement parameters
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
  }, [particleCount]);
  
  // Create connections between particles
  const connections = useMemo(() => {
    const lines: Connection[] = [];
    
    // Create connections between particles that are close enough
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        
        if (distance < maxDistance) {
          // Opacity based on distance - closer particles have stronger connections
          const opacity = 1 - (distance / maxDistance);
          
          // Create gradient from particle i color to particle j color
          const colorA = new THREE.Color(particles[i].color);
          const colorB = new THREE.Color(particles[j].color);
          
          lines.push({
            points: [particles[i].position, particles[j].position],
            colorA,
            colorB,
            opacity
          });
        }
      }
    }
    
    return lines;
  }, [particles, maxDistance]);
  
  // Animate the network
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle rotation of the whole network
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.05;
    }
    
    // Individually animate each particle
    particles.forEach((particle, i) => {
      const { originalPosition, speedFactor, phaseOffset } = particle;
      
      // Create subtle organic motion for each particle
      particle.position.x = originalPosition.x + Math.sin(t * speedFactor + phaseOffset) * 0.5;
      particle.position.y = originalPosition.y + Math.cos(t * speedFactor + phaseOffset) * 0.5;
      particle.position.z = originalPosition.z + Math.sin(t * speedFactor * 0.8 + phaseOffset) * 0.5;
    });
    
    // Force the lines to update with new particle positions
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        if (i < connections.length) {
          const connection = connections[i];
          const line = child as THREE.Line;
          
          if (line.geometry && line.geometry.attributes.position) {
            const positions = line.geometry.attributes.position.array as Float32Array;
            
            // Update line endpoints to match particle positions
            const pointA = connection.points[0];
            const pointB = connection.points[1];
            
            if (positions.length >= 6) {
              positions[0] = pointA.x;
              positions[1] = pointA.y;
              positions[2] = pointA.z;
              positions[3] = pointB.x;
              positions[4] = pointB.y;
              positions[5] = pointB.z;
              
              line.geometry.attributes.position.needsUpdate = true;
            }
          }
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Render particles */}
      {particles.map((particle, i) => (
        <mesh key={`particle-${i}`} position={[particle.position.x, particle.position.y, particle.position.z]}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Render connections */}
      <group ref={linesRef}>
        {connections.map((connection, i) => (
          <Line
            key={`line-${i}`}
            points={[
              [connection.points[0].x, connection.points[0].y, connection.points[0].z],
              [connection.points[1].x, connection.points[1].y, connection.points[1].z]
            ]}
            color={connection.colorA.getStyle()}
            lineWidth={1}
            transparent
            opacity={connection.opacity * 0.5}
          />
        ))}
      </group>
    </group>
  );
};

export default NetworkParticles;
