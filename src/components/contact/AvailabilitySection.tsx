
import React from 'react';

const AvailabilitySection: React.FC = () => {
  return (
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
  );
};

export default AvailabilitySection;
