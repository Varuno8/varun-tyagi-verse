
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './projects/ProjectCard';
import { projects } from './projects/projectsData';

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
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore my recent work spanning web development, AI integration, and data processing.
          </p>
        </div>
        
        {/* Project cards with better spacing on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div key={project.id} className="project-card" style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard 
                project={project}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Load more button */}
        {visibleProjects < projects.length && (
          <div className="text-center mt-10 sm:mt-12">
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
      <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ProjectsSection;
