
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
  
  // Enhanced error handler for 3D background with debugging
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.log("Error detected:", event.message);
      
      // Check if the error is related to Three.js, WebGL, or other known issues
      if (
        event.message.includes('three') || 
        event.message.includes('webgl') || 
        event.message.includes('canvas') ||
        event.message.includes('lov') ||
        event.message.includes('Cannot read properties of undefined') ||
        event.message.includes('context lost')
      ) {
        console.warn("3D background failed, falling back to 2D:", event.message);
        setUse3DBackground(false);
        toast.error("Using simplified background due to graphics limitations", {
          description: "Your device may not support 3D graphics fully"
        });
      }
    };
    
    // Listen for errors at window level
    window.addEventListener('error', handleError);
    
    // Listen for unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.warn("Unhandled promise rejection:", event.reason);
      if (typeof event.reason === 'object' && event.reason !== null) {
        const errorMsg = String(event.reason);
        if (
          errorMsg.includes('three') ||
          errorMsg.includes('webgl') ||
          errorMsg.includes('lov') ||
          errorMsg.includes('Cannot read properties of undefined')
        ) {
          console.warn("3D background failed due to promise rejection, falling back to 2D");
          setUse3DBackground(false);
        }
      }
    });
    
    const timeout = setTimeout(() => setLoadingBackground(false), 1000);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', (event) => {});
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
