import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageLoader from '../components/PageLoader'

function Start() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for background image
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader show={isLoading} text="Loading Uber..." />
      <div
        className='h-screen flex flex-col justify-between bg-cover bg-center relative
        bg-[url("https://res.cloudinary.com/dvkzdok8c/image/upload/v1753945156/Gemini_Generated_Image_sf4xgmsf4xgmsf4x_qgw4z5.png")]'
      >
        {/* Top logo */}
        <div>
          <img
            src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753899648/973197ed8d895a3889edc9484185d888_m0q1fc.png'
            alt='logo'
            className='w-40 h-auto'
          />
        </div>

        {/* Bottom card */}
        <div className='bg-white px-6 pb-8 pt-6 rounded-t-3xl shadow-lg w-full max-w-[30rem] mx-auto'>
          <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
            Get Started with Uber
          </h2>
          <Link
            to='/login'
            className='group block w-full text-center bg-black text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 shadow-lg relative overflow-hidden'
          >
            <span className='flex items-center justify-center gap-3'>
              Continue
              <svg
                className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 7l5 5m0 0l-5 5m5-5H6'
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Start
