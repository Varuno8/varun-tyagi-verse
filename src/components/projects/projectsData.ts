
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "VitalCarePlatform",
    description: "A healthcare SaaS platform connecting users to AI-powered medical services through subscriptions.",
    technologies: ["React", "Next.js", "PostgreSQL", "JWT", "REST API", "Tailwind CSS"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=VitalCarePlatform",
    githubUrl: "https://github.com/",
    demoUrl: "https://nextjs-login-sooty.vercel.app/",
  },
  {
    id: 2,
    title: "QuickCart E-commerce App",
    description: "A modern e-commerce platform with authentication, payment processing, and order management.",
    technologies: ["Next.js", "Clerk", "MongoDB", "Inngest", "Tailwind CSS"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=QuickCart+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://littlewisewesbite-ten.vercel.app/",
  },
  {
    id: 3,
    title: "PDF-based RAG Application",
    description: "An intelligent document Q&A system using retrieval augmented generation techniques.",
    technologies: ["LangChain", "Streamlit", "FAISS", "Ollama", "Python"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=PDF+RAG+App",
    githubUrl: "https://github.com/",
    demoUrl: "https://drive.google.com/drive/folders/1rW2ufZNwpmeH1E4dX-JW1qkERoM-fH3P?usp=sharing",
  },
  {
    id: 4,
    title: "OCR & Text Analysis Tool",
    description: "Computer vision application that extracts and analyzes text from images and documents.",
    technologies: ["Google Vision API", "OpenCV", "HuggingFace", "Flask", "React"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=OCR+Analysis+Tool",
    githubUrl: "https://github.com/",
    demoUrl: "https://drive.google.com/file/d/1Qw308EiVN0OMuQ0q1vvTgAgCuIXhLctP/view?usp=sharing",
  },
  {
    id: 5,
    title: "Jobify - Job Seeking App",
    description: "A comprehensive platform for job seekers to find and apply for opportunities.",
    technologies: ["React", "MongoDB", "Express", "Node.js", "Tailwind CSS"],
    image: "https://placehold.co/600x400/1A1F2C/FFFFFF?text=Jobify",
    githubUrl: "https://github.com/",
    demoUrl: "https://jobify-j55w.onrender.com/dashboard/profile",
  }
];
