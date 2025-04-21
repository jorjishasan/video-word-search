import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing search input across different tabs
 * @param {string} searchWord - Current search word
 * @param {function} setSearchWord - Function to update search word
 * @param {function} handleSearch - Function to trigger search
 * @param {number} activeTab - Current active tab
 * @param {number} tabIndex - Tab index that this component belongs to
 * @param {string} placeholder - Placeholder text for the input
 * @returns {Object} - Input props and handlers
 */
export const useSearchInput = (
  searchWord, 
  setSearchWord, 
  handleSearch, 
  activeTab, 
  tabIndex,
  placeholder = "Enter search term..."
) => {
  const inputRef = useRef(null);
  
  // Auto-focus input when this tab is active
  useEffect(() => {
    if (activeTab === tabIndex && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab, tabIndex]);

  // Handle key press events
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && searchWord && searchWord.trim()) {
      handleSearch(searchWord);
    }
  }, [searchWord, handleSearch]);

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    setSearchWord(e.target.value);
  }, [setSearchWord]);

  // Get props for the input element
  const getInputProps = useCallback(() => ({
    ref: inputRef,
    type: "text",
    placeholder,
    value: searchWord || '',
    onChange: handleInputChange,
    onKeyDown: handleKeyDown
  }), [searchWord, handleInputChange, handleKeyDown, placeholder]);

  return {
    inputRef,
    handleKeyDown,
    handleInputChange,
    getInputProps
  };
}; 