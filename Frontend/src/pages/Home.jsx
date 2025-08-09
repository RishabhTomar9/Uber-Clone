import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import { gsap } from 'gsap';
import { FaMapMarkerAlt, FaFlagCheckered, FaChevronUp } from "react-icons/fa";
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const formRef = useRef(null);
  const redDivRef = useRef(null);

  const [pickup, setPickupLocation] = useState("");
  const [drop, setDropLocation] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Open red div animation
  const openPanel = () => {
    if (!isPanelOpen) {
      gsap.to(redDivRef.current, {
        height: "70vh",
        duration: 0.8,
        ease: "power2.inOut"
      });
      setIsPanelOpen(true);
    }
  };

  // Close red div animation
  const closePanel = () => {
    if (isPanelOpen) {
      gsap.to(redDivRef.current, {
        height: "0vh",
        duration: 0.8,
        ease: "power2.inOut"
      });
      setIsPanelOpen(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Searching trip...");
    // navigate("/results");
  };

  return (
    <>
      <PageLoader show={isPageLoading} text="Loading Home..." />
      <div className="h-screen relative">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dvkzdok8c/image/upload/v1753899648/973197ed8d895a3889edc9484185d888_m0q1fc.png"
          alt="logo"
          className="w-30 absolute left-3 top-3"
        />

        {/* Background */}
        <div className="h-screen w-screen">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="background"
          />
        </div>

        {/* Form & Red Panel */}
        <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
          {/* Form Section */}
          <div
            className="h-[30%] bg-white p-4 sm:p-5 relative "
            ref={formRef}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-semibold">Find a Trip</h4>
              {isPanelOpen && (
                <FaChevronUp
                  className="text-xl cursor-pointer transition-transform duration-300 rotate-180"
                  onClick={closePanel}
                />
              )}
            </div>

            <form onSubmit={submitHandler} className="mt-4">
              {/* Pickup Location */}
              <div className="relative mb-4">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-lg text-xl" />
                <input
                  value={pickup}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  onClick={openPanel}
                  className="bg-[#eee] shadow-md pl-12 pr-4 py-2 sm:py-3 text-base text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  type="text"
                  placeholder="Add a pick-up location"
                />
              </div>

              {/* Drop Location */}
              <div className="relative mb-4">
                <FaFlagCheckered className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-lg text-xl" />
                <input
                  value={drop}
                  onChange={(e) => setDropLocation(e.target.value)}
                  onClick={openPanel}
                  className="bg-[#eee] shadow-md pl-12 pr-4 py-2 sm:py-3 text-base text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  type="text"
                  placeholder="Enter your destination"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-xl text-white px-4 py-2  rounded-lg w-full font-semibold"
              >
                Search Trip
              </button>
            </form>
          </div>

          {/* Expanding Red Div */}
          <div className="bg-white" ref={redDivRef}>
            <LocationSearchPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
