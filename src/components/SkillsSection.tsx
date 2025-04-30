
import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Monitor } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: JSX.Element;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: <Code className="h-6 w-6 text-neon-purple" />,
    skills: ["Python", "C++", "JavaScript", "TypeScript"]
  },
  {
    name: "Tools",
    icon: <Monitor className="h-6 w-6 text-neon-purple" />,
    skills: ["Node.js", "MongoDB", "MySQL", "Docker", "Git"]
  },
  {
    name: "ML/AI",
    icon: <Database className="h-6 w-6 text-neon-purple" />,
    skills: ["PyTorch", "scikit-learn", "Transformers", "HuggingFace", "OpenCV", "FAISS"]
  },
  {
    name: "Cloud",
    icon: <Globe className="h-6 w-6 text-neon-purple" />,
    skills: ["AWS EC2", "S3", "Boto3"]
  }
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  const [animating, setAnimating] = useState<boolean>(false);
  
  // Handle category change with animation
  const handleCategoryChange = (category: string) => {
    if (category === activeCategory || animating) return;
    
    setAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setAnimating(false);
    }, 300);
  };
  
  // Generate rotating skill nodes
  const generateSkillNodes = () => {
    const currentCategory = skillCategories.find(cat => cat.name === activeCategory);
    if (!currentCategory) return null;
    
    return currentCategory.skills.map((skill, index) => {
      const angle = (index * (360 / currentCategory.skills.length)) * (Math.PI / 180);
      const radius = 130; // Size of the orbit
      
      // Calculate position on the circle
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Generate random rotation for the pill
      const rotation = Math.floor(Math.random() * 20) - 10;
      
      return (
        <div 
          key={skill}
          className="absolute skill-node transition-all duration-1000"
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
            opacity: animating ? 0 : 1,
          }}
        >
          <div className="skill-tag whitespace-nowrap">
            {skill}
          </div>
        </div>
      );
    });
  };
  
  // Add orbit animation
  useEffect(() => {
    const orbitInterval = setInterval(() => {
      const orbit = document.querySelector('.skill-orbit') as HTMLElement;
      if (orbit) {
        orbit.style.transform = `rotate(${Date.now() / 100 % 360}deg)`;
      }
    }, 100);
    
    return () => clearInterval(orbitInterval);
  }, []);
  
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My toolkit for building innovative software solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Skills categories navigation */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-display font-medium mb-4">Skill Areas</h3>
              <div className="space-y-3">
                {skillCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      activeCategory === category.name
                        ? 'bg-neon-purple text-white'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`mr-3 ${
                      activeCategory === category.name ? 'text-white' : 'text-neon-purple'
                    }`}>
                      {category.icon}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 3D Skill orbit */}
          <div className="lg:col-span-4 flex justify-center items-center py-12">
            <div className="relative h-[300px] w-[300px]">
              {/* Center content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                <div className="h-16 w-16 rounded-full bg-neon-purple/20 backdrop-blur-md flex items-center justify-center mb-2 mx-auto animate-pulse-neon">
                  {skillCategories.find(cat => cat.name === activeCategory)?.icon}
                </div>
                <h3 className="font-display font-bold text-neon-purple text-lg">
                  {activeCategory}
                </h3>
              </div>
              
              {/* Orbit */}
              <div className="skill-orbit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full border border-white/10">
                {/* Skills */}
                {generateSkillNodes()}
              </div>
              
              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border border-neon-purple/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-64 -right-64 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-64 -left-64 w-96 h-96 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default SkillsSection;
