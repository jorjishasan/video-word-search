import React from 'react';
import { LANGUAGES } from './languageConfig';
import LanguageHeaderClient from './LanguageHeaderClient';
import LanguageClientWrapper from './LanguageClientWrapper';

const Language = () => {
  return (
    <section id="languages" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animations */}
        <LanguageHeaderClient />
        
        {/* Language tags with animations */}
        <LanguageClientWrapper languages={LANGUAGES} />
        
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Our advanced algorithms are optimized to ensure accurate transcription and search across all supported languages.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Language;