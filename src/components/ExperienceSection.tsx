
import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, Star, ArrowRight } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  highlights: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Eigengram",
    position: "Software Engineer Intern",
    period: "Nov 2024 – April 2025",
    highlights: [
      "Built a full-stack healthcare AI marketplace platform using React (TypeScript) frontend and Django backend",
      "Created secure subscription systems, analytics dashboards, and an AI model catalog",
      "Implemented JWT-based authentication with Google OAuth, Tailwind UI, and Recharts visualizations"
    ],
    color: "#8B5CF6" // purple
  },
  {
    id: 2,
    company: "Rovisor Research",
    position: "Software Development Intern",
    period: "June 2024 - August 2024",
    highlights: [
      "Enhanced frontend UX using Angular, integrated APIs, and optimized load times by 20%",
      "Developed responsive UI components and implemented state management patterns",
      "Collaborated with UX team to create intuitive user flows and interactions"
    ],
    color: "#00E5FF" // cyan
  },
  {
    id: 3,
    company: "Business Web Solutions",
    position: "Web Developer Intern",
    period: "May 2024 - June 2024",
    highlights: [
      "Designed modern, responsive interfaces with HTML/CSS/JS, focusing on usability and performance",
      "Optimized web assets and implemented best practices for performance improvements",
      "Created cross-browser compatible solutions for client websites"
    ],
    color: "#06D6A0" // teal
  }
];

const ExperienceSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Add scroll animation to experience cards
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card) => {
      card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(card);
    });
    
    return () => {
      if (experienceCards) {
        experienceCards.forEach((card) => observer.unobserve(card));
      }
    };
  }, []);
  
  return (
    <section id="experience" className="section-padding relative bg-dark">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Professional journey and roles that have shaped my expertise.
          </p>
        </div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto relative">
          {/* Timeline line with animated elements */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-teal">
            {/* Timeline Nodes */}
            <div className="hidden md:block absolute top-[10%] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-neon-purple animate-pulse-slow shadow-glow-purple"></div>
            <div className="hidden md:block absolute top-[50%] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-neon-cyan animate-pulse-slow shadow-glow-cyan"></div>
            <div className="hidden md:block absolute top-[90%] left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-neon-teal animate-pulse-slow shadow-glow-teal"></div>
          </div>
          
          {/* Experience cards */}
          {experiences.map((experience, index) => (
            <div 
              key={experience.id} 
              className="experience-card mb-12 md:mb-24 relative grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot with glow effect */}
              <div 
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{ 
                  backgroundColor: experience.color,
                  boxShadow: `0 0 15px ${experience.color}`,
                }}
              ></div>
              
              {/* Content with 3D hover effect */}
              <div 
                className={`glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                  index % 2 === 0 
                    ? 'md:col-start-1 md:text-right' 
                    : 'md:col-start-2'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px)',
                  borderColor: `${experience.color}33`
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
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }}
              >
                <div className={`flex items-center mb-2 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <Briefcase 
                    className={`h-5 w-5 mr-2 md:order-1`}
                    style={{ color: experience.color }} 
                  />
                  <h3 className="font-display text-xl font-semibold">{experience.position}</h3>
                </div>
                
                <h4 
                  className="font-medium mb-2"
                  style={{ color: experience.color }}
                >
                  {experience.company}
                </h4>
                
                <div className={`flex items-center text-sm text-gray-300 mb-4 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{experience.period}</span>
                </div>
                
                <ul className={`space-y-2 text-gray-300 ${
                  index % 2 === 0 ? 'md:ml-auto' : ''
                }`}>
                  {experience.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <Star 
                        className="h-4 w-4 mr-2 mt-1 shrink-0" 
                        style={{ color: experience.color }}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Empty column for alternating layout */}
              <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}></div>
            </div>
          ))}
        </div>
        
        {/* Add more experiences prompt */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            More experience to be added as career progresses...
          </p>
          <a 
            href="#skills" 
            className="inline-flex items-center text-neon-cyan hover:underline"
          >
            Check out my skills 
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default ExperienceSection;
