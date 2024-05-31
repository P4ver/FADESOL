
// import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { loginSuccess } from '../store/authActions';

// const ListeDemandes = () => {
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [allAchatEntries, setAllAchatEntries] = useState([]);
//   const [receivedQuantities, setReceivedQuantities] = useState({});

//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
// console.log("whoami", user)
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

//     combinedEntries = combinedEntries.map(entry => ({
//       ...entry,
//       status: entry.status || 'Pending'
//     }));

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
  
//       // Mettre à jour la quantité livrée dans localStorage
//       const deliveredEntries = JSON.parse(localStorage.getItem('deliveredEntries')) || [];
//       const deliveredEntryIndex = deliveredEntries.findIndex(entry => entry.idAchat === currentEntry.idAchat);
  
//       if (deliveredEntryIndex !== -1) {
//         deliveredEntries[deliveredEntryIndex].quantiteLivre += receivedQuantity;
//       } else {
//         deliveredEntries.push({
//           idAchat: currentEntry.idAchat,
//           date: currentEntry.date,
//           utilisateur: user.username,
//           quantiteLivre: receivedQuantity
//         });
//       }
  
//       localStorage.setItem('deliveredEntries', JSON.stringify(deliveredEntries));
  
//       // Mettre à jour les autres entrées nécessaires (localStorage ou backend)
  
//       // Mettre à jour l'état local
//       setAllAchatEntries(updatedEntries);
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

// import React from 'react';
// import { useSelector } from 'react-redux';

// function ListeDemande() {
//   const {achatData} = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   console.log(user.username)
//   return (
//       <div>
//           <h1>Achat Data Table</h1>
//           <table>
//               <thead>
//                   <tr>
//                       <th>Code</th>
//                       <th>Designation</th>
//                       <th>Quantite</th>
//                       <th>quantite en stock</th>
//                       <th>user</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {achatData.map((data, index) => (
//                       <tr key={index}>
//                           <td>{data.code}</td>
//                           <td>{data.designation}</td>
//                           <td>{data.quantite}</td>
//                           <td>{data.qte_En_Stock}</td>
//                           <td>{data.user_Dmd}</td>
//                       </tr>
//                   ))}
//               </tbody>
//           </table>
//       </div>
//   );}

// export default ListeDemande;


//classic
// import React from 'react';
// import { useSelector } from 'react-redux';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code</th>
//                         {/* <th>Designation</th> */}
//                         <th>Quantite en Stock</th>
//                         <th>Quantite</th>
//                         <th>User</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredAchatData.map((data, index) => (
//                         <tr key={index}>
//                             <td>{data.code}</td>
//                             {/* <td>{data.designation}</td> */}
//                             <td>{data.qte_En_Stock}</td>
//                             <td>{data.quantite}</td>
//                             <td>{data.user_Dmd}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     const [updatedQuantites, setUpdatedQuantites] = useState({});

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // const handleUpdateQuantite = (id_Achat) => {
//     //     const updatedAchatData = updatedQuantites[id_Achat];
//     //     // Ensure that updatedQuantite is not empty
//     //     if (updatedAchatData && updatedAchatData.trim() !== '') {
//     //         dispatch(updateAchatData({ id_Achat, updatedAchatData }));
//     //         // Clear the updatedQuantites state after updating
//     //         setUpdatedQuantites(prevState => ({
//     //             ...prevState,
//     //             [id_Achat]: ''
//     //         }));
//     //     } else {
//     //         alert('Please enter a valid quantity.');
//     //     }
//     // };

//     const handleUpdateQuantite = (id_Achat) => {
//       const updatedAchatData = updatedQuantites[id_Achat];
//       console.log("Updated Achat Data:", updatedAchatData); // Add this line to log the updated data
//       // Ensure that updatedQuantite is not empty
//       if (updatedAchatData && updatedAchatData.trim() !== '') {
//           dispatch(updateAchatData({ id_Achat, updatedAchatData }));
//           console.log(dispatch(updateAchatData({ id_Achat, updatedAchatData })))
//           // Clear the updatedQuantites state after updating
//           setUpdatedQuantites(prevState => ({
//               ...prevState,
//               [id_Achat]: ''
//           }));
//       } else {
//           alert('Please enter a valid quantity.');
//       }
//   };
  

//     const handleChangeQuantite = (id_Achat, value) => {
//         setUpdatedQuantites(prevState => ({
//             ...prevState,
//             [id_Achat]: value
//         }));
//     };

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code</th>
//                         <th>Quantite en Stock</th>
//                         <th>Quantite</th>
//                         <th>User</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredAchatData.map((data, index) => (
//                         <tr key={index}>
//                             <td>{data.code}</td>
//                             <td>{data.qte_En_Stock}</td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     value={updatedQuantites[data.id_Achat] || ''}
//                                     onChange={(e) => handleChangeQuantite(data.id_Achat, e.target.value)}
//                                 />
//                             </td>
//                             <td>{data.quantite}</td>
//                             <td>{data.user_Dmd}</td>
//                             <td>
//                                 <button onClick={() => handleUpdateQuantite(data.id_Achat)}>Update Quantite</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;



import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAchatData } from '../store/achatSlice';

function ListeDemande() {
    const { achatData } = useSelector(state => state.achat);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const dispatch = useDispatch();

    // Filter the achatData based on the user_Dmd matching the current user's username
    const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

    // State to manage the qte_Reçu inputs
    const [qteRecu, setQteRecu] = useState({});
    console.log(filteredAchatData)
    // Handle input change
    const handleInputChange = (id, value) => {
        setQteRecu(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (id) => {
        const quantityReceived = qteRecu[id];
        if (quantityReceived !== undefined) {
            try {
                // Dispatch the updateAchatData action
                await dispatch(updateAchatData({
                    id_Achat: id,
                    updatedAchatData: { qte_Reçu: quantityReceived }
                }));
                alert('Quantity received updated successfully!');
            } catch (error) {
                console.error('Error updating quantity received:', error);
                alert('Failed to update quantity received.');
            }
        } else {
            alert('Please enter a quantity received.');
        }
    };

    return (
        <div>
            <h1>Achat Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        {/* <th>Designation</th> */}
                        <th>Quantite en Stock</th>
                        <th>Quantite</th>
                        <th>User</th>
                        <th>Quantite Reçu</th>
                        <th>Quantite Reçu</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAchatData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.code}</td>
                            {/* <td>{data.designation}</td> */}
                            <td>{data.qte_En_Stock}</td>
                            <td>{data.quantite}</td>
                            <td>{data.user_Dmd}</td>
                            <td>
                                <input
                                    type="number"
                                    value={qteRecu[data.id_Achat] || ''}
                                    onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
                                    />
                            </td>
                            <td>
                                {data.qte_Reçu}
                            </td>
                            <td>
                                <button onClick={() => handleFormSubmit(data.id_Achat)}>Quantite Reçu</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListeDemande;


