// src/components/InactivityHandler.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './logout';

const InactivityHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let inactivityTimeout;

  const logout = () => {
    handleLogout(dispatch, navigate);
  };

  const resetTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(logout, 5 * 60 * 1000); // 
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Initialize timer

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  return null; // This component does not render anything
};

export default InactivityHandler;
