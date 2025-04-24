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

const PricingHeaderClient = () => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionTag
        bgColor="bg-[#EC4899]/15"
        textColor="text-[#F9A8D4]"
      >
        Subscription Plans
      </SectionTag>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-6"
        variants={itemVariants}
      >
        <AuroraText
          colors={['#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8', '#FCE7F3']}
          className="font-bold"
          speed={0.9}
        >
          Choose Your Plan
        </AuroraText>
      </motion.h2>
      
      <motion.p 
        className="text-lg text-white/70"
        variants={itemVariants}
      >
        Select the plan that best fits your needs. Upgrade or downgrade anytime.
      </motion.p>
    </motion.div>
  );
};

export default PricingHeaderClient;