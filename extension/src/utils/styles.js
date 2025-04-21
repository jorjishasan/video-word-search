/**
 * Common reusable style objects across the application
 */

// Colors from tailwind.config.js
export const COLORS = {
  brand: '#4CAF50',
  accent: '#ff0044',
  bg: {
    primary: '#1a1a1a',
    secondary: '#2a2a2a',
    highlight: '#2a363c',
    interactive: '#4a4a4a',
  },
  content: {
    primary: '#ffffff',
    secondary: '#8b9398',
    tertiary: '#666666',
  },
  feedback: {
    error: '#ff6b6b', // Used for text
    errorBg: '#ff6b6b', // Assuming errorBg maps to error color if not defined
    success: '#4CAF50',
  },
  // Standard Tailwind Grays (approximations)
  gray: {
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7281',
    600: '#4b5563',
    800: '#1f2937',
  },
  // Other colors used
  red: {
    500: '#ef4444',
  },
  green: {
    600: '#16a34a',
  },
  tag: {
    found: '#22c55e',
    foundHover: '#16a34a',
    notFound: '#ff5555',
    notFoundHover: '#e64c4c',
  },
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
};

// Border Radius from tailwind.config.js
export const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  full: '9999px',
};

// Common Flexbox styles
export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const flexBetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

// Base Input styling
export const INPUT_STYLE_BASE = {
  width: '100%',
  paddingTop: '1rem', // py-4
  paddingBottom: '1rem', // py-4
  paddingLeft: '2rem', // px-8
  paddingRight: '2rem', // px-8
  backgroundColor: COLORS.bg.secondary,
  border: 'none',
  fontSize: '16px',
  color: COLORS.content.primary,
  letterSpacing: '-0.05em', // tracking-tighter
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'monospace',
  // Placeholder styling needs to be handled via CSS or specific component logic
};

// Results container styling (Scrollbar styles are global in index.css)
export const RESULTS_CONTAINER_STYLE = {
  maxHeight: '400px',
  overflowY: 'auto',
};

// Base Status message styling
const STATUS_MESSAGE_BASE = {
  padding: '0.375rem', // Assuming p-md maps to md spacing
  textAlign: 'center',
  fontFamily: 'monospace', // Ensure monospace
};

// Loading message styling
export const LOADING_MESSAGE_STYLE = {
  ...STATUS_MESSAGE_BASE,
  color: COLORS.content.secondary,
  backgroundColor: COLORS.bg.primary,
};

// Error message styling
export const ERROR_MESSAGE_STYLE = {
  ...STATUS_MESSAGE_BASE,
  color: COLORS.feedback.error,
  backgroundColor: COLORS.bg.primary,
};

// Error notification styling (Example - adjust as needed if used)
export const ERROR_NOTIFICATION_STYLE = {
  backgroundColor: COLORS.feedback.errorBg, // Assuming errorBg maps to error color
  color: COLORS.content.primary,
  padding: '0.25rem', // p-sm
  marginLeft: '0.375rem', // mx-md
  marginRight: '0.375rem', // mx-md
  marginTop: '0.125rem', // my-xs (assuming xs = 0.125rem)
  marginBottom: '0.125rem', // my-xs
  borderRadius: '0.375rem', // rounded-md
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.75rem', // text-xs
  fontFamily: 'monospace', // Ensure monospace
};

// Error close button styling (Example - adjust as needed if used)
export const ERROR_CLOSE_BUTTON_STYLE = {
  backgroundColor: COLORS.transparent,
  border: 'none',
  color: COLORS.content.primary,
  cursor: 'pointer',
  fontSize: '1rem', // text-base
  marginLeft: '0.25rem', // ml-sm
  paddingTop: 0, // py-0
  paddingBottom: 0, // py-0
  paddingLeft: '0.125rem', // px-xs (assuming xs = 0.125rem)
  paddingRight: '0.125rem', // px-xs
  fontFamily: 'monospace', // Ensure monospace
};

// Common Text Sizes
export const text = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  base: { fontSize: '1rem', lineHeight: '1.5rem' },
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
  '12px': { fontSize: '12px' },
  '14px': { fontSize: '14px' },
  '16px': { fontSize: '16px' },
};

// Common Transitions
export const transition = {
  all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', // duration-normal ease-in-out
  colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors200: 'color, background-color, border-color, text-decoration-color, fill, stroke 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Common Shadows
export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

// Global styles - moved from index.css
export const createGlobalStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    body {
      margin: 0;
      font-family: monospace, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: ${COLORS.bg.primary};
      color: ${COLORS.content.primary};
    }

    /* Custom Scrollbar Styles */
    .scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .scrollbar::-webkit-scrollbar-track {
      background-color: ${COLORS.bg.primary};
    }

    .scrollbar::-webkit-scrollbar-thumb {
      background-color: ${COLORS.bg.highlight};
      border-radius: 4px;
    }

    /* Style for input placeholders */
    input::placeholder {
      color: ${COLORS.content.tertiary};
      font-family: monospace;
      opacity: 1;
    }

    /* Firefox */
    input::-moz-placeholder {
      color: ${COLORS.content.tertiary};
      font-family: monospace;
      opacity: 1;
    }

    /* Edge */
    input:-ms-input-placeholder {
      color: ${COLORS.content.tertiary};
      font-family: monospace;
      opacity: 1;
    }

    /* Internet Explorer 10-11 */
    input::-ms-input-placeholder {
      color: ${COLORS.content.tertiary};
      font-family: monospace;
      opacity: 1;
    }
    
    /* Search result hover effect */
    .search-result-hover:hover {
      background-color: ${COLORS.bg.secondary} !important;
    }
  `;
  
  return styleElement;
};