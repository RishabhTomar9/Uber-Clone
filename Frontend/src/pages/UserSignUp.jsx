import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useUser } from '../context/UserContext';
import axios from 'axios';


const UserSignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (password.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    if (firstName.length < 3) {
      alert('First name must be at least 3 characters long!');
      return;
    }
    
    if (lastName.length < 3) {
      alert('Last name must be at least 3 characters long!');
      return;
    }

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
        
        // Reset form only on success
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error('User registration error:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors from backend
        const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
        alert(`Registration failed:\n${errorMessages}`);
      } else if (error.response && error.response.data && error.response.data.message) {
        // Handle other backend errors
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  }

  return (
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

        {/* Sign Up Form Card */}
        <div className='w-full max-w-md'>
          <div className='bg-transparent border border-white bg-opacity-5 backdrop-blur-[3px] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8'>
            <h2 className='text-2xl font-bold text-center mb-6 text-white'>
              Sign Up
            </h2>
            
            <form className='space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <h3 className='text-lg sm:text-xl font-semibold text-white'>Personal Information</h3>
                </div>
                
                {/* Name Fields - Single Column Layout */}
                <div className='space-y-4'>
                  {/* First Name Field */}
                  <div className='space-y-2'>
                    <label htmlFor='firstName' className='block text-sm font-medium text-white/90'>
                      First Name
                    </label>
                    <input 
                      id='firstName'
                      type="text" 
                      placeholder='Enter first name' 
                      required 
                      autoComplete="given-name"
                      className='w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className='space-y-2'>
                    <label htmlFor='lastName' className='block text-sm font-medium text-white/90'>
                      Last Name
                    </label>
                    <input 
                      id='lastName'
                      type="text" 
                      placeholder='Enter last name' 
                      required 
                      autoComplete="family-name"
                      className='w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
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
                    required 
                    autoComplete="email"
                    className='w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Password Field */}
                  <div className="relative space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-white/90">
                      Password
                    </label>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password"
                      required
                      autoComplete="new-password"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 pr-12 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 p-1 transition-colors duration-200"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      required
                      autoComplete="new-password"
                      className={`w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 pr-12 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        confirmPassword && password !== confirmPassword 
                          ? 'border-red-400 focus:ring-red-500' 
                          : ''
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none p-1 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                        <FiAlertCircle className="w-3 h-3" />
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type='submit'
                  className='group w-full bg-gradient-to-r from-zinc-900 to-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-zinc-900 hover:to-zinc-800 active:from-black active:to-zinc-900 transition-all duration-300 shadow-xl relative overflow-hidden touch-manipulation transform hover:scale-[1.02] active:scale-[0.98] border-2 border-white'>
                  <span className='flex items-center justify-center gap-3'>
                    <FiLock className="w-5 h-5" />
                    Create Account
                    <FiArrowRight 
                      className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2' 
                    />
                  </span>
                </button>
                
                {/* Terms and Conditions */}
                <p className="text-xs text-white/70 text-center mt-3 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-300 hover:text-blue-200 underline transition-colors duration-200">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-300 hover:text-blue-200 underline transition-colors duration-200">Privacy Policy</a>
                </p>
              </div>
            </form>

            {/* Login Link */}
            <div className='mt-4 sm:mt-6 text-center'>
              <p className='text-white text-sm sm:text-base'>
                Already have an account?{' '}
                <a href='/login' className='text-white hover:text-blue-800 text-lg sm:text-xl font-bold transition-colors duration-200'>
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <p className='text-xs sm:text-sm leading-tight pt-3 sm:pt-4 text-center text-white px-4'>
          *This site is protected by reCAPTCHA and the <span className='text-blue-500 underline'>Google Privacy Policy</span> and <span className='text-blue-500 underline'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignUp