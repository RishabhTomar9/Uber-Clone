import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { CaptionProvider } from './context/CaptionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <CaptionProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CaptionProvider>
    </BrowserRouter>
  </StrictMode>,
)
