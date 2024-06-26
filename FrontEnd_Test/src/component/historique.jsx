import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoriqueData } from '../store/historiqueSlice';

const Historique = () => {
  const dispatch = useDispatch();
  const historiqueData = useSelector(state => state.historique.historiqueData);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
// console.log("from historical",historiqueData)
  useEffect(() => {
    dispatch(fetchHistoriqueData());

    // Set up interval to refresh the data every 5 minutes (300000 milliseconds)
    const interval = setInterval(() => {
      dispatch(fetchHistoriqueData());
    }, 300000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  const filteredData = historiqueData.filter(data => data.user_Dmd === user.username);
console.log("historique: filteredData", filteredData)
  return (
    <div className="w-full mx-auto p-4">
      <table className="min-w-full table-auto bg-white border border-gray-200">
        <thead>
          <tr className='bg-green-600 text-white'>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Type Operation</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Code Produit</th>
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Quantite</th>
            <th className="px-4 py-2">N° Serie</th>
            <th className="px-4 py-2">Code Projet</th>
            <th className="px-4 py-2">Nom Projet</th>
            <th className="px-4 py-2">User</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.reverse().map((item, index) => (
            <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 ">{item.id_Historique}</td>
              <td className="border px-4 ">{item.type_Op}</td>
              <td className="border px-4 ">{item.date_Op}</td>
              <td className="border px-4 ">{item.code_Produit}</td>
              <td className="border px-4 ">{item.designation_Produit}</td>
              <td className="border px-4 ">{item.qte_Produit}</td>
              <td className="border px-4 ">{item.n_Serie}</td>
              <td className="border px-4 ">{item.code_Projet}</td>
              <td className="border px-4 ">{item.nom_Projet}</td>
              <td className="border px-4 ">{item.user_Dmd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historique;






















// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Swal from 'sweetalert2';
// import { fetchHistoriqueData, postHistoriqueData } from '../store/historiqueSlice';

// const Historique = () => {
//   const historiqueData = useSelector(state => state.historique)
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;

//   const dispatch = useDispatch();

//   // const { venteData } = useSelector((state) => state.vente);
//   // const { productData } = useSelector((state) => state.product);
//   // const { returnData, loading, error } = useSelector((state) => state.return);

//   useEffect(() => {
//     dispatch(fetchHistoriqueData());

//     // Set up interval to refresh the data every 5 minutes (300000 milliseconds)
//     const interval = setInterval(() => {
//       dispatch(fetchHistoriqueData());
//     }, 300000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [dispatch]);

//   // useEffect(() => {
//   //   if (demandeCode) {
//   //     const selectedVente = venteData.find(vente => vente.code_Produit === demandeCode);
//   //     if (selectedVente) {
//   //       setVenteDetails(selectedVente);
//   //     } else {
//   //       setVenteDetails(null);
//   //     }
//   //   }
//   // }, [demandeCode, venteData]);
//   useEffect(() => {
//     dispatch(fetchHistoriqueData());
//   }, [dispatch]);

// //   const filteredData = returnData.filter(item =>
// //     (item.code_Produit && item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (item.designation_Produit && item.designation_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (item.qte_Produit && item.qte_Produit.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (item.n_Serie && item.n_Serie.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (item.code_Projet && item.code_Projet.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (item.nom_Projet && item.nom_Projet.toLowerCase().includes(searchTerm.toLowerCase()))
// // );

// const currentItems = historiqueData.filter(data => data.user_Dmd === user.username).slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <table className="min-w-full table-auto bg-white border border-gray-200">
//                 <thead>
//                     <tr className='bg-green-600 text-white'>
//                         <th className="px-4 py-2">Code</th>
//                         <th className="px-4 py-2">Designation</th>
//                         <th className="px-4 py-2">Quantite</th>
//                         <th className="px-4 py-2">N° Serie</th>
//                         <th className="px-4 py-2">Code Projet</th>
//                         <th className="px-4 py-2">Nom Projet</th>
//                         <th className="px-4 py-2">User</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((returnItem, index) => (
//                         <tr key={returnItem.id_Return} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                             <td className="border px-4 py-2">{returnItem.code_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.designation_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.qte_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.n_Serie}</td>
//                             <td className="border px-4 py-2">{returnItem.code_Projet}</td>
//                             <td className="border px-4 py-2">{returnItem.nom_Projet}</td>
//                             <td className="border px-4 py-2">{returnItem.user_Dmd}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//     </div>
//   );
// };

// export default Historique;
