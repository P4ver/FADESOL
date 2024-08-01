import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenteData, updateVenteData, deleteVenteData } from '../store/venteSlice';
import { fetchProductData, updateQteMagasin } from '../store/productSlice';
import { FaEye, FaTimes, FaPrint } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import logo from '../pictures/logo.png';
import Modal from 'react-modal';

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

function ListeVente() {
  const classes = useStyles();
  const { venteData } = useSelector(state => state.vente);
  const { productData } = useSelector(state => state.product);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVenteData());
    dispatch(fetchProductData());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVente, setSelectedVente] = useState(null);

  const filteredVenteData = venteData.filter(data => data.user_Dmd === user.username);

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
        await dispatch(updateVenteData({ id_Vente: id, updatedVenteData: { qte_Reçu: quantityReceived } }));
        const updatedItem = venteData.find(item => item.id_Vente === id);
        const product = productData.find(p => p.Numéro_Article === updatedItem.code_Produit);
        const newQteMagasin = (parseInt(quantityReceived) - updatedItem.qte_Reçu) + product.qte_Magasin;
        await dispatch(updateQteMagasin({ productId: product.id_Article, qte_Magasin: newQteMagasin }));
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
      message: 'Are you sure you want to delete this sale?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteVenteData(id)),
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    });
  };

  const openModal = (vente) => {
    setSelectedVente(vente);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVente(null);
  };

  const handlePrint = () => {
    const printContents = document.getElementById('print-area').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // const filteredAndSearchedData = filteredVenteData.filter((data) => {
  const filteredAndSearchedData = venteData.filter((data) => {
    const matchesSearchQuery = data.code_Produit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterType = filterType === 'all';
    return matchesSearchQuery && matchesFilterType;
  });

  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Ventes</Typography>
      <Box className={classes.filterContainer}>
        <TextField
          label="Rechercher par Code Produit"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          className={classes.searchInput}
        />
        <div>
          <Button variant="contained" color="primary" onClick={() => setFilterType('all')}>Tous</Button>
        </div>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Code Produit</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Numéro de Série</TableCell>
              <TableCell>Code Projet</TableCell>
              <TableCell>Nom Projet</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSearchedData.map((vente) => (
              <TableRow key={vente.id_Vente}>
                <TableCell>{vente.code_Produit}</TableCell>
                <TableCell>{vente.designation_Produit}</TableCell>
                <TableCell>{vente.qte_Produit}</TableCell>
                <TableCell>{vente.n_Serie}</TableCell>
                <TableCell>{vente.code_Projet}</TableCell>
                <TableCell>{vente.nom_Projet}</TableCell>
                <TableCell>{vente.user_Dmd}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openModal(vente)}><FaEye /></IconButton>
                  <IconButton onClick={() => handleDelete(vente.id_Vente)}><FaTimes /></IconButton>
                </TableCell>
              </TableRow>
            ))}
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
          <Typography variant="h6">Détails de la Vente</Typography>
          <IconButton onClick={closeModal}><FaTimes /></IconButton>
        </div>
        {selectedVente && (
          <>
            <Typography variant="subtitle1">Code Produit: {selectedVente.code_Produit}</Typography>
            <Typography variant="subtitle1">Désignation: {selectedVente.designation_Produit}</Typography>
            <Typography variant="subtitle1">Quantité: {selectedVente.qte_Produit}</Typography>
            <Typography variant="subtitle1">Numéro de Série: {selectedVente.n_Serie}</Typography>
            <Typography variant="subtitle1">Code Projet: {selectedVente.code_Projet}</Typography>
            <Typography variant="subtitle1">Nom Projet: {selectedVente.nom_Projet}</Typography>
            <Typography variant="subtitle1">Utilisateur: {selectedVente.user_Dmd}</Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.updateButton}
              onClick={handlePrint}
            >
              <FaPrint className={classes.statusIcon} /> Imprimer
            </Button>
          </>
        )}
      </Modal>

      <div id="print-area" className={classes.printArea}>
        {selectedVente && (
          <div>
            <div className='w-32 mx-auto'>
              <img src={logo} alt="Logo" />
            </div>

            <div>
              <h3>Details de la Vente:</h3>
              <p>Code Produit: {selectedVente.code_Produit}</p>
              <p>Date : {selectedVente && selectedVente.date_Vente ? new Date(selectedVente.date_Vente).toISOString().split('T')[0] : ''}</p>
              <p>Utilisateur: {selectedVente.user_Dmd}</p>
            </div>
            <div className='my-4'>
    <table className={`${classes.table} w-[10%] border-collapse border border-green-800 rounded-lg shadow-sm`}>
      <thead>
        <tr className='border'>
          <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
          <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Désignation</th>
          <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
          
          <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th>
        </tr>
      </thead>
      <tbody>
          <tr  className='border'>
            <td className="border border-black text-[9px] text-center py-1">{selectedVente.code_Produit}</td>
            <td className="border border-black text-[9px] text-center py-1 w-2/5">{selectedVente.designation_Produit}</td>
            <td className="border border-black text-[9px] text-center py-1 w-1/5">{selectedVente.qte_Produit}</td>
        
            <td className="border border-black text-[9px] text-center py-1 w-1/5">{selectedVente.nom_Projet}</td>
          </tr>
      </tbody>
    </table>
  </div>
  <br />
  <div className='my-2 float-right'><p>Signature<span className='text-gray-200'>___</span></p></div>
          </div>
        )}
      </div>

    </div>
  );
}

export default ListeVente;




// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteVenteData } from '../store/venteSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import logo from '../pictures/logo.png';

// const ListeVente = () => {
//     const dispatch = useDispatch();
//     const { venteData } = useSelector((state) => state.vente);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;

//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(20); // Display 3 items per page
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleDelete = (id_Vente) => {
//         dispatch(deleteVenteData(id_Vente));
//     };

//     const handlePrint = () => {
//         const printContents = document.getElementById('print-area').innerHTML;
//         const originalContents = document.body.innerHTML;
//         document.body.innerHTML = printContents;
//         window.print();
//         document.body.innerHTML = originalContents;
//         window.location.reload(); // Reload to restore original content
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     // const filteredData = venteData.filter(item =>
//     //     item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     item.designation_Produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     item.qte_Produit.toString().includes(searchTerm.toLowerCase()) ||
//     //     item.n_Serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     item.code_Projet.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //     item.nom_Projet.toLowerCase().includes(searchTerm.toLowerCase())
//     // );

//     const filteredData = venteData.filter(item =>
//         (item.code_Produit && item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.designation_Produit && item.designation_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.qte_Produit && item.qte_Produit.toString().includes(searchTerm.toLowerCase())) ||
//         (item.n_Serie && item.n_Serie.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.code_Projet && item.code_Projet.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.nom_Projet && item.nom_Projet.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     console.log("vente: filtered data ", filteredData.filter(data => data.user_Dmd === user.username))
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.reverse().filter(data => data.user_Dmd === user.username).slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-center mb-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="border rounded py-2 px-4 w-1/3"
//                 />
//             </div>
//             <table className="min-w-full table-auto bg-white border border-gray-200">
//                 <thead>
//                     <tr className='bg-green-600 text-white'>
//                         <th className="px-4 py-2">Code</th>
//                         <th className="px-4 py-2">Designation</th>
//                         <th className="px-4 py-2">Quantite</th>
//                         <th className="px-4 py-2">N° Serie</th>
//                         <th className="px-4 py-2">Code Projet</th>
//                         <th className="px-4 py-2">Nom Projet</th>
//                         <th className="px-4 py-2">User</th>
//                         <th className="px-4 py-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.map((vente, index) => (
//                         <tr key={vente.id_Vente} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                             <td className="border px-4 py-2">{vente.code_Produit}</td>
//                             <td className="border px-4 py-2">{vente.designation_Produit}</td>
//                             <td className="border px-4 py-2">{vente.qte_Produit}</td>
//                             <td className="border px-4 py-2">{vente.n_Serie}</td>
//                             <td className="border px-4 py-2">{vente.code_Projet}</td>
//                             <td className="border px-4 py-2">{vente.nom_Projet}</td>
//                             <td className="border px-4 py-2">{vente.user_Dmd}</td>
//                             <td className="border px-4 py-2 text-center">
//                                 <button onClick={() => handleDelete(vente.id_Vente)} className="text-red-600 hover:text-red-800">
//                                     <RiDeleteBinFill />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="mt-4 flex justify-center items-center space-x-4">
//                 <button
//                     onClick={handlePrevious}
//                     className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button
//                     onClick={handleNext}
//                     className={`py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//             <div className="mt-4 flex justify-center">
//                 <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md hover:bg-blue-700" onClick={handlePrint}>Imprimer</button>
//             </div>

//             <div id="print-area" className="hidden">
//                 <div className='w-32 mx-auto'>
//                     <img src={logo} alt="Logo" />
//                 </div>
//                 <h5 className='mt-4'>Demande Vente</h5>
//                 <table className='w-full'>
//                     <tbody>
//                         <tr>
//                             <td className="text-xl">USER : {authState.user.username}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <br />
//                 <br />
//                 <div className='my-4'>
//                     <table className="w-full border-collapse border border-green-800 rounded-lg shadow-sm">
//                         <thead>
//                             <tr className='border'>
//                                 <th className="border border-black text-sm font-semibold text-center ">Code</th>
//                                 <th className="border border-black text-sm font-semibold text-center ">Désignation</th>
//                                 <th className="border border-black text-sm font-semibold text-center ">Quantité</th>
//                                 <th className="border border-black text-sm font-semibold text-center ">Numéro de série</th>
//                                 <th className="border border-black text-sm font-semibold text-center ">Projet</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {venteData.map((item, idx) => (
//                                 <tr key={idx} className='border'>
//                                     <td className="border border-black text-sm text-center ">{item.code_Produit}</td>
//                                     <td className="border border-black text-sm text-center ">{item.designation_Produit}</td>
//                                     <td className="border border-black text-sm text-center ">{item.qte_Produit}</td>
//                                     <td className="border border-black text-sm text-center ">{item.n_Serie}</td>
//                                     <td className="border border-black text-sm text-center ">{item.nom_Projet}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <br />
//                 <div className='my-2 float-right'><p className="text-xl">Signature<span className='text-gray-200'>_</span></p></div>
//             </div>
//         </div>
//     );
// };

// export default ListeVente;