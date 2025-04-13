import { useCallback, useState } from 'react';
import { seekToTimestamp } from '../services/PlaybackController';

/**
 * Hook for controlling video playback
 * @returns {Object} - Playback control functions and state
 */
export const usePlayback = () => {
  const [lastPlayedTimestamp, setLastPlayedTimestamp] = useState(null);
  const [playbackError, setPlaybackError] = useState(null);

  /**
   * Play video at the specified timestamp
   * @param {string} timestamp - Timestamp in format HH:MM:SS
   * @returns {boolean} - Whether the seek operation was successful
   */
  const playAtTimestamp = useCallback((timestamp) => {
    console.log(`usePlayback: Playing at timestamp ${timestamp}`);
    setPlaybackError(null);
    
    try {
      const result = seekToTimestamp(timestamp);
      
      if (result) {
        setLastPlayedTimestamp(timestamp);
        return true;
      } else {
        console.warn(`Failed to seek to timestamp: ${timestamp}`);
        setPlaybackError(`Could not play at ${timestamp}. Make sure you're on YouTube.`);
        return false;
      }
    } catch (error) {
      console.error('Error in playAtTimestamp:', error);
      setPlaybackError(`Error: ${error.message}`);
      return false;
    }
  }, []);

  /**
   * Check if YouTube player is available
   * @returns {boolean} True if we detected a YouTube player
   */
  const isYouTubePlayerAvailable = useCallback(() => {
    // Check various methods of YouTube player detection
    return !!(
      (window.yt && window.yt.player) || 
      document.querySelector('#movie_player') ||
      document.querySelector('video') ||
      document.querySelector('iframe[src*="youtube.com/embed"]')
    );
  }, []);

  return {
    playAtTimestamp,
    isYouTubePlayerAvailable,
    lastPlayedTimestamp,
    playbackError
  };
}; 