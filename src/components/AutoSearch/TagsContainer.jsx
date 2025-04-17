import React, { useEffect, useState } from 'react';
import Tag from './TagTemplate';
import { hasTranscript } from '../../services/youtubeTranscriptService';

// Legend component for tag status indicators
const TagLegend = () => {
  return (
    <div className="flex items-center justify-center gap-4 mt-3 mb-1 text-sm text-gray-100">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#22c55e] rounded-sm mr-2"></div>
        <span>Found</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-[#ff5555] rounded-sm mr-2"></div>
        <span>Not found</span>
      </div>
    </div>
  );
};

const TagsContainer = ({ tags, onTagRemove }) => {
  // Keep track of hasTranscript state to force re-renders when it changes
  const [transcriptAvailable, setTranscriptAvailable] = useState(hasTranscript());
  
  // Listen for storage events which might affect hasTranscript
  useEffect(() => {
    const checkTranscriptStatus = () => {
      setTranscriptAvailable(hasTranscript());
    };
    
    window.addEventListener('storage', checkTranscriptStatus);
    
    // Check periodically for changes
    const intervalId = setInterval(checkTranscriptStatus, 1000);
    
    return () => {
      window.removeEventListener('storage', checkTranscriptStatus);
      clearInterval(intervalId);
    };
  }, []);
  
  if (!tags || tags.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-3">
      <div className="flex flex-wrap p-[8px] gap-[4px] bg-bg-secondary min-h-[48px]">
        {tags.map((tag, index) => (
          <Tag 
          key={`${tag.word}-${tag.found}-${index}`}
          tag={tag}
          onTagRemove={() => onTagRemove(index)}
          />
        ))}
      </div>
        <TagLegend />
    </div>
  );
};

export default TagsContainer; 