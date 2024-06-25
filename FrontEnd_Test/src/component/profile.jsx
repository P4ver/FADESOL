

// =====================================================================================================
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserData, updateUserData } from '../store/userSlice'; // Adjust the path as necessary

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.user);

//   const [user, setUser] = useState(null);
//   const [userInfoData, setUserInfoData] = useState({
//     login_User: '',
//     email_User: '',
//     nom_User: '',
//     prenom_User: '',
//     tel_User: '',
//     note_User: '',
//     password_User: '',
//   });

//   const authState = useSelector(state => state.auth);
//   const userState = useSelector(state => state.user);
  
//   useEffect(() => {
//     if (authState.user) {
//       setUser(authState.user);
//     }
//   }, [authState]);

//   useEffect(() => {
//     if (user && userState.userData.length > 0) {
//       const match = userState.userData.find(usr => usr.login_User === user.username);
//       console.log("=>match: ", match);
//       if (match) {
//         setUserInfoData(match);
//       }
//     }
//   }, [user, userState]);


//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   console.log("user info from profile", userInfoData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfoData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handlePasswordUpdate = (event) => {
//     event.preventDefault();
//     dispatch(updateUserData({ id_User: userInfoData.id_User, updateUserData: userInfoData }))
//       .then(() => {
//         console.log("User data updated successfully.");
//         // Optionally, you can fetch user data again after updating
//         dispatch(fetchUserData());
//       })
//       .catch((error) => {
//         console.error("Failed to update user data:", error);
//         // Handle error state or display error message to user
//       });
//   };

//   // Function to generate initials from first name and last name
//   const getInitials = (firstName, lastName) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//   };


//   return (
//     <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
//       <div className="p-6">

//         <form onSubmit={handlePasswordUpdate} className="space-y-6">

//       <div className='flex '>          
//           <div className="flex items-center justify-start mb-6 mr-20">
//             <div className="h-20 w-20 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-2xl">
//               {getInitials(userInfoData.prenom_User, userInfoData.nom_User)}
//               {/* {userInfoData.prenom_User+" "+ userInfoData.nom_User} */}
//             </div>
//           </div>

//           <div>

          
//             <div>
//               <label htmlFor="login_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="login_User"
//                 id="login_User"
//                 autoComplete="username"
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Username"
//                 value={userInfoData.login_User}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="note_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 About
//               </label>
//               <textarea
//                 id="note_User"
//                 name="note_User"
//                 rows={3}
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Write a few sentences about yourself."
//                 value={userInfoData.note_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//         </div>
//       </div>


