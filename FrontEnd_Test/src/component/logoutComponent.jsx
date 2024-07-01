import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logoutSuccess, logoutFailure } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { API_BASE_URL } from '../apiConfig';

import './LoginForm.css'
const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        withCredentials: true,
      });
      dispatch(logoutSuccess());
      localStorage.removeItem("isAuthenticated");
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch(logoutFailure(error.message));
    }
  };

  return (
    <>
      <button onClick={handleLogout} className='text-white text-xl'>
        {/* Logout */}
        <AiOutlineLogout />
      </button>
    </>
  );
};

export default LogoutComponent;


