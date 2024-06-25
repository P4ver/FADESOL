// import React, { useState } from 'react';
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// const Profile = () => {
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [coverPhoto, setCoverPhoto] = useState(null);

//   const handleProfilePhotoChange = (event) => {
//     const file = event.target.files[0];
//     setProfilePhoto(URL.createObjectURL(file));
//   };

//   const handleCoverPhotoChange = (event) => {
//     const file = event.target.files[0];
//     setCoverPhoto(URL.createObjectURL(file));
//   };

//   return (
//     <form>
//       <div className="space-y-12">
//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
//           <p className="mt-1 text-sm leading-6 text-gray-600">
//             This information will be displayed publicly so be careful what you share.
//           </p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                 Username
//               </label>
//               <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                   <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
//                   <input
//                     type="text"
//                     name="username"
//                     id="username"
//                     autoComplete="username"
//                     className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="janesmith"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
//                 About
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="about"
//                   name="about"
//                   rows={3}
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   defaultValue={''}
//                 />
//               </div>
//               <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
//                 Photo
//               </label>
//               <div className="mt-2 flex items-center gap-x-3">
//                 {profilePhoto ? (
//                   <img src={profilePhoto} alt="Profile" className="h-12 w-12 rounded-full" />
//                 ) : (
//                   <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
//                 )}
//                 <input
//                   type="file"
//                   id="profile-photo-upload"
//                   name="profile-photo-upload"
//                   className="hidden"
//                   onChange={handleProfilePhotoChange}
//                 />
//                 <label
//                   htmlFor="profile-photo-upload"
//                   className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
//                 >
//                   Change
//                 </label>
//               </div>
//             </div>

//             <div className="col-span-full">
//               <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
//                 Cover photo
//               </label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                 <div className="text-center">
//                   {coverPhoto ? (
//                     <img src={coverPhoto} alt="Cover" className="w-full h-auto" />
//                   ) : (
//                     <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//                   )}
//                   <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                     <label
//                       htmlFor="cover-photo-upload"
//                       className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                       <input
//                         id="cover-photo-upload"
//                         name="cover-photo-upload"
//                         type="file"
//                         className="sr-only"
//                         onChange={handleCoverPhotoChange}
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
//           <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//               <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
//                 First name
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="first-name"
//                   id="first-name"
//                   autoComplete="given-name"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
//                 Last name
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   name="last-name"
//                   id="last-name"
//                   autoComplete="family-name"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>

//         <div className="border-b border-gray-900/10 pb-12">
//           <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
//           <p className="mt-1 text-sm leading-6 text-gray-600">
//             We'll always let you know about important changes, but you pick what else you want to hear about.
//           </p>

//           <div className="mt-10 space-y-10">
//             <fieldset>
//               <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
//               <div className="mt-6 space-y-6">
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="comments"
//                       name="comments"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label htmlFor="comments" className="font-medium text-gray-900">
//                       Comments
//                     </label>
//                     <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
//                   </div>
//                 </div>
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="candidates"
//                       name="candidates"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label htmlFor="candidates" className="font-medium text-gray-900">
//                       Candidates
//                     </label>
//                     <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
//                   </div>
//                 </div>
//                 <div className="relative flex gap-x-3">
//                   <div className="flex h-6 items-center">
//                     <input
//                       id="offers"
//                       name="offers"
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                     />
//                   </div>
//                   <div className="text-sm leading-6">
//                     <label htmlFor="offers" className="font-medium text-gray-900">
//                       Offers
//                     </label>
//                     <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
//                   </div>
//                 </div>
//               </div>
//             </fieldset>
//             <fieldset>
//               <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
//               <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
//               <div className="mt-6 space-y-6">
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     id="push-everything"
//                     name="push-notifications"
//                     type="radio"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                   />
//                   <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
//                     Everything
//                   </label>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     id="push-email"
//                     name="push-notifications"
//                     type="radio"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                   />
//                   <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
//                     Same as email
//                   </label>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                   <input
//                     id="push-nothing"
//                     name="push-notifications"
//                     type="radio"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                   />
//                   <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
//                     No push notifications
//                   </label>
//                 </div>
//               </div>
//             </fieldset>
//           </div>
//         </div>
//       </div>

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

//     </form>
//   );
// };

// export default Profile;








// import React, { useState } from 'react';

// const Profile = () => {
//   const [name, setName] = useState('Alexa');
//   const [designation, setDesignation] = useState('Data Analyst');

//   const handleSave = () => {
//     alert('Profile saved!');
//   };

