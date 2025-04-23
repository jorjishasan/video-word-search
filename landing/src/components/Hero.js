'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AuroraText from './UI/AuroraText';
import videoPoster from '../assets/videoPoster.svg';

// Animation variants for staggered animations
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

const videoVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 150,
      delay: 0.2
    }
  }
};

const Hero = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);
  const iconRefs = useRef([]);
  
  // Define our use cases
  const useCases = [
    { title: 'Content Creator ?' },
    { title: 'An Entrepreneur ?' },
    { title: 'Product Person ?' }
  ];

  // Create fill animation for active icon
  useEffect(() => {
    const fillInterval = setInterval(() => {
      setFillProgress(prev => {
        if (prev >= 100) {
          clearInterval(fillInterval);
          
          // When filling completes, cycle to next use case after a delay
          setTimeout(() => {
            setActiveUseCase(prevCase => (prevCase + 1) % useCases.length);
            setFillProgress(0);
          }, 1000);
          
          return 100;
        }
        return prev + 0.8;
      });
    }, 30);
    
    return () => clearInterval(fillInterval);
  }, [activeUseCase, useCases.length]);

  return (
    <section className="w-full pt-16 pb-20">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center w-full">
          {/* Main heading with Aurora effect using subheading content but with heading styling */}
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-5"
            variants={itemVariants}
          >
            <AuroraText speed={1.5}>
              Find words in Videos Instantly,
            </AuroraText>
          </motion.h1>
          
          {/* Descriptive paragraph (former subheading content) */}
          <motion.p 
            className="text-gray-400 text-center text-base md:text-lg/6 mb-14 w-3/4"
            variants={itemVariants}
          >
            Extract words & phrases at exact timeframes, get real-time notifications on mentions ⎯ video word search that saves you time.
          </motion.p>
          
          {/* Main Video Container */}
          <motion.div 
            className="w-full aspect-video bg-gray-900 rounded-lg border border-gray-700 relative mb-14 shadow-lg overflow-hidden group cursor-pointer hover:border-gray-600 transition-all duration-300"
            variants={videoVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Video Poster Image */}
            <div className="absolute inset-0">
              <Image 
                src={videoPoster} 
                alt="Video Word Search Demo" 
                layout="fill" 
                objectFit="cover"
                priority
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
          
          {/* Use Case Tabs */}
          <motion.div 
            className="w-full flex justify-center items-center mb-12"
            variants={itemVariants}
          >
            {useCases.map((useCase, index) => (
              <React.Fragment key={useCase.title}>
                <div className="flex flex-col items-center relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === activeUseCase ? 'bg-green-500/10' : ''}`}>
                    {/* Default filled icon (non-active state) */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      height="24px" 
                      viewBox="0 -960 960 960" 
                      width="24px" 
                      fill={index === activeUseCase ? "transparent" : "#777777"}
                      className={`absolute ${index === activeUseCase ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/>
                    </svg>
                    
                    {/* Active icon with fill animation */}
                    {index === activeUseCase && (
                      <svg 
                        ref={el => iconRefs.current[index] = el}
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        className="absolute"
                      >
                        <defs>
                          <linearGradient id={`fillGradient-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset={`${fillProgress}%`} stopColor="#22c55e" />
                            <stop offset={`${fillProgress}%`} stopColor="transparent" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z" 
                          fill={`url(#fillGradient-${index})`}
                        />
                      </svg>
                    )}
                  </div>
                  
                  <p className={`mt-2 text-sm  font-medium ${index === activeUseCase ? 'text-green-500' : 'text-gray-400'}`}>
                    {useCase.title}
                  </p>
                </div>
                {/* Add separator bar between tabs */}
                {index < useCases.length - 1 && (
                  <div className="mx-8 mt-5 flex self-start items-center">
                    <div className="w-3 h-px bg-gray-700"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
  
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;