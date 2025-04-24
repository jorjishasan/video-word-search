import React from 'react';
import { FAQ_CONFIG } from './faqConfig';
import FaqHeaderClient from './FaqHeaderClient';
import FaqAccordionClient from './FaqAccordionClient';

const Faq = () => {
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animations - client component */}
        <FaqHeaderClient />
        
        {/* FAQ accordion with interactivity - client component */}
        <FaqAccordionClient faqs={FAQ_CONFIG.faqs} />
      </div>
      
      {/* Background gradient elements */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
    </section>
  );
};

export default Faq;