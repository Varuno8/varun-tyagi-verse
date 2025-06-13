
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  
  // Improved typing animation effect
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
        // Add blinking cursor at the end
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        heading.appendChild(cursor);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeEffect);
  }, []);
  
  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1f4QU-YjlKnyKrluhPGdv-AMZqQhQMCp2/view?usp=sharing', '_blank');
  };
  
  return (
    <section id="home" className="relative flex flex-col justify-center min-h-screen py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 z-10 mt-16 sm:mt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Profile image with glow effect */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 opacity-0 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-teal opacity-50 blur-md animate-pulse-slow"></div>
            <img 
              src="https://placehold.co/300x300/1A1F2C/FFFFFF?text=VT" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full border-2 border-white/20"
            />
          </div>
          
          {/* Pre-heading text with animated fade-in */}
          <p className="text-neon-cyan font-mono mb-2 sm:mb-3 opacity-0 animate-fade-in" style={{animationDelay: '0.5s'}}>
            Hello, I'm
          </p>
          
          {/* Name with gradient and 3D effect */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 opacity-0 animate-fade-in relative" style={{animationDelay: '0.7s'}}>
            <span className="text-gradient relative z-10 leading-tight tracking-tight">Varun Tyagi</span>
            {/* Text shadow for 3D effect */}
            <span className="absolute -left-1 top-1 text-neon-purple/20 z-0 hidden md:block">Varun Tyagi</span>
          </h1>
          
          {/* Professional title badge */}
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 sm:mb-6 opacity-0 animate-fade-in" style={{animationDelay: '0.9s'}}>
            <span className="h-2 w-2 rounded-full bg-neon-cyan mr-2 animate-pulse"></span>
            <span className="text-neon-cyan text-sm sm:text-base font-medium">Full-Stack Developer</span>
          </div>
          
          {/* Tagline with typing effect - improved sizing for mobile */}
          <h2 
            ref={headingRef} 
            className="text-xl sm:text-2xl md:text-3xl font-display mb-6 sm:mb-8 opacity-0 h-[32px] sm:h-[40px] md:h-[48px] font-semibold"
          >
            Building AI-Powered Web Experiences
          </h2>
          
          {/* Subtext with improved professional tone and wrapping on mobile */}
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 opacity-0 animate-fade-in leading-relaxed" style={{animationDelay: '1.4s'}}>
            Specialized in developing scalable applications, intelligent systems, and 
            immersive digital experiences with modern technologies and best practices.
          </p>
          
          {/* CTA Buttons with enhanced styling - mobile-friendly layout */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 opacity-0 animate-fade-in" style={{animationDelay: '1.6s'}}>
            <Button 
              variant="default" 
              size={isMobile ? "default" : "lg"}
              className="group w-full sm:w-auto bg-gradient-to-r from-neon-purple to-neon-cyan text-white transition-all duration-300 shadow-md hover:shadow-glow-purple"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              className="group w-full sm:w-auto border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
              onClick={handleResumeClick}
            >
              Download Resume
              <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
          
          {/* Social media links - improved spacing for mobile */}
          <div className="flex justify-center space-x-3 items-center mt-6 sm:mt-8">
            <a 
              href="https://github.com/Varuno8" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/varun-tyagi-32bb281b9/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=varun28082001@gmail.com&su=Hello" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          {/* Enhanced scroll indicator - removed the EXPLORE text */}
          <div className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{animationDelay: '2s'}}>
            <div className="flex flex-col items-center">
              <div className="relative h-12 sm:h-16 w-1">
                <div className="absolute w-[3px] h-12 sm:h-16 rounded-full bg-gradient-to-b from-neon-purple to-transparent"></div>
                <div className="absolute w-[3px] h-4 sm:h-5 bg-neon-purple rounded-full animate-bounce-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
