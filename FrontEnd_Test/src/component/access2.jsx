import React,{ useState } from "react";
import { Header } from "./Header";
import { FaLock, FaUser,FaPhoneAlt, FaMailBulk } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Access2 = ()  =>{

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

    return(
    <div className="log-main">
        <Header title="S'inscrire"/>
        <form onSubmit={handleSubmit}>
            <div className="login-section">
                <label htmlFor="login">Login d'utilisateur</label>
                <input 
                    id="login"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Login d'utilisateur"
                    name="login_User"
                    value={formData.login_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
                </div>
            <div className="login-section">
                <label htmlFor="nom">Nom</label>
                <input 
                    id="nom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Nom d'utilisateur"
                    name="nom_User"
                    value={formData.nom_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
                </div>

            <div className="login-section">
                <label htmlFor="prenom">Prenom</label>
                <input 
                    id="prenom"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Prenom d'utilisateur"
                    name="prenom_User"
                    value={formData.prenom_User}
                    onChange={handleChange}
                    required
                    />
                    <FaUser className="icon"/>
            </div>

            <div className="login-section">
                <label htmlFor="telephone">Telephone</label>
                <input 
                    id="telephone"
                    autoComplete="off"
                    className='login-input'
                    type='text'
                    placeholder="Tel"
                    name="tel_User"
                    value={formData.tel_User}
                    onChange={handleChange}
                    required
                    />
                    <FaPhoneAlt className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    className='password-input'
                    autoComplete="off"
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    name="password_User"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    <FaLock className="icon"/>
            </div>

            <div className="password-section">
                <label htmlFor="email">Email</label>
                <input 
                    className='login-input'
                    autoComplete="off"
                    type='email'
                    placeholder='Saisir votre email'
                    name="email_User"
                    value={formData.email_User}
                    onChange={handleChange}
                    required
                    />
                    <FaMailBulk className="icon"/>
            </div>

            <div className="log-button">
                <button type="submit">M'inscrire</button>
            </div>

            <div className="sign-up-button">
                <a href="#">J'ai déjà un compte</a>
                <button type="button" >Me connecter</button>
            </div>
    </form>
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
    </div>
    )
}

export default Access2;