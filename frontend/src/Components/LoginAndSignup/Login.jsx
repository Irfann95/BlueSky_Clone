import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
             value={formData.password}
             type="password"
             name="password"
             placeholder="Enter your password"
             onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <Link to="/register">
          <button type="button" className="deja_twittos">
            Vous n'etes pas inscrit ? 
          </button>
        </Link> 
      </form>
    </div>
  )
}

export default Login