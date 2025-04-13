/**
 * Service for fetching and processing YouTube transcript data
 */

// Local storage keys
const TRANSCRIPT_KEY = 'ytTranscript';
const LAST_VIDEO_ID_KEY = 'lastVideoId';

/**
 * Fetches the transcript for a YouTube video
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} - Transcript mapping data
 */
export const fetchYoutubeTranscript = async (videoId) => {
  try {
    // Check if we already have this transcript
    const lastVideoId = localStorage.getItem(LAST_VIDEO_ID_KEY);
    const cachedTranscript = localStorage.getItem(TRANSCRIPT_KEY);
    
    // Return cached transcript if it's for the same video
    if (lastVideoId === videoId && cachedTranscript) {
      return JSON.parse(cachedTranscript);
    }
    
    // Fetch from YouTube if not cached or different video
    const re = /ytInitialPlayerResponse\s*=\s*({.+?})\s*;/;
    let player;
    
    // Try to use window.ytInitialPlayerResponse if available
    if (window.ytInitialPlayerResponse && window.ytInitialPlayerResponse.videoDetails.videoId === videoId) {
      player = window.ytInitialPlayerResponse;
    } else {
      // Fetch from YouTube
      const text = await fetch(`https://www.youtube.com/watch?v=${videoId}`).then(r => r.text());
      const match = re.exec(text);
      if (!match) {
        console.warn("Player response not found");
        return null;
      }
      player = JSON.parse(match[1]);
    }
    
    const tracks = player.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    const track = tracks.find(t => t.languageCode === "en") || tracks[0];
    
    if (!track) {
      console.warn("No caption track available");
      return null;
    }
    
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
    
    // Save to localStorage
    localStorage.setItem(TRANSCRIPT_KEY, JSON.stringify(mapping));
    localStorage.setItem(LAST_VIDEO_ID_KEY, videoId);
    
    return mapping;
  } catch (error) {
    console.error("Error fetching YouTube transcript:", error);
    return null;
  }
};

/**
 * Searches for a word in the transcript
 * @param {string} searchWord - Word to search for
 * @param {Object} transcript - Transcript mapping data
 * @param {string} videoId - YouTube video ID
 * @returns {Array} - Search results
 */
export const searchTranscript = (searchWord, transcript, videoId) => {
  if (!searchWord || !transcript) return [];
  
  const results = [];
  const searchWordLower = searchWord.toLowerCase();
  
  // For each timestamp in the transcript
  Object.entries(transcript).forEach(([timestamp, text]) => {
    const textLower = text.toLowerCase();
    
    // Check if the search word is in the text
    if (textLower.includes(searchWordLower)) {
      // Create context (the text with the search word)
      results.push({
        word: searchWord,
        context: text,
        timestamp,
        videoId
      });
    }
  });
  
  return results;
};

/**
 * Gets the current YouTube video ID from URL
 * @returns {string|null} - YouTube video ID or null
 */
export const getCurrentVideoId = () => {
  return new URLSearchParams(window.location.search).get("v");
}; 