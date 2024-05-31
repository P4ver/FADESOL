
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // State to manage the qte_Reçu inputs
//     const [qteRecu, setQteRecu] = useState({});
//     console.log(filteredAchatData)
//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 alert('Quantity received updated successfully!');
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Calculate status based on qte_Reçu and quantite
//     const getStatus = (quantite, qteRecu) => {
//         if (qteRecu === 0) {
//             return 'Pending';
//         } else if (quantite > qteRecu) {
//             return 'Partiellement livré';
//         } else if (quantite == qteRecu) {
//             return 'Livré';
//         } else {
//             return 'Unknown'; // This is a fallback for any unexpected cases
//         }
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
//                         <th>Quantite Reçu</th>
//                         <th>Quantite Reçu</th>
//                         <th>Action</th>
//                         <th>Status</th> {/* Added Status header */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredAchatData.map((data, index) => (
//                         <tr key={index}>
//                             <td>{data.code}</td>
//                             <td>{data.qte_En_Stock}</td>
//                             <td>{data.quantite}</td>
//                             <td>{data.user_Dmd}</td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     value={qteRecu[data.id_Achat] || ''}
//                                     onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
//                                 />
//                             </td>
//                             <td>
//                                 {data.qte_Reçu}
//                             </td>
//                             <td>
//                                 <button onClick={() => handleFormSubmit(data.id_Achat)}>Quantite Reçu</button>
//                             </td>
//                             <td>
//                                 {getStatus(data.quantite, data.qte_Reçu)} {/* Calculated Status */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // State to manage the qte_Reçu inputs and update status
//     const [qteRecu, setQteRecu] = useState({});
//     const [updateSuccess, setUpdateSuccess] = useState(false);

//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 setUpdateSuccess(true);
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Reload the page when update is successful
//     useEffect(() => {
//         if (updateSuccess) {
//             window.location.reload();
//         }
//     }, [updateSuccess]);

//     // Calculate status based on qte_Reçu and quantite
//     const getStatus = (quantite, qteRecu) => {
//         if (qteRecu === 0) {
//             return 'Pending';
//         } else if (quantite > qteRecu) {
//             return 'Partiellement livré';
//         } else if (quantite == qteRecu) {
//             return 'Livré';
//         } else {
//             return 'Unknown'; // This is a fallback for any unexpected cases
//         }
//     };

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code Achat</th>
//                         <th>Code</th>
//                         <th>Quantite</th>
//                         <th>User</th>
//                         <th>Quantite Reçu</th>
//                         <th>Quantite Reçu</th>
//                         <th>Action</th>
//                         <th>Status</th> {/* Added Status header */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredAchatData.map((data, index) => (
//                         <tr key={index}>
//                             <td>{data.code_Achat}</td>
//                             <td>{data.code}</td>
//                             <td>{data.quantite}</td>
//                             <td>{data.user_Dmd}</td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     value={qteRecu[data.id_Achat] || ''}
//                                     onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
//                                 />
//                             </td>
//                             <td>
//                                 {data.qte_Reçu}
//                             </td>
//                             <td>
//                                 <button onClick={() => handleFormSubmit(data.id_Achat)}>Quantite Reçu</button>
//                             </td>
//                             <td>
//                                 {getStatus(data.quantite, data.qte_Reçu)} 
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // Group the achatData by code_Achat
//     const groupedAchatData = filteredAchatData.reduce((acc, item) => {
//         if (!acc[item.code_Achat]) {
//             acc[item.code_Achat] = [];
//         }
//         acc[item.code_Achat].push(item);
//         return acc;
//     }, {});

//     // State to manage the qte_Reçu inputs and update status
//     const [qteRecu, setQteRecu] = useState({});
//     const [updateSuccess, setUpdateSuccess] = useState(false);

//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 setUpdateSuccess(true);
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Reload the page when update is successful
//     useEffect(() => {
//         if (updateSuccess) {
//             window.location.reload();
//         }
//     }, [updateSuccess]);

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code Achat</th>
//                         <th>User</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.entries(groupedAchatData).map(([code_Achat, items], index) => (
//                         <tr key={index}>
//                             <td>{code_Achat}</td>
//                             <td>{items[0].user_Dmd}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;


//nice work
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // Group the achatData by code_Achat
//     const groupedAchatData = filteredAchatData.reduce((acc, item) => {
//         if (!acc[item.code_Achat]) {
//             acc[item.code_Achat] = [];
//         }
//         acc[item.code_Achat].push(item);
//         return acc;
//     }, {});

