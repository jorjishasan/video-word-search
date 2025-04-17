import React from 'react';
import { usePlayback } from '../../hooks/usePlayback';

/**
 * Format text with highlighted search word
 * @param {string} text - Original text
 * @param {string} word - Word to highlight
 */
const formatTranscript = (text, word) => {
  if (!word || !text) return text;
  
  const regex = new RegExp(`(${word})`, 'gi');
  const parts = text.split(regex);
  
  // Add ellipsis if text is long
  const formattedText = text.length > 60 ? `...${text}...` : text;
  const formattedParts = formattedText.split(regex);
  
  return formattedParts.map((part, index) => {
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
        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700 bg-gray-800'}`}
    >
      <div className="flex-1 text-ellipsis mr-4 text-[16px]">
        {formatTranscript(result.context, searchWord)}
      </div>
      <div className="flex items-center bg-green-600 rounded text-white text-sm py-1 px-2">
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