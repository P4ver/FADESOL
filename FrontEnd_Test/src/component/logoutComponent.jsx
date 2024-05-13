// Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync())
      .then(() => {
        navigate('/login'); // Navigate to the login page after successful logout
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutComponent;
