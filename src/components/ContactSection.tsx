
import React from 'react';
import { ContactForm, SocialLinks, AvailabilitySection } from '@/components/contact';
import { useIsMobile } from '@/hooks/use-mobile';

const ContactSection: React.FC = () => {
  const isMobile = useIsMobile();

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
          <ContactForm />
          
          {/* Connect section */}
          <div>
            <SocialLinks />
            <AvailabilitySection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
