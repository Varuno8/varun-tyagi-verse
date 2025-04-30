
import React from 'react';

// Technology colors mapping
const iconColor: Record<string, string> = {
  'React': '#61DAFB',
  'TypeScript': '#007ACC',
  'Next.js': '#000000',
  'Clerk': '#6E56CF',
  'MongoDB': '#4DB33D',
  'Inngest': '#FF4B45',
  'Tailwind CSS': '#38B2AC',
  'LangChain': '#EBE8E8',
  'Streamlit': '#FF4B4B',
  'FAISS': '#6F86D6',
  'Ollama': '#34D399',
  'Python': '#3776AB',
  'Google Vision API': '#EA4335',
  'OpenCV': '#5C3EE8',
  'HuggingFace': '#FFD21E',
  'Flask': '#000000',
  'Django': '#092E20',
  'PostgreSQL': '#336791',
  'JWT': '#000000',
  'Recharts': '#22C55E',
  'Angular': '#DD0031',
  'DRF': '#A30000',
  'Express': '#000000',
  'Node.js': '#339933',
  'Redux': '#764ABC',
  'GraphQL': '#E10098',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'PyTorch': '#EE4C2C',
  'TensorFlow': '#FF6F00',
  'Scikit-learn': '#F7931E',
  'NLTK': '#4B8BBE',
  'Pandas': '#150458',
  'NumPy': '#013243',
  'Data Visualization': '#FF7C00',
  'REST API': '#009688',
  'CI/CD': '#4285F4',
  'Git': '#F05032',
  'Agile': '#0052CC',
  'Microservices': '#1A73E8',
  'SQL': '#4479A1',
  'NoSQL': '#13AA52',
  'UI/UX': '#FF4088',
  'Testing': '#F43F5E',
};

interface TechIconProps {
  tech: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech }) => {
  return (
    <span 
      className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-1"
      style={{ backgroundColor: iconColor[tech] || '#6E6E6E' }}
      title={tech}
    />
  );
};

export default TechIcon;
