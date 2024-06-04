import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate  } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios';
import { loginSuccess, loginFailure } from '../store/authActions';
import { Header } from './oldComponent/Header';

  
const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData, {
        withCredentials: true,
      });
      console.log('Login successful:', response.config.data);
      localStorage.setItem('isAuthenticated', 'true');
const objtext = response.config.data;
const obj = JSON.parse(objtext)
      dispatch(loginSuccess(obj)); // Assuming response.data contains user info
      navigate('/dashboard'); // Assuming navigate is defined somewhere
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(loginFailure(error.message));
      toast.error('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');


    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className="log-main">
      
      <Header title="Se connecter" />
      <form onSubmit={handleSubmit}>
        <div className="login-section">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            id="login"
            className="login-input"
            type="text"
            placeholder="Saisir votre nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="password-section">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="password-input"
            type="password"
            placeholder="Saisir votre mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="log-button">
          <button type="submit">Me connecter</button>
          <a href="#">Mot de passe oublié ?</a>
        </div>

        <div className="sign-up-button">
          <a href="#">Je n'ai pas de compte</a>
          <button type="button" onClick={handleSignUpClick}>
            M'inscrire
          </button>
        </div>
      </form>
      <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
};

export default LoginComponent;



