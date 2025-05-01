import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  // Social links with icons
  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: 'https://github.com/Varuno8', label: 'GitHub' },
    { icon: <Linkedin className="h-4 w-4" />, href: 'https://www.linkedin.com/in/varun-tyagi-32bb281b9/', label: 'LinkedIn' },
    { icon: <Mail className="h-4 w-4" />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=varun28082001@gmail.com&su=Hello', label: 'Email' },
  ];
  
  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1f4QU-YjlKnyKrluhPGdv-AMZqQhQMCp2/view?usp=sharing', '_blank');
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-lg py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo/Name */}
        <a href="#home" className="font-display text-xl font-bold text-gradient">
          VT
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-sm hover:text-neon-purple transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neon-purple hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                {link.icon}
              </a>
            ))}
            
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
              onClick={handleResumeClick}
            >
              <Download className="h-4 w-4 mr-1" />
              Resume
            </Button>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl w-full absolute top-full left-0 shadow-lg animate-fade-in z-50">
          <div className="container mx-auto px-6 py-6 flex flex-col">
            <ul className="flex flex-col space-y-4 mb-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-base hover:text-neon-purple transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
              
              <Button 
                variant="default" 
                size="sm"
                className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white ml-auto"
                onClick={handleResumeClick}
              >
                <Download className="h-4 w-4 mr-1" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
