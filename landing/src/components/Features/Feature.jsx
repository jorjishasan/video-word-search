import React from 'react';
import { motion } from 'framer-motion';
import { useFeature } from './useFeature';
import FeatureCard from './FeatureCard';
import AuroraText from '../UI/AuroraText';
import SectionTag from '../UI/SectionTag';

// Animation variants
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

export function Feature() {
  const { features, activeFeature, setActiveFeature } = useFeature();
  
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Powerful Features
          </SectionTag>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
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
        
        {/* Feature cards grid */}
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
      </div>
    </section>
  );
}

export default Feature;