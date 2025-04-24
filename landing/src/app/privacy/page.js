'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { footerConfig } from '@/components/Footer/footerConfig';

// Animation variants
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

const PrivacyPolicy = () => {
  const { companyInfo } = footerConfig;
  const lastUpdated = "April 24, 2025";
  
  return (
    <div className="bg-background min-h-screen text-white">
      {/* Header with back button */}
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-white/80 transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-white/60">Last updated: {lastUpdated}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
            <p>
              This Privacy Policy describes how {companyInfo.name} ("we", "us", or "our") respects your privacy when you use our Chrome extension for video word search.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Zero Data Collection</h2>
            <p>
              Our extension is designed with complete privacy in mind. We do not collect any personal data or usage information from our users. 
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>We do not collect or store your search queries</li>
              <li>We do not track which videos you watch</li>
              <li>We do not monitor your browsing behavior</li>
              <li>We do not use cookies or similar tracking technologies</li>
              <li>We do not collect any personally identifiable information</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">How Our Extension Works</h2>
            <p>
              The {companyInfo.name} extension operates entirely within your browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Video transcripts are temporarily processed locally in your browser only</li>
              <li>Search functionality works without sending your queries to any server</li>
              <li>All extension features operate offline once a transcript is loaded</li>
              <li>No user data is transmitted to our servers or any third parties</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Local Storage</h2>
            <p>
              Any data that the extension needs to function is stored exclusively on your device:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Temporary cache of video transcripts (cleared when you close the tab)</li>
              <li>User preferences (such as UI settings)</li>
            </ul>
            <p>
              This local data never leaves your device and is automatically cleared when you uninstall the extension.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
            <p>
              Our extension interacts with YouTube only to fetch publicly available video transcripts. When using our extension:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>YouTube's own data collection policies apply when you visit their website</li>
              <li>We don't add any additional tracking beyond what YouTube already implements</li>
              <li>Our extension doesn't connect to any other third-party services</li>
            </ul>
            <p>
              We recommend reviewing <a href="https://www.youtube.com/t/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</a> to understand how they handle your data.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our extension does not collect information from anyone, including children under 13 years of age.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              We recommend that you review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none space-y-1 mb-4">
              <li>Email: privacy@videowordsearch.com</li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;