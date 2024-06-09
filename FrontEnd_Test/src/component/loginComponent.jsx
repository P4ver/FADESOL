import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../store/authActions';
import logo from '../pictures/logo.png';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  console.log("============TESTing=============")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      toast.error('Veuillez compléter la vérification reCAPTCHA.');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { ...formData, recaptchaToken }, {
        withCredentials: true,
      });
      console.log('Login successful:', response.config.data);
      localStorage.setItem('isAuthenticated', 'true');
      const objtext = response.config.data;
      const obj = JSON.parse(objtext);
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-32 mx-auto">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nom d'utilisateur
            </label>
            <div className="mt-2 w-[300px]">
              <input
                id="login"
                type="text"
                placeholder="Saisir votre nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-customBlue hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 w-[300px]">
              <input
                id="password"
                type="password"
                placeholder="Saisir votre mot de passe"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-4">
          {/* <ReCAPTCHA
            sitekey="6LfFO_MpAAAAAOIgO1O8KmM7yBO6DqROTLdNf8zA"
            onChange={handleRecaptchaChange}
          /> */}


          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-customGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-customBlue hover:text-indigo-500" type="button" onClick={handleSignUpClick}>
            Register Now
          </a>
        </p>
      </div>

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

//==============================================================================================================================


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { FaLock, FaUser } from 'react-icons/fa';
// import { useNavigate  } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// import axios from 'axios';
// import { loginSuccess, loginFailure } from '../store/authActions';
// import { Header } from './oldComponent/Header';
// import { API_BASE_URL } from '../apiConfig';
  
// const LoginComponent = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
//       withCredentials: true,
//     });
//     console.log('Login successful:', response.config.data);
//     localStorage.setItem('isAuthenticated', 'true');
//     const objtext = response.config.data;
//     const obj = JSON.parse(objtext)
//     dispatch(loginSuccess(obj)); // Assuming response.data contains user info
//     navigate('/dashboard'); // Assuming navigate is defined somewhere
//   } catch (error) {
//     console.error('Login failed:', error);
//     dispatch(loginFailure(error.message));
//     toast.error('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
//   }
// };
//   const handleSignUpClick = () => {
//     navigate('/register');
//   };

//   return (
//     <div className="log-main">
      
//       <Header title="Se connecter" />
//       <form onSubmit={handleSubmit}>
//         <div className="login-section">
//           <label htmlFor="name">Nom d'utilisateur</label>
//           <input
//             id="login"
//             className="login-input"
//             type="text"
//             placeholder="Saisir votre nom"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <FaUser className="icon" />
//         </div>

//         <div className="password-section">
//           <label htmlFor="password">Mot de passe</label>
//           <input
//             className="password-input"
//             type="password"
//             placeholder="Saisir votre mot de passe"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <FaLock className="icon" />
//         </div>

//         <div className="log-button">
//           <button type="submit">Me connecter</button>
//           <a href="#">Mot de passe oublié ?</a>
//         </div>

//         <div className="sign-up-button">
//           <a href="#">Je n'ai pas de compte</a>
//           <button type="button" onClick={handleSignUpClick}>
//             M'inscrire
//           </button>
//         </div>
//       </form>
//       <ToastContainer 
//           position="top-center"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//       />
//     </div>
//   );
// };

// export default LoginComponent;


