import React, { useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const Home = () => {
  const navigate = useNavigate();
  const {user} = React.useContext(UserContext);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  console.log(user);
  
  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Home..." />
      <div className='min-h-screen bg-gray-50 flex flex-col bg-[url("https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987846/photo-1558062952-80650362c509_bh94b6.jpg")] bg-cover bg-center'>
          <div className='flex-1 h-screen flex flex-col justify-center items-center px-6 py-8'>
            <img
              src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987868/uber_logo_white_ofgrxb.png'
              alt='logo'
              className='w-50 h-auto'
            />
          </div>
          <div className='flex-1 h-screen flex flex-col justify-center items-center px-6 py-8 space-y-6'>
            <div className='bg-black/50 p-8 rounded-xl backdrop-blur-sm'>
              <h1 className='text-4xl font-bold text-center text-white mb-6'>Welcome, {user.fullName.firstName} {user.fullName.lastName}</h1>
              
              <div className='space-y-4 text-white'>
                <p className='text-lg'><span className='font-semibold'>Email:</span> {user.email}</p>
                <p className='text-lg'><span className='font-semibold'>Created At:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className='text-lg'><span className='font-semibold'>Account Type:</span> User</p>
              </div>
            </div>
            
            <button 
              className='bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200' 
              onClick={() => navigate('/user/logout')}
            >
              Logout
            </button>
          </div>
      </div>
    </>
  )
}

export default Home