//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
//             <div>
//               <label htmlFor="prenom_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 First name
//               </label>
//               <input
//                 type="text"
//                 name="prenom_User"
//                 id="prenom_User"
//                 autoComplete="given-name"
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="First name"
//                 value={userInfoData.prenom_User}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="nom_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 name="nom_User"
//                 id="nom_User"
//                 autoComplete="family-name"
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Last name"
//                 value={userInfoData.nom_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
//             <div>
//               <label htmlFor="email_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <input
//                 id="email_User"
//                 name="email_User"
//                 type="email"
//                 autoComplete="email"
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Email address"
//                 value={userInfoData.email_User}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Password
//               </label>
//               <input
//                 id="password_User"
//                 name="password_User"
//                 type="password"
//                 autoComplete="current-password"
//                 className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Password"
//                 value={userInfoData.password_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               type="button"
//               className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// =====================================================================================================
// =====================================================================================================

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../store/userSlice'; // Adjust the path as necessary

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [userInfoData, setUserInfoData] = useState({
    login_User: '',
    email_User: '',
    nom_User: '',
    prenom_User: '',
    tel_User: '',
    note_User: '',
    password_User: '',
  });

  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);
  
  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
    }
  }, [authState]);

  useEffect(() => {
    if (user && userState.userData.length > 0) {
      const match = userState.userData.find(usr => usr.login_User === user.username);
      console.log("=>match: ", match);
      if (match) {
        setUserInfoData(match);prenom_User
        setFullName(match.prenom_User+' '+match.nom_User);
      }
    }
  }, [user, userState]);


  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  console.log("user info from profile", userInfoData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfoData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();
    dispatch(updateUserData({ id_User: userInfoData.id_User, updateUserData: userInfoData }))
      .then(() => {
        console.log("User data updated successfully.");
        // Optionally, you can fetch user data again after updating
        dispatch(fetchUserData());
      })
      .catch((error) => {
        console.error("Failed to update user data:", error);
        // Handle error state or display error message to user
      });
  };

  // Function to generate initials from first name and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };


  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-8">

        <form onSubmit={handlePasswordUpdate} className="space-y-8">

          <div className='flex '>          
            <div className=" mb-6 mr-20">
              <div className="h-24 w-24 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-2xl">
                {getInitials(userInfoData.prenom_User, userInfoData.nom_User)}
              </div>
              <div className="text-lg text-center">
                 <br /> {fullName}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label htmlFor="login_User" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  name="login_User"
                  id="login_User"
                  autoComplete="username"
                  className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Username"
                  value={userInfoData.login_User}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="note_User" className="block text-sm font-medium leading-6 text-gray-900">
                  About
                </label>
                <textarea
                  id="note_User"
                  name="note_User"
                  rows={3}
                  className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  placeholder="Write a few sentences about yourself."
                  value={userInfoData.note_User}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="mb-6">
              <label htmlFor="prenom_User" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <input
                type="text"
                name="prenom_User"
                id="prenom_User"
                autoComplete="given-name"
                className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="First name"
                value={userInfoData.prenom_User}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="nom_User" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <input
                type="text"
                name="nom_User"
                id="nom_User"
                autoComplete="family-name"
                className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Last name"
                value={userInfoData.nom_User}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="mb-6">
              <label htmlFor="email_User" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                id="email_User"
                name="email_User"
                type="email"
                autoComplete="email"
                className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Email address"
                value={userInfoData.email_User}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password_User" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                id="password_User"
                name="password_User"
                type="password"
                autoComplete="current-password"
                className="block w-full mt-1 p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                placeholder="Password"
                value={userInfoData.password_User}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center items-center px-6 py-3 text-lg font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;


// =====================================================================================================





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserData, updateUserData } from '../store/userSlice'; // Adjust the path as necessary

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.user);

//   const [user, setUser] = useState(null);
//   const [userInfoData, setUserInfoData] = useState({
//     login_User: '',
//     email_User: '',
//     nom_User: '',
//     prenom_User: '',
//     tel_User: '',
//     note_User: '',
//     password_User: '',
//   });

//   const authState = useSelector(state => state.auth);
//   const userState = useSelector(state => state.user);
  
//   useEffect(() => {
//     if (authState.user) {
//       setUser(authState.user);
//     }
//   }, [authState]);

//   useEffect(() => {
//     if (user && userState.userData.length > 0) {
//       const match = userState.userData.find(usr => usr.login_User === user.username);
//       console.log("=>match: ", match);
//       if (match) {
//         setUserInfoData(match);
//       }
//     }
//   }, [user, userState]);


//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   console.log("user info from profile", userInfoData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfoData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handlePasswordUpdate = (event) => {
//     event.preventDefault();
//     dispatch(updateUserData({ id_User: userInfoData.id_User, updateUserData: userInfoData }))
//       .then(() => {
//         console.log("User data updated successfully.");
//         // Optionally, you can fetch user data again after updating
//         dispatch(fetchUserData());
//       })
//       .catch((error) => {
//         console.error("Failed to update user data:", error);
//         // Handle error state or display error message to user
//       });
//   };

//   // Function to generate initials from first name and last name
//   const getInitials = (firstName, lastName) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//   };

//   return (
//     <form onSubmit={handlePasswordUpdate} className="space-y-12">
//       <div className="border-b border-gray-900/10 pb-12">
//         <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
//         <p className="mt-1 text-sm leading-6 text-gray-600">
//           This information will be displayed publicly so be careful what you share.
//         </p>

//         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//           <div className="sm:col-span-4">
//             <label htmlFor="login_User" className="block text-sm font-medium leading-6 text-gray-900">
//               Username
//             </label>
//             <div className="mt-2">
//               <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                 <input
//                   type="text"
//                   name="login_User"
//                   id="login_User"
//                   autoComplete="username"
//                   className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                   placeholder="user"
//                   value={userInfoData.login_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-span-full">
//             <label htmlFor="note_User" className="block text-sm font-medium leading-6 text-gray-900">
//               About
//             </label>
//             <div className="mt-2">
//               <textarea
//                 id="note_User"
//                 name="note_User"
//                 rows={1}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={userInfoData.note_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
//           </div>
//         </div>
//       </div>

