
import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SocialLinkType = {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  username: string;
};

const SocialLinks: React.FC = () => {
  const socialLinks: SocialLinkType[] = [
    { 
      name: 'GitHub', 
      icon: <Github className="h-6 w-6" />, 
      url: 'https://github.com/Varuno8',
      color: 'bg-[#24292e] hover:bg-[#2b3137]',
      username: 'Varuno8'
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="h-6 w-6" />, 
      url: 'https://www.linkedin.com/in/varun-tyagi-32bb281b9/',
      color: 'bg-[#0077B5] hover:bg-[#0077B5]/90',
      username: 'varun-tyagi-32bb281b9'
    },
    { 
      name: 'Email', 
      icon: <Mail className="h-6 w-6" />, 
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=varun28082001@gmail.com&su=Hello',
      color: 'bg-neon-purple hover:bg-neon-purple/90',
      username: 'varun28082001@gmail.com'
    },
  ];

  const handleResumeClick = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1f4QU-YjlKnyKrluhPGdv-AMZqQhQMCp2/view?usp=sharing';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card rounded-xl p-6 md:p-8 mb-6 md:mb-8">
      <h3 className="text-2xl font-display font-semibold mb-6">Connect With Me</h3>
      
      <div className="space-y-4">
        {/* Social links */}
        <div className="flex flex-col space-y-3">
          {socialLinks.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center p-3 rounded-lg ${social.color} text-white transition-transform hover:scale-102`}
            >
              <div className="mr-3">
                {social.icon}
              </div>
              <div>
                <h4 className="font-medium">{social.name}</h4>
                <p className="text-sm opacity-90">
                  {social.username}
                </p>
              </div>
            </a>
          ))}
        </div>
        
        {/* Resume Download Button */}
        <Button 
          onClick={handleResumeClick}
          className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
