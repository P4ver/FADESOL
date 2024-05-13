// Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loginAsync, selectAuth, loginSuccess } from './authSlice';
import { loginAsync, selectAuth, loginSuccess } from '../store/authSlice';
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync(formData))
      .then(() => {
        // Navigate to '/test' upon successful login
        dispatch(loginSuccess(formData)); // You might want to pass user data instead of formData
        
        navigate('/test');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className='log-main'>
      <form onSubmit={handleSubmit}>
        <div className="login-section">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            id="login"
            className='login-input'
            type='text'
            placeholder='Saisir votre nom'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="password-section">
          <label htmlFor="password">Mot de passe</label>
          <input
            className='password-input'
            type='password'
            placeholder='Saisir votre mot de passe'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="log-button">
          <button type="submit" disabled={loading}>Me connecter</button>
          {error && <div>{error}</div>}
          <a href="#">Mot de passe oublié ?</a>
        </div>

        <div className="sign-up-button">
          <a href="#">Je n'ai pas de compte</a>
          <button type="button">M'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
