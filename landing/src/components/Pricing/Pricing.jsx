import React from 'react';
import PricingHeaderClient from './PricingHeaderClient';
import PricingPlansClient from './PricingPlansClient';

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animations - client component */}
        <PricingHeaderClient />
        
        {/* Pricing plans with interactivity - client component */}
        <PricingPlansClient />
      </div>
    </section>
  );
};

export default Pricing;