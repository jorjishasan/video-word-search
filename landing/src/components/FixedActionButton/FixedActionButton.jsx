'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Counter from './Counter';
import giftFilledIcon from "@/assets/gift-filled.svg";
import Link from 'next/link';
import { CHROME_EXTENSION_LINK_FROM_WEBSTORE } from '@/utils/constants';


// Animation variants defined outside component to prevent recreating on each render
const buttonVariants = {
  idle: { scale: 1, x: 0 },
  urgent: {
    scale: [1, 1.1, 1], // Increased from 1.05 to 1.1
    transition: { scale: { repeat: 2, duration: 0.3 } }
  },
  shake: {
    x: [0, -7, 7, -7, 7, -4, 4, -2, 2, 0], // Increased x movement from [-5,5] to [-7,7]
    scale: [1, 1.12, 1.08, 1.12, 1], // Increased from [1, 1.05, 1.03, 1.05, 1]
    transition: { duration: 1, ease: "easeInOut" }
  }
};

const iconVariants = {
  idle: { rotate: 0, scale: 1, opacity: 1 },
  urgent: {
    opacity: [1, 0.6, 1, 0.6, 1], // More contrast in opacity (0.7 to 0.6)
    scale: [1, 1.25, 1], // Increased from 1.1 to 1.25
    transition: {
      opacity: { repeat: 2, duration: 0.3 },
      scale: { repeat: 2, duration: 0.3 }
    }
  },
  shake: {
    rotate: [0, -15, 15, -15, 15, -8, 8, 0], // Increased rotation from [-12,12] to [-15,15]
    scale: [1, 1.35, 1.2, 1.35, 1], // Significantly increased from [1, 1.2, 1.1, 1.2, 1]
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" }
  }
};

const countdownVariants = {
  idle: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  urgent: {
    backgroundColor: ['rgba(0, 0, 0, 0.3)', 'rgba(255, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)'], // Increased opacity from 0.2 to 0.3
    transition: { repeat: 2, duration: 0.3 }
  },
  shake: { backgroundColor: 'rgba(255, 0, 0, 0.3)' } // Increased opacity from 0.2 to 0.3
};

// Gradient style defined outside component
const auroraColors = ['#7FE786', '#6BD9A2', '#56CBB9', '#41BDD0', '#58A7FE'];
const gradientStyle = {
  backgroundImage: `linear-gradient(90deg, ${auroraColors.join(', ')})`,
  backgroundSize: '200% auto',
};

// Animation timing constants
const ANIMATION_TIMING = {
  INITIAL_BUTTON_DELAY: 1500,
  ATTENTION_INITIAL_DELAY: 3000,
  ATTENTION_INTERVAL: 4000,
  SHAKE_DELAY: 600,
  ANIMATION_RESET: 1200
};

// Memoized GiftIcon component
const GiftIcon = memo(({ animate }) => (
  <motion.div variants={iconVariants} animate={animate}>
    <Image src={giftFilledIcon} alt="Gift" width={24} height={24} priority />
  </motion.div>
));

GiftIcon.displayName = 'GiftIcon';

// Memoized CountdownDisplay component
const CountdownDisplay = memo(({ hours, minutes, seconds, animate }) => (
  <motion.div
    className="flex items-center gap-1 px-2 py-0.5 rounded"
    variants={countdownVariants}
    animate={animate}
  >
    <Counter value={hours} fontSize={14} textColor="white" />
    <span className="font-bold">:</span>
    <Counter value={minutes} fontSize={14} textColor="white" />
    <span className="font-bold">:</span>
    <Counter value={seconds} fontSize={14} textColor="white" />
  </motion.div>
));

CountdownDisplay.displayName = 'CountdownDisplay';

const FixedActionButton = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [attentionPhase, setAttentionPhase] = useState('idle');

  // Memoized calculation function
  const calculateTimeLeft = useCallback(() => {
    const cycleDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
    const now = Date.now();
    const cycleStart = Math.floor(now / cycleDuration) * cycleDuration;
    const nextCycleEnd = cycleStart + cycleDuration;
    const difference = nextCycleEnd - now;

    if (difference <= 0) {
      return { hours: 47, minutes: 59, seconds: 59 };
    }

    let hours = Math.floor((difference / (1000 * 60 * 60)) % 48);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Ensure hours don't exceed 47
    if (hours >= 48) hours = 47;

    return { hours, minutes, seconds };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    // Set initial time
    setTimeLeft(calculateTimeLeft());
    
    // Update time every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Button entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, ANIMATION_TIMING.INITIAL_BUTTON_DELAY);
    
    return () => clearTimeout(timer);
  }, []);

  // Attention animation sequence effect
  useEffect(() => {
    if (!isVisible) return; // Only start attention animations after button is visible
    
    // Initial delay before starting attention animations
    const initialDelay = setTimeout(() => {
      // Create attention animation sequence function
      const runAttentionSequence = () => {
        // Phase 1: Urgency
        setAttentionPhase('urgent');
        
        // Phase 2: Add shaking after delay
        const shakeTimer = setTimeout(() => {
          setAttentionPhase('shake');
          
          // Reset to idle state after animation completes
          const resetTimer = setTimeout(() => {
            setAttentionPhase('idle');
          }, ANIMATION_TIMING.ANIMATION_RESET);
          
          return resetTimer;
        }, ANIMATION_TIMING.SHAKE_DELAY);
        
        return shakeTimer;
      };
      
      // Run once immediately
      let currentTimer = runAttentionSequence();
      
      // Set up interval for repeated animations
      const interval = setInterval(() => {
        clearTimeout(currentTimer);
        currentTimer = runAttentionSequence();
      }, ANIMATION_TIMING.ATTENTION_INTERVAL);
      
      return () => {
        clearInterval(interval);
        clearTimeout(currentTimer);
      };
    }, ANIMATION_TIMING.ATTENTION_INITIAL_DELAY);
    
    return () => clearTimeout(initialDelay);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 25,
            },
          }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Link href={CHROME_EXTENSION_LINK_FROM_WEBSTORE} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="flex items-center gap-3 px-5 py-2.5 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
              style={gradientStyle}
              whileHover={{ scale: 1.05 }}
              variants={buttonVariants}
              animate={attentionPhase}
            >
              <GiftIcon animate={attentionPhase} />
              <span className="text-sm uppercase font-bold text-gray-950">Grab it free</span>
              <CountdownDisplay 
                hours={timeLeft.hours} 
                minutes={timeLeft.minutes} 
                seconds={timeLeft.seconds} 
                animate={attentionPhase} 
              />
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixedActionButton;