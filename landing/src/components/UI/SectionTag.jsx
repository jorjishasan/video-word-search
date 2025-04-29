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
      <div className={`inline-block uppercase px-4 py-1.5 rounded-full ${bgColor} ${textColor} text-xs font-bold mb-4 backdrop-blur-sm ${className}`}>
        {children}
      </div>
    );
  }
);

SectionTag.displayName = 'SectionTag';

export default SectionTag;