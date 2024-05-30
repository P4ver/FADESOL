// import React from 'react';

// const ListeDemandes = () => {
//   // Récupérer les données depuis localStorage ou Redux
//   const achatEntries = JSON.parse(localStorage.getItem('achatEntries')) || [];

//   return (
//     <div className="container mx-auto p-4 w-full">
//       <h2>Liste des demandes précédentes :</h2>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">ID Achat</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">designation</th>
            
//             <th className="border border-gray-300 px-4 py-2">Code Article</th>
//             <th className="border border-gray-300 px-4 py-2">quantite</th>
//             <th className="border border-gray-300 px-4 py-2">nom Projet</th>
//           </tr>
//         </thead>
//         <tbody>
//           {achatEntries.map((demande, index) => (
//             <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//               <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
//               <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
//               <td className="border border-gray-300 px-4 py-2">{demande.designation}</td>

//               <td className="border border-gray-300 px-4 py-2">{demande.idArticle}</td>
//               <td className="border border-gray-300 px-4 py-2">{demande.quantite}</td>
//               <td className="border border-gray-300 px-4 py-2">{demande.idProjet}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {/* Autres éléments d'interface utilisateur ou actions */}
//     </div>
//   );
// };

// export default ListeDemandes;


// import React, { useState } from 'react';

// const ListeDemandes = () => {
//   const achatEntries = JSON.parse(localStorage.getItem('achatEntries')) || [];

//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const handleToggle = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <div className="container mx-auto p-4 w-full">
//       <h2>Liste des demandes précédentes :</h2>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">ID Achat</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
//             <th className="border border-gray-300 px-4 py-2">Statut</th>
//             <th className="border border-gray-300 px-4 py-2">Détails</th>
//           </tr>
//         </thead>
//         <tbody>
//           {achatEntries.map((demande, index) => (
//             <React.Fragment key={index}>
//               <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
//                 <td className="border border-gray-300 px-4 py-2">{auth.user}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.status ? 'Livré' : 'Non livré'}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleToggle(index)}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     {expandedIndex === index ? 'Réduire' : 'Voir Détails'}
//                   </button>
//                 </td>
//               </tr>
//               {expandedIndex === index && (
//                 <tr>
//                   <td colSpan="5" className="border border-gray-300 px-4 py-2">
//                     <div className="p-4 bg-gray-100">
//                       <p><strong>ID Achat:</strong> {demande.idAchat}</p>
//                       <p><strong>Date:</strong> {demande.date}</p>
//                       <p><strong>Utilisateur:</strong> {demande.user}</p>
//                       <p><strong>Statut:</strong> {demande.status ? 'Livré' : 'Non livré'}</p>
//                       <p><strong>Désignation:</strong> {demande.designation}</p>
//                       <p><strong>Code Article:</strong> {demande.code}</p>
//                       <p><strong>Quantité:</strong> {demande.quantite}</p>
//                       <p><strong>Nom Projet:</strong> {demande.nom_Projet}</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListeDemandes;





// import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { loginSuccess } from '../store/authActions';
// const ListeDemandes = () => {
//   const achatEntries = JSON.parse(localStorage.getItem('achatEntries')) || [];
//     const [expandedIndex, setExpandedIndex] = useState(null);

//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   console.log("=>=>=>",loginSuccess)
//   // console.log("testestset", userData)
//   console.log("testestset", authState)

//   const handleToggle = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };
//   const [allAchatEntries, setAllAchatEntries] = useState([]);
//   useEffect(() => {
//     const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
//     let combinedEntries = [];
    
//     keys.forEach(key => {
//       const entries = JSON.parse(localStorage.getItem(key)) || [];
//       combinedEntries = combinedEntries.concat(entries);
//     });

//     setAllAchatEntries(combinedEntries);
//   }, []);

//   // const handleDelete = (index) => {
//   //   const updatedEntries = [...allAchatEntries];
//   //   const entryToDelete = updatedEntries[index];
//   //   const keyToDelete = `achatEntries_${entryToDelete.date}`; // Generate the key to delete
//   //   updatedEntries.splice(index, 1);
//   //   setAllAchatEntries(updatedEntries);
//   //   localStorage.removeItem(keyToDelete); // Remove the specific key from localStorage
//   // };
//   const handleDelete = (index) => {
//     const updatedEntries = [...allAchatEntries];
//     const entryToDelete = updatedEntries[index];

//     // Supprimer l'entrée de allAchatEntries
//     updatedEntries.splice(index, 1);
//     setAllAchatEntries(updatedEntries);

//     // Supprimer l'entrée du stockage local
//     const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
//     keys.forEach(key => {
//         const entries = JSON.parse(localStorage.getItem(key)) || [];
//         const filteredEntries = entries.filter(entry => entry.id !== entryToDelete.id);
//         localStorage.setItem(key, JSON.stringify(filteredEntries));
//     });
// };

