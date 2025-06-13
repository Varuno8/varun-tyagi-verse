
import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
    const colors = ['#8B5CF6', '#00E5FF', '#06D6A0'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Update and draw particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles and connections
      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);
        
        // Connect particles
        connectParticles(particles[i], particles);
      }
      
      requestAnimationFrame(animate);
    };
    
    const updateParticle = (particle: Particle) => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce particles off edges
      if (particle.x > canvas.width) {
        particle.x = 0;
      } else if (particle.x < 0) {
        particle.x = canvas.width;
      }
      
      if (particle.y > canvas.height) {
        particle.y = 0;
      } else if (particle.y < 0) {
        particle.y = canvas.height;
      }
    };
    
    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
    };
    
    const connectParticles = (particle: Particle, particles: Particle[]) => {
      const maxDistance = 150;
      
      for (let j = 0; j < particles.length; j++) {
        const otherParticle = particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Draw connection
          ctx.beginPath();
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticlesBackground;