//     // State to manage the qte_Reçu inputs and update status
//     const [qteRecu, setQteRecu] = useState({});
//     const [updateSuccess, setUpdateSuccess] = useState(false);

//     // State to track expanded rows
//     const [expandedRows, setExpandedRows] = useState({});

//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 setUpdateSuccess(true);
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Reload the page when update is successful
//     useEffect(() => {
//         if (updateSuccess) {
//             window.location.reload();
//         }
//     }, [updateSuccess]);

//     // Toggle expanded row
//     const handleToggleExpand = (code_Achat) => {
//         setExpandedRows(prevState => ({
//             ...prevState,
//             [code_Achat]: !prevState[code_Achat]
//         }));
//     };

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code Achat</th>
//                         <th>User</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.entries(groupedAchatData).map(([code_Achat, items], index) => (
//                         <React.Fragment key={index}>
//                             <tr>
//                                 <td>{code_Achat}</td>
//                                 <td>{items[0].user_Dmd}</td>
//                                 <td>
//                                     <button onClick={() => handleToggleExpand(code_Achat)}>
//                                         {expandedRows[code_Achat] ? 'Hide Details' : 'Show Details'}
//                                     </button>
//                                 </td>
//                             </tr>
//                             {expandedRows[code_Achat] && items.map((item) => (
//                                 <tr key={item.id_Achat} style={{ backgroundColor: '#f9f9f9' }}>
//                                     <td colSpan="3">
//                                         <div>
//                                             <p>Code: {item.code}</p>
//                                             <p>Quantite: {item.quantite}</p>
//                                             <p>Quantite Reçu: {item.qte_Reçu}</p>
//                                             <input
//                                                 type="number"
//                                                 value={qteRecu[item.id_Achat] || ''}
//                                                 onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                                             />
//                                             <button onClick={() => handleFormSubmit(item.id_Achat)}>Quantite Reçu</button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;

//============================================

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // Group the achatData by code_Achat
//     const groupedAchatData = filteredAchatData.reduce((acc, item) => {
//         if (!acc[item.code_Achat]) {
//             acc[item.code_Achat] = [];
//         }
//         acc[item.code_Achat].push(item);
//         return acc;
//     }, {});

//     // State to manage the qte_Reçu inputs and update status
//     const [qteRecu, setQteRecu] = useState({});
//     const [updateSuccess, setUpdateSuccess] = useState(false);

//     // State to track expanded rows
//     const [expandedRows, setExpandedRows] = useState({});

//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 setUpdateSuccess(true);
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Reload the page when update is successful
//     useEffect(() => {
//         if (updateSuccess) {
//             window.location.reload();
//         }
//     }, [updateSuccess]);

//     // Toggle expanded row
//     const handleToggleExpand = (code_Achat) => {
//         setExpandedRows(prevState => ({
//             ...prevState,
//             [code_Achat]: !prevState[code_Achat]
//         }));
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-xl font-semibold mb-4">Achat Data Table</h1>
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                     <tr>
//                         <th className="py-2 px-3 border-b">Code Achat</th>
//                         <th className="py-2 px-3 border-b">User</th>
//                         <th className="py-2 px-3 border-b">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.entries(groupedAchatData).map(([code_Achat, items], index) => (
//                         <React.Fragment key={index}>
//                             <tr className="bg-gray-50">
//                                 <td className="py-2 px-3 border-b">{code_Achat}</td>
//                                 <td className="py-2 px-3 border-b">{items[0].user_Dmd}</td>
//                                 <td className="py-2 px-3 border-b">
//                                     <button
//                                         className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
//                                         onClick={() => handleToggleExpand(code_Achat)}
//                                     >
//                                         {expandedRows[code_Achat] ? 'Hide Details' : 'Show Details'}
//                                     </button>
//                                 </td>
//                             </tr>
//                             {expandedRows[code_Achat] && items.map((item) => (
//                                 <tr key={item.id_Achat} className="bg-gray-100">
//                                     <td colSpan="3" className="py-2 px-3 border-b">
//                                         <div className="p-2">
//                                             <p className="text-sm"><strong>Code:</strong> {item.code}</p>
//                                             <p className="text-sm"><strong>Quantite:</strong> {item.quantite}</p>
//                                             <p className="text-sm"><strong>Quantite Reçu:</strong> {item.qte_Reçu}</p>
//                                             <div className="mt-2">
//                                                 <input
//                                                     type="number"
//                                                     className="border p-1 rounded text-sm mr-2"
//                                                     value={qteRecu[item.id_Achat] || ''}
//                                                     onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                                                 />
//                                                 <button
//                                                     className="bg-green-500 text-white text-sm px-3 py-1 rounded"
//                                                     onClick={() => handleFormSubmit(item.id_Achat)}
//                                                 >
//                                                     Update Quantite Reçu
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;
//============================================


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt } from 'react-icons/fa';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// Modal.setAppElement('#root');

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   modal: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     maxWidth: 800,
//     backgroundColor: 'white',
//     boxShadow: 24,
//     padding: 20,
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: '10px',
//     width: '100px', // Adjusted width for quantity input
//   },
//   updateButton: {
//     marginLeft: 10,
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);
//   const [qteRecu, setQteRecu] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedAchat, setSelectedAchat] = useState(null);