//   return (
//     <div className="container mx-auto p-4 w-full">
//       <h2>Liste des demandes précédentes :</h2>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">ID Achat</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
//             <th className="border border-gray-300 px-4 py-2">Statut</th>
//             <th className="border border-gray-300 px-4 py-2">Détails</th>
//             <th className="border border-gray-300 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allAchatEntries.map((demande, index) => (
//             <React.Fragment key={index}>
//               <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
//                 <td className="border border-gray-300 px-4 py-2">{user ?user.username  : 'Utilisateur inconnu'}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.status ? 'Livré' : 'Non livré'}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleToggle(index)}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     {expandedIndex === index ? 'Réduire' : 'Voir Détails'}
//                   </button>
//                 </td>
//                 <td className="py-2 px-4 border">
//                 <button onClick={() => handleDelete(index)}>Delete</button>
//               </td>
//               </tr>
//               {expandedIndex === index && (
//                 <tr>
//                   <td colSpan="5" className="border border-gray-300 px-4 py-2">
//                     <div className="p-4 bg-gray-100">
//                       <p><strong>ID Achat:</strong> {demande.idAchat}</p>
//                       <p><strong>Date:</strong> {demande.date}</p>
//                       <p><strong>Utilisateur:</strong> {user ? user.username  : 'Utilisateur inconnu'}</p>
//                       <p><strong>Statut:</strong> {demande.status ? 'Livré' : 'Non livré'}</p>
//                       <p><strong>Désignation:</strong> {demande.designation}</p>
//                       <p><strong>Code Article:</strong> {demande.code}</p>
//                       <p><strong>Quantité:</strong> {demande.quantite}</p>
//                       <p><strong>Nom Projet:</strong> {demande.nom_Projet}</p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListeDemandes;



// import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { loginSuccess } from '../store/authActions';

// const ListeDemandes = () => {
//   const achatEntries = JSON.parse(localStorage.getItem('achatEntries')) || [];
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [allAchatEntries, setAllAchatEntries] = useState([]);
//   const [receivedQuantities, setReceivedQuantities] = useState({});

//   const authState = useSelector(state => state.auth);
//   const user = authState.user;

//   const handleToggle = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   useEffect(() => {
//     const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
//     let combinedEntries = [];

//     keys.forEach(key => {
//       const entries = JSON.parse(localStorage.getItem(key)) || [];
//       combinedEntries = combinedEntries.concat(entries);
//     });

//     setAllAchatEntries(combinedEntries);
//   }, []);

//   const handleDelete = (index) => {
//     const updatedEntries = [...allAchatEntries];
//     const entryToDelete = updatedEntries[index];

//     updatedEntries.splice(index, 1);
//     setAllAchatEntries(updatedEntries);

//     const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
//     keys.forEach(key => {
//       const entries = JSON.parse(localStorage.getItem(key)) || [];
//       const filteredEntries = entries.filter(entry => entry.id !== entryToDelete.id);
//       localStorage.setItem(key, JSON.stringify(filteredEntries));
//     });
//   };

//   const handleReceivedQuantityChange = (e, index) => {
//     const updatedQuantities = { ...receivedQuantities, [index]: e.target.value };
//     setReceivedQuantities(updatedQuantities);
//   };

//   const handleSuiviLivraison = (index) => {
//     const receivedQuantity = parseInt(receivedQuantities[index] || 0, 10);
//     const updatedEntries = [...allAchatEntries];
//     const currentEntry = updatedEntries[index];

//     if (receivedQuantity > 0 && receivedQuantity <= currentEntry.quantite) {
//       currentEntry.quantite -= receivedQuantity;
//       currentEntry.status = currentEntry.quantite === 0 ? 'Livré' : 'Partiellement livré';

//       setAllAchatEntries(updatedEntries);

//       const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
//       keys.forEach(key => {
//         const entries = JSON.parse(localStorage.getItem(key)) || [];
//         const entryIndex = entries.findIndex(entry => entry.id === currentEntry.id);
//         if (entryIndex !== -1) {
//           entries[entryIndex] = currentEntry;
//           localStorage.setItem(key, JSON.stringify(entries));
//         }
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 w-full">
//       <h2>Liste des demandes précédentes :</h2>
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-300 px-4 py-2">ID Achat</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
//             <th className="border border-gray-300 px-4 py-2">Statut</th>
//             <th className="border border-gray-300 px-4 py-2">Détails</th>
//             <th className="border border-gray-300 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allAchatEntries.map((demande, index) => (
//             <React.Fragment key={index}>
//               <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                 <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
//                 <td className="border border-gray-300 px-4 py-2">{user ? user.username : 'Utilisateur inconnu'}</td>
//                 <td className="border border-gray-300 px-4 py-2">{demande.status}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     onClick={() => handleToggle(index)}
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     {expandedIndex === index ? 'Réduire' : 'Voir Détails'}
//                   </button>
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <button onClick={() => handleDelete(index)}>Delete</button>
//                 </td>
//               </tr>
//               {expandedIndex === index && (
//                 <tr>
//                   <td colSpan="6" className="border border-gray-300 px-4 py-2">
//                     <div className="p-4 bg-gray-100">
//                       <p><strong>ID Achat:</strong> {demande.idAchat}</p>
//                       <p><strong>Date:</strong> {demande.date}</p>
//                       <p><strong>Utilisateur:</strong> {user ? user.username : 'Utilisateur inconnu'}</p>
//                       <p><strong>Statut:</strong> {demande.status}</p>
//                       <p><strong>Désignation:</strong> {demande.designation}</p>
//                       <p><strong>Code Article:</strong> {demande.code}</p>
//                       <p><strong>Quantité:</strong> {demande.quantite}</p>
//                       <p><strong>Nom Projet:</strong> {demande.nom_Projet}</p>
//                       <div>
//                         <label>
//                           Quantité reçue:
//                           <input
//                             type="number"
//                             value={receivedQuantities[index] || ''}
//                             onChange={(e) => handleReceivedQuantityChange(e, index)}
//                             className="ml-2 border border-gray-300 px-2 py-1"
//                           />
//                         </label>
//                         <button
//                           onClick={() => handleSuiviLivraison(index)}
//                           className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
//                         >
//                           Suivi Livraison
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListeDemandes;


