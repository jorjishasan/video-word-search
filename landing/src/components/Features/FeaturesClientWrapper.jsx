'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

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

const FeaturesClientWrapper = ({ features }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          feature={feature}
          isActive={activeFeature === index}
          onClick={() => setActiveFeature(index)}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
};

export default FeaturesClientWrapper;