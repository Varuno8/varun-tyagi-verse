import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

// Technologies icon components - simplified representation
const TechIcon = ({ tech }: { tech: string }) => {
  const iconColor = {
    'React': '#61DAFB',
    'TypeScript': '#007ACC',
    'Next.js': '#000000',
    'Clerk': '#6E56CF',
    'MongoDB': '#4DB33D',
    'Inngest': '#FF4B45',
    'Tailwind CSS': '#38B2AC',
    'LangChain': '#EBE8E8',
    'Streamlit': '#FF4B4B',
    'FAISS': '#6F86D6',
    'Ollama': '#34D399',
    'Python': '#3776AB',
    'Google Vision API': '#EA4335',
    'OpenCV': '#5C3EE8',
    'HuggingFace': '#FFD21E',
    'Flask': '#000000',
    'Django': '#092E20',
    'PostgreSQL': '#336791',
    'JWT': '#000000',
    'Recharts': '#22C55E',
    'Angular': '#DD0031',
    'DRF': '#A30000',
  };

  return (
    <span 
      className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-1"
      style={{ backgroundColor: iconColor[tech as keyof typeof iconColor] || '#6E6E6E' }}
      title={tech}
    />
  );
};

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eigengram Healthcare Platform",
    description: "Full-stack AI service marketplace for medical professionals with subscription flows and admin analytics.",
    technologies: ["React", "TypeScript", "Django", "JWT", "PostgreSQL", "Recharts"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=Eigengram",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
  {
    id: 2,
    title: "QuickCart E-commerce App",
    description: "A modern e-commerce platform with authentication, payment processing, and order management.",
    technologies: ["Next.js", "Clerk", "MongoDB", "Inngest", "Tailwind CSS"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=QuickCart+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
  {
    id: 3,
    title: "PDF-based RAG Application",
    description: "An intelligent document Q&A system using retrieval augmented generation techniques.",
    technologies: ["LangChain", "Streamlit", "FAISS", "Ollama", "Python"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=PDF+RAG+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
  {
    id: 4,
    title: "OCR & Text Analysis Tool",
    description: "Computer vision application that extracts and analyzes text from images and documents.",
    technologies: ["Google Vision API", "OpenCV", "HuggingFace", "Flask", "React"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=OCR+Analysis+Tool",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
];

// Project Card component with CSS 3D effect instead of Three.js
const ProjectCard3D = ({ project, isHovered, onHover }: { project: Project, isHovered: boolean, onHover: () => void }) => {
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
          >
            View Details
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to animate cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.classList.add('opacity-0');
      observer.observe(card);
    });

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [visibleProjects]);

  const handleLoadMore = () => {
    setVisibleProjects(Math.min(visibleProjects + 3, projects.length));
  };

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative bg-gradient-to-b from-dark to-dark-lighter">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore my recent work spanning web development, AI integration, and data processing.
          </p>
        </div>
        
        {/* 3D Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div key={project.id} className="project-card" style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard3D 
                project={project}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Load more button */}
        {visibleProjects < projects.length && (
          <div className="text-center mt-12">
            <Button 
              onClick={handleLoadMore}
              variant="outline" 
              size="lg" 
              className="border-neon-purple hover:bg-neon-purple/10"
            >
              Load More Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ProjectsSection;
