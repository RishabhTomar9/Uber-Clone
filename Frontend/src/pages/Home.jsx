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
          <div className='flex-1 h-screen flex flex-col justify-center items-center px-6 py-8'>
            <h1 className='text-4xl font-bold text-center text-white'>Welcome, {user.fullName.firstName} {user.fullName.lastName}</h1>
            <button className='bg-white text-black px-4 py-2 rounded-md' onClick={() => navigate('/user/logout')}>Logout</button>
          </div>
      </div>
    </>
  )
}

export default Home