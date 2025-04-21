// Custom event name for tag count changes
export const TAGS_COUNT_EVENT = 'foundTagsCountChanged';

/**
 * Get the current count of found tags from localStorage
 * @returns {number} The count of found tags
 */
export const getFoundTagsCount = () => {
  return parseInt(localStorage.getItem('foundTagsCount') || '0');
};

/**
 * Check if any tags are found in the current transcript
 * Only used for AutoSearch
 * @param {Array} tags - AutoSearch tags array
 * @returns {boolean} True if any tags are found
 */
export const checkAnyTagsFound = (tags = []) => {
  if (!tags || !tags.length) {
    return getFoundTagsCount() > 0;
  }
  return tags.some(tag => tag.found);
};

/**
 * Update tag count in localStorage and notify listeners
 * Only used for AutoSearch
 * @param {number} count - The count to update
 */
export const notifyTagCountChanged = (count) => {
  try {
    // Update localStorage
    localStorage.setItem('foundTagsCount', count.toString());
    
    // Dispatch events for notification
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent(TAGS_COUNT_EVENT, { 
      detail: { count } 
    }));
  } catch (error) {
    console.error('Error in notifyTagCountChanged:', error);
  }
}; 