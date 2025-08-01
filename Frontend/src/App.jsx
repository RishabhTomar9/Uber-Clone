import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Start from './pages/Start'
import Login from './pages/UserLogin'
import Signup from './pages/UserSignUp'
import CaptionLogin from './pages/CaptionLogin'
import CaptionSignup from './pages/CaptionSignUp'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import Logout from './pages/UserLogout'
import CaptionLogout from './pages/CaptionLogout'
import CaptionProtectWrapper from './pages/CaptionProtectWrapper'
import CaptionHome from './pages/CaptionHome'

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-[27rem] mx-auto">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/home" element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/caption-login" element={<CaptionLogin />} />
            <Route path="/caption-signup" element={<CaptionSignup />} />
            <Route path="/user/logout" element={
              <UserProtectWrapper>
                <Logout />
              </UserProtectWrapper>
            } />
            <Route path="/caption/logout" element={
              <CaptionProtectWrapper>
                <CaptionLogout />
              </CaptionProtectWrapper>
            } />
            <Route path="/caption/home" element={
              <CaptionProtectWrapper>
                <CaptionHome />
              </CaptionProtectWrapper>
            } />
          </Routes>
        </div>
      </div>
    </UserProvider>
  )
}

export default App