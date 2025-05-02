
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import ThreeDBackground from '@/components/ThreeDBackground';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "sonner";

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const [use3DBackground, setUse3DBackground] = useState(true);
  const [loadingBackground, setLoadingBackground] = useState(true);
  
  // Super robust error handling for 3D background
  useEffect(() => {
    const knownErrorPatterns = [
      'three',
      'webgl',
      'canvas', 
      'lov',
      'Cannot read properties of undefined',
      'Cannot destructure property',
      'camera',
      'useContext',
      'context lost',
      'null',
      'glerror'
    ];
    
    // Centralized error check function
    const isThreeJsError = (errorMessage: string): boolean => {
      return knownErrorPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      );
    };
    
    // Window error handler
    const handleError = (event: ErrorEvent) => {
      console.log("Error detected:", event.message);
      
      if (isThreeJsError(event.message)) {
        console.warn("3D background failed, falling back to 2D:", event.message);
        setUse3DBackground(false);
        toast.error("Using simplified background due to graphics limitations", {
          description: "Your device may not fully support 3D graphics"
        });
      }
    };
    
    // Promise rejection handler
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.warn("Unhandled promise rejection:", event.reason);
      
      const errorMsg = String(event.reason || '');
      if (isThreeJsError(errorMsg)) {
        console.warn("3D background failed due to promise rejection, falling back to 2D");
        setUse3DBackground(false);
      }
    };
    
    // React error boundary alternative for non-component errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorText = args.join(' ');
      if (isThreeJsError(errorText)) {
        console.warn("React error detected in Three.js, falling back to 2D");
        setUse3DBackground(false);
      }
      originalConsoleError.apply(console, args);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    // Add short timeout to allow for background loading
    const timeout = setTimeout(() => setLoadingBackground(false), 1000);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      console.error = originalConsoleError;
      clearTimeout(timeout);
    };
  }, []);
  
  // Add smooth scroll behavior with offset for header
  React.useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const headerHeight = isMobile ? 60 : 80; // Smaller offset for mobile
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without scroll jumping
          history.pushState(null, '', target.getAttribute('href') || '');
        }
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, [isMobile]);
  
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {loadingBackground ? (
        <div className="absolute inset-0 -z-10 bg-dark flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-neon-cyan border-r-neon-purple border-b-neon-teal border-l-transparent rounded-full animate-spin" />
        </div>
      ) : use3DBackground ? (
        <ThreeDBackground />
      ) : (
        <ParticlesBackground />
      )}
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
