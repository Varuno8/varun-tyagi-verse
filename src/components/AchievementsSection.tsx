
import React, { useEffect, useRef } from 'react';
import { Award, Code, Star, Award as AwardIcon } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  value: string;
  icon: JSX.Element;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "GFG Problems",
    value: "320+",
    icon: <Code />,
    color: "neon-cyan"
  },
  {
    id: 2,
    title: "LeetCode",
    value: "250+",
    icon: <Star />,
    color: "neon-purple"
  },
  {
    id: 3,
    title: "CodeChef Rating",
    value: "1500",
    icon: <Award />,
    color: "neon-teal"
  },
  {
    id: 4,
    title: "JEE Mains",
    value: "98.2 percentile",
    icon: <AwardIcon />,
    color: "neon-purple"
  }
];

const AchievementsSection: React.FC = () => {
  // Refs for counter animation
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  
  // Counter animation effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const animateCounter = (element: HTMLElement, target: number) => {
      const duration = 2000;
      const frameRate = 60;
      const frameDuration = 1000 / frameRate;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.floor(progress * target);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          element.textContent = target.toString();
        } else {
          element.textContent = currentCount.toString();
        }
      }, frameDuration);
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counterElement = entry.target as HTMLElement;
          const target = parseInt(counterElement.dataset.target || '0', 10);
          
          animateCounter(counterElement, target);
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Set up observers for numeric counters
    counterRefs.current.forEach((counter) => {
      if (counter && !isNaN(parseInt(counter.dataset.target || '0', 10))) {
        observer.observe(counter);
      }
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="achievements" className="section-padding relative bg-dark-lighter">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Recognition and accomplishments throughout my journey.
          </p>
        </div>
        
        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className="glass-card rounded-xl p-6 text-center transition-transform hover:scale-105"
            >
              <div className={`h-16 w-16 rounded-full bg-${achievement.color}/20 flex items-center justify-center mx-auto mb-4 text-${achievement.color}`}>
                {achievement.icon}
              </div>
              
              <div className="mb-2">
                <span 
                  ref={el => counterRefs.current[index] = el} 
                  className={`text-3xl font-display font-bold text-${achievement.color}`}
                  data-target={achievement.value.replace(/\D/g, '')}
                >
                  0
                </span>
                <span className={`text-3xl font-display font-bold text-${achievement.color}`}>
                  {achievement.value.includes('+') ? '+' : achievement.value.includes('%') ? '%' : ''}
                </span>
                {achievement.id === 4 && 
                  <span className={`text-3xl font-display font-bold text-${achievement.color}`}>
                    {' percentile'}
                  </span>
                }
              </div>
              
              <h3 className="text-lg font-medium">{achievement.title}</h3>
            </div>
          ))}
        </div>
        
        {/* Certificate highlight */}
        <div className="mt-16 max-w-3xl mx-auto glass-card rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-6">
              <div className="h-20 w-20 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <Award className="h-10 w-10 text-neon-purple" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Continuous Learning & Growth</h3>
              <p className="text-gray-300 mb-4">
                Always expanding my knowledge through courses, projects, and real-world challenges.
                Committed to staying at the forefront of technology trends and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">AWS Certification</span>
                <span className="skill-tag">ML Specialization</span>
                <span className="skill-tag">System Design</span>
                <span className="skill-tag">Full-Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
