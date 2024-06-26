
import React, { useState, useEffect } from 'react';
import LogoutComponent from './logoutComponent';
import logo from '../pictures/logo.png';
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
const NavBar = () => {
  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);
  const userData = useSelector(state => state.user.userData);

  const [userRole, setUserRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const username = authState.user?.username;
    if (username && userData) {
      const findUser = userData.find(user => user.login_User === username);
      setUserRole(findUser?.type_User || null);
    }
  }, [authState.user, userData]);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  console.log("authState: ", authState);
  console.log("userState: ", userState);
  console.log("userData: ", userData);
  
  return (
    <div>
      <aside className="relative flex flex-col items-center bg-white px-4 py-4 w-calc100-minus100px shadow sm:flex-row md:h-20">
        <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
          <ul className="mx-auto mt-4 flex justify-between items-center w-full sm:mx-5 sm:mt-0">
            <li className="w-32">
              <img src={logo} alt="Logo" />
            </li>
            <li className="max-w-96">
              <div className="relative w-full max-w-md sm:-ml-2 ">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  role="search"
                  placeholder="Search..."
                  className="py-2 pl-10 pr-4 w-full border-2 placeholder-gray-400 focus:bg-gray-50 rounded-lg"
                />
              </div>
            </li>
            <li className="flex items-center justify-between">
              {userRole}
              <div onClick={handleDropdownClick} className="flex h-8 w-8 items-center justify-center bg-gray-900 rounded-full text-white hover:text-gray-400 hover:shadow ml-2">
                <FaUser />
                {showDropdown && (
                  <ul className="absolute right-0 mt-32 w-48 bg-white rounded-md shadow-md py-1 z-50">
                    <li className="px-4 py-2 hover:bg-gray-100 text-black">
                      <a href="#">Settings</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 text-black">
                      <a href="#">Profile</a>
                    </li>

                  </ul>
                )}
              </div>
              <button className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-gray-600 hover:text-black hover:shadow ml-2">
                <LogoutComponent />
              </button>
              <button className="flex h-8 w-8 items-center justify-center bg-customBlue rounded-full text-white hover:text-black hover:shadow ml-2">
              <IoChatboxEllipsesOutline />
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavBar;