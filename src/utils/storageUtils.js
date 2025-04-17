/**
 * Utility functions for safe localStorage operations
 */

/**
 * Safely get an item from localStorage and parse JSON
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {any} - Parsed value or default value
 */
export const safeGetItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error retrieving item '${key}' from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely set an item in localStorage as JSON
 * @param {string} key - The localStorage key
 * @param {any} value - Value to store
 * @returns {boolean} - Success status
 */
export const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item '${key}' in localStorage:`, error);
    return false;
  }
};

/**
 * Safely parse JSON
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} - Parsed object or default value
 */
export const safeParseJSON = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}; 