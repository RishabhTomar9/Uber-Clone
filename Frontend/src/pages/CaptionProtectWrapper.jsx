import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCaption } from '../context/CaptionContext';
import axios from 'axios';

const CaptionProtectWrapper = ({children}) => {
    const token = localStorage.getItem('captionToken');
    const navigate = useNavigate();
    const {caption, setCaption} = useCaption();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                navigate('/caption-login');
            } else {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [token, navigate]);

    useEffect(() => {
        if (!token) return;
        axios.get(`${import.meta.env.VITE_BASE_URL}/captions/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaption(response.data.caption);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('captionToken');
            navigate('/caption-login');
        });
    }, [token, setCaption, navigate]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {children}
        </>
    )
}

export default CaptionProtectWrapper;