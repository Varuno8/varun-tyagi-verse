
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

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
    title: "QuickCart E-commerce App",
    description: "A modern e-commerce platform with authentication, payment processing, and order management.",
    technologies: ["Next.js", "Clerk", "MongoDB", "Inngest", "Tailwind CSS"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=QuickCart+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
  {
    id: 2,
    title: "PDF-based RAG Application",
    description: "An intelligent document Q&A system using retrieval augmented generation techniques.",
    technologies: ["LangChain", "Streamlit", "FAISS", "Ollama", "Python"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=PDF+RAG+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
  {
    id: 3,
    title: "OCR & Text Analysis Tool",
    description: "Computer vision application that extracts and analyzes text from images and documents.",
    technologies: ["Google Vision API", "OpenCV", "HuggingFace", "Flask", "React"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=OCR+Analysis+Tool",
    githubUrl: "https://github.com/",
    demoUrl: "https://demo.com/",
  },
];

const ProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative bg-gradient-to-b from-dark to-dark-lighter">
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
        
        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`glass-card rounded-xl overflow-hidden transition-all duration-500 ${
                hoveredProject === project.id ? 'transform scale-[1.03] neon-border' : 'transform scale-100'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700"
                  style={{
                    transform: hoveredProject === project.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
              </div>
              
              {/* Project content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-white/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Project links */}
                <div className="flex justify-between items-center">
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
                  >
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* More projects link */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-neon-purple hover:bg-neon-purple/10"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
