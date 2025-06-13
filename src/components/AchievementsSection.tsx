
import React from 'react';
import AchievementBackground from './achievements/AchievementBackground';
import AchievementCard from './achievements/AchievementCard';
import CertificateHighlight from './achievements/CertificateHighlight';
import { achievements } from './achievements/achievementsData';

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="section-padding relative bg-dark-lighter">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Recognition and accomplishments throughout my journey.
          </p>
        </div>
        
        {/* 3D Achievements visualization */}
        <AchievementBackground />
        
        {/* Achievement cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Certificate highlight */}
        <CertificateHighlight />
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-20 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default AchievementsSection;
