import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LivingResumeChat from '@/components/ai/LivingResumeChat';

const LivingResume: React.FC = () => (
  <div className="min-h-screen bg-dark text-white overflow-x-hidden">
    <Navbar />
    <LivingResumeChat />
    <Footer />
  </div>
);

export default LivingResume;