//       <div className="border-b border-gray-900/10 pb-12">
//         <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
//         <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

//         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//           <div className="sm:col-span-3">
//             <label htmlFor="prenom_User" className="block text-sm font-medium leading-6 text-gray-900">
//               First name
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 name="prenom_User"
//                 id="prenom_User"
//                 autoComplete="given-name"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={userInfoData.prenom_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="nom_User" className="block text-sm font-medium leading-6 text-gray-900">
//               Last name
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 name="nom_User"
//                 id="nom_User"
//                 autoComplete="family-name"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={userInfoData.nom_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-4">
//             <label htmlFor="email_User" className="block text-sm font-medium leading-6 text-gray-900">
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email_User"
//                 name="email_User"
//                 type="email"
//                 autoComplete="email"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={userInfoData.email_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-4">
//             <label htmlFor="password_User" className="block text-sm font-medium leading-6 text-gray-900">
//               Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="password_User"
//                 name="password_User"
//                 type="password"
//                 autoComplete="current-password"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={userInfoData.password_User}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Avatar section */}
//       <div className="mt-6 flex items-center justify-end gap-x-6">
//         <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-lg">
//           {getInitials(userInfoData.prenom_User, userInfoData.nom_User)}
//         </div>
//         <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserData, updateUserData } from '../store/userSlice'; // Adjust the path as necessary

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.user);

//   const [user, setUser] = useState(null);
//   const [userInfoData, setUserInfoData] = useState({
//     login_User: '',
//     email_User: '',
//     nom_User: '',
//     prenom_User: '',
//     tel_User: '',
//     note_User: '',
//     password_User: '',
//   });

//   const authState = useSelector(state => state.auth);
//   const userState = useSelector(state => state.user);
  
//   useEffect(() => {
//     if (authState.user) {
//       setUser(authState.user);
//     }
//   }, [authState]);

//   useEffect(() => {
//     if (user && userState.userData.length > 0) {
//       const match = userState.userData.find(usr => usr.login_User === user.username);
//       console.log("=>match: ", match);
//       if (match) {
//         setUserInfoData(match);
//       }
//     }
//   }, [user, userState]);


//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   console.log("user info form profile", userInfoData);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfoData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };



//   const handlePasswordUpdate = (event) => {
//     event.preventDefault();
//     dispatch(updateUserData({ id_User: userInfoData.id_User, updateUserData: userInfoData }))
//       .then(() => {
//         console.log("User data updated successfully.");
//         // Optionally, you can fetch user data again after updating
//         dispatch(fetchUserData());
//       })
//       .catch((error) => {
//         console.error("Failed to update user data:", error);
//         // Handle error state or display error message to user
//       });
//   };

//   return (
//     <form onSubmit={handlePasswordUpdate}>
//       <div className="space-y-12">
//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
//           <p className="mt-1 text-sm leading-6 text-gray-600">
//             This information will be displayed publicly so be careful what you share.
//           </p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="login_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Username
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <input
//                     type="text"
//                     name="login_User"
//                     id="login_User"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="user"
//                     value={userInfoData.login_User}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="note_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 About
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="note_User"
//                   name="note_User"
//                   rows={1}
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={userInfoData.note_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
//           <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//               <label htmlFor="prenom_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 First name
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="prenom_User"
//                   id="prenom_User"
//                   autoComplete="given-name"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={userInfoData.prenom_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="nom_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Last name
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="nom_User"
//                   id="nom_User"
//                   autoComplete="family-name"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={userInfoData.nom_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="email_User" className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email_User"
//                   name="email_User"
//                   type="email"
//                   autoComplete="email"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={userInfoData.email_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="password_User" className="block text-sm font-medium leading-6 text-gray-900">
//               password
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="password_User"
//                   name="password_User"
//                   type="password"
//                   autoComplete="password"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   value={userInfoData.password_User}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

        
//         <div className="mt-6 flex items-center justify-end gap-x-6">
//           <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Profile;
