
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
  'JavaScript': '#F7DF1E',
  'C++': '#00599C',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'LeetCode': '#FFA116',
  'CodeChef': '#5B4638',
  'GeeksforGeeks': '#2F8D46',
  'C': '#A8B9CC',
  'CNN': '#FF6F00',
  'RNN': '#EE4C2C',
  'LSTM': '#0052CC',
  'Computer Vision': '#5C3EE8',
  'NLP': '#4B8BBE',
  'Transformers': '#FFD21E',
  'AWS EC2': '#FF9900',
  'S3': '#569A31',
  'Boto3': '#232F3E',
  'MySQL': '#4479A1',
  'Bootstrap': '#7952B3',
  'XGBoost': '#0073B7',
  'SVM': '#6F42C1',
  'Random Forest': '#20C997',
  'KNN': '#E83E8C',
  'Naive Bayes': '#FD7E14',
  'Linear Regression': '#17A2B8',
  'VGG': '#007BFF',
  'ResNet': '#28A745',
  'EfficientNet': '#DC3545',
  'LLaMA': '#6F42C1',
  'Gemma': '#20C997',
  'Qwen2-VL-2B': '#0DCAF0',
  'RAG': '#6610F2',
  'Document AI': '#D63384',
};

// Technology logos mapping
const techLogos: Record<string, string> = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  'LeetCode': 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
  'CodeChef': 'https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/logo.svg',
  'GeeksforGeeks': 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  'C': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'OpenCV': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
  'AWS EC2': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'S3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'Boto3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  'Scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
  'XGBoost': 'https://raw.githubusercontent.com/dmlc/dmlc.github.io/master/img/logo-m/xgboost.png',
};

interface TechIconProps {
  tech: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech }) => {
  // Check if we have a logo for this technology
  const hasLogo = techLogos[tech] !== undefined;
  
  return (
    <>
      {hasLogo ? (
        <img 
          src={techLogos[tech]} 
          alt={tech}
          className="w-5 h-5 mr-1 rounded-sm"
          style={{ backgroundColor: tech === 'LeetCode' ? '#FFFFFF' : 'transparent' }}
        />
      ) : (
        // Fallback to colored circle if no logo is available
        <span 
          className="inline-flex items-center justify-center w-5 h-5 rounded-full mr-1"
          style={{ backgroundColor: iconColor[tech] || '#6E6E6E' }}
          title={tech}
        />
      )}
    </>
  );
};

export default TechIcon;
