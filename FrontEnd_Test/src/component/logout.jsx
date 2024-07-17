
import axios from 'axios';
import { logoutSuccess, logoutFailure } from '../store/authActions';
import { API_BASE_URL } from '../apiConfig';

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
