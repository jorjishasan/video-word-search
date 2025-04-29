'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CHROME_EXTENSION_LINK_FROM_WEBSTORE } from '@/utils/constants';
import HeaderMobileMenuClient from './HeaderMobileMenuClient';
import logoIcon from '../../assets/logo.svg';

const HeaderClient = ({ navLinks }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-background/70 backdrop-blur-md border-b border-white/5 shadow-sm shadow-black/5' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <div className="relative flex items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src={logoIcon} 
                    alt="Logo" 
                    width={36} 
                    height={36} 
                    className="w-8 h-8 mr-2"
                    priority 
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base font-bold text-gray-400 uppercase hover:text-gray-300"
                >
                  Video-word-search
                </motion.div>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </motion.div>
              ))}
            </nav>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:block"
            >
              <a
                href={CHROME_EXTENSION_LINK_FROM_WEBSTORE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <span className="mr-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Install Extension
              </a>
            </motion.div>
            
            {/* Mobile menu */}
            <HeaderMobileMenuClient navLinks={navLinks} />
          </div>
        </div>
      </header>
      
      {/* Extra space to compensate for fixed header */}
      <div className={`h-16 md:h-20 transition-all duration-300 ${isScrolled ? 'md:h-16' : 'md:h-24'}`}></div>
    </>
  );
};

export default HeaderClient;