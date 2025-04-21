import React, { useState, useEffect } from 'react';
import SearchTabs from './SearchTabs';
import ToggleButton from './UI/ToggleButton';
import { useSearch } from '../context/SearchContext';
import { checkAnyTagsFound, TAGS_COUNT_EVENT } from '../utils/tagUtils';
import { COLORS, transition } from '../utils/styles';

// Error message component
const TranscriptErrorMessage = () => {
  const errorMessageStyle = {
    fontSize: '16px',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: COLORS.red[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    height: '160px',
    width: '100%',
    marginBottom: '0.5rem',
  };

  return (
    <div style={errorMessageStyle}>
      This video has no transcript.
    </div>
  );
};

const UI = () => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tagState, setTagState] = useState(0); // Add this state to force re-renders
  const { results, transcriptAvailable } = useSearch();
  
  // Check if any tags are found on every render
  const anyTagFound = checkAnyTagsFound(results);

  // Listen for events to force re-renders when foundTagsCount changes
  useEffect(() => {
    const forceUpdate = () => {
      // Force a component re-render by updating the tagState
      setTagState(prev => prev + 1);
    };

    window.addEventListener('storage', forceUpdate);
    window.addEventListener(TAGS_COUNT_EVENT, forceUpdate);
    
    return () => {
      window.removeEventListener('storage', forceUpdate);
      window.removeEventListener(TAGS_COUNT_EVENT, forceUpdate);
    };
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontFamily: 'monospace'
  };

  const contentStyle = {
    width: '384px',
    transition: transition.all,
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-0.25rem)', // -translate-y-sm assuming sm is 0.25rem
    display: isOpen ? 'block' : 'none'
  };

  return (
    <div style={containerStyle}>
      <ToggleButton 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        anyTagFound={anyTagFound} 
      />
      
      <div style={contentStyle}>
        {transcriptAvailable ? <SearchTabs /> : <TranscriptErrorMessage />}
      </div>
    </div>
  );
};

export default UI;