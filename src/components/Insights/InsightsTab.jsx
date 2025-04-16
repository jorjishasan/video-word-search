import React from 'react';
import { RESULTS_CONTAINER } from '../../utils/styles';

/**
 * InsightsTab component - currently shows only a coming soon message
 * @returns {JSX.Element} - Rendered component
 */
const InsightsTab = () => {
  return (
    <div className={RESULTS_CONTAINER}>
      <div className="flex items-center justify-center h-64 text-lg font-medium text-gray-500">
        Coming soon
      </div>
    </div>
  );
};

export default InsightsTab; 