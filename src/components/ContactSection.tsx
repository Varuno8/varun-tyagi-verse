
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, Download } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormState(prev => ({ ...prev, subject: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to email directly as fallback if EmailJS fails
      const mailToLink = `https://mail.google.com/mail/u/0/?fs=1&to=varun28082001@gmail.com&su=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
      
      // Try EmailJS first
      const serviceId = 'service_973giwu'; 
      const templateId = 'template_8isd4m9';
      const userId = 'XlZ_vL_8VkTu68fIe';
      
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
        to_email: 'varun28082001@gmail.com',
      };
      
      try {
        console.log("Attempting to send email with params:", templateParams);
        await emailjs.send(serviceId, templateId, templateParams, userId);
        toast.success("Message sent successfully! I'll get back to you within 24 hours.");
      } catch (emailjsError) {
        console.error('Email sending failed:', emailjsError);
        // If EmailJS fails, open mailto link as fallback
        window.open(mailToLink, '_blank');
        toast.success("Opening email client with your message. If it doesn't open, please email me directly.");
      }
      
      setFormState({ name: '', email: '', subject: 'Job Opportunity', message: '' });
    } catch (error) {
      console.error('Message sending failed:', error);
      toast.error("Failed to send message. Please try emailing me directly at varun28082001@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResumeClick = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1f4QU-YjlKnyKrluhPGdv-AMZqQhQMCp2/view?usp=sharing';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Social links with animations
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: <Github className="h-6 w-6" />, 
      url: 'https://github.com/Varuno8',
      color: 'bg-[#24292e] hover:bg-[#2b3137]', // Updated GitHub color to official GitHub darker color
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
  
  const subjectOptions = [
    { value: 'Job Opportunity', label: 'Job Opportunity' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Collaboration', label: 'Collaboration' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <section id="contact" className="section-padding relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-lighter to-dark -z-10"></div>
      
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let's <span className="text-gradient">Build Together</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Have a project in mind or want to collaborate? Reach out and let's create something amazing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-6 lg:px-0">
          {/* Contact form */}
          <div className="glass-card rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-display font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Select 
                  value={formState.subject} 
                  onValueChange={handleSubjectChange}
                >
                  <SelectTrigger className="bg-white/5 border-white/20">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  className="bg-white/5 border-white/20 min-h-[120px]"
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
              <p className="text-xs text-center text-gray-400 mt-2">
                Your message will be sent directly to my inbox
              </p>
            </form>
          </div>
          
          {/* Connect section */}
          <div>
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
            
            {/* Location */}
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-display font-semibold mb-5">Availability</h3>
              <p className="text-gray-300 mb-4">
                Currently available for freelance projects, collaborations, and full-time opportunities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Remote Work</span>
                <span className="skill-tag">Contract</span>
                <span className="skill-tag">Full-time</span>
              </div>
              
              <h3 className="font-display text-lg font-medium mt-6 mb-3">Get In Touch</h3>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=varun28082001@gmail.com&su=Hello"
                className="text-neon-cyan hover:underline block mb-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                varun28082001@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
