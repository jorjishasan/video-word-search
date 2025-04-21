import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE_BASE, COLORS, borderRadius } from '../../utils/styles';
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
  const [isSearching, setIsSearching] = useState(false);
  
  // Refs for tracking mounted state and debouncing
  const isMounted = useRef(true);
  const debounceTimerRef = useRef(null);
  const inputRef = useRef(null);
  
  // Update local results when context results change
  useEffect(() => {
    if (results) {
      setLocalResults(results);
    }
    // End the searching state once results are returned
    setIsSearching(false);
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
    
    if (!value || value === '') {
      setLocalResults(null);
      setActiveSearchWord('');
      setIsSearching(false);
      return;
    }
    
    const cleanValue = value.trim();
    
    if (cleanValue.length < 1) {
      setLocalResults(null);
      setActiveSearchWord('');
      setIsSearching(false);
      return;
    }
    
    // Set searching state to true when starting a search
    setIsSearching(true);
    
    debounceTimerRef.current = setTimeout(() => {
      if (isMounted.current) {
        try {
          setActiveSearchWord(cleanValue);
          setSearchWord(cleanValue);
          // Use phrase search (non-exact matching) by explicitly setting isExactWordMatch to false
          handleSearch(cleanValue, false, null, false);
        } catch (error) {
          console.error("Search error:", error);
          setIsSearching(false);
        }
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
      <div style={{ padding: '1rem' }}> {/* p-4 */}
        <div style={{
          backgroundColor: COLORS.gray[800], // bg-gray-800
          borderRadius: borderRadius.md, // rounded-md
          padding: '1rem', // p-4
          textAlign: 'center' // text-center
        }}>
          <div style={{
            color: COLORS.gray[300], // text-gray-300
            fontSize: '0.875rem', // text-sm
            marginBottom: '0.5rem' // mb-2
          }}>
            This video has no transcript
          </div>
          <div style={{
            color: COLORS.gray[500], // text-gray-500
            fontSize: '0.75rem', // text-xs
          }}>
            Try playing a different video with captions
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '1rem' }}> {/* p-4 */}
        <div style={{
          backgroundColor: COLORS.gray[800], // bg-gray-800
          borderRadius: borderRadius.md, // rounded-md
          padding: '1rem', // p-4
          textAlign: 'center', // text-center
          color: COLORS.gray[400], // text-gray-400
          fontSize: '0.875rem' // text-sm
        }}>
          Loading transcript...
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ padding: '1rem' }}> {/* p-4 */}
        <div style={{
          backgroundColor: COLORS.gray[800], // bg-gray-800
          borderRadius: borderRadius.md, // rounded-md
          padding: '1rem', // p-4
          textAlign: 'center', // text-center
          color: COLORS.gray[400], // text-gray-400
          fontSize: '0.875rem' // text-sm
        }}>
          Unable to load transcript
        </div>
      </div>
    );
  }
  
  // Determine if results should be shown
  const hasResults = localResults && localResults.data && localResults.data.length > 0;
  const isInputActive = inputValue.trim() !== '';
  
  // We'll show the container if either:
  // 1. We have search results, or
  // 2. We have active input and aren't showing the initial empty state
  const shouldShowResultsContainer = isInputActive;
  
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search word or phrase..."
        style={{...INPUT_STYLE_BASE}}
        disabled={!transcript}
      />
      
      {shouldShowResultsContainer && (
        <div> {/*todo: p-3 */}
          <div style={{
            backgroundColor: COLORS.bg.primary, // bg-bg-primary
            backdropFilter: 'blur(4px)', // backdrop-blur-sm
            borderRadius: borderRadius.md, // rounded-md
            overflow: 'hidden', // overflow-hidden
          }}>
            {isSearching ? (
              <div style={{
                padding: '1rem', // p-4
                textAlign: 'center', // text-center
                color: COLORS.gray[400], // text-gray-400
                fontSize: '1rem', // text-md
              }}>
                Searching...
              </div>
            ) : hasResults ? (
              <SearchResultsContainer results={localResults} searchWord={activeSearchWord} />
            ) : (
              <div style={{
                padding: '1rem', // p-4
                textAlign: 'center', // text-center
                color: COLORS.gray[400], // text-gray-400
                fontSize: '0.875rem', // text-sm
              }}>
                No results found for "{inputValue.trim()}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSearchTab;