import React from 'react';

interface HeadingIconProps {
  level: number;
}

export const HeadingIcon: React.FC<HeadingIconProps> = ({ level }) => {
  return (
    <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
      H{level}
    </span>
  );
}; 