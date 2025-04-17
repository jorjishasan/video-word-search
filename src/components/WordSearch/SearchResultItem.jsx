import React from 'react';
import { usePlayback } from '../../hooks/usePlayback';

/**
 * Format text with highlighted search word and properly add ellipsis
 * @param {string} text - Original text
 * @param {string} word - Word to highlight
 */
const formatTranscript = (text, word) => {
  if (!word || !text) return text;
  
  const regex = new RegExp(`(${word})`, 'gi');
  
  // Find the position of the search word in the text
  const wordPos = text.toLowerCase().indexOf(word.toLowerCase());
  
  if (wordPos === -1) return text;
  
  // Create a truncated version with ellipsis
  let formattedText;
  const maxLength = 60;
  
  if (text.length > maxLength) {
    // If text is too long, focus on showing context around the match
    const startPos = Math.max(0, wordPos - Math.floor(maxLength / 2));
    const endPos = Math.min(text.length, startPos + maxLength);
    
    // Extract the relevant portion and add ellipsis
    const prefix = startPos > 0 ? '...' : '';
    const suffix = endPos < text.length ? '...' : '';
    formattedText = prefix + text.substring(startPos, endPos) + suffix;
  } else {
    formattedText = text;
  }
  
  // Split by the search word and highlight each occurrence
  const parts = formattedText.split(regex);
  
  return parts.map((part, index) => {
    if (part.toLowerCase() === word.toLowerCase()) {
      return (
        <span key={index} className="text-white font-medium">
          {part}
        </span>
      );
    }
    return <span key={index} className="text-gray-400">{part}</span>;
  });
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
      className={`flex items-center justify-between p-3 cursor-pointer transition-colors duration-150
        ${!isLast ? 'border-b border-gray-700' : ''} 
        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700 bg-gray-800/60'}`}
    >
      <div className="flex-1 overflow-hidden mr-4 text-[16px]">
        {formatTranscript(result.context, searchWord)}
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