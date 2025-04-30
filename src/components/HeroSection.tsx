
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Typing animation effect
  useEffect(() => {
    if (!headingRef.current) return;
    
    const heading = headingRef.current;
    heading.style.opacity = '1';
    
    const text = 'Building AI-Powered Web Experiences';
    const typingSpeed = 80;
    
    let charIndex = 0;
    heading.textContent = '';
    
    const typeEffect = setInterval(() => {
      if (charIndex < text.length) {
        heading.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeEffect);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeEffect);
  }, []);
  
  return (
    <section id="home" className="relative flex flex-col justify-center min-h-screen py-20 overflow-hidden">
      {/* 3D Animated Background */}
      <ParticlesBackground />
      
      <div className="container mx-auto px-6 z-10 mt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pre-heading text with animated fade-in */}
          <p className="text-neon-cyan font-mono mb-3 opacity-0 animate-fade-in" style={{animationDelay: '0.3s'}}>
            Hello, I'm
          </p>
          
          {/* Name with gradient */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <span className="text-gradient">Varun Tyagi</span>
          </h1>
          
          {/* Tagline with typing effect */}
          <h2 
            ref={headingRef} 
            className="text-2xl md:text-3xl font-display mb-6 opacity-0 h-[40px] md:h-[48px]"
          >
            Building AI-Powered Web Experiences
          </h2>
          
          {/* Subtext */}
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in" style={{animationDelay: '1.2s'}}>
            Full-stack engineer focused on building scalable software, intelligent systems, 
            and delightful user experiences.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in" style={{animationDelay: '1.4s'}}>
            <Button 
              variant="default" 
              size="lg" 
              className="group bg-neon-purple hover:bg-neon-purple/90 text-white transition-all duration-300"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Download Resume
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              Let's Connect
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{animationDelay: '2s'}}>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
              <div className="w-1 h-12 rounded-full bg-gradient-to-b from-neon-purple to-transparent relative">
                <div className="absolute w-1 h-3 bg-neon-purple rounded-full animate-float"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