//   const handleInputChange = (id, value) => {
//     setQteRecu(prevState => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleFormSubmit = async (id) => {
//     const quantityReceived = qteRecu[id];
//     if (quantityReceived !== undefined) {
//       try {
//         await dispatch(updateAchatData({
//           id_Achat: id,
//           updatedAchatData: { qte_Reçu: quantityReceived }
//         }));
//         setUpdateSuccess(true);
//       } catch (error) {
//         console.error('Error updating quantity received:', error);
//         alert('Failed to update quantity received.');
//       }
//     } else {
//       alert('Please enter a quantity received.');
//     }
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload();
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu === 0) {
//       return 'Pending';
//     } else if (quantite > qteRecu) {
//       return 'Partiellement livré';
//     } else if (quantite == qteRecu) {
//       return 'Livré';
//     } else {
//       return 'Unknown';
//     }
//   };

//   const openModal = (achat) => {
//     setSelectedAchat(achat);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedAchat(null);
//   };

//   // Extract unique codeAchats
//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   return (
//     <Box padding={3}>
//       <Typography variant="h4" gutterBottom>Achat Data Table</Typography>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Code-Achat</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Suivi Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {uniqueCodeAchats.map((codeAchat, index) => {
//               const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
//               return (
//                 <TableRow key={index}>
//                   <TableCell>{achat.code_Achat}</TableCell>
//                   <TableCell>{achat.user_Dmd}</TableCell>
//                   <TableCell>{getStatus(achat.quantite, achat.qte_Reçu)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => openModal(achat)}>
//                       <FaEye />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedAchat && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentLabel="Detail Modal"
//           className={classes.modal}
//         >
//           <Box className={classes.modalHeader}>
//             <Typography variant="h6">Details for {selectedAchat.code_Achat}</Typography>
//             <IconButton onClick={closeModal}>
//               <FaPencilAlt />
//             </IconButton>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table className={classes.table} size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Code</TableCell>
//                   <TableCell>Quantite</TableCell>
//                   <TableCell>Quantite Reçu Value</TableCell>
//                   <TableCell>Quantite Reçu</TableCell>
//                   {/* <TableCell>Status</TableCell> */}
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {achatData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{item.code}</TableCell>
//                     <TableCell>{item.quantite}</TableCell>
//                     <TableCell>{item.qte_Reçu}</TableCell>
//                     <TableCell>
//                       <TextField
//                         value={qteRecu[item.id_Achat] || ''}
//                         onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                         variant="outlined"
//                         size="small" // Reduced size for quantity input
//                         className={classes.input}
//                       />
//                     </TableCell>
//                     {/* <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || 0)}</TableCell> */}
//                     <TableCell>
//                       <IconButton
//                         onClick={() => handleFormSubmit(item.id_Achat)}
//                         className={classes.updateButton}
//                       >
//                         <FaPencilAlt />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Modal>
//       )}
//     </Box>
//   );
// }

// export default ListeDemande;


// =====================================

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData, } from '../store/achatSlice';
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck } from 'react-icons/fa'; // Ajout des icônes nécessaires
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// Modal.setAppElement('#root');

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   modal: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     maxWidth: 800,
//     backgroundColor: 'white',
//     boxShadow: 24,
//     padding: 20,
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     marginBottom: '10px',
//     width: '100px',
//   },
//   updateButton: {
//     marginLeft: 10,
//   },
//   statusIcon: {
//     marginRight: 5,
//     verticalAlign: 'middle',
//   },
//   validateButton: {
//     marginTop: 10,
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);
//   const [qteRecu, setQteRecu] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedAchat, setSelectedAchat] = useState(null);

