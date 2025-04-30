
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import TechIcon from './TechIcon';
import { Project } from './projectsData';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isHovered, onHover }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;
      
      cardRef.current.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        ${isHovered ? 'scale(1.03)' : 'scale(1)'}
      `;
    };
    
    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isHovered]);
  
  return (
    <div 
      ref={cardRef}
      className={`glass-card rounded-xl overflow-hidden transition-all duration-500 ${
        isHovered ? 'neon-border z-10' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={() => {}}
      style={{ 
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Project image with 3D depth effect */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.1) translateZ(20px)' : 'scale(1)',
            transformStyle: 'preserve-3d',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
      </div>
      
      {/* Project content with 3D layering */}
      <div className="p-6" style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)', transformStyle: 'preserve-3d' }}>
        <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6" style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0)', transformStyle: 'preserve-3d' }}>
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="bg-white/5 flex items-center">
              <TechIcon tech={tech} />
              <span className="ml-1">{tech}</span>
            </Badge>
          ))}
        </div>
        
        {/* Project links */}
        <div className="flex justify-between items-center" style={{ transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)', transformStyle: 'preserve-3d' }}>
          <div className="flex space-x-3">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="group text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10"
            style={{ transform: isHovered ? 'translateZ(60px)' : 'translateZ(0)', transformStyle: 'preserve-3d' }}
            onClick={() => window.open(project.demoUrl, '_blank')}
          >
            View Details
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
