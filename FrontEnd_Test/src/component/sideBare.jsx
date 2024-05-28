import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";

const SideBare = () => {
  return (
    <header className="fixed z-50 md:relative">
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
        className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-44"
      >
        <div className="bg-slate-900 mt-5 py-4 px-10 md:mt-10">
          <div className="w-36">
            {/* <img src={logo} alt="Logo" /> */}
          </div>
        </div>
        <ul className="mt-8 space-y-3 md:mt-20">
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/dashboard" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center ">
              <span>
                <RxDashboard />

              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/users" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
              <FaRegUser />
              </span>
              <span>Users</span>
            </Link>
          </li>
          <li className="relative">
            {/* Use Link component with "to" prop to navigate */}
            <Link to="/products" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
              <AiOutlineProduct />
              </span>
              <span>Products</span>
            </Link>
            <Link to="/entree" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
                <SlBasket />
              </span>
              <span>Entree</span>
            </Link>
            <Link to="/Livraison" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
              <TbTruckDelivery />
              </span>
              <span>Livraisons</span>
            </Link>
            <Link to="/sortie" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
                <BiPurchaseTagAlt />
              </span>
              <span>Sortie</span>
            </Link>
            <Link to="/sortie" className="focus:bg-slate-600 hover:bg-slate-600 flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none text-lg items-center">
              <span>
              <TbTruckReturn />
              </span>
              <span>Return</span>
            </Link>
          </li>
          {/* Similarly, add Link components for other buttons */}


        </ul>
      </nav>
    </header>
  );
};

export default SideBare;
