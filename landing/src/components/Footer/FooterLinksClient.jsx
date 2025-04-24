'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { footerConfig } from './footerConfig';
import logoIcon from "../../assets/logo.svg";

const FooterLinksClient = () => {
  const { footerLinks, socialLinks, companyInfo } = footerConfig;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Company info and logo column - takes more space */}
      <div className="md:col-span-4 space-y-5">
        <Link href="/" className="inline-block">
          <div className="flex items-center">
            <Image 
              src={logoIcon}
              alt={`${companyInfo.name} Logo`} 
              width={42} 
              height={42} 
              className="mr-2"
            />
          </div>
        </Link>
        <p className="text-sm text-white/60 max-w-xs leading-relaxed">
          {companyInfo.slogan}
        </p>
        
        {/* Social media links with improved spacing */}
        <div className="flex items-center space-x-4 pt-4">
          {socialLinks.map((platform) => (
            <a 
              key={platform.name}
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
              aria-label={`Follow us on ${platform.name}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-white/5 transition-all duration-300 group-hover:border-primary/30 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                  {platform.icon}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Navigation links in columns with balanced spacing */}
      <div className="md:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-base font-medium text-white capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterLinksClient;