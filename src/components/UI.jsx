import React, { useState } from 'react';
import SearchTabs from './SearchTabs';
import extensionLogo from '../assets/extensionLogo.svg';
import { useSearch } from '../context/SearchContext';

const UI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { results } = useSearch();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Check if any search results were found
  const hasResults = results && results.data && results.data.length > 0;

  return (
    <div className="flex flex-col items-end font-mono">
      <button 
        className={`w-12 rounded-t-lg border-none cursor-pointer flex items-center justify-center overflow-hidden ${
          hasResults ? 'bg-brand' : 'bg-accent'
        }`}
        onClick={togglePanel}
      >
        <img 
          src={extensionLogo} 
          alt="Toggle search" 
          className="w-full h-[60%] object-contain -mt-xs"
        />
      </button>
      <div 
        className={`w-[300px] transition-all duration-normal ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 block' : 'opacity-0 -translate-y-sm hidden'
        }`}
      >
        <SearchTabs />
      </div>
    </div>
  );
};

export default UI; 