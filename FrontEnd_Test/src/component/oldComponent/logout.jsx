// import React from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // Send a request to the server to invalidate the cookie
//       await axios.post('http://localhost:3000/auth/logout',{}, {
//         withCredentials: true,
//       });
//       // Optionally, clear any user-related state or perform other cleanup tasks
//       // Redirect the user to the login page or any other appropriate page
//       navigate('/login'); // Navigate to the login page
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <>
//       <button onClick={handleLogout}>
//         Logout
//       </button>
//     </>
//   );
// };

// export default Logout;

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  let logoutTimer;

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    // Set up a timer to handle auto-logout after 1 second
    logoutTimer = setTimeout(handleLogout, 1000);

    // Reset the timer on user activity
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(handleLogout, 1000);
    };

    window.onload = resetLogoutTimer;
    window.onmousemove = resetLogoutTimer;
    window.onkeypress = resetLogoutTimer;
    window.onclick = resetLogoutTimer;
    window.onscroll = resetLogoutTimer;

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(logoutTimer);
      window.onload = null;
      window.onmousemove = null;
      window.onkeypress = null;
      window.onclick = null;
      window.onscroll = null;
    };
  }, []);

  return (
    <>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
