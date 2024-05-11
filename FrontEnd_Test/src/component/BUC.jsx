// import React, { useState } from 'react';
// import { useNavigate  } from 'react-router-dom'; 
// import axios from 'axios';
// const Login = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     password: ''
//   });
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', formData, {
//         withCredentials: true,
//       });
//       // After successful login, you might want to store the JWT token in local storage or a state management system.
//       console.log('Login successful:', response.data);
//       // Redirect the user to another page, for example, the dashboard.
//       // window.location.href = '/test';
//       navigate('/test');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Username:</label>
//           <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

//=====================================================
//=====================================================

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     login_User: '',
//     password_User: '',
//     nom_User: '',
//     prenom_User: '',
//     tel_User: '',
//     email_User: ''
//   });

//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:3000/auth/register', formData)
//       .then(response => {
//         console.log(response.data); // Handle success response
//         setRegistrationSuccess(true); // Open popup on successful registration
//       })
//       .catch(error => {
//         console.error('Error:', error); // Handle error
//       });
//   };
//   const redirectToLogin = () => {
//     navigate('/login'); // Redirect to the login page
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="login_User" placeholder="Login" value={formData.login_User} onChange={handleChange} required />
//         <input type="password" name="password_User" placeholder="Password" value={formData.password_User} onChange={handleChange} required />
//         <input type="text" name="nom_User" placeholder="Nom" value={formData.nom_User} onChange={handleChange} required />
//         <input type="text" name="prenom_User" placeholder="Prénom" value={formData.prenom_User} onChange={handleChange} required />
//         <input type="tel" name="tel_User" placeholder="Téléphone" value={formData.tel_User} onChange={handleChange} required />
//         <input type="email" name="email_User" placeholder="Email" value={formData.email_User} onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//       <p>Already have an account? <a href="/login">Login</a></p>    
//       {/* {registrationSuccess && (
//         <div className="popup">
//           <div className="popup-inner">
//             <button className="close-btn" onClick={() => setRegistrationSuccess(false)}>X</button>
//             <h2>Registration Successful!</h2>
//             <p>Your account has been registered successfully.</p>
//           </div>
//         </div>
//       )} */}
//       {/* Popup for success message */}
//       {registrationSuccess && (
//         <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-100 bg-opacity-50">
//           <div className="relative bg-white rounded-lg p-8">
//             {/* <button className="absolute top-0 right-0 p-2" onClick={() => setRegistrationSuccess(false)}>X</button> */}
//             <h2 className="text-2xl p-2 font-bold mb-4">Inscription réussie !</h2>
//             <p>Votre compte a été enregistré avec succès.</p>
//             <button className="absolute bottom-0 right-[40%]  w-[20%] border bg-green-400 rounded-md text-white" onClick={redirectToLogin}>OK</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Register;


//=====================================================
//=====================================================

// import React from 'react';
// import axios from 'axios';

// const handleLogout = async () => {
//     try {
//       // Send a request to the server to invalidate the cookie
//       await axios.post('http://localhost:3000/auth/logout',{}, {
//         withCredentials: true,
//       });
//       // Optionally, clear any user-related state or perform other cleanup tasks
//       // Redirect the user to the login page or any other appropriate page
//       window.location.href = '/login'; // Redirect to the login page
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

// const Logout = () => {
//     return (
//         <>
//             <button onClick={handleLogout}>
//                 Logout
//             </button>
//         </>
//     );
// }
 
// export default Logout;



