import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; 
import axios from 'axios';
const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData, {
        withCredentials: true,
      });
      // After successful login, you might want to store the JWT token in local storage or a state management system.
      console.log('Login successful:', response.data);
      // Redirect the user to another page, for example, the dashboard.
      // window.location.href = '/test';
      navigate('/test');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
