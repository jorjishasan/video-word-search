'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PricingCard = ({ plan, isActive, onClick, variants }) => {
  return (
    <motion.div 
      className={`relative rounded-xl backdrop-blur-sm border overflow-hidden transition-all duration-300
        ${isActive 
          ? 'border-primary/30 bg-white/5 shadow-lg' 
          : 'border-white/10 bg-white/5 hover:border-white/20'}`}
      variants={variants}
      whileHover={{ y: -4 }}
    >
      {/* Popular tag */}
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-red-500 text-white text-xs font-medium px-3 py-1">
            Popular
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-lg font-medium text-center mb-1">{plan.name}</h3>
        
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-white/60 ml-1 text-sm">{plan.period}</span>
        </div>
        
        <div className="text-center text-white/60 text-sm mb-6">
          billed {plan.period.includes('month') ? 'monthly' : 'yearly'}
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={onClick}
          className={`w-full py-3 px-6 text-center rounded-lg font-medium transition-colors duration-300 ${
            plan.popular 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {plan.cta}
        </button>
      </div>
      
      {plan.popular && (
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-500"></div>
      )}

      {plan.description && (
        <div className="px-6 pb-4 text-center text-xs text-white/60">
          {plan.description}
        </div>
      )}
    </motion.div>
  );
};

export default PricingCard;