//   return (
//     <div className="flex p-5 font-sans">
//       <div className="w-64 p-5 border rounded-lg mr-5">
//         <div className="w-20 h-20 bg-blue-500 text-white text-4xl flex justify-center items-center rounded-full mx-auto mb-5">
//           LS
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Name:</label>
//           <input 
//             type="text" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Designation:</label>
//           <input 
//             type="text" 
//             value={designation} 
//             onChange={(e) => setDesignation(e.target.value)} 
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button 
//           onClick={handleSave} 
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </div>
//       <div className="flex-1 p-5 border rounded-lg">
//         <h2 className="text-2xl mb-1">Lakshmi Subramanian</h2>
//         <p className="text-gray-500 mb-2">Technical Lead</p>
//         <p className="mb-5">RATINGS: ★★★★☆</p>
//         <div className="flex gap-5 mb-5">
//           <span className="cursor-pointer text-blue-500">ABOUT</span>
//           <span className="cursor-pointer text-blue-500">TIMELINE</span>
//         </div>
//         <div className="flex gap-5">
//           <div>
//             <h3 className="text-xl mb-2">Contact Information</h3>
//             <p className="mb-1"><strong>Address:</strong> D23, B Block, West Mambalam, Chennai</p>
//             <p className="mb-1"><strong>Phone:</strong> +91-9876543210</p>
//             <p className="mb-1"><strong>Email:</strong> example@example.com</p>
//             <p><strong>Site:</strong> NA</p>
//           </div>
//           <div>
//             <h3 className="text-xl mb-2">Basic Information</h3>
//             <p className="mb-1"><strong>BirthDay:</strong> 04 March 2022</p>
//             <p><strong>Gender:</strong> Female</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;









//works perfecto

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const Profile = () => {
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//     }
//   }, [authState.user, userData]);

//   const handleDropdownClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex p-5 font-sans">
//       <div className="w-64 p-5 border rounded-lg mr-5">
//         <div className="w-20 h-20 bg-blue-500 text-white text-4xl flex justify-center items-center rounded-full mx-auto mb-5">
//           {user.nom_User[0]}{user.prenom_User[0]}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Name:</label>
//           <input 
//             type="text" 
//             value={`${user.nom_User} ${user.prenom_User}`} 
//             readOnly
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Role:</label>
//           <input 
//             type="text" 
//             value={user.type_User} 
//             readOnly
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button 
//           onClick={handleDropdownClick} 
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {showDropdown ? 'Hide Details' : 'Show Details'}
//         </button>
//       </div>
//       {showDropdown && (
//         <div className="flex-1 p-5 border rounded-lg">
//           <h2 className="text-2xl mb-1">{`${user.nom_User} ${user.prenom_User}`}</h2>
//           <p className="text-gray-500 mb-2">{user.type_User}</p>
//           <div className="flex gap-5">
//             <div>
//               <h3 className="text-xl mb-2">Contact Information</h3>
//               <p className="mb-1"><strong>Phone:</strong> {user.tel_User}</p>
//               <p className="mb-1"><strong>Email:</strong> {user.email_User}</p>
//               <p><strong>Password:</strong> {user.password_User}</p>
//             </div>
//             <div>
//               <h3 className="text-xl mb-2">Basic Information</h3>
//               <p className="mb-1"><strong>Login user:</strong> {user.login_User}</p>
//               <p><strong>Status:</strong> {user.status}</p>
//               <p><strong>creation Date:</strong> {user.creationDate}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



//emm works perfect with edit 

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData } from '../store/userSlice'; // Import your updateUserData thunk

// const Profile = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     nom_User: '',
//     prenom_User: '',
//     type_User: '',
//     tel_User: '',
//     email_User: '',
//     password_User: '',
//     login_User: '',
//     status: '',
//     creationDate: ''
//   });

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//       if (findUser) {
//         setFormData(findUser);
//       }
//     }
//   }, [authState.user, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUpdateClick = () => {
//     dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData })); // Dispatch the updateUserData action
//     setIsEditing(false);
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex p-5 font-sans">
//       <div className="w-64 p-5 border rounded-lg mr-5">
//         <div className="w-20 h-20 bg-blue-500 text-white text-4xl flex justify-center items-center rounded-full mx-auto mb-5">
//           {user.nom_User[0]}{user.prenom_User[0]}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Name:</label>
//           <input 
//             type="text" 
//             name="nom_User"
//             value={formData.nom_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Role:</label>
//           <input 
//             type="text" 
//             name="type_User"
//             value={formData.type_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button 
//           onClick={handleEditClick} 
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {isEditing ? 'Cancel' : 'Edit'}
//         </button>
//         {isEditing && (
//           <button 
//             onClick={handleUpdateClick} 
//             className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
//           >
//             Update
//           </button>
//         )}
//       </div>
//       <div className="flex-1 p-5 border rounded-lg">
//         <h2 className="text-2xl mb-1">{`${user.nom_User} ${user.prenom_User}`}</h2>
//         <p className="text-gray-500 mb-2">{user.type_User}</p>
//         <div className="flex gap-5">
//           <div>
//             <h3 className="text-xl mb-2">Contact Information</h3>
//             <p className="mb-1"><strong>Phone:</strong>
//               <input 
//                 type="text" 
//                 name="tel_User"
//                 value={formData.tel_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Email:</strong>
//               <input 
//                 type="email" 
//                 name="email_User"
//                 value={formData.email_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Password:</strong>
//               <input 
//                 type="password" 
//                 name="password_User"
//                 value={formData.password_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl mb-2">Basic Information</h3>
//             <p className="mb-1"><strong>Login user:</strong>
//               <input 
//                 type="text" 
//                 name="login_User"
//                 value={formData.login_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Status:</strong>
//               <input 
//                 type="text" 
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Creation Date:</strong>
//               <input 
//                 type="text" 
//                 name="creationDate"
//                 value={formData.creationDate}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;









