// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router
// import { TbTruckDelivery } from "react-icons/tb";
// import { TbTruckReturn } from "react-icons/tb";
// import { BiPurchaseTagAlt } from "react-icons/bi";
// import { FaRegUser } from "react-icons/fa6";
// import { AiOutlineProduct } from "react-icons/ai";
// import { SlBasket } from "react-icons/sl";
// import { RxDashboard } from "react-icons/rx";

// const SideBare = () => {
//   return (
//     <header className="fixed z-50 md:relative">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//       <label
//         className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
//         htmlFor="sidebar-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-44"
//       >
//         <div className="bg-slate-900 mt-5 py-4 px-10 md:mt-10">
//           <div className="w-36">
//             {/* <img src={logo} alt="Logo" /> */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/dashboard" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center ">
//               <span>
//                 <RxDashboard />

//               </span>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/users" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//               <FaRegUser />
//               </span>
//               <span>Users</span>
//             </Link>
//           </li>
//           <li className="relative">
//             {/* Use Link component with "to" prop to navigate */}
//             <Link to="/products" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//               <AiOutlineProduct />
//               </span>
//               <span>Products</span>
//             </Link>
//             <Link to="/entree" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//                 <SlBasket />
//               </span>
//               <span>Entree</span>
//             </Link>
//             <Link to="/Livraison" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//               <TbTruckDelivery />
//               </span>
//               <span>Livraisons</span>
//             </Link>
//             <Link to="/sortie" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//                 <BiPurchaseTagAlt />
//               </span>
//               <span>Sortie</span>
//             </Link>
//             <Link to="/sortie" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
//               <span>
//               <TbTruckReturn />
//               </span>
//               <span>Return</span>
//             </Link>
//           </li>
//           {/* Similarly, add Link components for other buttons */}


//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBare;


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
const SideBare = () => {
  return (
    <header className="fixed z-50 md:relative ">
      <input type="checkbox" className="peer hidden" id="sidebar-open" />
      <label
        className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
        htmlFor="sidebar-open"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav
        aria-label="Sidebar Navigation"
        className="peer-checked:w-28 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-white transition-all md:h-screen md:w-28 lg:w-28"
      >
        <div className="bg-white mt-5 py-4 px-10 md:mt-10">
          <div className="w-36">
            {/* <img src={logo} alt="Logo" /> */}
          </div>
        </div>
        <ul className="mt-8 space-y-3 md:mt-20">
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/dashboard" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center  justifys-center ">
              <span className="text-xl">
              <RxDashboard />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/users" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <FaRegUser />
              </span>
              <span>Users</span>
            </Link>
          </li>
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/products" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <AiOutlineProduct />
              </span>
              <span>Products</span>
            </Link>
            {/* <Link to="/entree" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <SlBasket />
              </span>
              <span>Entree</span>
            </Link> */}
                     <li className="relative">
                <SlBasket className="h-5 w-5 mx-auto  text-customGreen " />

            <Accordion className="py-0" sx={{ boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="entree-panel-content"
                id="entree-panel-header"
                className="bg-white py-0"
              >
                <div className='text-customGreen text-lg'  >
                Entree
                </div>
              </AccordionSummary>
              <AccordionDetails className="py-0 px-5">
                <ul className="ml-2">
                <li className="pt-0">
                    <Link
                      to="/liste-demandes"
                      className="text-customGreen hover:text-gray-800  text-lg"
                    >
                     Demandes
                    </Link>
                  </li>
                  <li className="pt-5">
                    <Link
                      to="/entree"
                      className="text-customGreen text-lg hover:text-gray-800"
                    >
                saisie
                    </Link>
                  </li>
                  <li className="pt-5">
                    <Link
                      to="/livraison"
                      className="text-customGreen text-lg hover:text-gray-800"
                    >
                   
                      Livraison
                    </Link>
                  </li>
                  <li className="pt-5">
                    <Link
                      to="/sortie"
                      className="text-customGreen text-lg hover:text-gray-800"
                    >
                      Return
                    </Link>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </li>
            {/* <Link to="/Livraison" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <TbTruckDelivery />
              </span>
              <span>Livraisons</span>
            </Link> */}
            <Link to="/sortie" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <BiPurchaseTagAlt />
              </span>
              <span>Sortie</span>
            </Link>
            {/* <Link to="/sortie" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
              <span className="text-xl">
              <TbTruckReturn />
              </span>
              <span>Return</span>
            </Link> */}
          </li>
          {/* Similarly, add Link components for other buttons */}


        </ul>
      </nav>
    </header>
  );
};

export default SideBare;






// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from React Router
// import { TbTruckDelivery } from "react-icons/tb";
// import { TbTruckReturn } from "react-icons/tb";
// import { BiPurchaseTagAlt } from "react-icons/bi";
// import { FaRegUser } from "react-icons/fa6";
// import { AiOutlineProduct } from "react-icons/ai";
// import { SlBasket } from "react-icons/sl";
// import { RxDashboard } from "react-icons/rx";

// const SideBare = () => {
//   const [isEntreeDropdownOpen, setIsEntreeDropdownOpen] = useState(false);

//   const toggleEntreeDropdown = () => {
//     setIsEntreeDropdownOpen(!isEntreeDropdownOpen);
//   };

//   return (
//     <header className="fixed z-50 md:relative ">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//       <label
//         className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
//         htmlFor="sidebar-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-28 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-white transition-all md:h-screen md:w-28 lg:w-28"
//       >
//         <div className="bg-white mt-5 py-4 px-10 md:mt-10">
//           <div className="w-36">
//             {/* <img src={logo} alt="Logo" /> */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             <Link to="/dashboard" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <RxDashboard />
//               </span>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/users" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-green-700 focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <FaRegUser />
//               </span>
//               <span>Users</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/products" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <AiOutlineProduct />
//               </span>
//               <span>Products</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <button onClick={toggleEntreeDropdown} className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <SlBasket />
//               </span>
//               <span>Entree</span>
//             </button>
//             {isEntreeDropdownOpen && (
//               <ul className="ml-6 mt-2 space-y-2 ">
//                 <li>
//                   <Link to="/entree/sub-item1" className="focus:bg-green-200 hover:bg-slate-300 flex w-full space-x-2 rounded-md px-8 py-2 text-customGreen focus:outline-none text-lg items-center justify-start">
//                     <span>Sub Item 1</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/entree/sub-item2" className="focus:bg-green-200 hover:bg-slate-300 flex w-full space-x-2 rounded-md px-8 py-2 text-customGreen focus:outline-none text-lg items-center justify-start">
//                     <span>Sub Item 2</span>
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//           <li className="relative">
//             <Link to="/Livraison" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <TbTruckDelivery />
//               </span>
//               <span>Livraisons</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/sortie" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <BiPurchaseTagAlt />
//               </span>
//               <span>Sortie</span>
//             </Link>
//           </li>
//           <li className="relative">
//             <Link to="/return" className="focus:bg-green-200 hover:bg-slate-300 flex flex-col w-full space-x-2 rounded-md px-10 py-4 text-customGreen focus:outline-none text-lg items-center justify-center">
//               <span className="text-xl">
//                 <TbTruckReturn />
//               </span>
//               <span>Return</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBare;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { SlBasket } from 'react-icons/sl';
// import { BiPurchaseTagAlt } from 'react-icons/bi';
// import { TbTruckReturn } from 'react-icons/tb';
// const SideBar = () => {
//   return (
//     <header className="fixed z-50 md:relative">
//       <input type="checkbox" className="peer hidden" id="sidebar-open" />
//       <label
//         className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
//         htmlFor="sidebar-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </label>
//       <nav
//         aria-label="Sidebar Navigation"
//         className="peer-checked:w-28 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white text-black transition-all md:h-screen md:w-28 lg:w-28"
//       >
//         <div className="bg-white mt-5 py-4 px-10 md:mt-10">
//           <div className="w-36">
//             {/* <img src={logo} alt="Logo" /> */}
//           </div>
//         </div>
//         <ul className="mt-8 space-y-3 md:mt-20">
//           <li className="relative">
//             <Accordion className="py-0" sx={{ boxShadow: 'none' }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="entree-panel-content"
//                 id="entree-panel-header"
//                 className="bg-white py-0"
//               >
//                 <SlBasket className="h-5 w-5 mr-2 text-gray-400" />
//                 Entree
//               </AccordionSummary>
//               <AccordionDetails className="py-0 px-5 mr-">
//                 <ul className="ml-2">
//                   <li className="py-0">
//                     <Link
//                       to="/entree/sub-item1"
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       Sub Item 1
//                     </Link>
//                   </li>
//                   <li className="py-2">
//                     <Link
//                       to="/entree/sub-item2"
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       Sub Item 2
//                     </Link>
//                   </li>
//                 </ul>
//               </AccordionDetails>
//             </Accordion>
//           </li>
//           {/* Other menu items */}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default SideBar;
