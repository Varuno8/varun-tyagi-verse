import React, { useEffect, useRef } from 'react';
import { Award, Code, Star, Award as AwardIcon } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Achievement {
  id: number;
  title: string;
  value: string;
  icon: JSX.Element;
  color: string;
  numericValue: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "GFG Problems",
    value: "320+",
    icon: <Code />,
    color: "neon-cyan",
    numericValue: 320
  },
  {
    id: 2,
    title: "LeetCode",
    value: "250+",
    icon: <Star />,
    color: "neon-purple",
    numericValue: 250
  },
  {
    id: 3,
    title: "CodeChef Rating",
    value: "1500",
    icon: <Award />,
    color: "neon-teal",
    numericValue: 1500
  },
  {
    id: 4,
    title: "JEE Mains",
    value: "98.2 percentile",
    icon: <AwardIcon />,
    color: "neon-purple",
    numericValue: 98
  }
];

// 3D Achievement Badge Component
const AchievementBadge = ({ position, color, value }: { position: [number, number, number], color: string, value: string }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  
  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial>
        <primitive object={true} attach="wireframe" />
        <primitive object={new THREE.Color(color)} attach="color" />
        <primitive object={new THREE.Color(color)} attach="emissive" />
        <primitive object={0.5} attach="emissiveIntensity" />
        <primitive object={0.7} attach="opacity" />
        <primitive object={true} attach="transparent" />
      </meshStandardMaterial>
      
      {/* Number display as basic geometry */}
      <mesh position={[0, 0, 1]} scale={0.5}>
        <planeGeometry args={[1, 0.3]} />
        <meshBasicMaterial>
          <primitive object={new THREE.Color("white")} attach="color" />
          <primitive object={true} attach="transparent" />
          <primitive object={0.9} attach="opacity" />
          <primitive object={false} attach="depthWrite" />
        </meshBasicMaterial>
      </mesh>
    </mesh>
  );
};

// 3D Achievements Background
const AchievementBackground = () => {
  return (
    <div className="h-60 w-full mb-12">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <AchievementBadge position={[-3, 0, 0]} color="#00E5FF" value="320+" />
        <AchievementBadge position={[-1, 0, 0]} color="#8B5CF6" value="250+" />
        <AchievementBadge position={[1, 0, 0]} color="#06D6A0" value="1500" />
        <AchievementBadge position={[3, 0, 0]} color="#8B5CF6" value="98%" />
      </Canvas>
    </div>
  );
};

const AchievementsSection: React.FC = () => {
  // Refs for counter animation
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  
  // Counter animation effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const animateCounter = (element: HTMLElement, target: number) => {
      const duration = 2000;
      const frameRate = 60;
      const frameDuration = 1000 / frameRate;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.floor(progress * target);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          element.textContent = target.toString();
        } else {
          element.textContent = currentCount.toString();
        }
      }, frameDuration);
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counterElement = entry.target as HTMLElement;
          const target = parseInt(counterElement.dataset.target || '0', 10);
          
          animateCounter(counterElement, target);
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Set up observers for numeric counters
    counterRefs.current.forEach((counter) => {
      if (counter && !isNaN(parseInt(counter.dataset.target || '0', 10))) {
        observer.observe(counter);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="achievements" className="section-padding relative bg-dark-lighter">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Recognition and accomplishments throughout my journey.
          </p>
        </div>
        
        {/* 3D Achievements visualization */}
        <AchievementBackground />
        
        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className="glass-card rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px)',
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }}
            >
              <div className={`h-16 w-16 rounded-full bg-${achievement.color}/20 flex items-center justify-center mx-auto mb-4 text-${achievement.color} shadow-lg`}
                   style={{boxShadow: `0 0 15px var(--${achievement.color})`}}
              >
                {achievement.icon}
              </div>
              
              <div className="mb-2">
                <span 
                  ref={el => counterRefs.current[index] = el} 
                  className={`text-3xl font-display font-bold text-${achievement.color}`}
                  data-target={achievement.numericValue}
                >
                  0
                </span>
                <span className={`text-3xl font-display font-bold text-${achievement.color}`}>
                  {achievement.value.includes('+') ? '+' : achievement.value.includes('%') ? '%' : ''}
                </span>
                {achievement.id === 4 && 
                  <span className={`text-3xl font-display font-bold text-${achievement.color}`}>
                    {' percentile'}
                  </span>
                }
              </div>
              
              <h3 className="text-lg font-medium">{achievement.title}</h3>
            </div>
          ))}
        </div>
        
        {/* Certificate highlight */}
        <div className="mt-16 max-w-3xl mx-auto glass-card rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-6 relative">
              <div className="h-20 w-20 rounded-full bg-neon-purple/20 flex items-center justify-center relative overflow-hidden">
                <Award className="h-10 w-10 text-neon-purple relative z-10" />
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/30 to-transparent animate-pulse-neon"></div>
              </div>
              
              {/* Animated rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-neon-purple/30 animate-ping-slow opacity-70"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-neon-purple/20 animate-ping-slower opacity-50"></div>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Continuous Learning & Growth</h3>
              <p className="text-gray-300 mb-4">
                Always expanding my knowledge through courses, projects, and real-world challenges.
                Committed to staying at the forefront of technology trends and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">AWS Certification</span>
                <span className="skill-tag">ML Specialization</span>
                <span className="skill-tag">System Design</span>
                <span className="skill-tag">Full-Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-20 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default AchievementsSection;
