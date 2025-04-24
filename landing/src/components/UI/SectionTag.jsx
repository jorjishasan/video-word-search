'use client';

import React, { memo } from 'react';

const SectionTag = memo(
  ({
    children,
    className = '',
    bgColor = 'bg-primary/15',
    textColor = 'text-primary',
  }) => {
    return (
      <div className={`inline-block px-4 py-1 rounded-full ${bgColor} ${textColor} text-sm font-medium mb-4 backdrop-blur-sm ${className}`}>
        {children}
      </div>
    );
  }
);

SectionTag.displayName = 'SectionTag';

export default SectionTag;