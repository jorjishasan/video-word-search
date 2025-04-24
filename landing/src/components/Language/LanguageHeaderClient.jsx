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
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
};

const LanguageHeaderClient = () => {
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
        Global Support
      </SectionTag>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-6"
        variants={itemVariants}
      >
        <AuroraText
          colors={['#BE185D', '#DB2777', '#EC4899', '#F472B6', '#F9A8D4']}
          className="font-bold"
          speed={0.9}
        >
          Search In 20+ Languages
        </AuroraText>
      </motion.h2>
      
      <motion.p 
        className="text-lg text-white/70"
        variants={itemVariants}
      >
        Our advanced transcription technology works across multiple languages, making your video search truly global.
      </motion.p>
    </motion.div>
  );
};

export default LanguageHeaderClient;