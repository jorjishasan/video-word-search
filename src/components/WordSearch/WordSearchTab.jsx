import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE } from '../../utils/styles';
import SearchResultsContainer from './SearchResultsContainer';

/**
 * WordSearchTab component with real-time search
 */
const WordSearchTab = () => {
  const { 
    searchWord, 
    setSearchWord, 
    handleSearch, 
    results, 
    loading, 
    error, 
    transcript,
    activeTab
  } = useSearch();
  
  // Local state for input and results
  const [inputValue, setInputValue] = useState(searchWord || '');
  const [localResults, setLocalResults] = useState(results);
  const [activeSearchWord, setActiveSearchWord] = useState(searchWord || '');
  
  // Refs for tracking mounted state and debouncing
  const isMounted = useRef(true);
  const debounceTimerRef = useRef(null);
  const inputRef = useRef(null);
  
  // Update local results when context results change
  useEffect(() => {
    if (results) {
      setLocalResults(results);
    }
  }, [results]);
  
  // Auto-focus the input when this tab becomes active
  useEffect(() => {
    // Check if this tab is active (activeTab === 0) and input exists
    if (activeTab === 0 && inputRef.current && transcript) {
      // Focus the input with a slight delay to ensure tab switching is complete
      setTimeout(() => {
        inputRef.current.focus();
      }, 50);
    }
  }, [activeTab, transcript]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // Debounced search function - supports phrase search
  const debouncedSearch = useCallback((value) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    if (!value || value.trim().length < 2) {
      setLocalResults(null);
      setActiveSearchWord('');
      return;
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (isMounted.current) {
        const cleanValue = value.trim();
        setActiveSearchWord(cleanValue);
        setSearchWord(cleanValue);
        // Use phrase search (non-exact matching) by explicitly setting isExactWordMatch to false
        handleSearch(cleanValue, false, null, false);
      }
    }, 300);
  }, [setSearchWord, handleSearch]);
  
  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Show no transcript message if no transcript available
  if (!transcript && !loading && !error) {
    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-md p-4 text-center">
          <div className="text-gray-300 text-sm mb-2">This video has no transcript</div>
          <div className="text-gray-500 text-xs">Try playing a different video with captions</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-md p-4 text-center text-gray-400 text-sm">
          Loading transcript...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4">
        <div className="bg-gray-800 rounded-md p-4 text-center text-gray-400 text-sm">
          Unable to load transcript
        </div>
      </div>
    );
  }
  
  // Determine if results should be shown
  // Only hide results if input is completely empty
  const shouldShowResults = localResults && !(inputValue === '');
  
  return (
    <div >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search word or phrase..."
          className={INPUT_STYLE}
          disabled={!transcript}
        />
      
      
      {shouldShowResults && <SearchResultsContainer results={localResults} searchWord={activeSearchWord} />}
    </div>
  );
};

export default WordSearchTab; 