'use client';

import { useState, useEffect, useRef } from 'react';

export function useHero() {
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

  return {
    activeUseCase,
    fillProgress,
    iconRefs,
    useCases
  };
}