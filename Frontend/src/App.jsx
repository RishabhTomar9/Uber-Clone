import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/UserLogin'
import Signup from './pages/UserSignup'
import CaptionLogin from './pages/CaptionLogin'
import CaptionSignup from './pages/CaptionSignup'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/caption-login" element={<CaptionLogin />} />
        <Route path="/caption-signup" element={<CaptionSignup />} />
      </Routes>
    </div>
  )
}

export default App