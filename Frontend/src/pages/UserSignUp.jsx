import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import PageLoader from '../components/PageLoader';
import Loader from '../components/Loader';


const UserSignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const {user, setUser} = useUser();

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

    setIsLoading(true);

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      emailAddress: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone
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
        setPhone('');
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Sign Up..." />
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
                  
                  {/* Name Fields */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label htmlFor='firstName' className='block text-sm font-medium text-white/90'>
                        First Name
                      </label>
                      <input 
                        id='firstName'
                        type="text" 
                        placeholder='Enter your first name' 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className='space-y-2'>
                      <label htmlFor='lastName' className='block text-sm font-medium text-white/90'>
                        Last Name
                      </label>
                      <input 
                        id='lastName'
                        type="text" 
                        placeholder='Enter your last name' 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className='space-y-2'>
                    <label htmlFor='phone' className='block text-sm font-medium text-white/90'>
                      Phone Number
                    </label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70'>
                        +91
                      </span>
                      <input 
                        id='phone'
                        type="tel" 
                        maxLength={10}
                        placeholder='Enter your phone number'
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || (value.length === 1 && /^[6-9]$/.test(value)) || (value.length > 1 && /^[6-9][0-9]*$/.test(value))) {
                            setPhone(value);
                          }
                        }}
                        className='w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FiLock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold text-white'>Password Information</h3>
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

                  {/* Confirm Password Field */}
                  <div className='space-y-2'>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium text-white/90'>
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <input 
                        id='confirmPassword'
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder='Confirm your password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12'
                        required
                        disabled={isLoading}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200'
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-center space-x-2 mb-4'>
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    disabled={isLoading}
                    className="w-10 h-10 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 mt-1"
                  />
                  <label htmlFor="terms" className='text-white/70 text-md'>
                    I agree to Uber's <span className='text-blue-500 underline cursor-pointer'>Terms & Conditions</span> and <span className='text-blue-500 underline cursor-pointer'>Privacy Policy</span>
                  </label>
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
                      Creating Account...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center gap-3'>
                      <FiLock className='w-5 h-5' />
                      Create Account
                      <FiArrowRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2' />
                    </span>
                  )}
                </button>

                {/* Login Link */}
                <div className='text-center'>
                  <p className='text-white/70 text-md'>
                    Already have an account?{' '}
                    <Link 
                      to='/login' 
                      className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 text-md' 
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <p className='text-xs sm:text-sm leading-tight pt-3 sm:pt-4 text-white px-4'>
            *This site is protected by reCAPTCHA and the <span className='text-blue-500 underline cursor-pointer'>Google Privacy Policy</span> and <span className='text-blue-500 underline cursor-pointer'>Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </>
  )
}

export default UserSignUp