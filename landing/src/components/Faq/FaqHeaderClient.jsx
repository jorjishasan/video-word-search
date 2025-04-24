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

const FaqHeaderClient = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionTag
        bgColor="bg-[#3B82F6]/15"
        textColor="text-[#60A5FA]"
      >
        Questions & Answers
      </SectionTag>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-6"
        variants={itemVariants}
      >
        <AuroraText
          colors={['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE']}
          className="font-bold"
          speed={0.9}
        >
          FaQ
        </AuroraText>
      </motion.h2>
      
      <motion.p 
        className="text-lg text-white/70"
        variants={itemVariants}
      >
        Find answers to common questions about our video word search technology
      </motion.p>
    </motion.div>
  );
};

export default FaqHeaderClient;