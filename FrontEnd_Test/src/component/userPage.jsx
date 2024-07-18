import React from "react";
import { Link } from "react-router-dom"; 

const UserPage = () => {
  return (
    <div className="text-center p-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-16 text-white drop-shadow-lg">Bienvenue, Utilisateur!</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <Link to="/entree" className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-2xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:animate-pulse">
          Entree
        </Link>
        <Link to="/sortie" className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-2xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:-rotate-3 hover:shadow-2xl hover:animate-pulse">
          Sortie
        </Link>
        <Link to="/products" className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-6 px-12 text-2xl rounded-lg shadow-2xl transform transition duration-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:animate-pulse">
          Products
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
