import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_73rdyye';
const EMAILJS_TEMPLATE_ID = 'template_zrozi0g'; 
const EMAILJS_PUBLIC_KEY = 'aFogwa3XEk2l6FHDg';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // Prepare template parameters according to your EmailJS template variables
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
      };
      
      console.log('Sending email with params:', templateParams);
      
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', result);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormState({ name: '', email: '', subject: 'Job Opportunity', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Create mailto link as a fallback when EmailJS fails
      const mailToLink = `https://mail.google.com/mail/u/0/?fs=1&to=varun28082001@gmail.com&su=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
      
      window.open(mailToLink, '_blank');
      toast.error("Failed to send message directly. Opening email client as a fallback.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const subjectOptions = [
    { value: 'Job Opportunity', label: 'Job Opportunity' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Collaboration', label: 'Collaboration' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="glass-card rounded-xl p-6 md:p-8">
      <h3 className="text-2xl font-display font-semibold mb-6">Send a Message</h3>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
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
          Direct email sending powered by EmailJS
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
