import React from 'react';
import { FEATURES } from './featuresConfig';
import FeaturesHeaderClient from './FeaturesHeaderClient';
import FeaturesClientWrapper from './FeaturesClientWrapper';

export function Feature() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animations - client component */}
        <FeaturesHeaderClient />
        
        {/* Feature cards grid - client component */}
        <FeaturesClientWrapper features={FEATURES} />
      </div>
    </section>
  );
}

export default Feature;