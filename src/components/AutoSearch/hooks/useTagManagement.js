import { useState, useEffect, useCallback } from 'react';
import { notifyTagCountChanged } from '../../../utils/tagUtils';
import { safeGetItem, safeSetItem } from '../../../utils/storageUtils';
import { hasTranscript, TRANSCRIPT_LOADED_EVENT, VIDEO_CHANGED_EVENT } from '../../../services/youtubeTranscriptService';

/**
 * Hook for managing auto-search tags
 */
export const useTagManagement = (transcript, handleSearch) => {
  const [tags, setTags] = useState(() => {
    return safeGetItem('autoSearchTags', []);
  });
  
  const [lastTranscript, setLastTranscript] = useState(null);
  const [lastVideoId, setLastVideoId] = useState(() => {
    return localStorage.getItem('lastVideoId') || '';
  });

  // Update localStorage whenever tags change
  useEffect(() => {
    safeSetItem('autoSearchTags', tags);
  }, [tags]);

  // Simple function to update button color - only used by autoSearch
  const updateButtonColor = useCallback((count) => {
    const button = document.querySelector('button[title="Open Video Word Search"]');
    if (button) {
      const hasTranscriptValue = hasTranscript();
      
      if (!hasTranscriptValue) {
        // No transcript available - use neutral color
        button.className = button.className.replace(/bg-[a-z]+/, 'bg-neutral');
      } else if (count > 0) {
        // Found tags - use brand color
        button.className = button.className.replace(/bg-[a-z]+/, 'bg-brand');
      } else {
        // Has transcript but no found tags - use accent color
        button.className = button.className.replace(/bg-[a-z]+/, 'bg-accent');
      }
    }
  }, []);

  // Custom notification function for tag count changes
  const notifyWithUIUpdate = useCallback((count) => {
    // Update localStorage and dispatch events
    notifyTagCountChanged(count);
    
    // Update button color based on count
    updateButtonColor(count);
  }, [updateButtonColor]);

  // Check for video ID changes
  useEffect(() => {
    const currentVideoId = localStorage.getItem('lastVideoId') || '';
    
    // If video ID changed, we need to reset tag status
    if (currentVideoId !== lastVideoId && currentVideoId) {
      setLastVideoId(currentVideoId);
      
      // Reset all tags to not found
      const updatedTags = tags.map(tag => ({
        ...tag,
        found: false
      }));
      
      // Update tags and reset count to 0
      setTags(updatedTags);
      notifyTagCountChanged(0);
      
      // Reset last transcript to force re-check when transcript is available
      setLastTranscript(null);
      
      // Update UI button background based on hasTranscript
      updateButtonColor(0);
    }
    
    // Listen for video change events to update UI
    const handleVideoChanged = () => {
      // Force check for hasTranscript on the new video
      updateButtonColor(0);
    };
    
    window.addEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
    window.addEventListener('popstate', handleVideoChanged);
    
    // Clean up
    return () => {
      window.removeEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
      window.removeEventListener('popstate', handleVideoChanged);
    };
  }, [lastVideoId, tags, updateButtonColor]);

  // Listen for transcript loaded events
  useEffect(() => {
    const handleTranscriptLoaded = () => {
      if (!transcript || tags.length === 0) return;
      
      // Check each tag against the new transcript
      const updatedTags = tags.map(tag => {
        const searchResults = handleSearch(tag.word, true, null, true) || [];
        return { 
          ...tag, 
          found: searchResults.length > 0 
        };
      });
      
      // Update tags state
      setTags(updatedTags);
      
      // Update UI with found count
      const foundCount = updatedTags.filter(tag => tag.found).length;
      notifyWithUIUpdate(foundCount);
    };
    
    // Listen for transcript loaded events
    window.addEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
    
    // Clean up
    return () => {
      window.removeEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
    };
  }, [tags, handleSearch, notifyWithUIUpdate, transcript]);

  // Handle transcript changes - check which tags are found
  useEffect(() => {
    // Skip if transcript hasn't changed or if transcript is null
    if (!transcript || transcript === lastTranscript) return;
    
    // Update last transcript
    setLastTranscript(transcript);
    
    // Update tags if we have any
    if (tags.length > 0) {
      // Check each tag against the transcript
      const updatedTags = tags.map(tag => {
        const searchResults = handleSearch(tag.word, true, null, true) || [];
        return { 
          ...tag, 
          found: searchResults.length > 0 
        };
      });
      
      // Update tags state
      setTags(updatedTags);
      
      // Update UI with found count
      const foundCount = updatedTags.filter(tag => tag.found).length;
      notifyWithUIUpdate(foundCount);
    } else {
      // If no tags, ensure count is 0
      notifyWithUIUpdate(0);
    }
  }, [transcript, lastTranscript, tags, handleSearch, notifyWithUIUpdate]);

  // Add a new tag
  const addTag = useCallback((word) => {
    const trimmedWord = word.trim();
    if (!trimmedWord) return;
    
    // Check for duplicates
    const isDuplicate = tags.some(tag => tag.word.toLowerCase() === trimmedWord.toLowerCase());
    if (isDuplicate) return;
    
    // Create new tag
    const newTag = { 
      word: trimmedWord, 
      found: false 
    };
    
    // Check if tag is found in current transcript
    if (transcript) {
      const searchResults = handleSearch(trimmedWord, true, null, true) || [];
      newTag.found = searchResults.length > 0;
    }
    
    // Add tag to list
    const newTags = [...tags, newTag];
    setTags(newTags);
    
    // Update UI with new found count
    const newFoundCount = newTags.filter(tag => tag.found).length;
    notifyWithUIUpdate(newFoundCount);
  }, [tags, transcript, handleSearch, notifyWithUIUpdate]);

  // Remove a tag
  const removeTag = useCallback((index) => {
    // Remove the tag
    const newTags = [...tags];
    newTags.splice(index, 1);
    
    // Update tags state
    setTags(newTags);
    
    // Update UI with new found count
    const newFoundCount = newTags.filter(tag => tag.found).length;
    notifyWithUIUpdate(newFoundCount);
  }, [tags, notifyWithUIUpdate]);

  return {
    tags,
    addTag,
    removeTag,
    setLastTranscript
  };
}; 