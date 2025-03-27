import React, { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Register = () => {
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
        navigate('/login');
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
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Firstname</label>
          <input
            value={formData.firstname}
            type="text"
            placeholder="Enter your firstname"
            id="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            value={formData.lastname}
            type="text"
            placeholder="Enter your lastname"
            id="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={formData.email}
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            value={formData.telephone} 
            type="tel"
            id="telephone" 
            placeholder="Enter your mobile number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>BirthDate</label>
          <input
            value={formData.birthDate} 
            type="date"
            id="birthDate" 
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={formData.password}
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Surname</label>
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
        <Link to="/login">
          <button type="button" className="deja_twittos">
            Déjà un Twittos?
          </button>
        </Link>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;