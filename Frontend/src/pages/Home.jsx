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
      <div className='h-screen relative'>
        <img src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753899648/973197ed8d895a3889edc9484185d888_m0q1fc.png' alt='logo' className='w-30 absolute left-3 top-3' />

        <div className='h-screen w-screen'>
          {/* image for temporary use */}
          <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' />
        </div>

        <div className='bg-white absolute top-0 w-full'>
          <h4>Find a Trip</h4>
          <form>
            <input type="text" placeholder='Add a pick-up location' />
            <input type="text" placeholder='Enter your destination' />
          </form>
        </div>
      </div>
    </>
  )
}

export default Home