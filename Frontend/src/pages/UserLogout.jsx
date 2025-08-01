import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        const performLogout = async () => {
            if (!token) {
                // If no token, just redirect to login
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Logout error:', error);
                // Even if logout fails, remove token and redirect
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setIsLoggingOut(false);
            }
        };

        performLogout();
    }, [token, navigate]);

    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-800 to-black">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-white">Logging out...</h1>
                <Loader size="lg" text="Please wait" />
            </div>
        </div>
    )
}

export default UserLogout;