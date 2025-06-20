"use client";

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import BenefitsSection from '../components/BenefitsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CoverageSection from '../components/CoverageSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function AgroShieldLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Header />
      <Hero />
      <ProblemSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CoverageSection />
           <CTASection />
      <Footer />
    </div>
  );
}
