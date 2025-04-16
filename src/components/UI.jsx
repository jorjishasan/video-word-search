import React, { useState, useEffect } from 'react';
import SearchTabs from './SearchTabs';
import extensionLogo from '../assets/extensionLogo.svg';
import { useSearch } from '../context/SearchContext';

// Import the same event name as used in AutoSearchTab
const TAGS_COUNT_EVENT = 'foundTagsCountChanged';

const UI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { results } = useSearch();
  const [anyTagFound, setAnyTagFound] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Check if any search results or auto-search tags were found
  useEffect(() => {
    const checkFoundTags = () => {
      // Check for results from current search
      const hasCurrentResults = results && results.data && results.data.length > 0;
      
      // Check for any found tags from auto-search
      const foundTagsCount = parseInt(localStorage.getItem('foundTagsCount') || '0');
      const hasFoundTags = foundTagsCount > 0;
      
      // Set state based on either condition
      setAnyTagFound(hasCurrentResults || hasFoundTags);
    };

    // Listen for both storage events (cross-tab) and our custom event (same-tab)
    window.addEventListener('storage', checkFoundTags);
    window.addEventListener(TAGS_COUNT_EVENT, checkFoundTags);
    
    // Initial check
    checkFoundTags();
    
    return () => {
      window.removeEventListener('storage', checkFoundTags);
      window.removeEventListener(TAGS_COUNT_EVENT, checkFoundTags);
    };
  }, [results]);

  return (
    <div className="flex flex-col items-end font-mono">
      <button 
        className={`w-16 h-50% rounded-t-lg border-none cursor-pointer flex items-center justify-center overflow-hidden ${
          anyTagFound ? 'bg-brand' : 'bg-accent'
        }`}
        onClick={togglePanel}
        title="Open Video Word Search"
      >
        <img 
          src={extensionLogo} 
          alt="Toggle search" 
          className="w-full object-contain -mt-[4px]"
        />
      </button>
      <div 
        className={`w-[384px] transition-all duration-normal ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 block' : 'opacity-0 -translate-y-sm hidden'
        }`}
      >
        <SearchTabs />
      </div>
    </div>
  );
};

export default UI; 