import React from "react";
import { Link } from "react-router-dom"; 
import LogoutComponent from "./logoutComponent";

const UserPage = () => {
  return (
    <div className="relative text-center p-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center">
      <button className="flex h-8 w-8 items-center justify-center absolute top-8 right-8 bg-customGreen rounded-full text-gray-600 hover:text-black hover:shadow ml-2">
        <LogoutComponent />
      </button>
      {/* <h1 className="text-5xl font-extrabold mb-16 text-white drop-shadow-lg">Bienvenue, Utilisateur!</h1> */}
      <div className="flex flex-col justify-center gap-8">
        <Link to="/sortie" className="h-36 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-4xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:-rotate-3 hover:shadow-2xl hover:animate-pulse">
          Sortie
        </Link>
        <Link to="/entree" className="h-36 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-4xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:animate-pulse">
          Entree
        </Link>
        {/* <Link to="/products" className="h-36 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-4xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:animate-pulse">
          Produits
        </Link> */}
      </div>
    </div>
  );
};

export default UserPage;
