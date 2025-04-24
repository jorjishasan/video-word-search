'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHROME_EXTENSION_LINK_FROM_WEBSTORE } from '@/utils/constants';

const HeaderMobileMenuClient = ({ navLinks }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center relative">
          <span 
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'absolute rotate-45' : 'mb-1.5'
            }`}
          ></span>
          <span 
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'mb-1.5'
            }`}
          ></span>
          <span 
            className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'absolute -rotate-45' : ''
            }`}
          ></span>
        </div>
      </button>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden"
          >
            <div className="bg-card/95 backdrop-blur-lg border-b border-white/10 shadow-xl shadow-black/20">
              <nav className="container mx-auto px-4 py-4 flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a
                    href={CHROME_EXTENSION_LINK_FROM_WEBSTORE}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-primary to-accent"
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
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderMobileMenuClient;