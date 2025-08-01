import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiTruck, FiMapPin, FiAlertCircle, FiInfo, FiLock, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useCaption } from '../context/CaptionContext';
import axios from 'axios';


const CaptionSignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Vehicle information fields
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  
  // Location fields
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  const [captionData, setCaptionData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    },
    location: {
      lat: '',
      lng: ''
    }
  });
  const {caption, setCaption} = useCaption();
  const navigate = useNavigate();

  // Function to get current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toFixed(6));
        setLongitude(longitude.toFixed(6));
        setIsLoadingLocation(false);
        setLocationError('');
      },
      (error) => {
        setIsLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access was denied. Please enable location services or enter coordinates manually.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable. Please enter coordinates manually.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again or enter coordinates manually.');
            break;
          default:
            setLocationError('An unknown error occurred while getting location. Please enter coordinates manually.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };
  
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
    
    if (vehicleColor.length < 3) {
      alert('Vehicle color must be at least 3 characters long!');
      return;
    }
    
    if (!vehiclePlate) {
      alert('Vehicle plate number is required!');
      return;
    }
    
    if (!vehicleCapacity || vehicleCapacity < 1) {
      alert('Vehicle capacity must be at least 1!');
      return;
    }
    
    if (!vehicleType) {
      alert('Please select a vehicle type!');
      return;
    }

    // Location validation
    if (!latitude || !longitude) {
      alert('Please provide your location coordinates!');
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      alert('Latitude must be a valid number between -90 and 90!');
      return;
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      alert('Longitude must be a valid number between -180 and 180!');
      return;
    }

    const newCaption = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType
      },
      location: {
        lat: lat,
        lng: lng
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/register`, newCaption);

      if (response.status === 201) {
        const data = response.data;
        setCaption(data.caption);
        localStorage.setItem('captionToken', data.token);
        navigate('/caption/home');
        
        // Reset form only on success
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
        setLatitude('');
        setLongitude('');
        setLocationError('');
        
        // Set caption data
        setCaptionData({
          firstName,
          lastName,
          email,
          password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          },
          location: {
            lat: lat,
            lng: lng
          }
        });
      }
    } catch (error) {
      console.error('Caption registration error:', error);
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
          <h2 className='text-2xl font-bold text-white'>Caption</h2>
        </div>

        {/* Sign Up Form Card */}
        <div className='w-full max-w-md'>
          <div className='bg-transparent border border-white bg-opacity-5 backdrop-blur-[3px] rounded-2xl shadow-lg p-4 sm:p-6 md:p-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white'>
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

              {/* Vehicle Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FiTruck className="w-4 h-4 text-white" />
                  </div>
                  <h3 className='text-lg sm:text-xl font-semibold text-white'>Vehicle Information</h3>
                </div>
                
                {/* Vehicle Details Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Vehicle Color */}
                  <div className="space-y-2">
                    <label htmlFor="vehicleColor" className="block text-sm font-medium text-white/90">
                      Vehicle Color
                    </label>
                    <input 
                      id="vehicleColor"
                      type="text" 
                      placeholder="Enter vehicle color" 
                      required 
                      autoComplete="off"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={vehicleColor}
                      onChange={(e) => setVehicleColor(e.target.value)}
                    />
                  </div>

                  {/* Vehicle Plate */}
                  <div className="space-y-2">
                    <label htmlFor="vehiclePlate" className="block text-sm font-medium text-white/90">
                      Vehicle Number Plate
                    </label>
                    <input 
                      id="vehiclePlate"
                      type="text" 
                      placeholder="Enter vehicle number plate" 
                      required 
                      autoComplete="off"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Vehicle Capacity and Type */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Vehicle Capacity */}
                  <div className="space-y-2">
                    <label htmlFor="vehicleCapacity" className="block text-sm font-medium text-white/90">
                      Passenger Capacity
                    </label>
                    <input 
                      id="vehicleCapacity"
                      type="number" 
                      placeholder="Enter passenger capacity" 
                      required 
                      min="1"
                      autoComplete="off"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                    />
                  </div>

                  {/* Vehicle Type */}
                  <div className="space-y-2">
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-white/90">
                      Vehicle Type
                    </label>
                    <div className="relative">
                      <select
                        id="vehicleType"
                        required
                        className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-lg shadow-sm appearance-none cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent text-base border border-white/20"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option value="" disabled className="text-gray-400">
                          Select vehicle type
                        </option>
                        <option value="car">🚗 Car</option>
                        <option value="bike">🏍️ Bike</option>
                        <option value="auto">🛺 Auto</option>
                        <option value="other">🚐 Other</option>
                      </select>

                      {/* Dropdown icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <FiChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle description */}
                {vehicleType && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 text-white text-sm backdrop-blur-sm shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiInfo className="w-3 h-3 text-blue-300" />
                      </div>
                      <p>
                        {vehicleType === 'car' && '🚗 Perfect for comfortable rides with multiple passengers'}
                        {vehicleType === 'bike' && '🏍️ Great for quick trips and single passengers'}
                        {vehicleType === 'auto' && '🛺 Ideal for short distance rides and city travel'}
                        {vehicleType === 'other' && '🚐 Suitable for special transportation needs'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <FiMapPin className="w-4 h-4 text-white" />
                  </div>
                  <h3 className='text-lg sm:text-xl font-semibold text-white'>Location Information</h3>
                </div>
                
                {/* Get Current Location Button */}
                {!latitude && !longitude && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={isLoadingLocation}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isLoadingLocation
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-zinc-900 to-black text-white hover:from-zinc-900 hover:to-zinc-800 active:from-black active:to-zinc-900 transform hover:scale-105 active:scale-95 border-2 border-white'
                      } shadow-lg`}
                    >
                      {isLoadingLocation ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <FiMapPin className="w-4 h-4" />
                          Get Current Location
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Location Error Message */}
                {locationError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-300 text-sm backdrop-blur-sm">
                    <div className="flex items-start gap-2">
                      <FiAlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p>{locationError}</p>
                    </div>
                  </div>
                )}
                
                {/* Location Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Latitude */}
                  <div className="space-y-2">
                    <label htmlFor="latitude" className="block text-sm font-medium text-white/90">
                      Latitude
                    </label>
                    <input 
                      id="latitude"
                      type="number" 
                      step="any"
                      placeholder="e.g., 40.7128" 
                      required 
                      autoComplete="off"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                    {/* <p className="text-xs text-white/70">Must be between -90 and 90</p> */}
                  </div>

                  {/* Longitude */}
                  <div className="space-y-2">
                    <label htmlFor="longitude" className="block text-sm font-medium text-white/90">
                      Longitude
                    </label>
                    <input 
                      id="longitude"
                      type="number" 
                      step="any"
                      placeholder="e.g., -74.0060" 
                      required 
                      autoComplete="off"
                      className="w-full bg-white/90 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 rounded-lg text-base border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                    {/* <p className="text-xs text-white/70">Must be between -180 and 180</p> */}
                  </div>
                </div>

                {/* Location Help Text */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 text-white text-sm backdrop-blur-sm shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiInfo className="w-3 h-3 text-purple-300" />
                    </div>
                    <p>
                      📍 Click "Get Current Location" to automatically fill your coordinates, or enter them manually. You can also find coordinates by searching your address on Google Maps.
                    </p>
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
                Already a Caption?{' '}
                <a href='/caption-login' className='text-white hover:text-blue-800 text-lg sm:text-xl font-bold transition-colors duration-200'>
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

export default CaptionSignUp;