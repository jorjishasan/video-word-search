import React from 'react';
import FooterLinksClient from './FooterLinksClient';
import FooterBadgesClient from './FooterBadgesClient';

const Footer = () => {
  return (
    <footer className="w-screen bg-black pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main footer content with improved spacing and layout */}
        <div className="footer-links mb-12">
          <FooterLinksClient />
        </div>

        {/* Visual separator with improved styling */}
        <hr className="border-white/10 my-10 max-w-5xl mx-auto" />
        
        {/* Achievement badges section with improved positioning */}
        <div className="footer-badges">
          <FooterBadgesClient />
        </div>
      </div>
    </footer>
  );
};

export default Footer;