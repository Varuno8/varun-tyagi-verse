
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Enhanced 3D Code Cube component 
const CodeCube = ({ position, size = 1, color = 'white', speed = 1, wireframe = true }: { 
  position: [number, number, number], 
  size?: number, 
  color?: string, 
  speed?: number,
  wireframe?: boolean 
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

// Enhanced glowing sphere component
const GlowingSphere = ({ position, size = 1, color = '#ffffff', intensity = 1 }: { 
  position: [number, number, number], 
  size?: number, 
  color?: string,
  intensity?: number 
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

// Advanced connected lines between nodes with gradient effect
const Lines = ({ points, colorA = "#8B5CF6", colorB = "#00E5FF" }: { 
  points: [number, number, number][], 
  colorA?: string, 
  colorB?: string 
}) => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const { clock } = useThree();
  
  useFrame(() => {
    if (!lineRef.current) return;
    const t = clock.getElapsedTime() * 0.2;
    lineRef.current.rotation.y = Math.sin(t) * 0.2;
    lineRef.current.rotation.z = Math.cos(t) * 0.1;
  });
  
  // Create geometry with vertices from points
  const vertices: number[] = [];
  const colors: number[] = [];
  
  // Create a color gradient array
  const color1 = new THREE.Color(colorA);
  const color2 = new THREE.Color(colorB);
  
  // Connect each point to several others but not all (for better aesthetics)
  for (let i = 0; i < points.length; i++) {
    // Connect to 3-5 other random points
    const connectionsCount = Math.floor(Math.random() * 3) + 2;
    
    for (let c = 0; c < connectionsCount; c++) {
      let j = Math.floor(Math.random() * points.length);
      if (j === i) j = (j + 1) % points.length;
      
      vertices.push(...points[i], ...points[j]);
      
      // Create gradient colors for each line
      const t1 = Math.random();
      const t2 = Math.random();
      
      const colorStart = new THREE.Color().lerpColors(color1, color2, t1);
      const colorEnd = new THREE.Color().lerpColors(color1, color2, t2);
      
      colors.push(
        colorStart.r, colorStart.g, colorStart.b,
        colorEnd.r, colorEnd.g, colorEnd.b
      );
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" vertexColors transparent opacity={0.4} />
    </lineSegments>
  );
};

// Floating tech particles in 3D space
const TechParticles = ({ count = 50 }: { count?: number }) => {
  const group = useRef<THREE.Group>(null!);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
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

// Simplified effects for better compatibility
const Effects = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} intensity={0.3} levels={6} mipmapBlur />
    </EffectComposer>
  );
};

const ThreeDBackground = () => {
  // Define positions for cubes in more interesting geometric patterns
  const cubePositions: [number, number, number][] = [
    [-5, 1, -3],
    [5, -1.5, 2],
    [-2.5, -2, -4],
    [3.5, 2.5, -2],
    [-4, 0.5, 3],
    [4.5, -0.5, -3.5],
    [0.5, 3.5, 4],
    [-3, -3, 0],
    [2, 1, -6],
    [-1, 4, -2],
    [6, 2, 1],
  ];
  
  // Add spherical objects for enhanced visual interest
  const spherePositions: [number, number, number][] = [
    [-7, 3, 5],
    [6, 4, -1],
    [-2, -4, 3],
    [4, -2, -5],
  ];

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#070b11', 15, 35]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.3} />
        <pointLight position={[0, 5, 5]} color="#00E5FF" intensity={0.3} />
        
        {/* 3D cubes */}
        {cubePositions.map((position, idx) => (
          <CodeCube 
            key={idx} 
            position={position} 
            size={1 + Math.random() * 0.5} 
            color={
              idx % 3 === 0 ? "#8B5CF6" : // purple
              idx % 3 === 1 ? "#00E5FF" : // cyan
                             "#06D6A0"    // teal
            }
            speed={0.4 + Math.random() * 0.3}
            wireframe={idx % 3 === 0}
          />
        ))}
        
        {/* Glowing spheres */}
        {spherePositions.map((position, idx) => (
          <GlowingSphere
            key={idx}
            position={position}
            size={0.5 + Math.random() * 0.3}
            color={
              idx % 2 === 0 ? "#8B5CF6" : "#00E5FF"
            }
            intensity={0.8 + Math.random() * 0.5}
          />
        ))}
        
        {/* Connected lines */}
        <Lines points={[...cubePositions, ...spherePositions]} colorA="#8B5CF6" colorB="#00E5FF" />
        
        {/* Tech particles in background */}
        <TechParticles count={50} />
        
        {/* Add simplified effects */}
        <Effects />
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;
