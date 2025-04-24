'use client';

import React, { memo } from 'react';

// Optimize the card with memo to prevent unnecessary re-renders
const TestimonialCard = memo(({ testimonial }) => {
  return (
    <div 
      className="relative group rounded-xl backdrop-blur-sm border overflow-hidden p-4 transition-all duration-300 bg-white/5 border-white/10 h-full hover:translate-y-[-5px]"
    >
      {/* User info with image */}
      <div className="flex items-start gap-3 mb-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="object-cover w-full h-full"
            loading="lazy" // Add lazy loading for images
          />
        </div>
        
        <div>
          <h4 className="font-medium text-white text-sm">{testimonial.name}</h4>
          <p className="text-xs text-white/60">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Testimonial quote */}
      <blockquote className="text-white/80 relative">
        <span className="absolute -top-1 -left-1 text-primary text-3xl opacity-20">"</span>
        <p className="relative z-10 text-sm">{testimonial.quote}</p>
        <span className="absolute -bottom-4 -right-1 text-primary text-3xl opacity-20">"</span>
      </blockquote>
      
      {/* Star rating */}
      <div className="flex mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-600'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Subtle glow effect on hover */}
      <div 
        className="absolute -inset-px rounded-xl opacity-0 transition-opacity blur-sm -z-10 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 group-hover:opacity-50"
      ></div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;