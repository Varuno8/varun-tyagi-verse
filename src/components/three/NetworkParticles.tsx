
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { colors, networkConfig } from './SceneConfig';

// Simplified particle type with only essential properties
type Particle = {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  size: number;
  color: string;
  layer: 'foreground' | 'midground' | 'background';
  speedFactor: number;
  phaseOffset: number;
};

// Simplified connection type
type Connection = {
  points: number[];
  color: string;
  opacity: number;
};

const NetworkParticles = () => {
  // Use refs for groups
  const groupRef = useRef<THREE.Group>(null);
  
  // Create particles with enhanced properties - simplified version
  const { particles, connections } = useMemo(() => {
    const tempParticles: Particle[] = [];
    const tempConnections: Connection[] = [];
    
    // Create all particles with visual hierarchy
    for (let i = 0; i < networkConfig.particleCount; i++) {
      // Random size between min and max from config
      const [minSize, maxSize] = networkConfig.particleSizeRange;
      let particleSize = minSize + Math.random() * (maxSize - minSize);
      
      // Decide which depth layer this particle belongs to
      const layerRandom = Math.random();
      let layer: 'foreground' | 'midground' | 'background';
      let zRange: [number, number];
      
      if (layerRandom < 0.25) {
        layer = 'foreground';
        zRange = networkConfig.depthLayers.foreground;
        // Bigger particles in foreground
        particleSize *= 1.5;
      } else if (layerRandom < 0.6) {
        layer = 'midground';
        zRange = networkConfig.depthLayers.midground;
        particleSize *= 1;
      } else {
        layer = 'background';
        zRange = networkConfig.depthLayers.background;
        particleSize *= 0.7;
      }
      
      // Position particles in a reasonable volume with depth
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 25;
      const z = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
      
      // Choose color with adjusted distribution from config
      let color;
      const colorRand = Math.random();
      const { colorDistribution } = networkConfig;
      
      if (colorRand < colorDistribution.cyan) {
        color = colors.cyan; 
      } else if (colorRand < colorDistribution.cyan + colorDistribution.teal) {
        color = colors.teal;
      } else {
        color = colors.purple;
      }
      
      // Animation parameters with more variety
      const speedFactor = 0.03 + Math.random() * networkConfig.movementSpeed;
      const phaseOffset = Math.random() * Math.PI * 2;
      
      // Add particle to array
      tempParticles.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        size: particleSize,
        color,
        layer,
        speedFactor,
        phaseOffset
      });
    }
    
    // Create connections between nearby particles - simplified
    const maxDistanceSq = networkConfig.connectionDistance ** 2;
    
    for (let i = 0; i < tempParticles.length; i++) {
      for (let j = i + 1; j < tempParticles.length; j++) {
        // More efficient distance calculation with distanceToSquared
        const distanceSq = tempParticles[i].position.distanceToSquared(tempParticles[j].position);
        
        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          
          // Calculate opacity based on distance and layer
          let opacity = (1 - (distance / networkConfig.connectionDistance)) * networkConfig.connectionOpacity;
          
          // Particles in background should have fainter connections
          if (tempParticles[i].layer === 'background' || tempParticles[j].layer === 'background') {
            opacity *= 0.5;
          } else if (tempParticles[i].layer === 'midground' && tempParticles[j].layer === 'midground') {
            opacity *= 0.8;
          }
          
          // Store connection data with points in flat array format for Line component
          tempConnections.push({
            points: [
              tempParticles[i].position.x, 
              tempParticles[i].position.y, 
              tempParticles[i].position.z,
              tempParticles[j].position.x,
              tempParticles[j].position.y,
              tempParticles[j].position.z
            ],
            color: tempParticles[i].color,
            opacity
          });
        }
      }
    }
    
    return { particles: tempParticles, connections: tempConnections };
  }, []);
  
  // Animation loop with simplified organic motion
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Subtle rotation of the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.05;
    }
    
    // Update each particle position with more organic motion
    particles.forEach((particle, index) => {
      const { originalPosition, speedFactor, phaseOffset } = particle;
      
      // Create subtle organic motion for each particle
      particle.position.x = originalPosition.x + Math.sin(t * speedFactor + phaseOffset) * 1.2;
      particle.position.y = originalPosition.y + Math.cos(t * speedFactor + phaseOffset * 1.3) * 1.2;
      particle.position.z = originalPosition.z + Math.sin(t * speedFactor * 0.7 + phaseOffset * 0.9) * 0.8;
    });
  });
  
  return (
    <group ref={groupRef}>
      {/* Render particles with proper visual hierarchy */}
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.position.x, particle.position.y, particle.position.z]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial 
            color={particle.color} 
            transparent 
            opacity={particle.layer === 'background' ? 0.5 : 
                    particle.layer === 'midground' ? 0.7 : 0.9} 
          />
        </mesh>
      ))}
      
      {/* Simplified line rendering */}
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
          <lineBasicMaterial 
            color={connection.color} 
            transparent 
            opacity={connection.opacity}
          />
        </line>
      ))}
    </group>
  );
};

export default NetworkParticles;
