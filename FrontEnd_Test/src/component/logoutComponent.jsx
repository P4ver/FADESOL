import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
// import { handleLogout } from './logout';
import axios from 'axios';
import { logoutSuccess, logoutFailure } from '../store/authActions';
import { API_BASE_URL } from '../apiConfig';


import './LoginForm.css';

export const handleLogout = async (dispatch, navigate) => {
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

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <button onClick={() => handleLogout(dispatch, navigate)} className='text-white text-xl'>
      <AiOutlineLogout />
    </button>
  );
};

export default LogoutComponent;
