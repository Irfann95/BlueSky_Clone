import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/authProvider';
import '../Styles/Logout.css'

const Logout = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const handleLogout = () => {
        setToken();
        navigate("/welcome", { replace: true });
        };
    const handleStay = () => {
        navigate("/home", { replace: true });
        };
    return (
        <div className="logout-container">
            <div className='form'>
                <div>Etes-vous sur de vous déconnecter ?</div>
                <button className='login-btn' onClick={handleLogout}>Oui</button>
                <button className='login-btn' onClick={handleStay}>Non</button>
            </div>
        </div>
    )
}

export default Logout;