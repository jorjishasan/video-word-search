'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
};

const FaqAccordionClient = ({ faqs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {faqs.map((faq, index) => (
        <motion.div 
          key={index}
          variants={itemVariants}
          className="mb-4"
        >
          <div 
            className={`
              backdrop-blur-md 
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/10
              hover:border-white/20
              rounded-xl 
              overflow-hidden 
              transition-all duration-300
              shadow-lg
              ${expandedIndex === index ? 'shadow-blue-500/10' : ''}
            `}
          >
            <button
              className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
              onClick={() => toggleFaq(index)}
              aria-expanded={expandedIndex === index}
            >
              <span className="text-xl font-medium text-white">{faq.question}</span>
              <span className={`transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                <svg 
                  className="w-6 h-6 text-blue-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            
            <div className="overflow-hidden transition-all duration-300 ease-in-out" 
                 style={{ maxHeight: expandedIndex === index ? '500px' : '0px' }}>
              <div className="border-t border-white/10 p-6 text-white/80">
                {faq.answer}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FaqAccordionClient;