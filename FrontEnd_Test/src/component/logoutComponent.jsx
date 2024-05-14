// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync())
      .then(() => {
        localStorage.removeItem("isAuthenticated");
        navigate('/login'); 
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <>
      <button onClick={handleLogout}>
      <IoLogOutOutline />
      {/* logout */}
      </button>
    </>
  );
};

export default LogoutComponent;
