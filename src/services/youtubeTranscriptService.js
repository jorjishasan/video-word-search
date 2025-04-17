/**
 * Service for fetching and processing YouTube transcript data
 */
import { safeGetItem, safeSetItem, safeParseJSON } from '../utils/storageUtils';
import { notifyTagCountChanged } from '../utils/tagUtils';

// Local storage keys
const TRANSCRIPT_KEY = 'ytTranscript';
const LAST_VIDEO_ID_KEY = 'lastVideoId';
const HAS_TRANSCRIPT_KEY = 'hasTranscript';

// Custom event names for communication
export const TRANSCRIPT_LOADED_EVENT = 'transcript_loaded';
export const VIDEO_CHANGED_EVENT = 'video_changed';

/**
 * Fetches the transcript for a YouTube video
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object|null>} - Transcript mapping data or null if not available
 */
export const fetchYoutubeTranscript = async (videoId) => {
  try {
    // Check if we already have this transcript
    const lastVideoId = localStorage.getItem(LAST_VIDEO_ID_KEY);
    const cachedTranscript = localStorage.getItem(TRANSCRIPT_KEY);
    
    // Only fetch transcript in two conditions:
    // 1. If lastVideoId is null (first time using)
    // 2. If current videoId doesn't match lastVideoId (video changed)
    if (lastVideoId === videoId && cachedTranscript && lastVideoId !== null) {
      // Video hasn't changed, use cached transcript
      dispatchTranscriptEvent(TRANSCRIPT_LOADED_EVENT, videoId, safeParseJSON(cachedTranscript, {}));
      return safeParseJSON(cachedTranscript, {});
    }
    
    // Update last video ID even if we fail to get transcript
    localStorage.setItem(LAST_VIDEO_ID_KEY, videoId);
    
    // Fetch from YouTube if not cached or different video
    const re = /ytInitialPlayerResponse\s*=\s*({.+?})\s*;/;
    let player;
    
    // Try to use window.ytInitialPlayerResponse if available
    if (window.ytInitialPlayerResponse && window.ytInitialPlayerResponse.videoDetails?.videoId === videoId) {
      player = window.ytInitialPlayerResponse;
    } else {
      // Fetch from YouTube
      const text = await fetch(`https://www.youtube.com/watch?v=${videoId}`).then(r => r.text());
      const match = re.exec(text);
      if (!match) {
        // No player response found - mark as no transcript
        localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
        dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
        return null;
      }
      player = safeParseJSON(match[1], null);
      if (!player) {
        localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
        dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
        return null;
      }
    }
    
    const tracks = player.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    const track = tracks.find(t => t.languageCode === "en") || tracks[0];
    
    if (!track) {
      // No caption track available - mark as no transcript
      localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
      dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
      return null;
    }
    
    // Try to fetch the transcript
    try {
      const transcript = await fetch(`${track.baseUrl}&fmt=json3`).then(r => r.json());
      const mapping = transcript.events
        .filter(e => e.segs && e.tStartMs != null)
        .reduce((map, e) => {
          const sec = Math.floor(e.tStartMs / 1000);
          const h = String(Math.floor(sec / 3600)).padStart(2, "0");
          const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
          const s = String(sec % 60).padStart(2, "0");
          map[`${h}:${m}:${s}`] = e.segs.map(seg => seg.utf8).join(" ").trim();
          return map;
        }, {});
      
      // Check if mapping is valid and not empty
      if (Object.keys(mapping).length === 0) {
        localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
        dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
        return null;
      }
      
      // Save to localStorage
      safeSetItem(TRANSCRIPT_KEY, mapping);
      localStorage.setItem(HAS_TRANSCRIPT_KEY, 'true');
      
      // Check for auto search tags and update UI
      updateAutoSearchTags(mapping, videoId);
      
      // Notify components that transcript is loaded
      dispatchTranscriptEvent(TRANSCRIPT_LOADED_EVENT, videoId, mapping);
      
      return mapping;
    } catch (transcriptError) {
      console.warn("Error fetching transcript:", transcriptError);
      localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
      dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
      return null;
    }
  } catch (error) {
    console.warn("Error fetching YouTube transcript:", error);
    localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
    dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
    return null;
  }
};

/**
 * Update auto search tags and found count when transcript is loaded
 * @param {Object} transcript - Transcript mapping
 * @param {string} videoId - YouTube video ID
 */
const updateAutoSearchTags = (transcript, videoId) => {
  try {
    // Get saved tags
    const tags = safeGetItem('autoSearchTags', []);
    if (!tags || tags.length === 0) return;
    
    // Check each tag against transcript
    const updatedTags = tags.map(tag => {
      const results = searchTranscript(tag.word, transcript, videoId, true);
      return {
        ...tag,
        found: results.length > 0
      };
    });
    
    // Update tags in localStorage
    safeSetItem('autoSearchTags', updatedTags);
    
    // Update found count
    const foundCount = updatedTags.filter(tag => tag.found).length;
    notifyTagCountChanged(foundCount);
    
    // Update button color (needs to be moved to a UI component)
    updateButtonColor(foundCount);
  } catch (error) {
    console.warn("Error updating auto search tags:", error);
  }
};

