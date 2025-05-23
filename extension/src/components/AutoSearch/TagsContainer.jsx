import React, { useEffect, useState } from 'react';
import Tag from './TagTemplate';
import { hasTranscript } from '../../services/youtubeTranscriptService';
import { COLORS } from '../../utils/styles';

const TagsContainer = ({ tags, onTagRemove }) => {
  // Keep track of hasTranscript state to force re-renders when it changes
  // eslint-disable-next-line no-unused-vars
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
    <div style={{ marginTop: '0.75rem' }}> {/* mt-3 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '8px',
        gap: '4px',
        backgroundColor: COLORS.bg.primary,
        minHeight: '48px'
      }}>
        {tags.map((tag, index) => (
          <Tag 
          key={`${tag.word}-${tag.found}-${index}`}
          tag={tag}
          onTagRemove={() => onTagRemove(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsContainer;