
import React from 'react';
import LogoutComponent from './logoutComponent';
import logo from '../pictures/logo.png';
import { useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  console.log("navBar: User.username:",user.username)
  const userState = useSelector(state => state.user)
  
  // console.log("=>from navBar: the role : ", userState.userData.filter(user=>user.login_User == user.username))
  
  console.log("navBar: userData.map(usr.login_User:):",userState.userData.map(usr=>usr.login_User))
  const matchedUser = userState.userData.find(usr => usr.login_User == user.username );
  console.log("=>from navBar: the role : ", matchedUser);
  console.log("=>from navBar: the role : ", matchedUser);

  const userId = user.id; // Or any other unique identifier
  
  // const foundUser = userState.userData.find(u => u.id == userId);
  // console.log(foundUser.type_User)
  // const userInitials = foundUser.nom_User.slice(0, 1).toUpperCase() + foundUser.prenom_User.slice(0, 1).toUpperCase();


  return (
    <div>
      <aside className="relative flex flex-col items-center bg-white px-4 py-4 w-calc100-minus100px shadow sm:flex-row md:h-20">
        <div className="flex w-full flex-col justify-between overflow-hidden transition-all sm:max-h-full sm:flex-row sm:items-center">
          <ul className="mx-auto mt-4 flex justify-between items-center w-full sm:mx-5 sm:mt-0">
            <li className="w-32">
              <img src={logo} alt="Logo" />
            </li>
            <li className="flex items-center justify-between">
            {/* {matchedUser.type_User} */}
              <div className="flex h-8 w-8 items-center justify-center bg-gray-900 rounded-full text-white hover:text-gray-400 hover:shadow ml-2">
            <FaUser />
              </div>
              <button className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-gray-600 hover:text-black hover:shadow ml-2">
                <LogoutComponent />
              </button>
            </li>
            {/* <li>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavBar;
