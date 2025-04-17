/**
 * Service for controlling YouTube video playback
 */

/**
 * Seeks the YouTube player to a specific timestamp
 * @param {string} timestamp - Timestamp in format HH:MM:SS
 * @returns {boolean} - Success status
 */
export const seekToTimestamp = (timestamp) => {
  try {
    // Convert timestamp (HH:MM:SS) to seconds
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Check if we're on YouTube
    const isYouTubeDomain = window.location.hostname.includes('youtube.com');

    // Method 1: Use our custom communication channel
    // This works both when our extension runs on YouTube directly
    // or if our app is running elsewhere and needs to communicate with YouTube
    window.postMessage({
      type: 'YOUTUBE_WORD_SEARCH_SEEK',
      timestamp: totalSeconds
    }, '*');
    
    // If we're not on YouTube domain, that's the best we can do
    if (!isYouTubeDomain) {
      return true; // We did our best
    }
    
    // Method 2: Direct access to our exposed API helper
    if (window.YOUTUBE_WORD_SEARCH_PLAYER_API && window.YOUTUBE_WORD_SEARCH_PLAYER_API.available) {
      return true; // The listener will handle the actual seek
    }
    
    // Method 3: Try to find the YouTube player directly
    const player = document.querySelector('#movie_player');
    if (player && typeof player.seekTo === 'function') {
      player.seekTo(totalSeconds);
      return true;
    }
    
    // Method 4: Last resort - find the video element
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = totalSeconds;
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}; 