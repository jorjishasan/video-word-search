import React, { useState, useEffect, useRef, useCallback } from 'react';
import TagsContainer from './TagsContainer';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE, LOADING_MESSAGE, ERROR_MESSAGE } from '../../utils/styles';

const AutoSearchTab = () => {
  const { setSearchWord, handleSearch, loading, error, transcript, activeTab } = useSearch();
  const inputRef = useRef(null);
  
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('autoSearchTags')) || [];
    } catch {
      return [];
    }
  });
  const [pendingTag, setPendingTag] = useState('');
  const [lastTranscript, setLastTranscript] = useState(null);

  // Auto-focus input when tab is active
  useEffect(() => {
    if (activeTab === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  // Update localStorage whenever tags change
  useEffect(() => {
    localStorage.setItem('autoSearchTags', JSON.stringify(tags));
  }, [tags]);

  // Handle transcript changes
  useEffect(() => {
    // Skip if transcript hasn't changed
    if (transcript === lastTranscript) return;
    
    // Reset pending tag when transcript changes
    setPendingTag('');
    setLastTranscript(transcript);
    
    // Don't process empty transcript or no tags
    if (!transcript || tags.length === 0) return;
    
    // Update all tags with search results
    const updatedTags = tags.map(tag => {
      const searchResults = handleSearch(tag.word, true) || [];
      return { 
        ...tag, 
        found: searchResults.length > 0 
      };
    });
    
    // Update tags state
    setTags(updatedTags);
    
    // Update foundTagsCount directly when transcript changes
    const foundCount = updatedTags.filter(tag => tag.found).length;
    localStorage.setItem('foundTagsCount', foundCount.toString());
    window.dispatchEvent(new Event('storage'));
    
  }, [transcript, lastTranscript, tags, handleSearch]);

  const addTag = (word) => {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;
    
    const isDuplicate = tags.some(tag => tag.word.toLowerCase() === trimmedWord.toLowerCase());
    if (isDuplicate) return;
    
    const newTag = { 
      word: trimmedWord, 
      found: false 
    };
    
    let tagIsFound = false;
    if (transcript) {
      const searchResults = handleSearch(trimmedWord, true) || [];
      newTag.found = searchResults.length > 0;
      tagIsFound = newTag.found;
    }
    
    // Create new tags array
    const newTags = [...tags, newTag];
    
    // Update tags state
    setTags(newTags);
    
    // If the new tag is found, update count immediately instead of waiting for effect
    if (tagIsFound) {
      const newFoundCount = newTags.filter(tag => tag.found).length;
      localStorage.setItem('foundTagsCount', newFoundCount.toString());
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleTagRemove = useCallback((index) => {
    // Check if the tag being removed was found (to update count)
    const removedTag = tags[index];
    const wasFound = removedTag && removedTag.found;
    
    // Remove the tag - use optimized approach
    const newTags = [...tags];
    newTags.splice(index, 1);
    
    // Update tags state
    setTags(newTags);
    
    // Always update localStorage immediately to ensure UI stays in sync
    localStorage.setItem('autoSearchTags', JSON.stringify(newTags));
    
    // Update the count immediately if needed
    const newFoundCount = wasFound 
      ? newTags.filter(tag => tag.found).length 
      : parseInt(localStorage.getItem('foundTagsCount') || '0');
    
    localStorage.setItem('foundTagsCount', newFoundCount.toString());
    window.dispatchEvent(new Event('storage'));
  }, [tags]);

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && pendingTag) {
      e.preventDefault();
      addTag(pendingTag);
      setPendingTag('');
      setSearchWord('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.includes(',')) {
      const parts = value.split(',');
      const lastPart = parts.pop().trim();
      parts.forEach(part => part.trim() && addTag(part));
      setPendingTag(lastPart);
      setSearchWord(lastPart);
    } else {
      setPendingTag(value);
      setSearchWord(value);
    }
  };

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
        onTagRemove={handleTagRemove}
      />
    </div>
  );
};

export default AutoSearchTab; 