
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice';
// import {fetchProductData,updateProductData} from "../store/productSlice"
import {fetchProductData,updateProductData, updateQteMagasin} from "../store/productSlice"
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
import { fetchVenteData } from '../store/venteSlice';
import { fetchReturnData } from '../store/returnSlice'; 


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

function ListeReturn() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const { productData } = useSelector(state => state.product);
  const { venteData } = useSelector(state => state.vente);
  const { returnData } = useSelector(state => state.return);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchProductData());
    dispatch(fetchAchatempoData());
    dispatch(fetchVenteData());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);

  const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
  const filteredVenteData = venteData.filter(data => data.user_Dmd === user.username);
//   console.log("filteredVenteData***:",filteredVenteData)


  useEffect(() => {
    if (updateSuccess) {
      // window.location.reload();
      console.log("avoid reload")
    }
  }, [updateSuccess]);

  const openModal = (achat) => {
    setSelectedAchat(achat);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAchat(null);
  };

  // const uniqueCodeAchats = [...new Set(filteredAchatData.map(data => data.code_Achat))];
  const uniqueCodeVente = [...new Set(returnData.map(data => data.code_Sortie))]

  console.log("fronSOrtX",uniqueCodeVente)

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


  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
  
// console.log("from listdemand:",achatempoData)
  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Demandes de Sortie</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
  {uniqueCodeVente.map((codeAchat) => {
    const relatedDemands = returnData.filter(data => data.code_Sortie === codeAchat);
    if (relatedDemands.length === 0) return null; // Skip if no matching demands
    const firstDemand = relatedDemands[0];
    const status = getGeneralStatus(codeAchat);
    return (
      <React.Fragment key={codeAchat}>
        <TableRow>
          <TableCell>{firstDemand.code_Sortie}</TableCell>
          <TableCell>{formattedDate}</TableCell>
          <TableCell>{firstDemand.user_Dmd}</TableCell>
          {/* <TableCell>{renderStatus(status)}</TableCell> Use renderStatus to display the status with the correct styling */}
          <TableCell>
            <IconButton onClick={() => openModal(firstDemand)}><div className='text-blue-500'><FaEye /></div></IconButton>
            {/* <IconButton onClick={() => handleDelete(firstDemand.id_Achat)}><div className='text-red-500'><FaTimes /></div></IconButton> */}
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
          <Typography variant="h6">Details de la Demande de Sortie</Typography>
          <IconButton onClick={closeModal}><FaTimes /></IconButton>
        </div>
        {selectedAchat && (
          <>
            <Typography variant="subtitle1">Code Sortie: {selectedAchat.code_Sortie}</Typography>
            <Typography variant="subtitle1">Date: {selectedAchat.date_Vente}</Typography>
            <Typography variant="subtitle1">Utilisateur: {selectedAchat.user_Dmd}</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Désignation</TableCell>
                    <TableCell>Quantité Demandée</TableCell>
                    {/* <TableCell>Qte Magasin</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {returnData.filter(data => data.code_Sortie === selectedAchat.code_Sortie).map((data) => (
                    <TableRow key={data.id_Vente}>
                      {/* <TableCell>{data.code_Projet}</TableCell> */}
                      <TableCell>{data.designation_Produit}</TableCell>
                      <TableCell>{data.qte_Produit}</TableCell>
                      {/* <TableCell>{lookNewQteMagasin(data.id_Article)}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="secondary"
              className={classes.updateButton}
              onClick={handlePrint}
            >
              <FaPrint /> Imprimer
            </Button>
            <div id="print-area" className={`${classes.printArea}`}>
  <div className='w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande de Sortie</h5>

  <table className='w-2/5 shadow-y-lg'> 
    <tbody>
      {[
        { label: 'Code Sortie', value: selectedAchat?.code_Sortie },
        { label: 'Date', value: selectedAchat?.date_Vente ? new Date(selectedAchat.date_Vente).toISOString().split('T')[0] : '' },
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
      <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
           <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Désignation</th>
           <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Client</th>
           <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
           {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th> */}
          {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
      </tr>
    
    </thead>
    <tbody>
      {returnData.filter(a => a.code_Sortie === selectedAchat?.code_Sortie).map((item, idx) => (
        <tr key={idx} className='border'>
          <td className=" border border-black text-[9px] text-center py-1 min-w-28">{item.code_Produit}</td>
          <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.designation_Produit}</td>
          <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.Partenaire}</td>
          <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.qte_Produit}</td>
          {/* <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.qte_Magasin}</td> */}
          {/* <td className=" border border-black text-[9px] text-center py-1 w-1/5">{lookNewQteMagasin(item.id_Article)}</td> */}
          {/* <td className=" border border-black text-[9px] text-center   py-1 w-1/5">{item.nom_Projet}</td> */}
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <br />
  <div className='my-2 float-right'><p>Signature<span className='text-gray-200'>___________________</span></p></div>
</div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ListeReturn;



//resolve the problem of lower case i think
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteReturnData } from '../store/returnSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import logo from '../pictures/logo.png';

// const ListeReturn = () => {
//     const dispatch = useDispatch();
//     const { returnData } = useSelector((state) => state.return);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     console.log("from list  user ==+>",user)
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5); // Display 5 items per page
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleDelete = (id_Return) => {
//         dispatch(deleteReturnData(id_Return));
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
//     console.log("return data", returnData)
//     const filteredData = returnData.filter(item =>
//         (item.code_Produit && item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.designation_Produit && item.designation_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.qte_Produit && item.qte_Produit.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.n_Serie && item.n_Serie.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.code_Projet && item.code_Projet.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.nom_Projet && item.nom_Projet.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.filter(data => data.user_Dmd === user.username).slice(indexOfFirstItem, indexOfLastItem);
//     const currentItems2 = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     console.log("======>>>>old",currentItems)
//     console.log("======>>>>new",currentItems2)
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

//     useEffect(() => {
//         const interval = setInterval(() => {
//             window.location.reload();
//         }, 300000); // Refresh every 5 minutes (300000 milliseconds)

//         return () => clearInterval(interval); // Cleanup the interval on component unmount
//     }, []);

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
//             <table className="w-full table-auto bg-white border border-gray-200">
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
//                     {currentItems.reverse().map((returnItem, index) => (
//                         <tr key={returnItem.id_Return} className={index % 2 === 0 ? 'bg-gray-100' : ''}>

//                             <td className="border px-4 py-2">{returnItem.code_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.designation_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.qte_Produit}</td>
//                             <td className="border px-4 py-2">{returnItem.n_Serie}</td>
//                             <td className="border px-4 py-2">{returnItem.code_Projet}</td>
//                             <td className="border px-4 py-2">{returnItem.nom_Projet}</td>
//                             <td className="border px-4 py-2">{returnItem.user_Dmd}</td>
//                             <td className="border px-4 py-2 text-center">

//                                 <button onClick={() => handleDelete(returnItem.id_Return)} className="text-red-600 hover:text-red-800">
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
//                 <h5 className='mt-4'>Demande Retour</h5>
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
//                                 <th className="border border-black text-sm font-semibold text-center">Code</th>
//                                 <th className="border border-black text-sm font-semibold text-center">Désignation</th>
//                                 <th className="border border-black text-sm font-semibold text-center">Quantité</th>
//                                 <th className="border border-black text-sm font-semibold text-center">Numéro de série</th>
//                                 <th className="border border-black text-sm font-semibold text-center">Projet</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {returnData.map((item, idx) => (
//                                 <tr key={idx} className='border'>
//                                     <td className="border border-black text-sm text-center">{item.code_Produit}</td>
//                                     <td className="border border-black text-sm text-center">{item.designation_Produit}</td>
//                                     <td className="border border-black text-sm text-center">{item.qte_Produit}</td>
//                                     <td className="border border-black text-sm text-center">{item.n_Serie}</td>
//                                     <td className="border border-black text-sm text-center">{item.nom_Projet}</td>
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

// export default ListeReturn;