//also this good

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData } from '../store/userSlice';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     nom_User: '',
//     prenom_User: '',
//     type_User: '',
//     tel_User: '',
//     email_User: '',
//     password_User: '',
//     login_User: '',
//     status: '',
//     creationDate: ''
//   });

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//       if (findUser) {
//         setFormData(findUser);
//       }
//     }
//   }, [authState.user, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData }));
//       toast.success('User information updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       toast.error('Failed to update user information.');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex p-5 font-sans">
//       <div className="w-64 p-5 border rounded-lg mr-5">
//         <div className="w-20 h-20 bg-blue-500 text-white text-4xl flex justify-center items-center rounded-full mx-auto mb-5">
//           {user.nom_User[0]}{user.prenom_User[0]}
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Name:</label>
//           <input 
//             type="text" 
//             name="nom_User"
//             value={formData.nom_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Prenom:</label>
//           <input 
//             type="text" 
//             name="prenom_User"
//             value={formData.prenom_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Role:</label>
//           <input 
//             type="text" 
//             name="type_User"
//             value={formData.type_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button 
//           onClick={handleEditClick} 
//           className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {isEditing ? 'Cancel' : 'Edit'}
//         </button>
//         {isEditing && (
//           <button 
//             onClick={handleUpdateClick} 
//             className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
//           >
//             Update
//           </button>
//         )}
//       </div>
//       <div className="flex-1 p-5 border rounded-lg">
//         <h2 className="text-2xl mb-1">{`${user.nom_User} ${user.prenom_User}`}</h2>
//         <p className="text-gray-500 mb-2">{user.type_User}</p>
//         <div className="flex gap-5">
//           <div>
//             <h3 className="text-xl mb-2">Contact Information</h3>
//             <p className="mb-1"><strong>Phone:</strong>
//               <input 
//                 type="text" 
//                 name="tel_User"
//                 value={formData.tel_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Email:</strong>
//               <input 
//                 type="email" 
//                 name="email_User"
//                 value={formData.email_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Password:</strong>
//               <input 
//                 type="password" 
//                 name="password_User"
//                 value={formData.password_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl mb-2">Basic Information</h3>
//             <p className="mb-1"><strong>Login user:</strong>
//               <input 
//                 type="text" 
//                 name="login_User"
//                 value={formData.login_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Status:</strong>
//               <input 
//                 type="text" 
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//             <p className="mb-1"><strong>Creation Date:</strong>
//               <input 
//                 type="text" 
//                 name="creationDate"
//                 value={formData.creationDate}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


//this good

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData } from '../store/userSlice';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     nom_User: '',
//     prenom_User: '',
//     type_User: '',
//     tel_User: '',
//     email_User: '',
//     password_User: '',
//     login_User: '',
//     status: '',
//     creationDate: ''
//   });

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//       if (findUser) {
//         setFormData(findUser);
//       }
//     }
//   }, [authState.user, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData }));
//       toast.success('User information updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       toast.error('Failed to update user information.');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <div className="w-24 h-24 bg-blue-500 text-white text-3xl flex justify-center items-center rounded-full">
//               {user.nom_User[0]}{user.prenom_User[0]}
//             </div>
//             <div>
//               <h2 className="text-3xl font-semibold">{`${user.nom_User} ${user.prenom_User}`}</h2>
//               <p className="text-gray-500">{user.type_User}</p>
//             </div>
//           </div>
//           <button 
//             onClick={handleEditClick} 
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             {isEditing ? 'Cancel' : 'Edit'}
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
//             <div className="mb-4">
//               <label className="block mb-2">Phone:</label>
//               <input 
//                 type="text" 
//                 name="tel_User"
//                 value={formData.tel_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Email:</label>
//               <input 
//                 type="email" 
//                 name="email_User"
//                 value={formData.email_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Password:</label>
//               <input 
//                 type="password" 
//                 name="password_User"
//                 value={formData.password_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
//             <div className="mb-4">
//               <label className="block mb-2">Login user:</label>
//               <input 
//                 type="text" 
//                 name="login_User"
//                 value={formData.login_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Status:</label>
//               <input 
//                 type="text" 
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Creation Date:</label>
//               <input 
//                 type="text" 
//                 name="creationDate"
//                 value={formData.creationDate}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>
//         </div>
        
