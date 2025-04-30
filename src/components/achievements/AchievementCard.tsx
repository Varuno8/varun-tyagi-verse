import React, { useRef, useEffect } from 'react';
import TechIcon from '../projects/TechIcon';
import { Achievement } from './types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  const counterRef = useRef<HTMLSpanElement | null>(null);

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
    
    if (counterRef.current && !isNaN(parseInt(counterRef.current.dataset.target || '0', 10))) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Dynamically render the appropriate Lucide icon
  const renderIcon = () => {
    if (achievement.tech) {
      return <TechIcon tech={achievement.tech} />;
    } else {
      // Fixed: Using type assertion with proper typing
      const icons = LucideIcons as unknown as Record<string, LucideIcon>;
      const IconComponent = icons[achievement.iconName];
      return IconComponent ? <IconComponent size={24} /> : null;
    }
  };

  return (
    <div 
      className="glass-card rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
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
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }}
    >
      <a 
        href={achievement.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={achievement.url ? "block" : ""}
      >
        <div 
          className={`h-16 w-16 rounded-full bg-${achievement.color}/20 flex items-center justify-center mx-auto mb-4 text-${achievement.color} shadow-lg`}
          style={{boxShadow: `0 0 15px var(--${achievement.color})`}}
        >
          {renderIcon()}
        </div>
        
        <div className="mb-2">
          <span 
            ref={counterRef} 
            className={`text-3xl font-display font-bold text-${achievement.color}`}
            data-target={achievement.numericValue}
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
      </a>
    </div>
  );
};

export default AchievementCard;
