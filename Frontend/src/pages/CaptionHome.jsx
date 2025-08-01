import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const CaptionHome = () => {
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Caption Home..." />
      <div className='min-h-screen bg-gray-50 flex flex-col bg-[url("https://res.cloudinary.com/dvkzdok8c/image/upload/v1753988750/photo-1593950315186-76a92975b60c_ju8wyi.jpg")] bg-cover bg-center'>
        <div className='flex-1 h-screen flex flex-col justify-center items-center px-6 py-8'>
          <div className='mb-8 flex flex-col items-center gap-2 text-white'>
            <img
              src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987868/uber_logo_white_ofgrxb.png'
              alt='logo'
              className='w-28 h-auto'
            />
          </div>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-4xl font-bold text-white'>Welcome to Caption</h1>
            <p className='text-white'>The best way to get around</p>
          </div>
          <button className='bg-white text-black px-4 py-2 rounded-md' onClick={() => navigate('/caption/logout')}>Logout</button>
        </div>
      </div>  
    </>
  )
}

export default CaptionHome