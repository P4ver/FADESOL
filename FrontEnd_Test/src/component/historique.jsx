

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchHistoriqueData } from '../store/historiqueSlice';

// const Historique = () => {
//   const dispatch = useDispatch();
//   const historiqueData = useSelector(state => state.historique.historiqueData);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     dispatch(fetchHistoriqueData());

//     // Set up interval to refresh the data every 5 minutes (300000 milliseconds)
//     const interval = setInterval(() => {
//       dispatch(fetchHistoriqueData());
//     }, 300000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [dispatch]);

//   useEffect(() => {
//     // Filter data based on searchTerm
//     const filtered = historiqueData.filter(item =>
//       item.user_Dmd && item.user_Dmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.date_Op && item.date_Op .toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.type_Op && item.type_Op .toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   }, [historiqueData, searchTerm]);

//   const handleSearchChange = e => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="w-full mx-auto p-4">
//       <input
//         type="text"
//         placeholder="Rechercher par utilisateur, date ou type opération..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="p-2 mb-4 border border-gray-300 rounded"
//       />
//       <table className="min-w-full table-auto bg-white border border-gray-200">
//         <thead>
//           <tr className='bg-green-600 text-white'>
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Type Operation</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Code Produit</th>
//             <th className="px-4 py-2">Designation</th>
//             <th className="px-4 py-2">Quantite</th>
//             <th className="px-4 py-2">N° Serie</th>
//             <th className="px-4 py-2">Code Projet</th>
//             <th className="px-4 py-2">Nom Projet</th>
//             <th className="px-4 py-2">User</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.slice().reverse().map((item, index) => (
//             <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               <td className="border px-4 ">{item.id_Historique}</td>
//               <td className="border px-4 ">{item.type_Op}</td>
//               <td className="border px-4 ">{item.date_Op}</td>
//               <td className="border px-4 ">{item.code_Produit}</td>
//               <td className="border px-4 ">{item.designation_Produit}</td>
//               <td className="border px-4 ">{item.qte_Produit}</td>
//               <td className="border px-4 ">{item.n_Serie}</td>
//               <td className="border px-4 ">{item.code_Projet}</td>
//               <td className="border px-4 ">{item.nom_Projet}</td>
//               <td className="border px-4 ">{item.user_Dmd}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Historique;







import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoriqueData } from '../store/historiqueSlice';

const Historique = () => {
  const dispatch = useDispatch();
  const historiqueData = useSelector(state => state.historique.historiqueData);
  const authState = useSelector(state => state.auth);
  const user = authState.user;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({ entrees: 0, sorties: 0, retours: 0 });

  useEffect(() => {
    dispatch(fetchHistoriqueData());

    // Set up interval to refresh the data every 5 minutes (300000 milliseconds)
    const interval = setInterval(() => {
      dispatch(fetchHistoriqueData());
    }, 300000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    // Filter data based on searchTerm
    const filtered = historiqueData.filter(item =>
      (item.user_Dmd && item.user_Dmd.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.date_Op && item.date_Op.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.type_Op && item.type_Op.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [historiqueData, searchTerm]);

  useEffect(() => {
    // Calculate statistics based on selectedDate
    if (selectedDate) {
      const stats = { entrees: 0, sorties: 0, retours: 0 };

      const filteredByDate = historiqueData.filter(item => item.date_Op.includes(selectedDate));

      filteredByDate.forEach(item => {
        if (item.type_Op === 'entree') stats.entrees += 1;
        else if (item.type_Op === 'sortie') stats.sorties += 1;
        else if (item.type_Op === 'retour') stats.retours += 1;
      });

      setFilteredData(filteredByDate);
      setStats(stats);
    } else {
      // If no date selected, show all data and reset stats
      setFilteredData(historiqueData);
      setStats({ entrees: 0, sorties: 0, retours: 0 });
    }
  }, [historiqueData, selectedDate]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
  };
console.log("filteredData", filteredData)
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher par utilisateur, date ou type opération..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 mb-4 border border-gray-300 rounded shadow-sm w-full"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 mb-4 border border-gray-300 rounded shadow-sm w-[250px]"
          />
        </div>
      </div>
      {selectedDate && (
        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Entrées</h3>
            <p className="text-2xl">{stats.entrees}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Sorties</h3>
            <p className="text-2xl">{stats.sorties}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Retours</h3>
            <p className="text-2xl">{stats.retours}</p>
          </div>
        </div>
      )}
      {filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2">Type Operation</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Code Produit</th>
                <th className="px-4 py-2">Designation</th>
                <th className="px-4 py-2">Quantite</th>
                <th className="px-4 py-2">N° Serie</th>
                <th className="px-4 py-2">Code Projet</th>
                <th className="px-4 py-2">Nom Projet</th>
                <th className="px-4 py-2">Partenaire</th>
                <th className="px-4 py-2">User</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice().reverse().map((item, index) => (
                <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border px-4 py-2">{item.type_Op}</td>
                  <td className="border px-4 py-2">{item.date_Op}</td>
                  <td className="border px-4 py-2">{item.code_Produit}</td>
                  <td className="border px-4 py-2">{item.designation_Produit}</td>
                  <td className="border px-4 py-2">{item.qte_Produit}</td>
                  <td className="border px-4 py-2">{item.n_Serie}</td>
                  <td className="border px-4 py-2">{item.code_Projet}</td>
                  <td className="border px-4 py-2">{item.nom_Projet}</td>
                  <td className="border px-4 py-2">{item.Partenaire}</td>
                  <td className="border px-4 py-2">{item.user_Dmd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Historique;














// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchHistoriqueData } from '../store/historiqueSlice';

// const Historique = () => {
//   const dispatch = useDispatch();
//   const historiqueData = useSelector(state => state.historique.historiqueData);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
// // console.log("from historical",historiqueData)
//   useEffect(() => {
//     dispatch(fetchHistoriqueData());

//     // Set up interval to refresh the data every 5 minutes (300000 milliseconds)
//     const interval = setInterval(() => {
//       dispatch(fetchHistoriqueData());
//     }, 300000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [dispatch]);

//   const filteredData = historiqueData.filter(data => data.user_Dmd === user.username);
// console.log("historique: filteredData", filteredData)
//   return (
//     <div className="w-full mx-auto p-4">
//       <table className="min-w-full table-auto bg-white border border-gray-200">
//         <thead>
//           <tr className='bg-green-600 text-white'>
//             {/* <th className="px-4 py-2">ID</th> */}
//             <th className="px-4 py-2">Type Operation</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Code Produit</th>
//             <th className="px-4 py-2">Designation</th>
//             <th className="px-4 py-2">Quantite</th>
//             <th className="px-4 py-2">N° Serie</th>
//             <th className="px-4 py-2">Code Projet</th>
//             <th className="px-4 py-2">Nom Projet</th>
//             <th className="px-4 py-2">User</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.reverse().map((item, index) => (
//             <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//               {/* <td className="border px-4 ">{item.id_Historique}</td> */}
//               <td className="border px-4 ">{item.type_Op}</td>
//               <td className="border px-4 ">{item.date_Op}</td>
//               <td className="border px-4 ">{item.code_Produit}</td>
//               <td className="border px-4 ">{item.designation_Produit}</td>
//               <td className="border px-4 ">{item.qte_Produit}</td>
//               <td className="border px-4 ">{item.n_Serie}</td>
//               <td className="border px-4 ">{item.code_Projet}</td>
//               <td className="border px-4 ">{item.nom_Projet}</td>
//               <td className="border px-4 ">{item.user_Dmd}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Historique;




















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
