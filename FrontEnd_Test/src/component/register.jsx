import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login_User: '',
    password_User: '',
    nom_User: '',
    prenom_User: '',
    tel_User: '',
    email_User: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/register', formData)
      .then(response => {
        console.log(response.data); // Handle success response
        setRegistrationSuccess(true); // Open popup on successful registration
      })
      .catch(error => {
        console.error('Error:', error); // Handle error
      });
  };
  const redirectToLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="login_User" placeholder="Login" value={formData.login_User} onChange={handleChange} required />
        <input type="password" name="password_User" placeholder="Password" value={formData.password_User} onChange={handleChange} required />
        <input type="text" name="nom_User" placeholder="Nom" value={formData.nom_User} onChange={handleChange} required />
        <input type="text" name="prenom_User" placeholder="Prénom" value={formData.prenom_User} onChange={handleChange} required />
        <input type="tel" name="tel_User" placeholder="Téléphone" value={formData.tel_User} onChange={handleChange} required />
        <input type="email" name="email_User" placeholder="Email" value={formData.email_User} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>    
      {/* {registrationSuccess && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={() => setRegistrationSuccess(false)}>X</button>
            <h2>Registration Successful!</h2>
            <p>Your account has been registered successfully.</p>
          </div>
        </div>
      )} */}
      {/* Popup for success message */}
      {registrationSuccess && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-100 bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8">
            {/* <button className="absolute top-0 right-0 p-2" onClick={() => setRegistrationSuccess(false)}>X</button> */}
            <h2 className="text-2xl p-2 font-bold mb-4">Inscription réussie !</h2>
            <p>Votre compte a été enregistré avec succès.</p>
            <button className="absolute bottom-0 right-[40%]  w-[20%] border bg-green-400 rounded-md text-white" onClick={redirectToLogin}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
