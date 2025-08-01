import React from 'react';
import Loader from './Loader';

const PageLoader = ({ text = 'Loading...', show = false }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">

      {/* Uber Logo */}
      <div className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987868/uber_logo_white_ofgrxb.png"
            alt="Uber Logo"
            className="w-28 h-auto opacity-95"
          />
        </div>

      {/* Main loader container */}
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-10 sm:p-12 max-w-sm w-full mx-4 border border-white/5">
        
        {/* Loading content */}
        <div className="text-center">
          <div className="relative inline-block">
            <Loader size="lg" text="" />
            {/* Subtle ring effect */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>
          </div>
          
          <p className="text-white/90 text-lg font-medium mt-6 tracking-wide">
            {text}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default PageLoader;