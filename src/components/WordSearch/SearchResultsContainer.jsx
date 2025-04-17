import React, { useState } from 'react';
import SearchResultItem from './SearchResultItem';

/**
 * Container component for search results
 */
const SearchResultsContainer = ({ results, searchWord }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Handle empty results case
  if (!results || !results.data || results.data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-400 text-sm">
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
    <div className="mt-3 p-3">
      <div className="bg-black/85 backdrop-blur-sm border border-gray-700/50 rounded-md overflow-hidden shadow-xl">
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
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
    </div>
  );
};

export default SearchResultsContainer; 