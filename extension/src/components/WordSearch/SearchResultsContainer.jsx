import React, { useState, useRef, useEffect } from 'react';
import SearchResultItem from './SearchResultItem';
import { COLORS, RESULTS_CONTAINER_STYLE, text, transition } from '../../utils/styles';

/**
 * Container component for search results
 */
const SearchResultsContainer = ({ results, searchWord }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const resultsContainerRef = useRef(null);
  
  // Check if container is scrollable on mount and when results change
  useEffect(() => {
    const checkIfScrollable = () => {
      if (resultsContainerRef.current) {
        const container = resultsContainerRef.current;
        const hasScroll = container.scrollHeight > container.clientHeight;
        setIsScrollable(hasScroll);
        setIsScrolledToBottom(container.scrollHeight - container.scrollTop <= container.clientHeight + 1);
      }
    };

    // Check after component mounts and after any DOM updates
    checkIfScrollable();
    // Use a slight delay to ensure the DOM has updated
    const timer = setTimeout(checkIfScrollable, 100);
    
    return () => clearTimeout(timer);
  }, [results]);
  
  // Handle scroll events
  const handleScroll = () => {
    if (resultsContainerRef.current) {
      const container = resultsContainerRef.current;
      const scrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
      setIsScrolledToBottom(scrolledToBottom);
    }
  };
  
  // Define scrollbar style
  const scrollbarStyle = {
    // These styles will be applied with CSS via 
    // the custom scrollbar utility in styles.js
    scrollbarWidth: 'thin', // For Firefox
    msOverflowStyle: 'none', // For IE and Edge
  };
  
  // Handle empty results case
  if (!results || !results.data || results.data.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        color: COLORS.gray[400],
        ...text.sm, // Use text size from styles.js
      }}>
        No results found
      </div>
    );
  }
  
  // Process all occurrences
  const allOccurrences = [];
  
  results.data.forEach(result => {
    if (Array.isArray(result.timestamp)) {
      result.timestamp.forEach(timestamp => {
        allOccurrences.push({
          word: result.word,
          context: result.context,
          timestamp: timestamp,
          videoId: result.videoId
        });
      });
    } else {
      allOccurrences.push(result);
    }
  });
  
  // Sort by timestamp
  allOccurrences.sort((a, b) => {
    const getSeconds = (timestamp) => {
      const [hours, minutes, seconds] = timestamp.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
    
    return getSeconds(a.timestamp) - getSeconds(b.timestamp);
  });
  
  return (
    <div style={{ marginTop: '0.75rem', position: 'relative' }}> {/* mt-3 */}
      <div style={{ overflow: 'hidden' }}> {/* overflow-hidden */}
        <div 
          ref={resultsContainerRef}
          onScroll={handleScroll}
          style={{
            ...RESULTS_CONTAINER_STYLE,
            maxHeight: '16rem', // max-h-64
            overflowY: 'auto', // overflow-y-auto
            ...scrollbarStyle,
          }} 
          className="scrollbar"
        >
          {allOccurrences.map((result, index) => (
            <SearchResultItem 
              key={`${result.timestamp}-${index}`} 
              result={result} 
              searchWord={searchWord}
              isLast={index === allOccurrences.length - 1}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      {isScrollable && !isScrolledToBottom && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1.5rem',
          background: `linear-gradient(to bottom, ${COLORS.transparent}, ${COLORS.bg.secondary})`,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '0.25rem',
          transition: transition.opacity200,
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={COLORS.gray[400]} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchResultsContainer;