
import React from 'react';
import { Award } from 'lucide-react';
import TechIcon from '../projects/TechIcon';

const CertificateHighlight: React.FC = () => {
  return (
    <div className="mt-16 max-w-3xl mx-auto glass-card rounded-xl p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="mb-6 md:mb-0 md:mr-6 relative">
          <div className="h-20 w-20 rounded-full bg-neon-purple/20 flex items-center justify-center relative overflow-hidden">
            <Award className="h-10 w-10 text-neon-purple relative z-10" />
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/30 to-transparent animate-pulse-neon"></div>
          </div>
          
          {/* Animated rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-neon-purple/30 animate-ping-slow opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-neon-purple/20 animate-ping-slower opacity-50"></div>
        </div>
        <div>
          <h3 className="text-xl font-display font-bold mb-2">Continuous Learning & Growth</h3>
          <p className="text-gray-300 mb-4">
            Always expanding my knowledge through courses, projects, and real-world challenges.
            Committed to staying at the forefront of technology trends and best practices.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="skill-tag flex items-center"><TechIcon tech="Python" /> Python</span>
            <span className="skill-tag flex items-center"><TechIcon tech="TypeScript" /> TypeScript</span>
            <span className="skill-tag flex items-center"><TechIcon tech="Angular" /> Angular</span>
            <span className="skill-tag flex items-center"><TechIcon tech="TensorFlow" /> ML Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateHighlight;