//         {isEditing && (
//           <button 
//             onClick={handleUpdateClick} 
//             className="mt-6 w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Update
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;



//autre design 
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData } from '../store/userSlice';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     nom_User: '',
//     prenom_User: '',
//     type_User: '',
//     tel_User: '',
//     email_User: '',
//     password_User: '',
//     login_User: '',
//     status: '',
//     creationDate: ''
//   });

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//       if (findUser) {
//         setFormData(findUser);
//       }
//     }
//   }, [authState.user, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData }));
//       toast.success('User information updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       toast.error('Failed to update user information.');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <div className="w-24 h-24 bg-blue-500 text-white text-3xl flex justify-center items-center rounded-full">
//               {user.nom_User[0]}{user.prenom_User[0]}
//             </div>
//             <div>
//               <h2 className="text-3xl font-semibold">{`${user.nom_User} ${user.prenom_User}`}</h2>
//               <p className="text-gray-500">{user.type_User}</p>
//             </div>
//           </div>
//           <button 
//             onClick={handleEditClick} 
//             className={`px-4 py-2 rounded ${isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
//           >
//             {isEditing ? <>&times;</> : <>&#9998;</>}
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
//             <div className="mb-4">
//               <label className="block mb-2">Phone:</label>
//               <input 
//                 type="text" 
//                 name="tel_User"
//                 value={formData.tel_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Email:</label>
//               <input 
//                 type="email" 
//                 name="email_User"
//                 value={formData.email_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Password:</label>
//               <input 
//                 type="password" 
//                 name="password_User"
//                 value={formData.password_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
//             <div className="mb-4">
//               <label className="block mb-2">Login user:</label>
//               <input 
//                 type="text" 
//                 name="login_User"
//                 value={formData.login_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Status:</label>
//               <input 
//                 type="text" 
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Creation Date:</label>
//               <input 
//                 type="text" 
//                 name="creationDate"
//                 value={formData.creationDate}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//         </div>
        
//         {isEditing && (
//           <button 
//             onClick={handleUpdateClick} 
//             className="mt-6 w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 ease-in-out"
//           >
//             Update
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


//autre this find it attractive

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserData } from '../store/userSlice';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const authState = useSelector(state => state.auth);
//   const userData = useSelector(state => state.user.userData);

//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     nom_User: '',
//     prenom_User: '',
//     type_User: '',
//     tel_User: '',
//     email_User: '',
//     password_User: '',
//     login_User: '',
//     status: '',
//     creationDate: ''
//   });

//   useEffect(() => {
//     const username = authState.user?.username;
//     if (username && userData) {
//       const findUser = userData.find(user => user.login_User === username);
//       setUser(findUser || null);
//       if (findUser) {
//         setFormData(findUser);
//       }
//     }
//   }, [authState.user, userData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUpdateClick = async () => {
//     try {
//       await dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData }));
//       toast.success('User information updated successfully!');
//       setIsEditing(false);
//     } catch (error) {
//       toast.error('Failed to update user information.');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   const buttonVariants = {
//     initial: { scale: 1 },
//     hover: { scale: 1.1 },
//   };