/**
 * Updates UI button background based on found tags and transcript availability
 * @param {number} count - Number of found tags
 */
const updateButtonColor = (count) => {
  const button = document.querySelector('button[title="Open Video Word Search"]');
  if (!button) return;
  
  const hasTranscriptValue = localStorage.getItem(HAS_TRANSCRIPT_KEY) === 'true';
  
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
};

/**
 * Checks if the current video has a transcript available
 * @returns {boolean} - True if transcript is available
 */
export const hasTranscript = () => {
  return localStorage.getItem(HAS_TRANSCRIPT_KEY) === 'true';
};

/**
 * Dispatch a custom event to notify the UI about transcript or video changes
 * @param {string} eventName - Name of the event to dispatch
 * @param {string} videoId - YouTube video ID
 * @param {Object} transcript - Transcript data
 */
const dispatchTranscriptEvent = (eventName, videoId, transcript) => {
  try {
    window.dispatchEvent(new CustomEvent(eventName, {
      detail: {
        videoId,
        timestamp: Date.now(),
        transcriptSize: transcript ? Object.keys(transcript).length : 0
      }
    }));
  } catch (error) {
    console.error(`Error dispatching ${eventName} event:`, error);
  }
};

/**
 * Searches for a word in the transcript
 * @param {string} searchWord - Word to search for
 * @param {Object} transcript - Transcript mapping data
 * @param {string} videoId - YouTube video ID
 * @param {boolean} isExactWordMatch - If true, only match exact words (for autoSearch), otherwise do substring matching (for wordSearch)
 * @returns {Array} - Search results
 */
export const searchTranscript = (searchWord, transcript, videoId, isExactWordMatch = false) => {
  if (!searchWord || !transcript) return [];
  
  const results = [];
  const searchWordLower = searchWord.toLowerCase().trim();
  
  // For each timestamp in the transcript
  Object.entries(transcript).forEach(([timestamp, text]) => {
    const textLower = text.toLowerCase();
    
    if (isExactWordMatch) {
      // For AutoSearch: Exact word match (ignoring case)
      try {
        // Escape special regex characters in the search word
        const escapedSearchWord = searchWordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Create a regex to match whole words only
        const wordBoundaryRegex = new RegExp(`\\b${escapedSearchWord}\\b`, 'i');
        
        if (wordBoundaryRegex.test(textLower)) {
          results.push({
            word: searchWord,
            context: text,
            timestamp: timestamp,
            videoId: videoId
          });
        }
      } catch (error) {
        // If regex fails, fall back to simple includes check
        if (textLower.includes(searchWordLower)) {
          results.push({
            word: searchWord,
            context: text,
            timestamp: timestamp,
            videoId: videoId
          });
        }
      }
    } else {
      // For WordSearch: Substring match, phrase match, and word match
      if (textLower.includes(searchWordLower)) {
        results.push({
          word: searchWord,
          context: text,
          timestamp: timestamp,
          videoId: videoId
        });
      }
    }
  });
  
  // Sort results by timestamp
  return results.sort((a, b) => {
    // Convert timestamp (HH:MM:SS) to seconds for comparison
    const getSeconds = (timestamp) => {
      const [hours, minutes, seconds] = timestamp.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
    
    return getSeconds(a.timestamp) - getSeconds(b.timestamp);
  });
};

/**
 * Gets the current YouTube video ID from URL
 * @returns {string|null} - YouTube video ID or null
 */
export const getCurrentVideoId = () => {
  return new URLSearchParams(window.location.search).get("v");
};

/**
 * Handle navigation events to update hasTranscript correctly
 */
const setupNavigationListeners = () => {
  // Function to check if the current video has a transcript and update hasTranscript
  const checkCurrentVideo = () => {
    const videoId = getCurrentVideoId();
    
    // If not on a video page, reset hasTranscript
    if (!videoId) {
      localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
      localStorage.setItem('foundTagsCount', '0');
      return;
    }
    
    // Check if we're on a different video than before
    const lastVideoId = localStorage.getItem(LAST_VIDEO_ID_KEY);
    if (videoId !== lastVideoId) {
      // Default to no transcript until we verify one exists
      localStorage.setItem(HAS_TRANSCRIPT_KEY, 'false');
      localStorage.setItem('foundTagsCount', '0');
      
      // Notify listeners that video changed
      dispatchTranscriptEvent(VIDEO_CHANGED_EVENT, videoId, null);
    }
  };
  
  // Listen for navigation events
  window.addEventListener('popstate', checkCurrentVideo);
  window.addEventListener('yt-navigate-finish', checkCurrentVideo);
  
  // Also check periodically for SPA navigation
  let lastUrl = window.location.href;
  setInterval(() => {
    if (lastUrl !== window.location.href) {
      lastUrl = window.location.href;
      checkCurrentVideo();
    }
  }, 1000);
};

// Set up navigation listeners
setupNavigationListeners(); 