'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import AuroraText from './UI/AuroraText';
import videoPoster from '../assets/videoPoster.svg';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex flex-col items-center w-full">
          {/* Main heading with Aurora effect using subheading content but with heading styling */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <AuroraText speed={1.2}>
              Find words in Videos Instantly,
            </AuroraText>
          </h1>
          
          {/* Descriptive paragraph (former subheading content) */}
          <p className="text-gray-400 text-left text-base md:text-lg mb-14 w-[70%]">
            Extract words & phrases at exact timeframes, get real-time notifications on mentions ⎯ video word search that saves you time.
          </p>
          
          {/* Main Video Container */}
          <div className="w-full aspect-video bg-gray-900 rounded-lg border border-gray-700 relative mb-14 shadow-lg overflow-hidden group cursor-pointer hover:border-gray-600 transition-all duration-300">
            {/* Video Poster Image */}
            <div className="absolute inset-0">
              <Image 
                src={videoPoster} 
                alt="Video Word Search Demo" 
                layout="fill" 
                objectFit="cover"
                priority
                className="transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
          
          {/* Use Case Tabs */}
          <div className="w-full flex justify-center items-center mb-12">
            {useCases.map((useCase, index) => (
              <React.Fragment key={useCase.title}>
                <div className="flex flex-col items-center relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === activeUseCase ? 'bg-green-500/10' : ''}`}>
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
                  
                  <p className={`mt-2 text-sm md:text-base font-medium ${index === activeUseCase ? 'text-green-500' : 'text-gray-400'}`}>
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
          </div>
  
        </div>
      </div>
    </section>
  );
};

export default Hero;