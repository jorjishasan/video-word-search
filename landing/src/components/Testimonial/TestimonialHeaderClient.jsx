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

const TestimonialHeaderClient = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center mb-14"
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
        className="text-3xl md:text-5xl font-bold mt-4 mb-3"
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
        See how Content Creators, Product Person even basic user use our product to extract value
      </motion.p>
    </motion.div>
  );
};

export default TestimonialHeaderClient;