//   const handleInputChange = (id, value) => {
//     setQteRecu(prevState => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   const handleFormSubmit = async (id) => {
//     const quantityReceived = qteRecu[id];
//     if (quantityReceived !== undefined) {
//       try {
//         await dispatch(updateAchatData({
//           id_Achat: id,
//           updatedAchatData: { qte_Reçu: quantityReceived }
//         }));
//         setUpdateSuccess(true);
//       } catch (error) {
//         console.error('Error updating quantity received:', error);
//         alert('Failed to update quantity received.');
//       }
//     } else {
//       alert('Please enter a quantity received.');
//     }
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload();
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu === 0) {
//       return (
//         <span>
//           <FaTruck className={classes.statusIcon} /> Pending
//         </span>
//       );
//     } else if (quantite > qteRecu) {
//       return (
//         <span>
//           <FaTruck className={classes.statusIcon} /> Partiellement livré
//         </span>
//       );
//     } else if (quantite == qteRecu) {
//       return (
//         <span>
//           <FaCheck className={classes.statusIcon} /> Livré
//         </span>
//       );
//     } else {
//       return 'Unknown';
//     }
//   };

//   const openModal = (achat) => {
//     setSelectedAchat(achat);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedAchat(null);
//   };

//   // Extract unique codeAchats
//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   const handleValidation = async () => {
//     try {
//       const promises = Object.keys(qteRecu).map(id =>
//         dispatch(updateAchatData({
//           id_Achat: id,
//           updatedAchatData: { qte_Reçu: qteRecu[id] }
//         }))
//       );
//       await Promise.all(promises);
//       setUpdateSuccess(true);
//       setModalIsOpen(false); // Ferme le pop-up après validation
//     } catch (error) {
//       console.error('Error updating quantities:', error);
//       alert('Failed to update quantities.');
//     }
//   };

//   return (
//     <Box padding={3}>
//       <Typography variant="h4" gutterBottom>Achat Data Table</Typography>
//       <TableContainer component={Paper}>
//         <Table className={classes.table}  size="small">
//           <TableHead>
//             <TableRow className='bg-green-100'>
//               <TableCell>Code-Achat</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Suivi Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {uniqueCodeAchats.map((codeAchat, index) => {
//               const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
//               return (
//                 <TableRow key={index}>
//                   <TableCell>{achat.code_Achat}</TableCell>
//                   <TableCell>{achat.user_Dmd}</TableCell>
//                   <TableCell>{getStatus(achat.quantite, achat.qte_Reçu)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => openModal(achat)}>
//                       <FaEye />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedAchat && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentLabel="Detail Modal"
//           className={classes.modal}
//         >
//           <Box className={classes.modalHeader}>
//             <Typography variant="h6">Details for {selectedAchat.code_Achat}</Typography>
//             <IconButton onClick={closeModal}>
//               <FaTimes /> {/* Icône de fermeture du pop-up */}
//             </IconButton>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table className={classes.table}  size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Code</TableCell>
//                   <TableCell>Quantite</TableCell>
//                   <TableCell>Quantite Reçu Value</TableCell>
//                   <TableCell>Quantite Reçu</TableCell>
//                   {/* <TableCell>Status</TableCell> */}
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {achatData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{item.code}</TableCell>
//                     <TableCell>{item.quantite}</TableCell>
//                     <TableCell>{item.qte_Reçu}</TableCell>
//                     <TableCell>
//                       <TextField
//                         value={qteRecu[item.id_Achat] || ''}
//                         onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                         variant="outlined"
//                         size="small" // Reduced size for quantity input
//                         className={classes.input}
//                       />
//                     </TableCell>
//                     {/* <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || 0)}</TableCell> */}
//                     <TableCell>
//                       <IconButton
//                         onClick={() => handleFormSubmit(item.id_Achat)}
//                         className={classes.updateButton}
//                       >
//                         <FaPencilAlt />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.validateButton}
//             onClick={handleValidation}
//           >
//             Valider
//           </Button>
//         </Modal>
//       )}
//     </Box>
//   );
// }

// export default ListeDemande;






import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAchatData, deleteAchatData } from '../store/achatSlice'; // Assuming you have a delete action in achatSlice
import Modal from 'react-modal';
import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, Typography, Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmation dialog
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import confirmation dialog styles

Modal.setAppElement('#root');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 20,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: '10px',
    width: '100px', // Adjusted width for quantity input
  },
  updateButton: {
    marginLeft: 10,
  },
  statusIcon: {
    marginRight: 5,
    verticalAlign: 'middle',
  },
  validateButton: {
    marginTop: 10,
  },
});

