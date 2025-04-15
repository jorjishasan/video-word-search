import React, { useState, useEffect } from 'react';
import TagsContainer from './TagsContainer';
import { useSearch } from '../../context/SearchContext';
import { INPUT_STYLE, LOADING_MESSAGE, ERROR_MESSAGE } from '../../utils/styles';

const AutoSearchTab = () => {
  const { searchWord, setSearchWord, handleSearch, loading, error, transcript } = useSearch();
  
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('autoSearchTags')) || [];
    } catch {
      return [];
    }
  });
  const [pendingTag, setPendingTag] = useState('');
  const [lastTranscript, setLastTranscript] = useState(null);

  useEffect(() => {
    localStorage.setItem('autoSearchTags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    if (transcript !== lastTranscript) {
      setPendingTag('');
      setLastTranscript(transcript);
    }
    
    if (transcript && tags.length > 0) {
      tags.forEach((tag, index) => {
        const searchResults = handleSearch(tag.word, true) || [];
        setTags(prev => {
          const updated = [...prev];
          if (updated[index]) {
            updated[index] = { ...updated[index], found: searchResults.length > 0 };
          }
          return updated;
        });
      });
    }
  }, [transcript]);

  const addTag = (word) => {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;
    
    const isDuplicate = tags.some(tag => tag.word.toLowerCase() === trimmedWord.toLowerCase());
    if (isDuplicate) return;
    
    setTags(prev => [...prev, { word: trimmedWord, found: false }]);
    
    if (transcript) {
      const searchResults = handleSearch(trimmedWord, true) || [];
      setTags(prev => {
        const index = prev.length - 1;
        const updated = [...prev];
        updated[index] = { ...updated[index], found: searchResults.length > 0 };
        return updated;
      });
    }
  };

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
    <>
      <input
        type="text"
        placeholder="Enter words separated by commas..."
        value={pendingTag}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={INPUT_STYLE}
      />
      <TagsContainer 
        tags={tags} 
        onTagRemove={(index) => setTags(prev => prev.filter((_, i) => i !== index))}
      />
    </>
  );
};

export default AutoSearchTab; 