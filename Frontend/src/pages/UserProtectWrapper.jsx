import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                navigate('/login');
            } else {
                setIsCheckingAuth(false);
            }
        };

        // Simulate auth check time
        // const timer = setTimeout(() => {
        //     checkAuth();
        // }, 500);

        // return () => clearTimeout(timer);
    }, [token, navigate]);

    // if (isCheckingAuth) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-800 to-black">
    //             <div className="text-center">
    //                 <h1 className="text-2xl font-bold mb-4 text-white">Checking authentication...</h1>
    //                 <Loader size="lg" text="Please wait" />
    //             </div>
    //         </div>
    //     );
    // }

    return(
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper;