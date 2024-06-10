

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatempoData,updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice'; // Assuming you have a delete action in achatSlice
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { confirmAlert } from 'react-confirm-alert'; // Import confirmation dialog
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import confirmation dialog styles
// import logo from '../pictures/logo.png';
// import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

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
//   statusIcon: {
//     marginRight: 5,
//     verticalAlign: 'middle',
//   },
//   validateButton: {
//     marginTop: 10,
//   },
//   printArea: {
//     display: 'none',
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatempoData } = useSelector(state => state.achatempo);
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAchatData());
//     dispatch(fetchAchatempoData());
//   }, [dispatch]);

//   console.log("achatData:", achatData);
//   const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
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
//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: quantityReceived }
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

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: 'Confirmation',
//       message: 'Are you sure you want to delete this demand?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => dispatch(deleteAchatempoData(id)), // Implement delete action
//         },
//         {
//           label: 'No',
//           onClick: () => {},
//         }
//       ]
//     });
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload(); // Reload the page to update data
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu == 0) {
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

//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   useEffect(() => {
//     const handleDeleteDuplicates = async () => {
//       try {
//         const achatMap = {};
//         const duplicates = [];
  
//         achatData.forEach(achat => {
//           const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//           if (achatMap[key]) {
//             duplicates.push(achat.id_Achat);
//           } else {
//             achatMap[key] = true;
//           }
//         });
  
//         const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
//         await Promise.all(deletePromises);
//       } catch (error) {
//         console.error('Error deleting duplicates:', error);
//         alert('Failed to delete duplicates.');
//       }
//     };
  
//     handleDeleteDuplicates();
//   }, [achatData, qteRecu]);
  
//   const handleValidation = async () => {
//     try {
//       // First, update all quantities in achatempo
//       const updatePromises = Object.keys(qteRecu).map(id =>
//         dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: qteRecu[id] }
//         }))
//       );
//       await Promise.all(updatePromises);
//       setUpdateSuccess(true);
//       setModalIsOpen(false); // Close the modal after validation
  
//       // Function to check if an item already exists in the achat table
//       const itemExistsInAchat = (item) => {
//         return achatData.some(achat =>
//           achat.code === item.code &&
//           achat.code_Projet === item.code_Projet &&
//           achat.designation === item.designation &&
//           achat.quantite === item.quantite &&
//           achat.nom_Projet === item.nom_Projet &&
//           achat.date === item.date &&
//           achat.code_Achat === item.code_Achat &&
//           achat.user_Dmd === item.user_Dmd
//         );
//       };
  
//       // Check the status of each demand and add to achatData if 'livré'
//       const addAchatPromises = filteredAchatData.map(async item => {
//         const quantityReceived = qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu;
//         if (item.quantite === quantityReceived && !itemExistsInAchat(item)) {
//           await dispatch(postAchatData({
//             code: item.code,
//             code_Projet: item.code_Projet,
//             designation: item.designation,
//             quantite: item.quantite,
//             nom_Projet: item.nom_Projet,
//             date: item.date,
//             code_Achat: item.code_Achat,
//             user_Dmd: item.user_Dmd
//           }));
//         }
//       });
  
//       await Promise.all(addAchatPromises);
  
//     } catch (error) {
//       console.error('Error updating quantities:', error);
//       alert('Failed to update quantities.');
//     }
//   };
  

//   const handlePrint = () => {
//     const printContents = document.getElementById('print-area').innerHTML;
//     const originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
//   };

//   const getGeneralStatus = (codeAchat) => {
//     const relatedDemands = filteredAchatData.filter(data => data.code_Achat === codeAchat);

//     if (relatedDemands.every(demand => demand.qte_Reçu === 0)) {
//       return 'Pending';
//     }

//     if (relatedDemands.every(demand => demand.qte_Reçu === demand.quantite)) {
//       return 'Livré';
//     }

//     if (relatedDemands.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
//       return 'Partiellement livré';
//     }

//     return 'Pending';
//   };

//   const handleDeleteDuplicates = async () => {
//   try {
//     const achatMap = {};
//     const duplicates = [];

//     achatData.forEach(achat => {
//       const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//       if (achatMap[key]) {
//         duplicates.push(achat.id_Achat);
//       } else {
//         achatMap[key] = true;
//       }
//     });

//     const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
//     await Promise.all(deletePromises);
//     window.location.reload();
//   } catch (error) {
//     console.error('Error deleting duplicates:', error);
//     alert('Failed to delete duplicates.');
//   }
// };

//   return (
//     <Box padding={3}>
//       <Typography variant="h4" gutterBottom>Listes Demandes</Typography>

//       <TableContainer component={Paper} >
//         <Table className={classes.table} size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Code-Achat</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Suivi Status</TableCell>
//               <TableCell>Action</TableCell> {/* Added column for delete action */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {uniqueCodeAchats.map((codeAchat, index) => {
//               const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
//               return (
//                 <TableRow key={index}>
//                   <TableCell>{achat.code_Achat}</TableCell>
//                   <TableCell>{achat.user_Dmd}</TableCell>
//                   <TableCell>{getGeneralStatus(achat.code_Achat)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => openModal(achat)}>
//                       <div className='text-blue-600'>
//                         <FaEye />
//                       </div>
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDelete(achat.id_Achat)}>
//                       <div className='text-red-700'>
//                         <FaTimes />
//                       </div>
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
//             <Typography variant="h6">Détails pour {selectedAchat.code_Achat}</Typography>
//             <IconButton onClick={closeModal}>
//               <FaTimes />
//             </IconButton>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table className={classes.table} size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Code</TableCell>
//                   <TableCell>Quantité</TableCell>
//                   <TableCell>Quantité Reçue</TableCell>
//                   <TableCell>Status</TableCell>
//                   {/* <TableCell>Action</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {achatempoData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{item.code}</TableCell>
//                     <TableCell>{item.quantite}</TableCell>
//                     <TableCell>
//                       <TextField
//                         value={qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu}
//                         onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                         variant="outlined"
//                         size="small"
//                         className={classes.input}
//                       />
//                     </TableCell>
//                     <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || item.qte_Reçu)}</TableCell>
//                     {/* <TableCell>
//                       <IconButton
//                         onClick={() => handleFormSubmit(item.id_Achat)}
//                         className={classes.updateButton}
//                       >
//                         <FaPencilAlt />
//                       </IconButton>
//                     </TableCell> */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.validateButton}
//             onClick={() => {
//               confirmAlert({
//                 title: 'Confirmation',
//                 message: 'Are you sure you want to validate this update?',
//                 buttons: [
//                   {
//                     label: 'Yes',
//                     onClick: handleValidation,
//                   },
//                   {
//                     label: 'No',
//                     onClick: () => {},
//                   },
//                 ],
//               });
//             }}
//           >
//             Valider
//           </Button>
//           <IconButton onClick={handlePrint} className={classes.printButton}>
//             <FaPrint />
//           </IconButton>
//         </Modal>
//       )}

{/* <div id="print-area" className={`${classes.printArea}`}>
  <div className='w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande Achat</h5>

  <table className='w-2/5 shadow-y-lg'> 
    <tbody>
      {[
        { label: 'Code Achat', value: selectedAchat?.code_Achat },
        { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
        { label: 'User', value: selectedAchat?.user_Dmd }
      ].map((item, idx) => (
        <tr key={idx}>
          <td><h6>{item.label}</h6></td>
          <td>: {item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <br />
  <br />

  <div className='my-4'>
  <table className={`${classes.table} w-[10%] border-collapse border border-green-800 rounded-lg shadow-sm`}>
    <thead>
      <tr className='border'>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Code</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Designation</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Quantité</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Projet</th>
      </tr>
    </thead>
    <tbody>
      {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
        <tr key={idx} className='border'>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.code}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.designation}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.quantite}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.nom_Projet}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <br />
  <div className='my-2 float-right'><p>Signature<span className='text-gray-200'>_____________________</span></p></div>
</div> */}



//     </Box>
//   );
// }

// export default ListeDemande;





// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice';
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import logo from '../pictures/logo.png';
// import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

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
//   printArea: {
//     display: 'none',
//   },
//   filterContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   searchInput: {
//     marginRight: 10,
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatempoData } = useSelector(state => state.achatempo);
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAchatData());
//     dispatch(fetchAchatempoData());
//   }, [dispatch]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     if (filterType === 'all') {
//       setFilteredData(achatempoData);
//     } else if (filterType === 'pending') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu === 0));
//     } else if (filterType === 'partial') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu > 0 && item.qte_Reçu < item.quantite));
//     } else if (filterType === 'delivered') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu === item.quantite));
//     }
//   }, [filterType, achatempoData]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilterType(e.target.value);
//   };

//   const filteredResults = filteredData.filter(item => {
//     if (searchQuery === '') {
//       return true;
//     } else {
//       return item.code_Achat.includes(searchQuery) || item.user_Dmd.includes(searchQuery);
//     }
//   });

//   const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
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
//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: quantityReceived }
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

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: 'Confirmation',
//       message: 'Are you sure you want to delete this demand?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => dispatch(deleteAchatempoData(id)),
//         },
//         {
//           label: 'No',
//           onClick: () => {},
//         }
//       ]
//     });
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload();
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu == 0) {
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

//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   useEffect(() => {
//     const handleDeleteDuplicates = async () => {
//       try {
//         const achatMap = {};
//         const duplicates = [];
  
//         achatData.forEach(achat => {
//           const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//           if (achatMap[key]) {
//             duplicates.push(achat.id_Achat);
//           } else {
//             achatMap[key] = true;
//           }
//         });
  
//         if (duplicates.length > 0) {
//           for (const duplicateId of duplicates) {
//             await dispatch(deleteAchatData(duplicateId));
//           }
//         }
//       } catch (error) {
//         console.error('Error deleting duplicate entries:', error);
//       }
//     };
  
//     handleDeleteDuplicates();
//   }, [achatData, dispatch]);
  
//   return (
//     <div>
//       <div className={classes.filterContainer}>
//         <TextField
//           className={classes.searchInput}
//           label="Search"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <select value={filterType} onChange={handleFilterChange}>
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="partial">Partial</option>
//           <option value="delivered">Delivered</option>
//         </select>
//       </div>

//       <TableContainer component={Paper}>
//         <Table className={classes.table}>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredResults.map((row) => (
//               <TableRow key={row.id_Achat}>
//                 <TableCell>{row.id_Achat}</TableCell>
//                 <TableCell>{row.date}</TableCell>
//                 <TableCell>{row.user_Dmd}</TableCell>
//                 <TableCell>{row.quantite}</TableCell>
//                 <TableCell>{getStatus(row.quantite, row.qte_Reçu)}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => openModal(row)}>
//                     <FaEye />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(row.id_Achat)}>
//                     <FaTimes />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={classes.modal}
//       >
//         <div className={classes.modalHeader}>
//           <Typography variant="h6">Order Details</Typography>
//           <IconButton onClick={closeModal}>
//             <FaTimes />
//           </IconButton>
//         </div>
//         {selectedAchat && (
//           <Box>
//             <Typography variant="body1">ID: {selectedAchat.id_Achat}</Typography>
//             <Typography variant="body1">Date: {selectedAchat.date}</Typography>
//             <Typography variant="body1">User: {selectedAchat.user_Dmd}</Typography>
//             <Typography variant="body1">Quantity: {selectedAchat.quantite}</Typography>
//             <Typography variant="body1">Received Quantity: {selectedAchat.qte_Reçu}</Typography>
//             <TextField
//               className={classes.input}
//               label="Received Quantity"
//               type="number"
//               value={qteRecu[selectedAchat.id_Achat] || ''}
//               onChange={(e) => handleInputChange(selectedAchat.id_Achat, e.target.value)}
//             />
//             <Button
//               className={classes.updateButton}
//               variant="contained"
//               color="primary"
//               onClick={() => handleFormSubmit(selectedAchat.id_Achat)}
//             >
//               Update
//             </Button>
//           </Box>
//         )}
//       </Modal>

//       <div className={classes.printArea} id="printArea">
//         <Typography variant="h6" align="center">
//           Delivery Note
//         </Typography>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <img src={logo} alt="Company Logo" width="100" height="100" />
//         </div>
//         <Typography variant="body1" align="center">
//           Date: {new Date().toLocaleDateString()}
//         </Typography>
//         <Typography variant="body1" align="center">
//           User: {user.username}
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table className={classes.table}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>User</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {uniqueCodeAchats.map((codeAchat, index) => {
//                 const filteredRows = filteredAchatData.filter(data => data.code_Achat === codeAchat);
//                 const isLastRow = index === uniqueCodeAchats.length - 1;

//                 return (
//                   <React.Fragment key={codeAchat}>
//                     {filteredRows.map((row, idx) => (
//                       <TableRow key={row.id_Achat}>
//                         <TableCell>{row.id_Achat}</TableCell>
//                         <TableCell>{row.date}</TableCell>
//                         <TableCell>{row.user_Dmd}</TableCell>
//                         <TableCell>{row.quantite}</TableCell>
//                         <TableCell>{getStatus(row.quantite, row.qte_Reçu)}</TableCell>
//                       </TableRow>
//                     ))}
//                     {!isLastRow && (
//                       <TableRow>
//                         <TableCell colSpan={5} />
//                       </TableRow>
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// }

// export default ListeDemande;













// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice'; // Assuming you have a delete action in achatSlice
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { confirmAlert } from 'react-confirm-alert'; // Import confirmation dialog
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import confirmation dialog styles
// import logo from '../pictures/logo.png';
// import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

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
//   statusIcon: {
//     marginRight: 5,
//     verticalAlign: 'middle',
//   },
//   validateButton: {
//     marginTop: 10,
//   },
//   printArea: {
//     display: 'none',
//   },
//   filterContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   searchInput: {
//     marginRight: 10,
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatempoData } = useSelector(state => state.achatempo);
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAchatData());
//     dispatch(fetchAchatempoData());
//   }, [dispatch]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     if (filterType === 'all') {
//       setFilteredData(achatempoData);
//     } else if (filterType === 'pending') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu === 0));
//     } else if (filterType === 'partial') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu > 0 && item.qte_Reçu < item.quantite));
//     } else if (filterType === 'delivered') {
//       setFilteredData(achatempoData.filter(item => item.qte_Reçu === item.quantite));
//     }
//   }, [filterType, achatempoData]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilterType(e.target.value);
//   };

//   const filteredResults = filteredData.filter(item => {
//     if (searchQuery === '') {
//       return true;
//     } else {
//       return item.code_Achat.includes(searchQuery) || item.user_Dmd.includes(searchQuery);
//     }
//   });

//   const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
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
//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: quantityReceived }
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

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: 'Confirmation',
//       message: 'Are you sure you want to delete this demand?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => dispatch(deleteAchatempoData(id)),
//         },
//         {
//           label: 'No',
//           onClick: () => {},
//         }
//       ]
//     });
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload();
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu == 0) {
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

//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   useEffect(() => {
//     const handleDeleteDuplicates = async () => {
//       try {
//         const achatMap = {};
//         const duplicates = [];
  
//         achatData.forEach(achat => {
//           const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//           if (achatMap[key]) {
//             duplicates.push(achat.id_Achat);
//           } else {
//             achatMap[key] = true;
//           }
//         });
  
//         if (duplicates.length > 0) {
//           for (const duplicateId of duplicates) {
//             await dispatch(deleteAchatData(duplicateId));
//           }
//         }
//       } catch (error) {
//         console.error('Error deleting duplicate entries:', error);
//       }
//     };
  
//     handleDeleteDuplicates();
//   }, [achatData, dispatch]);

//   const handleValidation = async () => {
//     try {
//       // First, update all quantities in achatempo
//       const updatePromises = Object.keys(qteRecu).map(id =>
//         dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: qteRecu[id] }
//         }))
//       );
//       await Promise.all(updatePromises);
//       setUpdateSuccess(true);
//       setModalIsOpen(false); // Close the modal after validation
  
//       // Function to check if an item already exists in the achat table
//       const itemExistsInAchat = (item) => {
//         return achatData.some(achat =>
//           achat.code === item.code &&
//           achat.code_Projet === item.code_Projet &&
//           achat.designation === item.designation &&
//           achat.quantite === item.quantite &&
//           achat.nom_Projet === item.nom_Projet &&
//           achat.date === item.date &&
//           achat.code_Achat === item.code_Achat &&
//           achat.user_Dmd === item.user_Dmd
//         );
//       };
  
//       // Check the status of each demand and add to achatData if 'livré'
//       const addAchatPromises = filteredAchatData.map(async item => {
//         const quantityReceived = qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu;
//         if (item.quantite === quantityReceived && !itemExistsInAchat(item)) {
//           await dispatch(postAchatData({
//             code: item.code,
//             code_Projet: item.code_Projet,
//             designation: item.designation,
//             quantite: item.quantite,
//             nom_Projet: item.nom_Projet,
//             date: item.date,
//             code_Achat: item.code_Achat,
//             user_Dmd: item.user_Dmd
//           }));
//         }
//       });
  
//       await Promise.all(addAchatPromises);
  
//     } catch (error) {
//       console.error('Error updating and adding to achatData:', error);
//     }
//   };

//   const handlePrint = () => {
//     const printArea = document.getElementById('printArea');
//     if (printArea) {
//       const printWindow = window.open('', '', 'width=800,height=600');
//       printWindow.document.write('<html><head><title>Print</title></head><body>');
//       printWindow.document.write(printArea.innerHTML);
//       printWindow.document.write('</body></html>');
//       printWindow.document.close();
//       printWindow.print();
//     }
//   };

//   return (
//     <div>
//       <div className={classes.filterContainer}>
//         <div>
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className={classes.searchInput}
//           />
//           <select value={filterType} onChange={handleFilterChange}>
//             <option value="all">All</option>
//             <option value="pending">Pending</option>
//             <option value="partial">Partially Delivered</option>
//             <option value="delivered">Delivered</option>
//           </select>
//         </div>
//         <Button onClick={handlePrint}>
//           <FaPrint /> Print
//         </Button>
//       </div>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Code Achat</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredResults.map((row) => (
//               <TableRow key={row.id_Achat}>
//                 <TableCell component="th" scope="row">
//                   {row.code_Achat}
//                 </TableCell>
//                 <TableCell>{row.date}</TableCell>
//                 <TableCell>{row.user_Dmd}</TableCell>
//                 <TableCell>{getStatus(row.quantite, row.qte_Reçu)}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => openModal(row)}>
//                     <FaEye />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(row.id_Achat)}>
//                     <FaTimes />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Achat Details Modal"
//         className={classes.modal}
//         overlayClassName="modal-overlay"
//       >
//         {selectedAchat && (
//           <>
//             <div className={classes.modalHeader}>
//               <Typography variant="h6">Achat Details</Typography>
//               <Button onClick={closeModal}>
//                 <FaTimes />
//               </Button>
//             </div>
//             <Box className={classes.printArea} id="printArea">
//               <Box display="flex" alignItems="center" marginBottom={2}>
//                 <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '10px' }} />
//                 <Typography variant="h6" component="div">
//                   <Box fontWeight="fontWeightBold">Company Name</Box>
//                   <Box>Purchase Request</Box>
//                 </Typography>
//               </Box>
//               <Typography variant="body1">
//                 <strong>Code Achat:</strong> {selectedAchat.code_Achat}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Date:</strong> {selectedAchat.date}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>User:</strong> {selectedAchat.user_Dmd}
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table className={classes.table} aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Article</TableCell>
//                       <TableCell>Designation</TableCell>
//                       <TableCell>Quantity</TableCell>
//                       <TableCell>Quantity Received</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredResults.map((row) => (
//                       <TableRow key={row.id_Achat}>
//                         <TableCell>{row.code}</TableCell>
//                         <TableCell>{row.designation}</TableCell>
//                         <TableCell>{row.quantite}</TableCell>
//                         <TableCell>
//                           <TextField
//                             type="number"
//                             value={qteRecu[row.id_Achat] !== undefined ? qteRecu[row.id_Achat] : row.qte_Reçu}
//                             onChange={(e) => handleInputChange(row.id_Achat, e.target.value)}
//                             className={classes.input}
//                           />
//                           <IconButton
//                             className={classes.updateButton}
//                             onClick={() => handleFormSubmit(row.id_Achat)}
//                           >
//                             <FaCheck />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.validateButton}
//               onClick={handleValidation}
//             >
//               Validate
//             </Button>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default ListeDemande;















import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice';
import Modal from 'react-modal';
import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Button, Typography, Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from '../pictures/logo.png';
import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

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
    width: '100px',
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
  printArea: {
    display: 'none',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    marginRight: 10,

  },
});
console.log("test from list achat")
function ListeDemande() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchAchatempoData());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);

  const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);

  useEffect(() => {
    if (updateSuccess) {
      window.location.reload();
    }
  }, [updateSuccess]);

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
        await dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: quantityReceived }
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
          onClick: () => dispatch(deleteAchatempoData(id)),
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    });
  };

  const getStatus = (quantite, qteRecu) => {
    if (qteRecu == 0) {
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

  const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

  useEffect(() => {
    const handleDeleteDuplicates = async () => {
      try {
        const achatMap = {};
        const duplicates = [];
  
        achatData.forEach(achat => {
          const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
          if (achatMap[key]) {
            duplicates.push(achat.id_Achat);
          } else {
            achatMap[key] = true;
          }
        });
  
        const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error deleting duplicates:', error);
        alert('Failed to delete duplicates.');
      }
    };
  
    handleDeleteDuplicates();
  }, [achatData, qteRecu]);

  const handleValidation = async () => {
    try {
      const updatePromises = Object.keys(qteRecu).map(id =>
        dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: qteRecu[id] }
        }))
      );
      await Promise.all(updatePromises);
      setUpdateSuccess(true);
      setModalIsOpen(false);

      const itemExistsInAchat = (item) => {
        return achatData.some(achat =>
          achat.code === item.code &&
          achat.code_Projet === item.code_Projet &&
          achat.designation === item.designation &&
          achat.quantite === item.quantite &&
          achat.nom_Projet === item.nom_Projet &&
          achat.date === item.date &&
          achat.code_Achat === item.code_Achat &&
          achat.user_Dmd === item.user_Dmd
        );
      };

      const addAchatPromises = filteredAchatData.map(async item => {
        const quantityReceived = qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu;
        if (item.quantite === quantityReceived && !itemExistsInAchat(item)) {
          await dispatch(postAchatData({
            code: item.code,
            code_Projet: item.code_Projet,
            designation: item.designation,
            quantite: item.quantite,
            nom_Projet: item.nom_Projet,
            date: item.date,
            code_Achat: item.code_Achat,
            user_Dmd: item.user_Dmd
          }));
        }
      });

      await Promise.all(addAchatPromises);

    } catch (error) {
      console.error('Error updating quantities:', error);
      alert('Failed to update quantities.');
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('print-area').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const getGeneralStatus = (codeAchat) => {
    const relatedDemands = filteredAchatData.filter(data => data.code_Achat === codeAchat);

    if (relatedDemands.every(demand => demand.qte_Reçu === 0)) {
      return 'Pending';
    }

    if (relatedDemands.every(demand => demand.qte_Reçu === demand.quantite)) {
      return 'Livré';
    }

    if (relatedDemands.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
      return 'Partiellement livré';
    }

    return 'Unknown';
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredAndSearchedData = filteredAchatData.filter((data) => {
    const matchesSearchQuery = data.code_Achat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterType =
      filterType === 'all' ||
      (filterType === 'livre' && getGeneralStatus(data.code_Achat) === 'Livré') ||
      (filterType === 'partiellement_livre' && getGeneralStatus(data.code_Achat) === 'Partiellement livré') ||
      (filterType === 'pending' && getGeneralStatus(data.code_Achat) === 'Pending');

    return matchesSearchQuery && matchesFilterType;
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Demandes d'Achat</Typography>
      <Box className={classes.filterContainer}>
        <TextField
          label="Rechercher par Code Achat"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          className={classes.searchInput}
        />
        <div>
          <Button variant="contained" color="primary" onClick={() => setFilterType('all')}>Tous</Button>
          <Button variant="contained" color="secondary" onClick={() => setFilterType('livre')}>Livré</Button>
          <Button variant="contained" color="secondary" onClick={() => setFilterType('partiellement_livre')}>Partiellement Livré</Button>
          <Button variant="contained" color="secondary" onClick={() => setFilterType('pending')}>En Attente</Button>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCodeAchats.map((codeAchat) => {
              const relatedDemands = filteredAndSearchedData.filter(data => data.code_Achat === codeAchat);
              if (relatedDemands.length === 0) return null; // Skip if no matching demands
              const firstDemand = relatedDemands[0];
              return (
                <React.Fragment key={codeAchat}>
                  <TableRow>
                    <TableCell>{firstDemand.code_Achat}</TableCell>
                    <TableCell>{firstDemand.date}</TableCell>
                    <TableCell>{firstDemand.user_Dmd}</TableCell>
                    <TableCell>{getGeneralStatus(codeAchat)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => openModal(firstDemand)}><div className='text-blue-500'><FaEye /></div></IconButton>
                      <IconButton onClick={() => handleDelete(firstDemand.id_Achat)}><div className='text-red-500'><FaTimes /></div></IconButton>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={classes.modal}
        contentLabel="Order Details"
      >
        <div className={classes.modalHeader}>
          <Typography variant="h6">Details de la Demande d'Achat</Typography>
          <IconButton onClick={closeModal}><FaTimes /></IconButton>
        </div>
        {selectedAchat && (
          <>
            <Typography variant="subtitle1">Code Achat: {selectedAchat.code_Achat}</Typography>
            <Typography variant="subtitle1">Date: {selectedAchat.date}</Typography>
            <Typography variant="subtitle1">Utilisateur: {selectedAchat.user_Dmd}</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Code Projet</TableCell>
                    <TableCell>Désignation</TableCell>
                    <TableCell>Quantité Demandée</TableCell>
                    <TableCell>Quantité Reçue</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Entrer Qte Reçue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAchatData.filter(data => data.code_Achat === selectedAchat.code_Achat).map((data) => (
                    <TableRow key={data.id_Achat}>
                      <TableCell>{data.code_Projet}</TableCell>
                      <TableCell>{data.designation}</TableCell>
                      <TableCell>{data.quantite}</TableCell>
                      <TableCell>{data.qte_Reçu}</TableCell>
                      <TableCell>{getStatus(data.quantite, data.qte_Reçu)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          className={classes.input}
                          value={qteRecu[data.id_Achat] || ''}
                          onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
                        />
                        <IconButton onClick={() => handleFormSubmit(data.id_Achat)}>
                          <FaCheck />
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
              Valider Tout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.updateButton}
              onClick={handlePrint}
            >
              <FaPrint /> Imprimer
            </Button>
            {/* <div id="print-area" className={classes.printArea}>
              <img src={logo} alt="Logo" />
              <h2>Détails de la Demande d'Achat</h2>
              <p><strong>Code Achat:</strong> {selectedAchat.code_Achat}</p>
              <p><strong>Date:</strong> {selectedAchat.date}</p>
              <p><strong>Utilisateur:</strong> {selectedAchat.user_Dmd}</p>
              <table>
                <thead>
                  <tr>
                    <th>Code Projet</th>
                    <th>Désignation</th>
                    <th>Quantité Demandée</th>
                    <th>Quantité Reçue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAchatData.filter(data => data.code_Achat === selectedAchat.code_Achat).map((data) => (
                    <tr key={data.id_Achat}>
                      <td>{data.code_Projet}</td>
                      <td>{data.designation}</td>
                      <td>{data.quantite}</td>
                      <td>{data.qte_Reçu}</td>
                      <td>{getStatus(data.quantite, data.qte_Reçu)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div id="print-area" className={`${classes.printArea}`}>
  <div className='w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande Achat</h5>

  <table className='w-2/5 shadow-y-lg'> 
    <tbody>
      {[
        { label: 'Code Achat', value: selectedAchat?.code_Achat },
        { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
        { label: 'User', value: selectedAchat?.user_Dmd }
      ].map((item, idx) => (
        <tr key={idx}>
          <td><h6>{item.label}</h6></td>
          <td>: {item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <br />
  <br />

  <div className='my-4'>
  <table className={`${classes.table} w-[10%] border-collapse border border-green-800 rounded-lg shadow-sm`}>
    <thead>
      <tr className='border'>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Code</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Designation</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Quantité</th>
        <th className="border border-black text-[9px] font-semibold text-center  py-[0px]">Projet</th>
      </tr>
    </thead>
    <tbody>
      {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
        <tr key={idx} className='border'>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.code}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.designation}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.quantite}</td>
          <td className=" border border-black text-[9px] text-center  py-[0px]">{item.nom_Projet}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <br />
  <div className='my-2 float-right'><p>Signature<span className='text-gray-200'>_____________________</span></p></div>
</div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ListeDemande;







// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatempoData,updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice'; // Assuming you have a delete action in achatSlice
// import Modal from 'react-modal';
// import { FaEye, FaPencilAlt, FaCheck, FaTimes, FaTruck, FaPrint } from 'react-icons/fa';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, IconButton, TextField, Button, Typography, Box
// } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { confirmAlert } from 'react-confirm-alert'; // Import confirmation dialog
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import confirmation dialog styles
// import logo from '../pictures/logo.png';
// import { fetchAchatData, postAchatData, deleteAchatData } from '../store/achatSlice';

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
//   statusIcon: {
//     marginRight: 5,
//     verticalAlign: 'middle',
//   },
//   validateButton: {
//     marginTop: 10,
//   },
//   printArea: {
//     display: 'none',
//   },
// });

// function ListeDemande() {
//   const classes = useStyles();
//   const { achatempoData } = useSelector(state => state.achatempo);
//   const { achatData } = useSelector(state => state.achat);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAchatData());
//     dispatch(fetchAchatempoData());
//   }, [dispatch]);

//   console.log("achatData:", achatData);
//   const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
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
//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: quantityReceived }
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

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: 'Confirmation',
//       message: 'Are you sure you want to delete this demand?',
//       buttons: [
//         {
//           label: 'Yes',
//           onClick: () => dispatch(deleteAchatempoData(id)), // Implement delete action
//         },
//         {
//           label: 'No',
//           onClick: () => {},
//         }
//       ]
//     });
//   };

//   useEffect(() => {
//     if (updateSuccess) {
//       window.location.reload(); // Reload the page to update data
//     }
//   }, [updateSuccess]);

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu == 0) {
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

//   const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];

//   // const handleValidation = async () => {
//   //   try {
//   //     const promises = Object.keys(qteRecu).map(id =>
//   //       dispatch(updateAchatempoData({
//   //         id_Achat: id,
//   //         updatedAchatempoData: { qte_Reçu: qteRecu[id] }
//   //       }))
//   //     );
//   //     await Promise.all(promises);
//   //     setUpdateSuccess(true);
//   //     setModalIsOpen(false); // Close the pop-up after validation

//   //     // Add items with status 'livré' to achatData
//   //     filteredAchatData.forEach(item => {
//   //       if (item.quantite === qteRecu[item.id_Achat]) {
//   //         dispatch(postAchatData({
//   //           code_Achat: item.code_Achat,
//   //           user_Dmd: item.user_Dmd,
//   //           date: item.date,
//   //           code: item.code,
//   //           designation: item.designation,
//   //           quantite: item.quantite
//   //         }));
//   //       }
//   //     });

//   //     const allDelivered = filteredAchatData.every(item => item.quantite === qteRecu[item.id_Achat]);
//   //     if (allDelivered) {
//   //       // Show a notification for fully delivered demand
//   //       alert(`Demande ${selectedAchat.code_Achat} est entièrement livrée.`);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating quantities:', error);
//   //     alert('Failed to update quantities.');
//   //   }
//   // };
//   useEffect(() => {
//     const handleDeleteDuplicates = async () => {
//       try {
//         const achatMap = {};
//         const duplicates = [];
  
//         achatData.forEach(achat => {
//           const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//           if (achatMap[key]) {
//             duplicates.push(achat.id_Achat);
//           } else {
//             achatMap[key] = true;
//           }
//         });
  
//         const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
//         await Promise.all(deletePromises);
//       } catch (error) {
//         console.error('Error deleting duplicates:', error);
//         alert('Failed to delete duplicates.');
//       }
//     };
  
//     handleDeleteDuplicates();
//   }, [achatData, qteRecu]);
  
//   const handleValidation = async () => {
//     try {
//       // First, update all quantities in achatempo
//       const updatePromises = Object.keys(qteRecu).map(id =>
//         dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: qteRecu[id] }
//         }))
//       );
//       await Promise.all(updatePromises);
//       setUpdateSuccess(true);
//       setModalIsOpen(false); // Close the modal after validation
  
//       // Function to check if an item already exists in the achat table
//       const itemExistsInAchat = (item) => {
//         return achatData.some(achat =>
//           achat.code === item.code &&
//           achat.code_Projet === item.code_Projet &&
//           achat.designation === item.designation &&
//           achat.quantite === item.quantite &&
//           achat.nom_Projet === item.nom_Projet &&
//           achat.date === item.date &&
//           achat.code_Achat === item.code_Achat &&
//           achat.user_Dmd === item.user_Dmd
//         );
//       };
  
//       // Check the status of each demand and add to achatData if 'livré'
//       const addAchatPromises = filteredAchatData.map(async item => {
//         const quantityReceived = qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu;
//         if (item.quantite === quantityReceived && !itemExistsInAchat(item)) {
//           await dispatch(postAchatData({
//             code: item.code,
//             code_Projet: item.code_Projet,
//             designation: item.designation,
//             quantite: item.quantite,
//             nom_Projet: item.nom_Projet,
//             date: item.date,
//             code_Achat: item.code_Achat,
//             user_Dmd: item.user_Dmd
//           }));
//         }
//       });
  
//       await Promise.all(addAchatPromises);
  
//     } catch (error) {
//       console.error('Error updating quantities:', error);
//       alert('Failed to update quantities.');
//     }
//   };
  

//   const handlePrint = () => {
//     const printContents = document.getElementById('print-area').innerHTML;
//     const originalContents = document.body.innerHTML;
//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;
//     window.location.reload();
//   };

//   const getGeneralStatus = (codeAchat) => {
//     const relatedDemands = filteredAchatData.filter(data => data.code_Achat === codeAchat);

//     if (relatedDemands.every(demand => demand.qte_Reçu === 0)) {
//       return 'Pending';
//     }

//     if (relatedDemands.every(demand => demand.qte_Reçu === demand.quantite)) {
//       return 'Livré';
//     }

//     if (relatedDemands.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
//       return 'Partiellement livré';
//     }

//     return 'Pending';
//   };

//   const handleDeleteDuplicates = async () => {
//   try {
//     const achatMap = {};
//     const duplicates = [];

//     achatData.forEach(achat => {
//       const key = `${achat.code}-${achat.code_Projet}-${achat.designation}-${achat.quantite}-${achat.nom_Projet}-${achat.date}-${achat.code_Achat}-${achat.user_Dmd}`;
//       if (achatMap[key]) {
//         duplicates.push(achat.id_Achat);
//       } else {
//         achatMap[key] = true;
//       }
//     });

//     const deletePromises = duplicates.map(id => dispatch(deleteAchatData(id)));
//     await Promise.all(deletePromises);
//     window.location.reload();
//   } catch (error) {
//     console.error('Error deleting duplicates:', error);
//     alert('Failed to delete duplicates.');
//   }
// };


//   return (
//     <Box padding={3}>
//       <Typography variant="h4" gutterBottom>Demande Table</Typography>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Code-Achat</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Suivi Status</TableCell>
//               <TableCell>Action</TableCell> {/* Added column for delete action */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {uniqueCodeAchats.map((codeAchat, index) => {
//               const achat = filteredAchatData.find(data => data.code_Achat === codeAchat);
//               return (
//                 <TableRow key={index}>
//                   <TableCell>{achat.code_Achat}</TableCell>
//                   <TableCell>{achat.user_Dmd}</TableCell>
//                   <TableCell>{getGeneralStatus(achat.code_Achat)}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => openModal(achat)}>
//                       <div className='text-blue-600'>
//                         <FaEye />
//                       </div>
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDelete(achat.id_Achat)}>
//                       <div className='text-red-700'>
//                         <FaTimes />
//                       </div>
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
//             <Typography variant="h6">Détails pour {selectedAchat.code_Achat}</Typography>
//             <IconButton onClick={closeModal}>
//               <FaTimes />
//             </IconButton>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table className={classes.table} size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Code</TableCell>
//                   <TableCell>Quantité</TableCell>
//                   <TableCell>Quantité Reçue</TableCell>
//                   <TableCell>Status</TableCell>
//                   {/* <TableCell>Action</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {achatempoData.filter(a => a.code_Achat === selectedAchat.code_Achat).map((item, idx) => (
//                   <TableRow key={idx}>
//                     <TableCell>{item.code}</TableCell>
//                     <TableCell>{item.quantite}</TableCell>
//                     <TableCell>
//                       <TextField
//                         value={qteRecu[item.id_Achat] !== undefined ? qteRecu[item.id_Achat] : item.qte_Reçu}
//                         onChange={(e) => handleInputChange(item.id_Achat, e.target.value)}
//                         variant="outlined"
//                         size="small"
//                         className={classes.input}
//                       />
//                     </TableCell>
//                     <TableCell>{getStatus(item.quantite, qteRecu[item.id_Achat] || item.qte_Reçu)}</TableCell>
//                     {/* <TableCell>
//                       <IconButton
//                         onClick={() => handleFormSubmit(item.id_Achat)}
//                         className={classes.updateButton}
//                       >
//                         <FaPencilAlt />
//                       </IconButton>
//                     </TableCell> */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.validateButton}
//             onClick={() => {
//               confirmAlert({
//                 title: 'Confirmation',
//                 message: 'Are you sure you want to validate this update?',
//                 buttons: [
//                   {
//                     label: 'Yes',
//                     onClick: handleValidation,
//                   },
//                   {
//                     label: 'No',
//                     onClick: () => {},
//                   },
//                 ],
//               });
//             }}
//           >
//             Valider
//           </Button>
//           <IconButton onClick={handlePrint} className={classes.printButton}>
//             <FaPrint />
//           </IconButton>
//         </Modal>
//       )}
//       {/* <div id="print-area" className={classes.printArea}>
//         <div className='w-32 mx-auto'>
//           <img src={logo} alt="Logo" />
//         </div>
//         <div className='mt-4'>
//           <Typography variant="h5" gutterBottom>Demande Achat</Typography>
//         </div>
//         <div className='my-10'>
//           <table style={{ width: '40%', borderCollapse: 'collapse' }}>
//             <tbody>
//               <tr>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>Code Achat </Typography>
//                 </td>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>: {selectedAchat?.code_Achat}</Typography>
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>Date </Typography>
//                 </td>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>: {selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : ''}</Typography>
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>User </Typography>
//                 </td>
//                 <td style={{ padding: '4px 0' }}>
//                   <Typography variant="h6" gutterBottom>: {selectedAchat?.user_Dmd}</Typography>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className='my-10'>
//           <div className='table-container'>
//             <table className={`${classes.table} table-auto w-full border-collapse border border-gray-400`}>
//               <thead>
//                 <tr>
//                   <th className="border border-gray-400 p-2 text-center">Code</th>
//                   <th className="border border-gray-400 p-2 text-center">Designation</th>
//                   <th className="border border-gray-400 p-2 text-center">Quantité</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
//                   <tr key={idx}>
//                     <td className="border border-gray-400 p-2 text-center">{item.code}</td>
//                     <td className="border border-gray-400 p-2 text-center">{item.designation}</td>
//                     <td className="border border-gray-400 p-2 text-center">{item.quantite}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className='my-[60px] float-end'>
//           <p>Signature__________________________</p>
//         </div>
//       </div> */}
// {/* <div id="print-area" className={`${classes.printArea}`}>
//   <div className=' w-32 mx-auto'>
//     <img src={logo} alt="Logo" />
//   </div>
//   <h5 className='mt-4'>Demande Achat</h5>
//   <table className='w-2/5'>
//     <tbody>
//       {[
//         { label: 'Code Achat', value: selectedAchat?.code_Achat },
//         { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
//         { label: 'User', value: selectedAchat?.user_Dmd }
//       ].map((item, idx) => (
//         <tr key={idx}>
//           <td><h6>{item.label}</h6></td>
//           <td>: {item.value}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//   <div className='my-4'>
//     <table className={`${classes.table} w-full border-collapse border border-gray-500 rounded-lg shadow-sm`}>
//       <thead>
//         <tr>
//           <td className="border  text-[12px] text-center">Code</td>
//           <td className="border  text-[12px] text-center">Designation</td>
//           <td className="border  text-[12px] text-center">Quantité</td>
//           <td className="border  text-[12px] text-center">Projet</td>
//         </tr>
//       </thead>
//       <tbody>
//         {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
//           <tr key={idx}>
//             <td className="border  text-[12px] text-center">{item.code}</td>
//             <td className="border  text-[12px] text-center">{item.designation}</td>
//             <td className="border  text-[12px] text-center">{item.quantite}</td>
//             <td className="border  text-[12px] text-center">{item.nom_Projet}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   <div className='my-2 float-right'><p>Signature____________</p></div>
// </div> */}
// <div id="print-area" className={`${classes.printArea}`}>
//   <div className='w-32 mx-auto'>
//     <img src={logo} alt="Logo" />
//   </div>
//   <h5 className='mt-4'>Demande Achat</h5>

//   <table className='w-2/5 shadow-y-lg'> 
//     <tbody>
//       {[
//         { label: 'Code Achat', value: selectedAchat?.code_Achat },
//         { label: 'Date', value: selectedAchat?.date ? new Date(selectedAchat.date).toISOString().split('T')[0] : '' },
//         { label: 'User', value: selectedAchat?.user_Dmd }
//       ].map((item, idx) => (
//         <tr key={idx}>
//           <td><h6>{item.label}</h6></td>
//           <td>: {item.value}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//   <br />
//   <br />
//   <div className='my-4'>
//     <table className={`${classes.table} w-full border-collapse border border-green-800 rounded-lg shadow-sm`}> 
//       <thead>
//         <tr className='border'>
//           <td className="border  text-[13px] font-medium text-center">Code</td>
//           <td className="border  text-[13px] font-medium text-center">Designation</td>
//           <td className="border  text-[13px] font-medium text-center">Quantité</td>
//           <td className="border  text-[13px] font-medium text-center">Projet</td>
//         </tr>
//       </thead>
//       <tbody>
//         {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
//           <tr key={idx} className='border'>
//             <td className=" border text-[13px] text-center">{item.code}</td>
//             <td className=" border text-[13px] text-center">{item.designation}</td>
//             <td className=" border text-[13px] text-center">{item.quantite}</td>
//             <td className=" border text-[13px] text-center">{item.nom_Projet}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   <br />
//   <div className='my-2 float-right'><p>Signature_____________________</p></div>
// </div>



//     </Box>
//   );
// }

// export default ListeDemande;