import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { loginSuccess } from '../store/authActions';

const ListeDemandes = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [allAchatEntries, setAllAchatEntries] = useState([]);
  const [receivedQuantities, setReceivedQuantities] = useState({});

  const authState = useSelector(state => state.auth);
  const user = authState.user;

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
    let combinedEntries = [];

    keys.forEach(key => {
      const entries = JSON.parse(localStorage.getItem(key)) || [];
      combinedEntries = combinedEntries.concat(entries);
    });

    combinedEntries = combinedEntries.map(entry => ({
      ...entry,
      status: entry.status || 'Pending'
    }));

    setAllAchatEntries(combinedEntries);
  }, []);

  const handleDelete = (index) => {
    const updatedEntries = [...allAchatEntries];
    const entryToDelete = updatedEntries[index];

    updatedEntries.splice(index, 1);
    setAllAchatEntries(updatedEntries);

    const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
    keys.forEach(key => {
      const entries = JSON.parse(localStorage.getItem(key)) || [];
      const filteredEntries = entries.filter(entry => entry.id !== entryToDelete.id);
      localStorage.setItem(key, JSON.stringify(filteredEntries));
    });
  };

  const handleReceivedQuantityChange = (e, index) => {
    const updatedQuantities = { ...receivedQuantities, [index]: e.target.value };
    setReceivedQuantities(updatedQuantities);
  };

  const handleSuiviLivraison = (index) => {
    const receivedQuantity = parseInt(receivedQuantities[index] || 0, 10);
    const updatedEntries = [...allAchatEntries];
    const currentEntry = updatedEntries[index];

    if (receivedQuantity > 0 && receivedQuantity <= currentEntry.quantite) {
      currentEntry.quantite -= receivedQuantity;
      currentEntry.status = currentEntry.quantite === 0 ? 'Livré' : 'Partiellement livré';

      setAllAchatEntries(updatedEntries);

      const keys = Object.keys(localStorage).filter(key => key.startsWith('achatEntries_'));
      keys.forEach(key => {
        const entries = JSON.parse(localStorage.getItem(key)) || [];
        const entryIndex = entries.findIndex(entry => entry.id === currentEntry.id);
        if (entryIndex !== -1) {
          entries[entryIndex] = currentEntry;
          localStorage.setItem(key, JSON.stringify(entries));
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h2>Liste des demandes précédentes :</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID Achat</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Utilisateur</th>
            <th className="border border-gray-300 px-4 py-2">Statut</th>
            <th className="border border-gray-300 px-4 py-2">Détails</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {allAchatEntries.map((demande, index) => (
            <React.Fragment key={index}>
              <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 px-4 py-2">{demande.idAchat}</td>
                <td className="border border-gray-300 px-4 py-2">{demande.date}</td>
                <td className="border border-gray-300 px-4 py-2">{user ? user.username : 'Utilisateur inconnu'}</td>
                <td className="border border-gray-300 px-4 py-2">{demande.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleToggle(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {expandedIndex === index ? 'Réduire' : 'Voir Détails'}
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
              {expandedIndex === index && (
                <tr>
                  <td colSpan="6" className="border border-gray-300 px-4 py-2">
                    <div className="p-4 bg-gray-100">
                      <p><strong>ID Achat:</strong> {demande.idAchat}</p>
                      <p><strong>Date:</strong> {demande.date}</p>
                      <p><strong>Utilisateur:</strong> {user ? user.username : 'Utilisateur inconnu'}</p>
                      <p><strong>Statut:</strong> {demande.status}</p>
                      <p><strong>Désignation:</strong> {demande.designation}</p>
                      <p><strong>Code Article:</strong> {demande.code}</p>
                      <p><strong>Quantité:</strong> {demande.quantite}</p>
                      <p><strong>Nom Projet:</strong> {demande.nom_Projet}</p>
                      <div>
                        <label>
                          Quantité reçue:
                          <input
                            type="number"
                            value={receivedQuantities[index] || ''}
                            onChange={(e) => handleReceivedQuantityChange(e, index)}
                            className="ml-2 border border-gray-300 px-2 py-1"
                          />
                        </label>
                        <button
                          onClick={() => handleSuiviLivraison(index)}
                          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Suivi Livraison
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeDemandes;
