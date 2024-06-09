import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbTruckDelivery, TbTruckReturn, TbArrowBadgeRight } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { SlBasket, SlArrowDown, SlArrowUp } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";

const SideBare = () => {
  const [isEntreeDropdownOpen, setIsEntreeDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [foundUser, setFoundUser] = useState(null);
  const [fullName, setFullName] = useState(null);
  const authState = useSelector(state => state.auth);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
    }
  }, [authState]);

  useEffect(() => {
    if (user && userState.userData.length > 0) {
      // const match = userState.userData.find(u => u.id == user.id);
      const match = userState.userData.find(usr => usr.login_User == user.username);

      setFoundUser(match.nom_User.slice(0, 1).toUpperCase()+match.prenom_User.slice(0, 1).toUpperCase());
      setFullName(match.nom_User+" "+match.prenom_User);
    }
  }, [user, userState]);

  console.log("from sideBare founduser: => ", foundUser)
  // console.log("from sideBare userState => ", userState)
  const toggleEntreeDropdown = () => {
    setIsEntreeDropdownOpen(!isEntreeDropdownOpen);
  };

  if (!user || !foundUser) {
    <div>Loading...</div>; // Or a spinner, or any loading indicator
  }

  // const userInitials = foundUser.nom_User.slice(0, 1).toUpperCase() + foundUser.prenom_User.slice(0, 1).toUpperCase();
  return (
    <header className="fixed z-50 md:relative">
      <input type="checkbox" className="peer hidden" id="sidebar-open" />
      <label className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden" htmlFor="sidebar-open">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
      <nav
        aria-label="Sidebar Navigation"
        className="peer-checked:w-52 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-800 text-white transition-all duration-300 md:h-screen md:w-52 lg:w-52"
      >
        <div className="flex flex-col items-center px-6 py-3 space-y-2 bg-gray-700 rounded-lg mt-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full text-xl font-bold">
            {/* {userInitials} */}
            {foundUser}
          </div>
          <div className="text-lg text-center">
            {/* Welcome back, <br /> {foundUser.nom_User} {foundUser.prenom_User} */}
          </div>
        </div>
        <ul className="mt-8 space-y-3 md:mt-20">
          <li className="relative">
            <Link to="/dashboard" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <RxDashboard className="text-2xl" />
              <span className="text-lg">Dashboard</span>
            </Link>
          </li>
          <li className="relative">
            <Link to="/users" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <FaRegUser className="text-2xl" />
              <span className="text-lg">Users</span>
            </Link>
          </li>
          <li className="relative">
            <Link to="/products" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <AiOutlineProduct className="text-2xl" />
              <span className="text-lg">Products</span>
            </Link>
          </li>
          <li className="relative">
            <button onClick={toggleEntreeDropdown} className="flex items-center justify-between w-full px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <div className="flex items-center space-x-3">
                <SlBasket className="text-2xl" />
                <span className="text-lg">Entree</span>
              </div>
              {isEntreeDropdownOpen ? <SlArrowUp className="text-xl" /> : <SlArrowDown className="text-xl" />}
            </button>
            {isEntreeDropdownOpen && (
              <ul className="mt-2 space-y-2 pl-12">
                <li>
                  <Link to="/liste-demandes" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Demandes</span>
                  </Link>
                </li>
                <li>
                  <Link to="/entree" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Saisie</span>
                  </Link>
                </li>
                <li>
                  <Link to="/livraison" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Livraison</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sortie" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
                    <TbArrowBadgeRight className="text-xl" />
                    <span>Return</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <Link to="/sortie" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
              <BiPurchaseTagAlt className="text-2xl" />
              <span className="text-lg">Sortie</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SideBare;





// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { TbTruckDelivery, TbTruckReturn, TbArrowBadgeRight } from "react-icons/tb";
// import { BiPurchaseTagAlt } from "react-icons/bi";
// import { FaRegUser } from "react-icons/fa6";
// import { AiOutlineProduct } from "react-icons/ai";
// import { SlBasket, SlArrowDown, SlArrowUp } from "react-icons/sl";
// import { RxDashboard } from "react-icons/rx";

// const SideBare = () => {
//   const [isEntreeDropdownOpen, setIsEntreeDropdownOpen] = useState(false);
//   const authState = useSelector(state => state.auth);
//   const userState = useSelector(state => state.user)
//   const user = authState.user;
//   const userId = user.id; // Or any other unique identifier
  
//   const foundUser = userState.userData.find(u => u.id == userId);
//   const userInitials = foundUser.nom_User.slice(0, 1).toUpperCase() + foundUser.prenom_User.slice(0, 1).toUpperCase();

//   const toggleEntreeDropdown = () => {
//     setIsEntreeDropdownOpen(!isEntreeDropdownOpen);
//   };

  

//   return (
//     <header className="fixed z-50 md:relative">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//     <label class="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden" for="sidebar-open">
//       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
//       </svg>
//     </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-52 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-800 text-white transition-all duration-300 md:h-screen md:w-52 lg:w-52"
//       >
      
//         <div className="flex flex-col items-center px-6 py-3 space-y-2 bg-gray-700 rounded-lg mt-4">
//           <div className="flex items-center justify-center w-12 h-12 bg-gray-500 rounded-full text-xl font-bold">
//             {/* {userInitials} */}
//           </div>
//           <div className="text-lg text-center">
//             {/* Welcome back, <br /> {foundUser.nom_User}  {foundUser.prenom_User} */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             <Link to="/dashboard" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
//               <RxDashboard className="text-2xl" />
//               <span className="text-lg">Dashboard</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/users" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
//               <FaRegUser className="text-2xl" />
//               <span className="text-lg">Users</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/products" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
//               <AiOutlineProduct className="text-2xl" />
//               <span className="text-lg">Products</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <button onClick={toggleEntreeDropdown} className="flex items-center justify-between w-full px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
//               <div className="flex items-center space-x-3">
//                 <SlBasket className="text-2xl" />
//                 <span className="text-lg">Entree</span>
//               </div>
//               {isEntreeDropdownOpen ? <SlArrowUp className="text-xl" /> : <SlArrowDown className="text-xl" />}
//             </button>
//             {isEntreeDropdownOpen && (
//               <ul className="mt-2 space-y-2 pl-12">
//                 <li>
//                   <Link to="/liste-demandes" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
//                     <TbArrowBadgeRight className="text-xl" />
//                     <span>Demandes</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/entree" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
//                     <TbArrowBadgeRight className="text-xl" />
//                     <span>Saisie</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/livraison" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
//                     <TbArrowBadgeRight className="text-xl" />
//                     <span>Livraison</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/sortie" className="flex items-center space-x-2 text-lg text-gray-300 hover:text-white transition duration-200">
//                     <TbArrowBadgeRight className="text-xl" />
//                     <span>Return</span>
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li className="relative">
//             <Link to="/sortie" className="flex items-center space-x-3 px-6 py-3 text-white hover:bg-gray-700 rounded-lg transition duration-200">
//               <BiPurchaseTagAlt className="text-2xl" />
//               <span className="text-lg">Sortie</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBare;
