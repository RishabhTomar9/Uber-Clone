import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiTruck, FiMapPin, FiAlertCircle, FiInfo, FiLock, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useCaption } from '../context/CaptionContext';
import axios from 'axios';
import PageLoader from '../components/PageLoader';
import Loader from '../components/Loader';


const CaptionSignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState(''); 
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
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
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

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

    // Location validation
    if (!latitude || !longitude) {
      alert('Please provide location coordinates!');
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid coordinates!');
      return;
    }

    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90!');
      return;
    }

    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180!');
      return;
    }

    // Terms and conditions validation
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions and Privacy Policy!');
      return;
    }

    setIsLoading(true);

    const newCaption = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      phone: phone,
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
        setPhone('');
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
        setAgreeToTerms(false);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Caption Sign Up..." />
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
              <h2 className='text-3xl font-bold text-center mb-6 text-white'>
                Sign Up
              </h2>
              
              <form className='space-y-6 sm:space-y-8' onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold text-white'>Caption Details</h3>
                  </div>
                  
                  {/* Name Fields */}
                  <div className='grid grid-cols-2 gap-4 items-center justify-center'>
                    <div className='space-y-2'>
                      <label htmlFor='firstName' className='block text-sm font-medium text-white/90'>
                        First Name
                      </label>
                      <input 
                        id='firstName'
                        type="text" 
                        placeholder='First name' 
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
                        placeholder='Last name' 
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
                        placeholder='Phone number'
                        value={phone}
                        maxLength={10}
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
                      placeholder='Email ' 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Vehicle Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FiTruck className="w-4 h-4 text-white" />
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold text-white'>Caption Vehicle Details</h3>
                  </div>
                  
                  {/* Vehicle Type Dropdown */}
                  <div className='space-y-2'>
                    <label htmlFor='vehicleType' className='block text-sm font-medium text-white/90'>
                      Vehicle Type
                    </label>
                    <div className='relative'>
                      <select
                        id='vehicleType'
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10'
                        required
                        disabled={isLoading}
                      >
                        <option value='' className='bg-zinc-800 text-white'>Select vehicle type</option>
                        <option value='car' className='bg-zinc-800 text-white'>Car</option>
                        <option value='bike' className='bg-zinc-800 text-white'>Bike</option>
                        <option value='auto' className='bg-zinc-800 text-white'>Auto</option>
                        <option value='other' className='bg-zinc-800 text-white'>Other</option>
                      </select>
                      <FiChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none w-5 h-5' />
                    </div>
                    {vehicleType && (
                      <p className='text-xs text-white/60 mt-1'>
                        {vehicleType === 'car' && 'Perfect for comfortable rides with up to 4 passengers'}
                        {vehicleType === 'bike' && 'Ideal for quick solo trips and traffic navigation'}
                        {vehicleType === 'auto' && 'Great for short distances and local travel'}
                        {vehicleType === 'other' && 'Suitable for special transportation needs'}
                      </p>
                    )}
                  </div>

                  {/* Vehicle Details */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label htmlFor='vehicleColor' className='block text-sm font-medium text-white/90'>
                        Vehicle Color
                      </label>
                      <input 
                        id='vehicleColor'
                        type="text" 
                        placeholder='Red, Blue' 
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className='space-y-2'>
                    <label htmlFor='vehicleCapacity' className='block text-sm font-medium text-white/90'>
                      Passenger Capacity
                    </label>
                    <input 
                      id='vehicleCapacity'
                      type="number" 
                      min="1"
                      max="10"
                      placeholder='Passenger Capacity' 
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                      disabled={isLoading}
                    />
                  </div>   
                  </div>

                  <div className='space-y-2'>
                      <label htmlFor='vehiclePlate' className='block text-sm font-medium text-white/90'>
                        Vehicle Number
                      </label>
                      <input 
                        id='vehiclePlate'
                        type="text" 
                        placeholder='Enter Vehicle Number' 
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
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
                    <button
                      type='button'
                      onClick={getCurrentLocation}
                      disabled={isLoadingLocation || isLoading}
                      className='w-full border-1 border-white text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-3'
                    >
                      {isLoadingLocation ? (
                        <>
                          <Loader size="sm" text="" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <FiMapPin className='w-5 h-5' />
                          Get Current Location
                        </>
                      )}
                    </button>
                  )}

                  {/* Location Error */}
                  {locationError && (
                    <div className='flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg'>
                      <FiAlertCircle className='w-5 h-5 text-red-400 mt-0.5 flex-shrink-0' />
                      <p className='text-red-400 text-sm'>{locationError}</p>
                    </div>
                  )}

                  {/* Manual Location Input */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label htmlFor='latitude' className='block text-sm font-medium text-white/90'>
                        Latitude
                      </label>
                      <input 
                        id='latitude'
                        type="number" 
                        step="any"
                        placeholder='e.g., 24.8607' 
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className='space-y-2'>
                      <label htmlFor='longitude' className='block text-sm font-medium text-white/90'>
                        Longitude
                      </label>
                      <input 
                        id='longitude'
                        type="number" 
                        step="any"
                        placeholder='e.g., 67.0011' 
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Location Help Text */}
                  {/* <div className='flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg'>
                    <FiInfo className='w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0' />
                    <p className='text-blue-400 text-sm'>
                      Location coordinates help us match you with nearby passengers. You can use the "Get Current Location" button or enter coordinates manually.
                    </p>
                  </div> */}
                </div>

                {/* Password Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
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

                <div className='flex items-start gap-3 mb-4'>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    disabled={isLoading}
                    className="w-10 h-10 text-green-600 bg-white/10 border-white/20 rounded focus:ring-green-800 mt-1"
                  />
                  <label htmlFor="terms" className='text-white/70 text-sm leading-relaxed'>
                    I agree to Uber's <span className='text-green-500 underline cursor-pointer'>Terms & Conditions</span> and <span className='text-green-500 underline cursor-pointer'>Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='group w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 transition-all duration-200 shadow-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'
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
                      to='/caption-login' 
                      className='text-green-400 font-bold text-md transition-colors duration-200'
                    >
                      Login
                    </Link>
                  </p>
                </div>  

               
              </form>
            </div>
              <p className='mt-4 mb-5 text-xs sm:text-sm leading-tight px-4 text-white'>*This site is protected by reCAPTCHA and the <span className='text-green-500 underline cursor-pointer'>Google Privacy Policy</span> and <span className='text-green-500 underline cursor-pointer'>Terms of Service</span> apply.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CaptionSignUp