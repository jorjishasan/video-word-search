'use client';

import React from 'react';
import TestimonialCard from './TestimonialCard';
import { ANIMATION_CONFIG } from './testimonialConfig';

const TestimonialMarqueeClient = ({ preparedColumns }) => {
  return (
    <div className="relative h-[450px] overflow-hidden max-w-6xl mx-auto">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>
      
      <div className="grid grid-cols-3 gap-4 h-full">
        {preparedColumns.map((column, columnIndex) => (
          <div 
            key={columnIndex} 
            className="relative overflow-hidden h-full"
            style={{
              // Add slight staggered delay for each column
              animationDelay: `${columnIndex * ANIMATION_CONFIG.delayBetweenColumns}s`
            }}
          >
            {/* Use CSS animation for smoother performance */}
            <div 
              className="testimonial-column"
              style={{
                animation: `scrollTestimonials ${ANIMATION_CONFIG.durationBase + (columnIndex * 3)}s infinite linear`,
                animationDelay: `${columnIndex * ANIMATION_CONFIG.delayBetweenColumns}s`
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
    </div>
  );
};

export default TestimonialMarqueeClient;