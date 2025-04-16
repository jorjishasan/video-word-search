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
 * Check if any tags are found in the current transcript or if there are search results
 * @param {Object} results - Search results object
 * @returns {boolean} True if any tags are found or if there are search results
 */
export const checkAnyTagsFound = (results) => {
  const foundTagsCount = getFoundTagsCount();
  const hasCurrentResults = results && results.data && results.data.length > 0;
  return foundTagsCount > 0 || hasCurrentResults;
};

/**
 * Force a re-render of components listening for tag count changes
 * @param {number} count - The count to update
 */
export const notifyTagCountChanged = (count) => {
  // Update localStorage
  localStorage.setItem('foundTagsCount', count.toString());
  
  // Dispatch events for cross-tab and same-tab notification
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new CustomEvent(TAGS_COUNT_EVENT, { 
    detail: { count } 
  }));
}; 