
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LinesProps {
  points: [number, number, number][];
  colorA?: string;
  colorB?: string;
}

const Lines: React.FC<LinesProps> = ({ 
  points, 
  colorA = "#8B5CF6", 
  colorB = "#00E5FF" 
}) => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  
  useFrame(({ clock }) => {
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
    // Connect to 2-3 other random points (reduced from 3-5)
    const connectionsCount = Math.floor(Math.random() * 2) + 1;
    
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

export default Lines;
