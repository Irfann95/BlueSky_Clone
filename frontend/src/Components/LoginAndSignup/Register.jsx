import React, { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import '../Styles/Register.css'
import CloseTwoToneIcon  from '@mui/icons-material/Close';
import {ReactComponent as BlueBirdTwisted} from '../../public/blue_bird_twisted.svg'

export default function Register() {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '', 
    birthDate: '', 
    password: '',
    surname: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('FormData:', formData); 
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        console.error('Error details:', errorData);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };  

  return (
    <>
    <button
      onClick={toggleModal}
      className='RegisterButton'
      color="#841584"
      >Créer un compte</button>
    {modal && (
    <div className="login-register-container">
      <form className='Registerform' onSubmit={handleSubmit}>
        <div className='logoandclose'>
            <button onClick={toggleModal} className="close-modal">
                <CloseTwoToneIcon />
            </button>
            <BlueBirdTwisted className="BlueBirdTwisted" />
            <div></div>
          </div>
        <h2>Créer votre compte</h2>
        <div className="form-group">
          <input
            value={formData.firstname}
            type="text"
            placeholder="Enter your firstname"
            id="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.lastname}
            type="text"
            placeholder="Enter your lastname"
            id="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.email}
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.telephone} 
            type="tel"
            id="telephone" 
            placeholder="Enter your mobile number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.birthDate} 
            type="date"
            id="birthDate" 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.password}
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            value={formData.surname}
            type="text"
            id="surname"
            placeholder="Enter your surname"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
    )}
    </>
  );
};