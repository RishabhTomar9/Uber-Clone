import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptionProtectWrapper = ({children}) => {
    const token = localStorage.getItem('captionToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/caption-login');
        }
    }, [token, navigate]);

  return (
    <>
    {children}
    </>
  )
}

export default CaptionProtectWrapper