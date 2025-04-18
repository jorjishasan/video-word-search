import React, { useState, useEffect } from 'react';
import SearchTabs from './SearchTabs';
import ToggleButton from './UI/ToggleButton';
import { useSearch } from '../context/SearchContext';
import { checkAnyTagsFound, TAGS_COUNT_EVENT } from '../utils/tagUtils';

// Error message component
const TranscriptErrorMessage = () => (
  <div className="transcript-error text-[16px] px-4 py-2 bg-black bg-opacity-70 text-red-500 flex items-center justify-center text-center font-bold  h-[160px] w-full mb-2">
    This video has no transcript.
  </div>
);

const UI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { results, transcriptAvailable, error } = useSearch();
  
  // Check if any tags are found on every render
  const anyTagFound = checkAnyTagsFound(results);

  // Listen for events to force re-renders when foundTagsCount changes
  useEffect(() => {
    const forceUpdate = () => {
      // This will force a component re-render
      setIsOpen(isOpen => isOpen);
    };

    window.addEventListener('storage', forceUpdate);
    window.addEventListener(TAGS_COUNT_EVENT, forceUpdate);
    
    return () => {
      window.removeEventListener('storage', forceUpdate);
      window.removeEventListener(TAGS_COUNT_EVENT, forceUpdate);
    };
  }, []);


  return (
    <div className="flex flex-col items-start font-mono">
      <ToggleButton 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        anyTagFound={anyTagFound} 
      />
      
      <div 
        className={`w-[384px] transition-all duration-normal ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 block' : 'opacity-0 -translate-y-sm hidden'
        }`}
      >
        {transcriptAvailable ? <SearchTabs /> : <TranscriptErrorMessage />}
      </div>
    </div>
  );
};

export default UI; 