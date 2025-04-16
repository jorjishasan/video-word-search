import { useState, useRef, useEffect, useCallback } from 'react';

export const useTagInput = (activeTab, addTag, setSearchWord) => {
  const [pendingTag, setPendingTag] = useState('');
  const inputRef = useRef(null);

  // Auto-focus input when tab is active
  useEffect(() => {
    if (activeTab === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeTab]);

  // Handle key events for adding tags
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