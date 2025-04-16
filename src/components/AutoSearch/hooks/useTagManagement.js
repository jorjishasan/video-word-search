import { useState, useEffect, useCallback } from 'react';
import { TAGS_COUNT_EVENT, notifyTagCountChanged } from '../../../utils/tagUtils';

export const useTagManagement = (transcript, handleSearch) => {
  const [tags, setTags] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('autoSearchTags')) || [];
    } catch {
      return [];
    }
  });
  
  const [lastTranscript, setLastTranscript] = useState(null);

  // Update localStorage whenever tags change
  useEffect(() => {
    localStorage.setItem('autoSearchTags', JSON.stringify(tags));
  }, [tags]);

  // Custom notification function with direct DOM manipulation if count is zero
  const notifyWithUIUpdate = useCallback((count) => {
    // Use the imported utility for localStorage update and event dispatching
    notifyTagCountChanged(count);
    
    // Additional UI update for zero count to handle edge cases
    setTimeout(() => {      
      // Force direct UI update for the button color if count is zero
      if (count === 0) {
        const button = document.querySelector('button[title="Open Video Word Search"]');
        if (button && button.className.includes('bg-brand')) {
          button.className = button.className.replace('bg-brand', 'bg-accent');
        }
      }
    }, 0);
  }, []);

  // Handle transcript changes
  useEffect(() => {
    // Skip if transcript hasn't changed or if transcript is null
    if (!transcript || transcript === lastTranscript) return;
    
    // Always reset the last transcript
    setLastTranscript(transcript);
    
    console.log("Transcript changed - updating tags found status");
    
    // Update tags if we have any, even if they all become "not found"
    if (tags.length > 0) {
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
      
      // ALWAYS update foundTagsCount directly when transcript changes
      const foundCount = updatedTags.filter(tag => tag.found).length;
      console.log(`Found ${foundCount} tags in new transcript`);
      notifyWithUIUpdate(foundCount);
    } else {
      // If no tags, make sure count is set to 0
      notifyWithUIUpdate(0);
    }
  }, [transcript, lastTranscript, tags, handleSearch, notifyWithUIUpdate]);

  const addTag = useCallback((word) => {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;
    
    const isDuplicate = tags.some(tag => tag.word.toLowerCase() === trimmedWord.toLowerCase());
    if (isDuplicate) return;
    
    console.log(`Adding tag: ${trimmedWord}`);
    
    const newTag = { 
      word: trimmedWord, 
      found: false 
    };
    
    let tagIsFound = false;
    if (transcript) {
      const searchResults = handleSearch(trimmedWord, true) || [];
      newTag.found = searchResults.length > 0;
      tagIsFound = newTag.found;
      console.log(`Tag is found in transcript: ${tagIsFound}`);
    }
    
    // Create new tags array
    const newTags = [...tags, newTag];
    
    // Update tags state
    setTags(newTags);
    
    // Always update the count
    const newFoundCount = newTags.filter(tag => tag.found).length;
    console.log(`New found count after adding: ${newFoundCount}`);
    notifyWithUIUpdate(newFoundCount);
  }, [tags, transcript, handleSearch, notifyWithUIUpdate]);

  const removeTag = useCallback((index) => {
    // Check if the tag being removed was found (to update count)
    const removedTag = tags[index];
    const wasFound = removedTag && removedTag.found;
    
    console.log(`Removing tag: ${removedTag.word}, was found: ${wasFound}`);
    
    // Remove the tag - use optimized approach
    const newTags = [...tags];
    newTags.splice(index, 1);
    
    // Update tags state
    setTags(newTags);
    
    // Always update the count
    const newFoundCount = newTags.filter(tag => tag.found).length;
    console.log(`New found count after removal: ${newFoundCount}`);
    notifyWithUIUpdate(newFoundCount);
  }, [tags, notifyWithUIUpdate]);

  return {
    tags,
    addTag,
    removeTag,
    setLastTranscript
  };
}; 