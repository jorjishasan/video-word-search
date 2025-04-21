import { useState, useEffect, useCallback } from 'react';
import { fetchYoutubeTranscript, searchTranscript, getCurrentVideoId, hasTranscript, TRANSCRIPT_LOADED_EVENT, VIDEO_CHANGED_EVENT } from '../services/youtubeTranscriptService';
import { safeGetItem } from '../utils/storageUtils';

/**
 * Hook for fetching and searching YouTube transcript data
 */
export const useTranscriptSearch = () => {
  const [transcript, setTranscript] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch transcript when component mounts or videoId changes
  useEffect(() => {
    const fetchTranscript = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const currentVideoId = getCurrentVideoId();
        if (!currentVideoId) {
          setError('No video ID found in URL');
          setLoading(false);
          return;
        }
        
        // Check if we need to fetch a new transcript
        const lastVideoId = localStorage.getItem('lastVideoId');
        
        // Only fetch in two conditions:
        // 1. First time using (lastVideoId is null)
        // 2. Current video is different from last video
        if (lastVideoId === null || currentVideoId !== lastVideoId) {
          setVideoId(currentVideoId);
          const data = await fetchYoutubeTranscript(currentVideoId);
          
          if (!data) {
            setError('Failed to fetch transcript data');
          } else {
            setTranscript(data);
          }
        } else {
          // Video hasn't changed, check if we have a cached transcript
          setVideoId(currentVideoId);
          const cachedTranscript = safeGetItem('ytTranscript', null);
          if (cachedTranscript) {
            setTranscript(cachedTranscript);
          } else {
            // If no cached transcript but hasTranscript is true, fetch it
            if (hasTranscript()) {
              const data = await fetchYoutubeTranscript(currentVideoId);
              
              if (!data) {
                setError('Failed to fetch transcript data');
              } else {
                setTranscript(data);
              }
            } else {
              setError('No transcript available for this video');
            }
          }
        }
      } catch (err) {
        setError(`Error fetching transcript: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch transcript on component mount
    fetchTranscript();
    
    // Listen for transcript events
    const handleTranscriptLoaded = (event) => {
      const { videoId: loadedVideoId, transcriptSize } = event.detail;
      
      if (transcriptSize > 0) {
        setVideoId(loadedVideoId);
        const cachedTranscript = safeGetItem('ytTranscript', null);
        if (cachedTranscript) {
          setTranscript(cachedTranscript);
          setError(null);
        }
      }
    };
    
    const handleVideoChanged = () => {
      // Reset transcript when video changes
      setTranscript(null);
      setError(null);
    };
    
    // Set up event listeners for transcript and video changes
    window.addEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
    window.addEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
    window.addEventListener('popstate', handleVideoChanged);
    
    // Clean up
    return () => {
      window.removeEventListener(TRANSCRIPT_LOADED_EVENT, handleTranscriptLoaded);
      window.removeEventListener(VIDEO_CHANGED_EVENT, handleVideoChanged);
      window.removeEventListener('popstate', handleVideoChanged);
    };
  }, []);
  
  // Search function using the transcript data
  const search = useCallback((searchWord, isExactWordMatch = false) => {
    if (!searchWord || !transcript || !videoId) {
      return [];
    }
    
    return searchTranscript(searchWord, transcript, videoId, isExactWordMatch);
  }, [transcript, videoId]);
  
  return {
    transcript,
    loading,
    error,
    search
  };
}; 