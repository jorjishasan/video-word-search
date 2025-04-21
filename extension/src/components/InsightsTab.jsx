import React from 'react';
// Import style objects and colors
import { RESULTS_CONTAINER_STYLE, COLORS } from '../utils/styles';

/**
 * InsightsTab component - currently shows only a coming soon message
 * @returns {JSX.Element} - Rendered component
 */
const InsightsTab = () => {
  // Styles
  const containerStyle = {
    ...RESULTS_CONTAINER_STYLE, // Apply base container styles
    // Add scrollbar class for global CSS
  };

  const messageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16rem', // h-64
    fontSize: '1.125rem', // text-lg
    fontWeight: '500', // font-medium
    color: COLORS.gray[500], // text-gray-500
    // fontFamily: 'monospace', // Handled globally
  };

  return (
    // Add className="scrollbar" here
    <div style={containerStyle} className="scrollbar">
      <div style={messageStyle}>
        Coming soon
      </div>
    </div>
  );
};

export default InsightsTab;