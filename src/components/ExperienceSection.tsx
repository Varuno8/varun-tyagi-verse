
import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, Star, ArrowRight } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Eigengram",
    position: "Software Engineer Intern",
    period: "Nov 2024 – April 2025",
    highlights: [
      "Developed and optimized AWS-based cloud applications",
      "Built and fine-tuned diffusion model pipelines",
      "Created efficient data scraping systems",
      "Assisted with ML model deployment to production"
    ]
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
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-neon-purple via-neon-cyan to-neon-teal"></div>
          
          {/* Experience cards */}
          {experiences.map((experience, index) => (
            <div 
              key={experience.id} 
              className="experience-card mb-12 md:mb-24 relative grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-neon-purple animate-pulse-neon z-10"></div>
              
              {/* Content */}
              <div className={`glass-card rounded-xl p-6 ${
                index % 2 === 0 
                  ? 'md:col-start-1 md:text-right' 
                  : 'md:col-start-2'
              }`}>
                <div className={`flex items-center mb-2 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <Briefcase className="h-5 w-5 text-neon-purple mr-2 md:order-1" />
                  <h3 className="font-display text-xl font-semibold">{experience.position}</h3>
                </div>
                
                <h4 className="text-neon-cyan font-medium mb-2">{experience.company}</h4>
                
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
                      <Star className="h-4 w-4 text-neon-teal mr-2 mt-1 shrink-0" />
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
    </section>
  );
};

export default ExperienceSection;
