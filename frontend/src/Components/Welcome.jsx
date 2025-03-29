import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './LoginAndSignup/Login'
import Register from './LoginAndSignup/Register'
import BlueBird from '../public/blue_bird.png'
import './Styles/Welcome.css'

const Welcome = () => {
  return (
    <div className='box'>  
      <div className='logo'>
      <img className='BlueBird' src={BlueBird} alt="BlueBird" />;
      </div>
      <div className='LoginAndRegister'>
        <div className='block'>
          <div className='span'>
            <span>Ça se passe maintenant</span>
          </div>
          <div className='Inscrivez_vous'>
          <div className='ins'>
            <span>Inscrivez-vous</span>
          </div>
          <div className='RegisterClass'>
          <Register/>
          </div>
          <div className='Conditions'>
            <p>En vous inscrivant, vous acceptez les Conditions d'utilisation et la Politique de confidentialité, notamment l'Utilisation des cookies.</p>
          </div>
        </div>
        <div className='LoginClass'>
            <div className='alreadyaccount'>
              <span>Vous avez déjà un compte ?</span>
            </div>
            <Login/>
        </div>
        </div>
      </div>
    </div>
  );
}
 
export default Welcome;
