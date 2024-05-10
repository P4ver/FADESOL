import React from 'react';
import axios from 'axios';

const handleLogout = async () => {
    try {
      // Send a request to the server to invalidate the cookie
      await axios.post('http://localhost:3000/auth/logout',{}, {
        withCredentials: true,
      });
      // Optionally, clear any user-related state or perform other cleanup tasks
      // Redirect the user to the login page or any other appropriate page
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

const Logout = () => {
    return (
        <>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}
 
export default Logout;

