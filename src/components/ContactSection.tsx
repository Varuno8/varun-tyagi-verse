
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, Download } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };
  
  const handleResumeClick = () => {
    window.open('https://drive.google.com/file/d/1f4QU-YjlKnyKrluhPGdv-AMZqQhQMCp2/view?usp=sharing', '_blank');
  };
  
  // Social links with animations
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <Github className="h-6 w-6" />, 
      url: 'https://github.com/',
      color: 'bg-white text-dark hover:bg-white/90'
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
      url: 'mailto:contact@example.com',
      color: 'bg-neon-purple hover:bg-neon-purple/90'
    },
  ];
  
  return (
    <section id="contact" className="section-padding relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark -z-10"></div>
      
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let's <span className="text-gradient">Build Together</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Reach out and let's create something amazing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-2xl font-display font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="bg-white/5 border-white/20"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="bg-white/5 border-white/20"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="How can I help you?"
                  className="bg-white/5 border-white/20 min-h-[150px]"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
          
          {/* Connect section */}
          <div>
            <div className="glass-card rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-display font-semibold mb-6">Connect With Me</h3>
              
              <div className="space-y-6">
                {/* Social links */}
                <div className="flex flex-col space-y-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center p-4 rounded-lg ${social.color} text-white transition-transform hover:scale-105`}
                    >
                      <div className="mr-4">
                        {social.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{social.name}</h4>
                        <p className="text-sm opacity-90">
                          {social.name === 'Email' ? 'contact@example.com' : 
                           social.name === 'LinkedIn' ? social.username : '@username'}
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
            
            {/* Location */}
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6">Availability</h3>
              <p className="text-gray-300 mb-4">
                Currently available for freelance projects, collaborations, and full-time opportunities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Remote Work</span>
                <span className="skill-tag">Contract</span>
                <span className="skill-tag">Full-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
