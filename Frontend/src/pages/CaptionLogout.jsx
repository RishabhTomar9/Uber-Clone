import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptionLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('caption');

    useEffect(() => {
        const performLogout = async () => {
            if (!token) {
                // If no token, just redirect to login
                navigate('/caption-login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captions/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('caption');
                    navigate('/caption-login');
                }
            } catch (error) {
                console.error('Logout error:', error);
                // Even if logout fails, remove token and redirect
                localStorage.removeItem('caption');
                navigate('/caption-login');
            }
        };

        performLogout();
    }, [token, navigate]);

    return(
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            </div>
        </div>
    )
}

export default CaptionLogout;
