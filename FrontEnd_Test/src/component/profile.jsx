//en ajoutant swal : 
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../store/userSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
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

  // Function to generate initials from first name and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
          <div className='flex justify-center'>

            <motion.button 
            onClick={showConfirmDialog} 
            className="mt-6 w-[300px] p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-300 ease-in-out"
            initial="initial"
            whileHover="hover"
            variants={buttonVariants}
            >
            <div className='flex items-center justify-center'>
              <FaCheck />  
              <div className='ml-5'>
                Update
              </div>
            </div>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
