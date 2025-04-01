import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/authProvider';
import '../Styles/Register.css'
import CloseTwoToneIcon  from '@mui/icons-material/Close';
import {ReactComponent as BlueBirdTwisted} from '../../public/blue_bird_twist.svg'

const Login = () => {
        const { setToken } = useAuth();
        const [modal, setModal] = useState(false)
        const toggleModal = () => {
            setModal(!modal)
          }
        const navigate = useNavigate()
        const [formData, setFormData] = useState({
            email: '',
            password: ''
          });
          const [error, setError] = useState(null);
          const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };
          const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('FormData:', formData); 
            try {
              const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                setToken(data.token);
                const LS = localStorage.setItem("userID", JSON.stringify(data.userId));
                console.log(LS);
                navigate("/home");
              } else {
                const errorData = await response.json();
                setError(errorData.message || 'login failed');
                console.error('Error details:', errorData);
              }
            } catch (err) {
              setError('An unexpected error occurred');
              console.error(err);
            }
    }
  return (
    <div className="login-register-container">
      <form className='Loginform' onSubmit={handleSubmit}>
        <div className='logoandclose'>
          <a href='/welcome' onClick={toggleModal} className="close-modal">
                <CloseTwoToneIcon />
          </a>
          <BlueBirdTwisted className="BlueBirdTwisted" />
          <div></div>
        </div>
        <h2>Connectez‑vous</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
             value={formData.password}
             type="password"
             name="password"
             autoComplete='on'
             placeholder="Entrez votre mot de passe"
             onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-btn">
          Se connecter 
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )}

export default Login;