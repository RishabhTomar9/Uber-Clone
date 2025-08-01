import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Loader = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <FiLoader className="w-full h-full text-white" />
      </div>
      {text && (
        <p className="text-white text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader; 