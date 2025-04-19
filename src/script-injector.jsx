import React from 'react';
import { createRoot } from 'react-dom/client';
import UI from './components/UI';
import { SearchProvider } from './context/SearchContext';
import './index.css';

/**
 * Injects UI container into YouTube video player and renders React app
 * @returns {boolean} Success status
 */
const injectUI = () => {
  // Only run on watch pages
  if (!window.location.pathname.includes('/watch')) {
    return false;
  }
  
  // Return existing container if already present
  const existingContainer = document.getElementById('video-word-search-ui');
  if (existingContainer) {
    return true;
  }
  
  // Find the video player container
  const playerContainer = document.querySelector('#player-container-inner');
  if (!playerContainer) {
    return false;
  }
  
  // Create our container
  const uiContainer = document.createElement('div');
  uiContainer.id = 'video-word-search-ui';
  uiContainer.style.position = 'absolute';
  uiContainer.style.top = '-26px';
  uiContainer.style.left = '48px';
  uiContainer.style.zIndex = '9999999';
  uiContainer.style.pointerEvents = 'auto';
  
  // Add to player container
  playerContainer.appendChild(uiContainer);
  
  // Prevent event bubbling
  uiContainer.addEventListener('click', e => e.stopPropagation());
  
  // Render React app
  try {
    const root = createRoot(uiContainer);
    root.render(
      <SearchProvider>
        <UI />
      </SearchProvider>
    );
    return true;
  } catch {
    return false;
  }
};

// Initialize extension
(() => {
  // Track URL for SPA navigation
  let lastUrl = window.location.href;
  
  // Attempt to inject UI with retries
  const attemptInjection = () => {
    // Try immediate injection
    if (!injectUI()) {
      // Set up retries if failed
      let attempts = 0;
      const retryInterval = setInterval(() => {
        if (injectUI() || ++attempts >= 10) {
          clearInterval(retryInterval);
        }
      }, 1000);
    }
  };
  
  // Handle SPA navigation
  const setupNavigationObserver = () => {
    const observer = new MutationObserver(() => {
      // Check if URL changed
      if (lastUrl !== window.location.href) {
        lastUrl = window.location.href;
        
        // Remove old UI
        const oldUI = document.getElementById('video-word-search-ui');
        if (oldUI) oldUI.remove();
        
        // Try injection again if on a watch page
        if (window.location.pathname.includes('/watch')) {
          setTimeout(attemptInjection, 1000);
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  };
  
  // Start extension
  const init = () => {
    setTimeout(attemptInjection, 1500);
    setupNavigationObserver();
  };
  
  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 