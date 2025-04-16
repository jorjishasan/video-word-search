import React, { useEffect } from 'react';
import TagsContainer from './TagsContainer';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE, LOADING_MESSAGE, ERROR_MESSAGE } from '../../utils/styles';
import { useTagManagement } from './hooks/useTagManagement';
import { useTagInput } from './hooks/useTagInput';

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

  if (loading) return <div className={LOADING_MESSAGE}>Loading transcript data...</div>;
  if (error) return <div className={ERROR_MESSAGE}>{error}</div>;

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter words separated by commas..."
        value={pendingTag}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={`${INPUT_STYLE} w-full`}
      />
      <TagsContainer 
        tags={tags} 
        onTagRemove={removeTag}
      />
    </div>
  );
};

export default AutoSearchTab; 