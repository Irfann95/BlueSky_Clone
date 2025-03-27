import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './LoginAndSignup/Login'
import Register from './LoginAndSignup/Register'
import Dolphi from '../public/logo_bluesky.webp'
import './Styles/Welcome.css'

const Welcome = () => {
  return (
    <div className='box'>
      <div className='logo'>
      <img className='Dolphi' src={Dolphi} alt="Dolphi" />;
      </div>
      <div className='LoginAndRegister'>
        <div className='block'>
          <div className='span'>
            <span>Ça se passe maintenant</span>
          </div>
          <div className='Inscrivez_vous'>
          <div>
            <span>Inscrivez-vous</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
 
export default Welcome;
