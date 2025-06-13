
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import TechIcon from './projects/TechIcon';

const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: 'https://github.com/Varuno8', label: 'GitHub' },
    { icon: <Linkedin className="h-4 w-4" />, href: 'https://www.linkedin.com/in/varun-tyagi-32bb281b9/', label: 'LinkedIn' },
    { icon: <Mail className="h-4 w-4" />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=varun28082001@gmail.com&su=Hello', label: 'Email' },
  ];
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];
  
  return (
    <footer className="pt-16 pb-8 bg-dark relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Back to top button */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <button 
            onClick={handleScrollToTop} 
            className="p-3 rounded-full bg-neon-purple text-white hover:bg-neon-purple/90 transition-all hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Logo/Brand */}
          <div>
            <h2 className="font-display text-2xl font-bold text-gradient mb-4">Varun Tyagi</h2>
            <p className="text-gray-300 mb-6">
              Full-stack engineer focused on building scalable software, intelligent systems, 
              and delightful user experiences.
            </p>
            
            {/* Social links - Updated with better visibility */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-full bg-dark-lighter text-neon-cyan hover:bg-neon-purple/20 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links - Display in 2 columns on mobile */}
          <div className="md:col-span-1">
            <h3 className="font-display text-lg font-medium mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-neon-purple transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Varun Tyagi. All rights reserved.</p>
          <p className="mt-1">
            Designed & Developed with 
            <span className="text-red-500 mx-1">❤</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
