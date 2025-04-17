import React from 'react';
import { usePlayback } from '../../hooks/usePlayback';

/**
 * Format text with highlighted search word and properly add ellipsis
 * @param {string} text - Original text
 * @param {string} word - Word to highlight
 */
const formatTranscript = (text, word) => {
  if (!word || !text) return text;
  
  // Create a truncated version with ellipsis
  let formattedText;
  const maxLength = 60;
  let hasPrefix = false;
  let hasSuffix = false;
  
  // Process the search term
  const searchTerm = word.trim();
  
  // Check if the search term contains spaces (multi-word search)
  const isMultiWordSearch = searchTerm.includes(' ');
  
  if (isMultiWordSearch) {
    // For multi-word searches, we want to find all occurrences where the words appear
    // in sequence with characters in between them
    
    // Split the search term for processing
    const searchWords = searchTerm.toLowerCase().split(' ').filter(w => w.length > 0);
    
    if (searchWords.length < 2) {
      // If only one word left after filtering, use single-word approach
      return formatTranscript(text, searchWords[0]);
    }
    
    // Find potential matches in the text
    const textLower = text.toLowerCase();
    const matches = [];
    
    // Find the starting position of the first word
    const firstWord = searchWords[0];
    let firstWordPos = textLower.indexOf(firstWord);
    
    while (firstWordPos !== -1) {
      // For each occurrence of the first word, check if the rest of the words follow
      let isFullMatch = true;
      let matchEnd = firstWordPos + firstWord.length;
      let matchText = '';
      
      // Try to find the remaining words in sequence
      for (let i = 1; i < searchWords.length; i++) {
        const currentWord = searchWords[i];
        
        // Find the next word after the previous match
        const remainingText = textLower.substring(matchEnd);
        const nextWordRelativePos = remainingText.indexOf(currentWord);
        
        if (nextWordRelativePos === -1) {
          // Word not found, not a full match
          isFullMatch = false;
          break;
        }
        
        // Update match end position
        matchEnd = matchEnd + nextWordRelativePos + currentWord.length;
      }
      
      // If all words were found in sequence, record the match
      if (isFullMatch) {
        matches.push({
          start: firstWordPos,
          end: matchEnd,
          text: text.substring(firstWordPos, matchEnd)
        });
      }
      
      // Find the next occurrence of the first word
      firstWordPos = textLower.indexOf(firstWord, firstWordPos + 1);
    }
    
    // If no matches, try to find partial matches (just use first word)
    if (matches.length === 0) {
      return formatTranscript(text, firstWord);
    }
    
    // Sort matches by position
    matches.sort((a, b) => a.start - b.start);
    
    // Use first match for truncation
    const firstMatchPos = matches[0].start;
    
    if (text.length > maxLength) {
      // If text is too long, focus on showing context around the match
      const startPos = Math.max(0, firstMatchPos - Math.floor(maxLength / 3));
      const endPos = Math.min(text.length, startPos + maxLength);
      
      // Track if we need ellipses but don't add them to the text yet
      hasPrefix = startPos > 0;
      hasSuffix = endPos < text.length;
      
      // Extract the relevant portion without ellipses
      formattedText = text.substring(startPos, endPos);
      
      // Adjust match positions for the truncated text
      for (let i = 0; i < matches.length; i++) {
        matches[i].start -= startPos;
        matches[i].end -= startPos;
        
        // Skip matches that are now outside the truncated text
        if (matches[i].end < 0 || matches[i].start >= formattedText.length) {
          matches.splice(i, 1);
          i--;
          continue;
        }
        
        // Clamp matches to the truncated text boundaries
        matches[i].start = Math.max(0, matches[i].start);
        matches[i].end = Math.min(formattedText.length, matches[i].end);
        matches[i].text = formattedText.substring(matches[i].start, matches[i].end);
      }
    } else {
      formattedText = text;
    }
    
    // Create result with separately styled ellipses
    const result = [];
    
    // Add prefix ellipsis if needed
    if (hasPrefix) {
      result.push(<span key="prefix" className="text-gray-500">...</span>);
    }
    
    // Build fragments from matches
    let lastIndex = 0;
    const fragments = [];
    
    // Process each match
    matches.forEach((match, idx) => {
      // Add text before the match
      if (match.start > lastIndex) {
        fragments.push({
          text: formattedText.substring(lastIndex, match.start),
          isMatch: false
        });
      }
      
      // Add the match
      fragments.push({
        text: match.text,
        isMatch: true
      });
      
      lastIndex = match.end;
    });
    
    // Add text after the last match
    if (lastIndex < formattedText.length) {
      fragments.push({
        text: formattedText.substring(lastIndex),
        isMatch: false
      });
    }
    
    // If no fragments were created, use the whole text
    if (fragments.length === 0) {
      fragments.push({
        text: formattedText,
        isMatch: false
      });
    }
    
    // Convert fragments to React elements
    fragments.forEach((fragment, idx) => {
      if (fragment.isMatch) {
        result.push(
          <span key={`match-${idx}`} className="text-white font-medium">
            {fragment.text}
          </span>
        );
      } else if (fragment.text) {
        result.push(
          <span key={`text-${idx}`} className="text-gray-400">
            {fragment.text}
          </span>
        );
      }
    });
    
    // Add suffix ellipsis if needed
    if (hasSuffix) {
      result.push(<span key="suffix" className="text-gray-500">...</span>);
    }
    
    return result;
  }
  
  // Single word search (original logic)
  const escapedWord = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedWord})`, 'gi');
  
  // Find the position of the search word in the text
  const wordPos = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  
  if (wordPos === -1) return text;
  
  if (text.length > maxLength) {
    // If text is too long, focus on showing context around the match
    const startPos = Math.max(0, wordPos - Math.floor(maxLength / 2));
    const endPos = Math.min(text.length, startPos + maxLength);
    
    // Track if we need ellipses but don't add them to the text yet
    hasPrefix = startPos > 0;
    hasSuffix = endPos < text.length;
    
    // Extract the relevant portion without ellipses
    formattedText = text.substring(startPos, endPos);
  } else {
    formattedText = text;
  }
  
  // Split by the search word and highlight each occurrence
  const parts = formattedText.split(regex);
  
  // Create result with separately styled ellipses
  const result = [];
  
  // Add prefix ellipsis if needed
  if (hasPrefix) {
    result.push(<span key="prefix" className="text-gray-500">...</span>);
  }
  
  // Add the highlighted text parts
  parts.forEach((part, index) => {
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      result.push(
        <span key={`part-${index}`} className="text-white font-medium">
          {part}
        </span>
      );
    } else if (part) {
      result.push(<span key={`part-${index}`} className="text-gray-400">{part}</span>);
    }
  });
  
  // Add suffix ellipsis if needed
  if (hasSuffix) {
    result.push(<span key="suffix" className="text-gray-500">...</span>);
  }
  
  return result;
};

/**
 * Search result item component
 */
const SearchResultItem = ({ result, searchWord, isLast, isActive, onClick }) => {
  const { playAtTimestamp } = usePlayback();
  
  const timestamp = result.timestamp;
  
  const handleRowClick = () => {
    playAtTimestamp(timestamp);
    if (onClick) onClick();
  };
  
  return (
    <div 
      onClick={handleRowClick}
      className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-200
        ${isActive ? 'bg-bg-secondary' : ' bg-bg-primary backdrop-blur-sm hover:bg-bg-secondary'}`}
    >
      <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis tracking-tight
 mr-4 text-[12px] max-w-full">
        <div className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          {formatTranscript(result.context, searchWord)}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center bg-green-600 rounded text-white text-sm py-1 px-2">
        <div className="mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-current" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v15.78a1.5 1.5 0 002.3 1.269l9.344-7.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <span className="font-mono tracking-wider">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default SearchResultItem; 