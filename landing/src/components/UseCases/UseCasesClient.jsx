'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuroraText from '../UI/AuroraText';
import SectionTag from '../UI/SectionTag';
import { useCasesData } from './useCasesConfig';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, scale: 0.98, transition: { duration: 0.3, ease: 'easeIn' } },
};

const AUTO_ROTATE_INTERVAL = 5000;

const UseCasesClient = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const userInteracted = useRef(false);

  const activeUseCase = useCasesData[activeIndex];
  const IconComponent = activeUseCase.icon;

  const goToNextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % useCasesData.length);
  };

  const startAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(goToNextTab, AUTO_ROTATE_INTERVAL);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleTabClick = (index) => {
    userInteracted.current = true;
    stopAutoRotate();
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!userInteracted.current) {
      startAutoRotate();
    }

    return () => {
      stopAutoRotate();
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
        <SectionTag bgColor="bg-violet-500/15" textColor="text-violet-400">
          use cases
        </SectionTag>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-3">
          <AuroraText colors={['#a855f7', '#c084fc', '#d8b4fe']} speed={1.2}>
            Get most out of it,
          </AuroraText>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Discover how you can automate & save time usingthis tool.
        </p>
      </motion.div>

      {/* Use Cases Layout */}
      <motion.div
        className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-12"
        variants={itemVariants}
      >
        {/* Tabs/Buttons */}
        <div className="flex flex-row md:flex-col md:w-1/3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-hide">
          {useCasesData.map((useCase, index) => (
            <button
              key={useCase.id}
              onClick={() => handleTabClick(index)}
              className={`relative text-left w-full min-w-[180px] md:min-w-0 p-4 rounded-lg transition-all duration-300 group ${activeIndex === index ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              style={{ marginBottom: '0.75rem' }}
            >
              <span
                className={`font-medium transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}
              >
                {useCase.title}
              </span>
              {/* Active Indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeUseCaseIndicatorVertical"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b rounded-l-lg"
                  style={{ background: useCase.color }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="md:w-2/3 bg-white/5 rounded-lg p-8 md:px-16 min-h-[200px] md:min-h-[250px] flex items-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeUseCase.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {/* Icon Container */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 flex items-center justify-center shadow-md mb-4"
                style={{ backgroundColor: activeUseCase.color }}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              
              {/* Text Content Container */}
              <div>
                <h3 className="text-xl font-semibold mb-2 sm:mb-3" style={{ color: activeUseCase.color }}>
                  {activeUseCase.title}
                </h3>
                <p className="text-base text-white/80 leading-relaxed">
                  {activeUseCase.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UseCasesClient;
