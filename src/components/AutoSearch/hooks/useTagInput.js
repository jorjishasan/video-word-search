import { useState, useCallback } from 'react';
import { useSearchInput } from '../../../hooks/useSearchInput';

/**
 * Custom hook for managing tag input in the AutoSearchTab
 * @param {number} activeTab - Current active tab
 * @param {function} addTag - Function to add a tag
 * @param {function} setSearchWord - Function to update search word in context
 * @returns {Object} - Input props and handlers
 */
export const useTagInput = (activeTab, addTag, setSearchWord) => {
  const [pendingTag, setPendingTag] = useState('');
  
  // Use the shared search input hook, but override some behaviors
  const { inputRef } = useSearchInput(
    pendingTag,
    setPendingTag,
    () => {}, // We handle search differently for tags
    activeTab,
    1 // tabIndex for AutoSearchTab
  );

  // Handle key events specifically for adding tags
  const handleKeyDown = useCallback((e) => {
    if ((e.key === 'Enter' || e.key === ',') && pendingTag) {
      e.preventDefault();
      addTag(pendingTag);
      setPendingTag('');
      setSearchWord('');
    }
  }, [pendingTag, addTag, setSearchWord]);

  // Handle input changes including comma-separated values
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    if (value.includes(',')) {
      const parts = value.split(',');
      const lastPart = parts.pop().trim();
      parts.forEach(part => part.trim() && addTag(part));
      setPendingTag(lastPart);
      setSearchWord(lastPart);
    } else {
      setPendingTag(value);
      setSearchWord(value);
    }
  }, [addTag, setSearchWord]);

  // Reset input value (used when transcript changes)
  const resetInput = useCallback(() => {
    setPendingTag('');
  }, []);

  return {
    pendingTag,
    inputRef,
    handleKeyDown,
    handleInputChange,
    resetInput
  };
}; 