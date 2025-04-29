'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AuroraText from '../UI/AuroraText';
import SectionTag from '../UI/SectionTag';

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

const FeaturesHeaderClient = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionTag
        bgColor="bg-[#4D7CFF]/15"
        textColor="text-[#8E9EFF]"
      >
        Features
      </SectionTag>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mt-4 mb-3"
        variants={itemVariants}
      >
        <AuroraText
          colors={['#4D7CFF', '#6A8DFF', '#8E9EFF', '#B292FF', '#D685FF']}
          className="font-bold"
        >
          Enhanced Video Experience
        </AuroraText>
      </motion.h2>
      
      <motion.p 
        className="text-lg text-white/70"
        variants={itemVariants}
      >
        Our advanced technology helps you extract maximum value from video content with precise search capabilities.
      </motion.p>
    </motion.div>
  );
};

export default FeaturesHeaderClient;