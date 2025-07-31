import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'

function CaptionLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [captionData, setCaptionData] = useState({email: '', password: ''});
  const handleSubmit = (e) => {
    e.preventDefault();
   setEmail('');
   setPassword('');
   setCaptionData({email:email, password:password});
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col bg-[url("https://res.cloudinary.com/dvkzdok8c/image/upload/v1753988750/photo-1593950315186-76a92975b60c_ju8wyi.jpg")] bg-cover'>
      {/* Header with Logo */}
      <div className='flex-1 h-screen flex flex-col justify-center items-center px-6 py-8'>
        <div className='mb-8 flex flex-col items-center gap-2 text-white'>
          <img
            src='https://res.cloudinary.com/dvkzdok8c/image/upload/v1753987868/uber_logo_white_ofgrxb.png'
            alt='logo'
            className='w-28 h-auto'
          />
          <h2 className='text-xl font-bold'>Caption</h2>
        </div>

        {/* Login Form Card */}
        <div className='w-full max-w-md'>
          <div className='bg-transparent border border-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-center mb-8 text-white'>
              Sign In
            </h2>
            
            <form className='space-y-6' onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-semibold text-white mb-2'>
                  Email Address
                </label>
                <input 
                  id='email'
                  type="email" 
                  placeholder='example@gmail.com' 
                  required 
                  className='w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-10 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {/* Forgot Password Link */}
              {/* <div className='text-right'>
                <a href='#' className='text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200'>
                  Forgot password?
                </a>
              </div> */}

              {/* Submit Button */}
              <button 
                type='submit'
                className='group w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 shadow-lg relative overflow-hidden'
              >
                <span className='flex items-center justify-center gap-3'>
                  Sign In
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
              </button>
            </form>

            {/* Sign Up Link */}
            <div className='mt-6 text-center'>
              <p className='text-white'>
                Join as a Caption?  {' '}
                <a href='/caption-signup' className='text-white hover:text-black font-bold transition-colors duration-200'>
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
      <Link to='/login' className='group w-full bg-white text-black py-4 px-6 rounded-xl font-semibold text-lg relative overflow-hidden mt-15'>
        <span className='flex items-center justify-center gap-3'>
          Login as User
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
  )
}

export default CaptionLogin