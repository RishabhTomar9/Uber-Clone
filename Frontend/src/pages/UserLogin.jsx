import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight, FiTruck } from 'react-icons/fi'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import PageLoader from '../components/PageLoader';
import Loader from '../components/Loader';


const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields!');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsLoading(true);

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
        
        // Reset form only on success
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('User login error:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors from backend
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        alert(`Login failed:\n${errorMessages}`);
      } else if (error.response && error.response.data && error.response.data.message) {
        // Handle other backend errors
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Login..." />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-800 to-black">
        {/* Header with Logo */}
        <div className='flex-1 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-4 sm:py-8'>
          <div className='mb-6 sm:mb-8 flex flex-col items-center gap-2 text-black'>
            <img
              src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987868/uber_logo_white_ofgrxb.png'
              alt='logo'
              className='w-50 h-auto'
            />
          </div>

          {/* Login Form Card */}
          <div className='w-full max-w-md'>
            <div className='bg-transparent border border-white bg-opacity-5 backdrop-blur-[3px] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8'>
              <h2 className='text-xl sm:text-2xl font-bold text-center mb-6 text-white'>
                Login
              </h2>
              
              <form className='space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
                {/* Login Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold text-white'>User Login</h3>
                  </div>
                  
                  {/* Email Field */}
                  <div className='space-y-2'>
                    <label htmlFor='email' className='block text-sm font-medium text-white/90'>
                      Email Address
                    </label>
                    <input 
                      id='email'
                      type="email" 
                      placeholder='Enter your email address' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password Field */}
                  <div className='space-y-2'>
                    <label htmlFor='password' className='block text-sm font-medium text-white/90'>
                      Password
                    </label>
                    <div className='relative'>
                      <input 
                        id='password'
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Enter your password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12'
                        required
                        disabled={isLoading}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200'
                        disabled={isLoading}
                      >
                        {showPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center gap-3'>
                      <Loader size="sm" text="" />
                      Logging in...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center gap-3'>
                      <FiLock className='w-5 h-5' />
                      Login
                      <FiArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2' />
                    </span>
                  )}
                </button>

                <div className='space-y-2 text-center text-white'>
                  <p className='text-xs sm:text-sm leading-tight pt-3 sm:pt-4 px-4'>
                    By signing in, you agree to Uber's <span className='text-blue-500 underline cursor-pointer'>Terms & Conditions</span> and <span className='text-blue-500 underline cursor-pointer'>Privacy Policy</span>
                  </p> 
                </div>

                

                {/* Sign Up Link */}
                <div className='text-center'>
                  <p className='text-white/70 text-md'>
                    Don't have an account?{' '}
                    <Link 
                      to='/signup' 
                      className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 text-md'
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Login as Caption Link */}
          <div className='text-center mt-6 w-full mb-2'>
                  <Link 
                    to='/caption-login' 
                    className='group w-full max-w-md bg-white text-black py-4 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg relative overflow-hidden mt-4 sm:mt-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3'>
                    <FiTruck className='w-6 h-6' />
                    Login as Caption
                  </Link>
                </div>

                <p className='text-sm sm:text-sm leading-tight pt-3 sm:pt-4 text-white px-4'>
          *This site is protected by reCAPTCHA and the <span className='text-blue-500 underline'>Google Privacy Policy</span> and <span className='text-blue-500 underline'>Terms of Service</span> apply.
        </p>
        </div>
      </div>
    </>
  )
}

export default UserLogin