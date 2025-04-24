'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTestimonial } from './useTestimonial';
import TestimonialCard from './TestimonialCard';
import AuroraText from '../UI/AuroraText';
import SectionTag from '../UI/SectionTag';

// Animation variants for section header
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
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

const Testimonial = () => {
  const { prepareColumns, animationConfig } = useTestimonial();
  
  return (
    <section id="testimonials" className="relative py-20 bg-black overflow-hidden w-full">
      {/* Full-width background elements */}
      <div className="absolute inset-0 w-screen bg-gradient-to-b from-background to-card/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionTag
            bgColor="bg-[#3B82F6]/15"
            textColor="text-[#62A6FE]"
          >
            User Stories
          </SectionTag>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            <AuroraText
              colors={['#3B82F6', '#4E94FA', '#62A6FE', '#76B8FF', '#8AC7FF']}
              className="font-bold"
            >
              Wall of Love
            </AuroraText>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/70"
            variants={itemVariants}
          >
          See how Content Creators, Product Person even basic user use our product to extract value          </motion.p>
        </motion.div>
        
        {/* Testimonial Marquee with CSS animations */}
        <div className="relative h-[450px] overflow-hidden max-w-6xl mx-auto">
          {/* Top gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
          
          <div className="grid grid-cols-3 gap-4 h-full">
            {prepareColumns.map((column, columnIndex) => (
              <div 
                key={columnIndex} 
                className="relative overflow-hidden h-full"
                style={{
                  // Add slight staggered delay for each column
                  animationDelay: `${columnIndex * animationConfig.delayBetweenColumns}s`
                }}
              >
                {/* Use CSS animation for smoother performance */}
                <div 
                  className="testimonial-column"
                  style={{
                    animation: `scrollTestimonials ${animationConfig.durationBase + (columnIndex * 3)}s infinite linear`,
                    animationDelay: `${columnIndex * animationConfig.delayBetweenColumns}s`
                  }}
                >
                  {/* First set of items */}
                  {column.map((testimonial, index) => (
                    <div 
                      key={`${columnIndex}-${index}`} 
                      className="mb-4 h-auto"
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                  
                  {/* Duplicate set for seamless scrolling */}
                  {column.map((testimonial, index) => (
                    <div 
                      key={`${columnIndex}-duplicate-${index}`} 
                      className="mb-4 h-auto"
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS for the scrolling animation - adding it directly to improve performance */}
      <style jsx global>{`
        .testimonial-column {
          display: flex;
          flex-direction: column;
          transform: translateY(0);
          will-change: transform;
        }
        
        @keyframes scrollTestimonials {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;