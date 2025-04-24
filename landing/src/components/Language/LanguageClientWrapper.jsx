'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

const LanguageClientWrapper = ({ languages }) => {
  // Set first language (index 0) as selected by default
  const [activeLanguage, setActiveLanguage] = useState(0);
  
  return (
    <div className="relative max-w-4xl mx-auto mb-12 overflow-hidden">
      <motion.div 
        className="flex flex-wrap justify-center gap-4 py-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {languages.map((lang, index) => (
          <motion.div 
            key={lang.code}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={`py-3 px-5 rounded-full cursor-pointer transition-all duration-300 
              ${activeLanguage === index 
                ? 'bg-gradient-to-r from-primary/30 to-accent/30 border border-primary/20' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
            onClick={() => setActiveLanguage(index)}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{lang.flag}</span>
              <span className={activeLanguage === index ? 'text-white' : 'text-white/80'}>
                {lang.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LanguageClientWrapper;