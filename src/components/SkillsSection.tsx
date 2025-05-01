
import React, { useState, useEffect } from 'react';
import { Code, Database, Globe, Monitor, Layers } from 'lucide-react';
import TechIcon from './projects/TechIcon';
import { useIsMobile } from '@/hooks/use-mobile';

interface SkillCategory {
  name: string;
  icon: JSX.Element;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: <Code className="h-6 w-6 text-neon-purple" />,
    skills: ["Python", "C++", "JavaScript", "TypeScript", "C"]
  },
  {
    name: "Web Dev",
    icon: <Globe className="h-6 w-6 text-neon-purple" />,
    skills: ["Angular", "HTML", "CSS", "Bootstrap", "Express", "Node.js"]
  },
  {
    name: "Tools",
    icon: <Monitor className="h-6 w-6 text-neon-purple" />,
    skills: ["Git", "Docker", "MongoDB", "PostgreSQL", "MySQL"]
  },
  {
    name: "ML/AI",
    icon: <Database className="h-6 w-6 text-neon-purple" />,
    skills: [
      "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "SVM", 
      "Random Forest", "KNN", "CNN", "VGG", "ResNet", 
      "EfficientNet", "LLaMA", "Gemma", "Qwen2-VL-2B", 
      "RAG", "LangChain", "FAISS", "Ollama", "Computer Vision", 
      "NLP", "OpenCV", "Document AI", "Transformers"
    ]
  },
  {
    name: "Cloud",
    icon: <Layers className="h-6 w-6 text-neon-purple" />,
    skills: ["AWS EC2", "S3", "Boto3"]
  }
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");
  const [animating, setAnimating] = useState<boolean>(false);
  const isMobile = useIsMobile();
  
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
      // Smaller radius for mobile
      const radius = isMobile ? 90 : 130;
      
      // Calculate position on the circle
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      return (
        <div 
          key={skill}
          className="absolute skill-node transition-all duration-1000 flex items-center space-x-1"
          style={{
            transform: `translate(${x}px, ${y}px)`,
            opacity: animating ? 0 : 1,
          }}
        >
          <div className="skill-tag whitespace-nowrap flex items-center text-xs sm:text-sm">
            <TechIcon tech={skill} />
            <span className="ml-1 truncate max-w-[80px] sm:max-w-full">{skill}</span>
          </div>
        </div>
      );
    });
  };
  
  // Improved orbit animation with full 360-degree rotation
  useEffect(() => {
    let animationFrame: number;
    let rotation = 0;
    
    const animate = () => {
      rotation = (rotation + 0.2) % 360; // Slower rotation (0.2 degrees per frame)
      
      const orbit = document.querySelector('.skill-orbit') as HTMLElement;
      const nodes = document.querySelectorAll('.skill-node') as NodeListOf<HTMLElement>;
      
      if (orbit) {
        orbit.style.transform = `rotate(${rotation}deg)`;
        
        // Counter-rotate the skill tags to keep them upright
        nodes.forEach((node) => {
          const skillTag = node.querySelector('.skill-tag') as HTMLElement;
          if (skillTag) {
            skillTag.style.transform = `rotate(-${rotation}deg)`;
          }
        });
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationFrame);
  }, [activeCategory]);
  
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My toolkit for building innovative software solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          {/* Skills categories navigation - horizontal scrolling on mobile */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-4 sm:p-6">
              <h3 className="text-xl font-display font-medium mb-3 sm:mb-4">Skill Areas</h3>
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-3 overflow-x-auto pb-2 lg:pb-0">
                {skillCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`flex-shrink-0 lg:w-full flex items-center p-2 sm:p-3 rounded-lg transition-all ${
                      activeCategory === category.name
                        ? 'bg-neon-purple text-white'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`mr-2 sm:mr-3 ${
                      activeCategory === category.name ? 'text-white' : 'text-neon-purple'
                    }`}>
                      {category.icon}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 3D Skill orbit - adjusted for better mobile view */}
          <div className="lg:col-span-4 flex justify-center items-center py-8 sm:py-12">
            <div className="relative h-[240px] sm:h-[300px] w-[240px] sm:w-[300px] perspective-1000">
              {/* Center content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-neon-purple/20 backdrop-blur-md flex items-center justify-center mb-2 mx-auto animate-pulse-neon">
                  {skillCategories.find(cat => cat.name === activeCategory)?.icon}
                </div>
                <h3 className="font-display font-bold text-neon-purple text-base sm:text-lg">
                  {activeCategory}
                </h3>
              </div>
              
              {/* Orbit - adjusted size for mobile */}
              <div className="skill-orbit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[180px] w-[180px] sm:h-[260px] sm:w-[260px] rounded-full border border-white/10 preserve-3d">
                {/* Skills */}
                {generateSkillNodes()}
              </div>
              
              {/* Decorative circle - adjusted size for mobile */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full border border-neon-purple/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute -bottom-64 -right-64 w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-64 -left-64 w-64 sm:w-96 h-64 sm:h-96 bg-neon-cyan/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default SkillsSection;
