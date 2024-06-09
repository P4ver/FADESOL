import React, { useState } from 'react';
import { FaLock, FaUser, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../pictures/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE_URL } from '../apiConfig';

const Register = () => {
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
    axios.post(`${API_BASE_URL}/auth/register`, formData)
      .then(response => {
        console.log(response.data);
        setRegistrationSuccess(true);
      })
      .catch(error => {
        if (error.response.status === 409) {
          console.error('User already exists:', error.response.data);
          // Afficher un message d'erreur dans une notification
          toast.error('Un utilisateur existe déjà avec ces informations.', {
            position: toast.POSITION_TOP_RIGHT,
            autoClose: 3000,
          });
        } else {
          console.error('Error:', error);
        }
      });
  };
  const redirectToLogin = () => {
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
console.log("form data",formData)
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-32 mx-auto">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          S'inscrire
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
        

          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
              <label htmlFor="nom" className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
              <div className="mt-2 relative">
                <input
                  id="nom"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  name="nom_User"
                  value={formData.nom_User}
                  onChange={handleChange}
                  required
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="w-[48%]">
              <label htmlFor="prenom" className="block text-sm font-medium leading-6 text-gray-900">Prenom</label>
              <div className="mt-2 relative">
                <input
                  id="prenom"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Prenom d'utilisateur"
                  name="prenom_User"
                  value={formData.prenom_User}
                  onChange={handleChange}
                  required
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
              <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">Login d'utilisateur</label>
              <div className="mt-2 relative">
                <input
                  id="login"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Login d'utilisateur"
                  name="login_User"
                  value={formData.login_User}
                  onChange={handleChange}
                  required
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="w-[48%]">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="password"
                  placeholder="Saisir votre mot de passe"
                  name="password_User"
                  value={formData.password_User}
                  onChange={handleChange}
                  required
                />
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="w-[48%]">
              <label htmlFor="telephone" className="block text-sm font-medium leading-6 text-gray-900">Telephone</label>
              <div className="mt-2 relative">
                <input
                  id="telephone"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Tel"
                  name="tel_User"
                  value={formData.tel_User}
                  onChange={handleChange}
                  required
                />
                <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="w-[48%]">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="email"
                  placeholder="Saisir votre email"
                  name="email_User"
                  value={formData.email_User}
                  onChange={handleChange}
                  required
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-customGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              M'inscrire
            </button>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            J'ai déjà un compte?{' '}
            <button type="button" onClick={handleLoginClick} className="font-semibold leading-6 text-white hover:text-indigo-500">
              Me connecter
            </button>
          </p> */}
          <p className="mt-10 text-center text-sm text-gray-500">
          Already Register?{' '}
          <a href="#" className="font-semibold leading-6 text-customBlue hover:text-indigo-500" type="button" onClick={handleLoginClick}>
            connect Now
          </a>
        </p>
        </form>

        {registrationSuccess && (
          <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-50 py-10">
            <div className="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md">
              <div className="flex justify-center items-center text-white text-[90px] bg-customGreen pt-4 sm:h-44">
                <FaRegCircleCheck />
              </div>
              <div className="flex flex-col items-center bg-white px-4 py-6">
                <h2 className="mb-2 text-3xl font-bold text-customGreen sm:text-4xl">Merci!</h2>
                <p className="mb-                  8 font-medium text-gray-500">Votre compte a été enregistré avec succès.</p>
                <div className="flex items-center w-[50%]">
                  <button className="p-2 w-[100%] border bg-customGreen rounded-full text-white" onClick={redirectToLogin}>OK</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />

    </div>
    
  );
}

export default Register;