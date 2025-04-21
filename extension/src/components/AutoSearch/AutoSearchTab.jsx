import React, { useEffect } from 'react';
import TagsContainer from './TagsContainer';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE_BASE, LOADING_MESSAGE_STYLE, ERROR_MESSAGE_STYLE, COLORS } from '../../utils/styles';
import { useTagManagement } from './hooks/useTagManagement';
import { useTagInput } from './hooks/useTagInput';

// Legend component for tag status indicators
const TagLegend = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem', // gap-4
      marginTop: '0.75rem', // mt-3
      marginBottom: '0.25rem', // mb-1
      fontSize: '0.875rem', // text-sm
      color: COLORS.gray[100] // text-gray-100
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          width: '1rem', // w-4
          height: '1rem', // h-4
          backgroundColor: COLORS.tag.found, // bg-[#22c55e]
          borderRadius: '0.125rem', // rounded-sm
          marginRight: '0.5rem', // mr-2
        }}></div>
        <span>Found</span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          width: '1rem', // w-4
          height: '1rem', // h-4
          backgroundColor: COLORS.tag.notFound, // bg-[#ff5555]
          borderRadius: '0.125rem', // rounded-sm
          marginRight: '0.5rem', // mr-2
        }}></div>
        <span>Not found</span>
      </div>
    </div>
  );
};

const AutoSearchTab = () => {
  const { setSearchWord, handleSearch, loading, error, transcript, activeTab } = useSearch();
  
  // Use our custom hooks
  const { tags, addTag, removeTag } = useTagManagement(transcript, handleSearch);
  const { pendingTag, inputRef, handleKeyDown, handleInputChange, resetInput } = useTagInput(activeTab, addTag, setSearchWord);

  // Handle transcript changes - reset input
  useEffect(() => {
    if (transcript !== undefined && transcript !== null) {
      resetInput();
    }
  }, [transcript, resetInput]);

  if (loading) return <div style={LOADING_MESSAGE_STYLE}>Loading transcript data...</div>;
  if (error) return <div style={ERROR_MESSAGE_STYLE}>{error}</div>;

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter words separated by commas..."
        value={pendingTag}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{...INPUT_STYLE_BASE, width: '100%'}} /* replacing ${INPUT_STYLE} w-full */
      />
      <TagsContainer 
        tags={tags} 
        onTagRemove={removeTag}
      />
              <TagLegend />
    </div>
  );
};

export default AutoSearchTab;