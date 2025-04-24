'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ feature, isActive, onClick, variants }) => {
  return (
    <motion.div 
      className={`relative group rounded-xl backdrop-blur-sm border overflow-hidden p-6 transition-all duration-300 cursor-pointer
        ${isActive 
          ? 'border-primary/30 bg-white/10' 
          : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10'}`}
      onClick={onClick}
      variants={variants}
    >
      {/* Icon with gradient background */}
      <div className={`mb-5 relative w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.gradient} p-3 transition-all duration-500 ${feature.hoverEffect}`}>
        {feature.icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-white/70">{feature.description}</p>
      
      {/* Subtle gradient effect on hover and active state */}
      <div 
        className={`absolute -inset-px rounded-xl opacity-0 transition-opacity blur-sm -z-10 bg-gradient-to-r ${feature.gradient}
          ${isActive ? 'opacity-20' : 'group-hover:opacity-10'}`}
      ></div>
    </motion.div>
  );
};

export default FeatureCard;