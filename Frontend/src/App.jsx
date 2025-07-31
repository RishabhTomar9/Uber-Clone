import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/UserLogin'
import Signup from './pages/UserSignUp'
import CaptionLogin from './pages/CaptionLogin'
import CaptionSignup from './pages/CaptionSignUp'

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[27rem] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/caption-login" element={<CaptionLogin />} />
            <Route path="/caption-signup" element={<CaptionSignup />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  )
}

export default App