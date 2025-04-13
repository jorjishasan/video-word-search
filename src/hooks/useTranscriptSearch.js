import { useState, useEffect, useCallback } from 'react';
import { fetchYoutubeTranscript, searchTranscript, getCurrentVideoId } from '../services/youtubeTranscriptService';

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
        
        setVideoId(currentVideoId);
        const data = await fetchYoutubeTranscript(currentVideoId);
        
        if (!data) {
          setError('Failed to fetch transcript data');
        } else {
          setTranscript(data);
        }
      } catch (err) {
        setError(`Error fetching transcript: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch transcript on component mount
    fetchTranscript();
    
    // Set up event listener for URL changes
    const handleUrlChange = () => {
      const newVideoId = getCurrentVideoId();
      if (newVideoId !== videoId) {
        fetchTranscript();
      }
    };
    
    window.addEventListener('popstate', handleUrlChange);
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [videoId]);
  
  // Search function using the transcript data
  const search = useCallback((searchWord) => {
    if (!searchWord || !transcript || !videoId) {
      return [];
    }
    
    return searchTranscript(searchWord, transcript, videoId);
  }, [transcript, videoId]);
  
  return {
    transcript,
    loading,
    error,
    search
  };
}; 