function ListeDemande() {
  const classes = useStyles();
  const { achatData } = useSelector(state => state.achat);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();

  const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);
  const handlePrint = () => {
    window.print(); // Ouvre la boîte de dialogue d'impression du navigateur
    setAnchorEl(null); // Ferme le menu après l'impression
  };

  const handleClickPrint = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePrint = () => {
    setAnchorEl(null);
  };
  const handleInputChange = (id, value) => {
    setQteRecu(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (id) => {
    const quantityReceived = qteRecu[id];
    if (quantityReceived !== undefined) {
      try {
        await dispatch(updateAchatData({
          id_Achat: id,
          updatedAchatData: { qte_Reçu: quantityReceived }
        }));
        setUpdateSuccess(true);
      } catch (error) {
        console.error('Error updating quantity received:', error);
        alert('Failed to update quantity received.');
      }
    } else {
      alert('Please enter a quantity received.');
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to delete this demand?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteAchatData(id)), // Implement delete action
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    });
  };
  
  useEffect(() => {
    if (updateSuccess) {
      window.location.reload();
    }
  }, [updateSuccess]);

  const getStatus = (quantite, qteRecu) => {
    if (qteRecu === 0) {
      return (
        <span>
          <FaTruck className={classes.statusIcon} /> Pending
        </span>
      );
    } else if (quantite > qteRecu) {
      return (
        <span>
          <FaTruck className={classes.statusIcon} /> Partiellement livré
        </span>
      );
    } else if (quantite == qteRecu) {
      return (
        <span>
          <FaCheck className={classes.statusIcon} /> Livré
        </span>
      );
    } else {
      return 'Unknown';
    }
  };

  const openModal = (achat) => {
    setSelectedAchat(achat);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAchat(null);
  };

  // Extract unique codeAchats
  const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

  const handleValidation = async () => {
    try {
      const promises = Object.keys(qteRecu).map(id =>
        dispatch(updateAchatData({
          id_Achat: id,
          updatedAchatData: { qte_Reçu: qteRecu[id] }
        }))
      );
      await Promise.all(promises);
      setUpdateSuccess(true);
      setModalIsOpen(false); // Ferme le pop-up après validation

      // Check if all items are delivered
      const allDelivered = filteredAchatData.every(item => item.quantite === qteRecu[item.id_Achat]);
      if (allDelivered) {
        // Show notification for fully delivered demand
        // alert(Demand ${selectedAchat.code_Achat} is fully delivered.);
      }
    } catch (error) {
      console.error('Error updating quantities:', error);
      alert('Failed to update quantities.');
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>Achat Data Table</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table}  size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code-Achat</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Suivi Status</TableCell>
              <TableCell>Action</TableCell> {/* Added column for delete action */}
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCodeAchats.map((codeAchat, index) => {
              const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
              return (
                <TableRow key={index}>
                  <TableCell>{achat.code_Achat}</TableCell>
                  <TableCell>{achat.user_Dmd}</TableCell>
                  <TableCell>{getStatus(achat.quantite, achat.qte_Reçu)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openModal(achat)}>
                      <FaEye />
                    </IconButton>
                  </TableCell>
                  <TableCell> {/* Delete button */}
                    <IconButton onClick={() => handleDelete(achat.id_Achat)}>
                      <FaTimes />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedAchat && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detail Modal"
          className={classes.modal}
        >
          <Box className={classes.modalHeader}>
            <Typography variant="h6">Details for {selectedAchat.code_Achat}</Typography>
            <IconButton onClick={closeModal}>
              <FaTimes />
            </IconButton>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table}  size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Quantite</TableCell>
                  <TableCell>Quantite Reçu Value</TableCell>
                  <TableCell>Quantite Reçu</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {achatData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
    <TableRow key={idx}>
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.quantite}</TableCell>
      <TableCell>{item.qte_Reçu}</TableCell>
      <TableCell>
        <TextField
          value={qteRecu[item.id_Achat] || ''}
          onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
          variant="outlined"
          size="small" // Reduced size for quantity input
          className={classes.input}
        />
      </TableCell>
      <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || 0)}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => handleFormSubmit(item.id_Achat)}
          className={classes.updateButton}
        >
          <FaPencilAlt />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            className={classes.validateButton}
            onClick={handleValidation}
          >
            Valider
          </Button>
          <IconButton onClick={handlePrint} className={classes.printButton}>
  <FaPrint />
</IconButton>

        </Modal>
      )}
    </Box>
  );
}

export default ListeDemande;