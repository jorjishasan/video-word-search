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
    console.log(`Attempting to seek to timestamp: ${timestamp}`);
    
    // Convert timestamp (HH:MM:SS) to seconds
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    console.log(`Converted to ${totalSeconds} seconds`);

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
      console.log('Not on YouTube domain, message posted. Check that YouTube tab is open.');
      return true; // We did our best
    }
    
    // Method 2: Direct access to our exposed API helper
    if (window.YOUTUBE_WORD_SEARCH_PLAYER_API && window.YOUTUBE_WORD_SEARCH_PLAYER_API.available) {
      console.log('Using our exposed YouTube player API');
      return true; // The listener will handle the actual seek
    }
    
    // Method 3: Try standard YouTube API approaches
    if (window.yt && window.yt.player) {
      console.log('YouTube API found, trying to access player');
      
      // First try to get the player based on the video element
      if (window.yt.player.getPlayerByElement) {
        const video = document.querySelector('video');
        if (video && video.parentElement) {
          const player = window.yt.player.getPlayerByElement(video.parentElement);
          if (player && typeof player.seekTo === 'function') {
            console.log('Found player via getPlayerByElement');
            player.seekTo(totalSeconds, true);
            if (typeof player.playVideo === 'function') {
              player.playVideo();
            }
            return true;
          }
        }
      }
    }
    
    // Method 4: Direct video element access
    const videoElement = document.querySelector('video');
    if (videoElement) {
      console.log('Found video element, seeking directly');
      videoElement.currentTime = totalSeconds;
      if (videoElement.paused) {
        videoElement.play()
          .catch(e => console.error('Error playing video:', e));
      }
      return true;
    }
    
    console.log('No suitable playback method found');
    return false;
  } catch (error) {
    console.error('Error seeking to timestamp:', error);
    return false;
  }
}; 