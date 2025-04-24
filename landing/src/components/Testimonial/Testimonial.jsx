import React from 'react';
import { prepareColumns } from './testimonialConfig';
import TestimonialHeaderClient from './TestimonialHeaderClient';
import TestimonialMarqueeClient from './TestimonialMarqueeClient';

const Testimonial = () => {
  // Prepare the columns on the server
  const preparedColumns = prepareColumns();
  
  return (
    <section id="testimonials" className="relative py-20 bg-black overflow-hidden w-full">
      {/* Full-width background elements */}
      <div className="absolute inset-0 w-screen bg-gradient-to-b from-background to-card/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animations - client component */}
        <TestimonialHeaderClient />
        
        {/* Testimonial Marquee with CSS animations - client component */}
        <TestimonialMarqueeClient preparedColumns={preparedColumns} />
      </div>
    </section>
  );
};

export default Testimonial;