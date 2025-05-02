
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { colors, networkConfig } from './SceneConfig';

// Enhanced particle type with more properties
type Particle = {
  position: THREE.Vector3;
  originalPosition: THREE.Vector3;
  size: number;
  color: string;
  layer: 'foreground' | 'midground' | 'background';
  speedFactor: number;
  phaseOffset: number;
  connections: number[];
  pulseState: {
    active: boolean;
    progress: number;
    origin: number | null;
  };
};

// Connection between particles with pulse animation
type Connection = {
  particleIndexA: number;
  particleIndexB: number;
  distance: number;
  opacity: number;
  color: string;
  points: [number, number, number, number, number, number];
  pulseProgress: number;
  pulseActive: boolean;
};

const NetworkParticles = () => {
  // Use refs for groups and animation state
  const groupRef = useRef<THREE.Group>(null);
  const linesMeshRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();
  
  // Animation state
  const pulseTimeRef = useRef<number>(0);
  const mousePositionRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  // Create particles with enhanced properties
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
        phaseOffset,
        connections: [], // Will hold indexes of connected particles
        pulseState: {
          active: false,
          progress: 0,
          origin: null
        }
      });
    }
    
    // Create connections between nearby particles
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
            particleIndexA: i,
            particleIndexB: j,
            distance,
            opacity,
            color: tempParticles[i].color,
            points: [
              tempParticles[i].position.x, 
              tempParticles[i].position.y, 
              tempParticles[i].position.z,
              tempParticles[j].position.x,
              tempParticles[j].position.y,
              tempParticles[j].position.z
            ],
            pulseProgress: 0,
            pulseActive: false
          });
          
          // Add references to each particle's connections
          tempParticles[i].connections.push(tempConnections.length - 1);
          tempParticles[j].connections.push(tempConnections.length - 1);
        }
      }
    }
    
    return { particles: tempParticles, connections: tempConnections };
  }, []);
  
  // Geometry and material refs for efficient updates
  const lineGeometryRef = useRef<THREE.BufferGeometry>();
  const lineMaterialRef = useRef<THREE.LineBasicMaterial[]>();
  
  useEffect(() => {
    // Create geometry once
    const positions = new Float32Array(connections.length * 6);
    const colors = new Float32Array(connections.length * 6);
    const colorObj = new THREE.Color();
    
    connections.forEach((conn, i) => {
      const idx = i * 6;
      positions[idx] = conn.points[0];
      positions[idx + 1] = conn.points[1];
      positions[idx + 2] = conn.points[2];
      positions[idx + 3] = conn.points[3];
      positions[idx + 4] = conn.points[4];
      positions[idx + 5] = conn.points[5];
      
      colorObj.set(conn.color);
      const alpha = conn.opacity;
      
      // Set colors for both vertices of the line
      colors[idx] = colorObj.r;
      colors[idx + 1] = colorObj.g;
      colors[idx + 2] = colorObj.b;
      colors[idx + 3] = colorObj.r;
      colors[idx + 4] = colorObj.g;
      colors[idx + 5] = colorObj.b;
    });
    
    if (lineGeometryRef.current) {
      lineGeometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      lineGeometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
    
    // Create materials for each connection
    if (lineMaterialRef.current) {
      connections.forEach((conn, i) => {
        lineMaterialRef.current![i].opacity = conn.opacity;
      });
    }
  }, [connections]);
  
  // Update mouse position for parallax effect
  useFrame(({ mouse }) => {
    mousePositionRef.current.x = (mouse.x * viewport.width) / 2;
    mousePositionRef.current.y = (mouse.y * viewport.height) / 2;
  });
  
  // Animation loop with enhanced organic motion and pulse effects
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulseTimeRef.current += 0.016; // ~60fps
    
    // Subtle rotation and movement of the whole group
    if (groupRef.current) {
      // Respond to mouse movement with parallax effect
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.1 + mousePositionRef.current.x * 0.01;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.05 + mousePositionRef.current.y * 0.01;
    }
    
    // Update each particle position with more organic motion
    particles.forEach((particle, index) => {
      const { originalPosition, speedFactor, phaseOffset, layer } = particle;
      
      // Create subtle organic motion for each particle
      particle.position.x = originalPosition.x + Math.sin(t * speedFactor + phaseOffset) * 1.2;
      particle.position.y = originalPosition.y + Math.cos(t * speedFactor + phaseOffset * 1.3) * 1.2;
      particle.position.z = originalPosition.z + Math.sin(t * speedFactor * 0.7 + phaseOffset * 0.9) * 0.8;
      
      // Additional motion based on layer (parallax)
      if (layer === 'foreground') {
        particle.position.x += mousePositionRef.current.x * 0.02;
        particle.position.y += mousePositionRef.current.y * 0.02;
      } else if (layer === 'midground') {
        particle.position.x += mousePositionRef.current.x * 0.01;
        particle.position.y += mousePositionRef.current.y * 0.01;
      }
      // Background particles move least with mouse
    });
    
    // Randomly trigger pulse effects
    if (pulseTimeRef.current > networkConfig.pulseFrequency) {
      pulseTimeRef.current = 0;
      
      // Pick a random particle in the foreground or midground to start a pulse
      const eligibleParticles = particles.filter(p => p.layer !== 'background');
      if (eligibleParticles.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleParticles.length);
        const sourceParticle = eligibleParticles[randomIndex];
        const particleIndex = particles.indexOf(sourceParticle);
        
        // Start pulse from this particle through its connections
        sourceParticle.pulseState = {
          active: true,
          progress: 0,
          origin: null
        };
        
        // Activate pulse on all connections from this particle
        sourceParticle.connections.forEach(connIndex => {
          connections[connIndex].pulseActive = true;
          connections[connIndex].pulseProgress = 0;
        });
      }
    }
    
    // Update pulse animations
    connections.forEach((connection, i) => {
      if (connection.pulseActive) {
        connection.pulseProgress += 0.05;
        
        if (connection.pulseProgress >= 1) {
          connection.pulseActive = false;
          connection.pulseProgress = 0;
          
          // Propagate pulse to next particles
          const nextParticle = particles[connection.particleIndexB];
          if (!nextParticle.pulseState.active) {
            nextParticle.pulseState = {
              active: true,
              progress: 0,
              origin: connection.particleIndexA
            };
            
            // Activate connecting particles except the origin
            nextParticle.connections.forEach(nextConnIndex => {
              const nextConn = connections[nextConnIndex];
              if (nextConn.particleIndexA !== connection.particleIndexA && 
                  nextConn.particleIndexB !== connection.particleIndexA) {
                nextConn.pulseActive = true;
                nextConn.pulseProgress = 0;
              }
            });
          }
        }
      }
    });
    
    // Update connection positions and colors
    if (lineGeometryRef.current) {
      const positions = lineGeometryRef.current.attributes.position.array as Float32Array;
      const colors = lineGeometryRef.current.attributes.color.array as Float32Array;
      
      connections.forEach((conn, i) => {
        const idx = i * 6;
        const particleA = particles[conn.particleIndexA];
        const particleB = particles[conn.particleIndexB];
        
        // Update positions
        positions[idx] = particleA.position.x;
        positions[idx + 1] = particleA.position.y;
        positions[idx + 2] = particleA.position.z;
        positions[idx + 3] = particleB.position.x;
        positions[idx + 4] = particleB.position.y;
        positions[idx + 5] = particleB.position.z;
        
        // Update color/opacity for pulse effect
        let opacity = conn.opacity;
        if (conn.pulseActive) {
          // Brighten during pulse
          opacity = Math.min(1, conn.opacity * (1 + conn.pulseProgress * 2));
        }
        
        if (lineMaterialRef.current) {
          lineMaterialRef.current[i].opacity = opacity;
        }
      });
      
      lineGeometryRef.current.attributes.position.needsUpdate = true;
      lineGeometryRef.current.attributes.color.needsUpdate = true;
    }
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
      
      {/* Efficient line rendering with instanced materials */}
      {connections.map((connection, i) => (
        <line key={i + particles.length}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array(connection.points)}
              count={2}
              itemSize={3}
              ref={(el: any) => {
                if (i === 0) lineGeometryRef.current = el;
              }}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={connection.color} 
            transparent 
            opacity={connection.opacity}
            ref={(el: any) => {
              if (!lineMaterialRef.current) lineMaterialRef.current = [];
              lineMaterialRef.current[i] = el;
            }}
          />
        </line>
      ))}
    </group>
  );
};

export default NetworkParticles;