//   return (
//     <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <div className="w-24 h-24 bg-blue-500 text-white text-3xl flex justify-center items-center rounded-full">
//               {user.nom_User[0]}{user.prenom_User[0]}
//             </div>
//             <div>
//               <h2 className="text-3xl font-semibold">{`${user.nom_User} ${user.prenom_User}`}</h2>
//               <p className="text-gray-500">{user.type_User}</p>
//             </div>
//           </div>
//           <motion.button 
//             onClick={handleEditClick} 
//             className={`p-2 rounded ${isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
//             initial="initial"
//             whileHover="hover"
//             variants={buttonVariants}
//           >
//             {isEditing ? <FaTimes /> : <FaEdit />}
//           </motion.button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
//                     <div className="mb-4">
//           <label className="block mb-2">Name:</label>
//           <input 
//             type="text" 
//             name="nom_User"
//             value={formData.nom_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Prenom:</label>
//           <input 
//             type="text" 
//             name="prenom_User"
//             value={formData.prenom_User} 
//             onChange={handleInputChange} 
//             readOnly={!isEditing}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//             <div className="mb-4">
//               <label className="block mb-2">Phone:</label>
//               <input 
//                 type="text" 
//                 name="tel_User"
//                 value={formData.tel_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Email:</label>
//               <input 
//                 type="email" 
//                 name="email_User"
//                 value={formData.email_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Password:</label>
//               <input 
//                 type="password" 
//                 name="password_User"
//                 value={formData.password_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
//             <div className="mb-4">
//               <label className="block mb-2">Login user:</label>
//               <input 
//                 type="text" 
//                 name="login_User"
//                 value={formData.login_User}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Status:</label>
//               <input 
//                 type="text" 
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2">Creation Date:</label>
//               <input 
//                 type="text" 
//                 name="creationDate"
//                 value={formData.creationDate}
//                 onChange={handleInputChange}
//                 readOnly={!isEditing}
//                 className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>
//         </div>
        
//         {isEditing && (
//           <motion.button 
//             onClick={handleUpdateClick} 
//             className="mt-6 w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 ease-in-out"
//             initial="initial"
//             whileHover="hover"
//             variants={buttonVariants}
//           >
//             <FaCheck /> Update
//           </motion.button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


//en ajoutant swal : 
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../store/userSlice';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import SweetAlert from 'react-bootstrap-sweetalert';

const Profile = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const userData = useSelector(state => state.user.userData);

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom_User: '',
    prenom_User: '',
    type_User: '',
    tel_User: '',
    email_User: '',
    password_User: '',
    login_User: '',
    status: '',
    creationDate: ''
  });

  useEffect(() => {
    const username = authState.user?.username;
    if (username && userData) {
      const findUser = userData.find(user => user.login_User === username);
      setUser(findUser || null);
      if (findUser) {
        setFormData(findUser);
      }
    }
  }, [authState.user, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const [confirmDialog, setConfirmDialog] = useState(null);

  const showConfirmDialog = () => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, update"
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={handleUpdateClick}
        onCancel={() => setConfirmDialog(null)}
      >
        Are you sure you want to update?
      </SweetAlert>
    );
    setConfirmDialog(getAlert());
  };

  const handleUpdateClick = async () => {
    setConfirmDialog(null); // Close the confirmation dialog
    try {
      await dispatch(updateUserData({ id_User: user.id_User, updateUserData: formData }));
      toast.success('User information updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update user information.');
    }
  };

  if (!user) return <div>Loading...</div>;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <div className="flex flex-col items-center p-8 font-sans bg-gray-100 min-h-screen">
      {confirmDialog}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-blue-500 text-white text-3xl flex justify-center items-center rounded-full">
              {user.nom_User[0]}{user.prenom_User[0]}
            </div>
            <div>
              <h2 className="text-3xl font-semibold">{`${user.nom_User} ${user.prenom_User}`}</h2>
              <p className="text-gray-500">{user.type_User}</p>
            </div>
          </div>
          <motion.button 
            onClick={handleEditClick} 
            className={`p-2 rounded ${isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
          >
            {isEditing ? <FaTimes /> : <FaEdit />}
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input 
                type="text" 
                name="nom_User"
                value={formData.nom_User} 
                onChange={handleInputChange} 
                readOnly={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Prenom:</label>
              <input 
                type="text" 
                name="prenom_User"
                value={formData.prenom_User} 
                onChange={handleInputChange} 
                readOnly={!isEditing}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone:</label>
              <input 
                type="text" 
                name="tel_User"
                value={formData.tel_User}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input 
                type="email" 
                name="email_User"
                value={formData.email_User}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <input 
                type="password" 
                name="password_User"
                value={formData.password_User}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
            <div className="mb-4">
              <label className="block mb-2">Login user:</label>
              <input 
                type="text" 
                name="login_User"
                value={formData.login_User}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status:</label>
              <input 
                type="text" 
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Creation Date:</label>
              <input 
                type="text" 
                name="creationDate"
                value={formData.creationDate}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-2 border rounded transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        {isEditing && (
          <motion.button 
            onClick={showConfirmDialog} 
            className="mt-6 w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 ease-in-out"
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
          >
            <FaCheck /> Update
          </motion.button>
        )}
      </div>
      <ToastContainer />
    </div>
   
  );
};

export default Profile;
