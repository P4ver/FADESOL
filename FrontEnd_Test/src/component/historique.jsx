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
//   const [selectedDate, setSelectedDate] = useState('');
//   const [stats, setStats] = useState({ entrees: 0, sorties: 0, retours: 0 });

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
//       (item.user_Dmd && item.user_Dmd.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.date_Op && item.date_Op.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.type_Op && item.type_Op.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.code_Produit && item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.Partenaire && item.Partenaire.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setFilteredData(filtered);
//   }, [historiqueData, searchTerm]);
// console.log("historiqueData", historiqueData)
//   useEffect(() => {
//     // Calculate statistics based on selectedDate
//     if (selectedDate) {
//       const stats = { entrees: 0, sorties: 0, retours: 0 };

//       const filteredByDate = historiqueData.filter(item => item.date_Op.includes(selectedDate));

//       filteredByDate.forEach(item => {
//         if (item.type_Op === 'entree') stats.entrees += 1;
//         else if (item.type_Op === 'sortie') stats.sorties += 1;
//         else if (item.type_Op === 'retour') stats.retours += 1;
//       });

//       setFilteredData(filteredByDate);
//       setStats(stats);
//     } else {
//       // If no date selected, show all data and reset stats
//       setFilteredData(historiqueData);
//       setStats({ entrees: 0, sorties: 0, retours: 0 });
//     }
//   }, [historiqueData, selectedDate]);

//   const handleSearchChange = e => {
//     setSearchTerm(e.target.value);
//   };

//   const handleDateChange = e => {
//     setSelectedDate(e.target.value);
//   };
// console.log("filteredData", filteredData)
//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="mb-4 flex justify-between items-center">
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Rechercher par utilisateur, date ou type opération..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="p-2 mb-4 border border-gray-300 rounded shadow-sm w-full"
//           />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="p-2 mb-4 border border-gray-300 rounded shadow-sm w-[250px]"
//           />
//         </div>
//       </div>
//       {selectedDate && (
//         <div className="mb-4 grid grid-cols-3 gap-4">
//           <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold">Entrées</h3>
//             <p className="text-2xl">{stats.entrees}</p>
//           </div>
//           <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold">Sorties</h3>
//             <p className="text-2xl">{stats.sorties}</p>
//           </div>
//           <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-bold">Retours</h3>
//             <p className="text-2xl">{stats.retours}</p>
//           </div>
//         </div>
//       )}
//       {filteredData.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto bg-white border border-gray-200">
//             <thead>
//               <tr className="bg-green-600 text-white">
//                 <th className="px-4 py-2">Type Operation</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Code Produit</th>
//                 <th className="px-4 py-2">Designation</th>
//                 <th className="px-4 py-2">Quantite</th>
//                 {/* <th className="px-4 py-2">N° Serie</th> */}
//                 {/* <th className="px-4 py-2">Code Projet</th> */}
//                 <th className="px-4 py-2">Nom Projet</th>
//                 <th className="px-4 py-2">Partenaire</th>
//                 <th className="px-4 py-2">User</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.slice().reverse().map((item, index) => (
//                 <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                   <td className="border px-4 py-2">{item.type_Op}</td>
//                   {/* <td className="border px-4 py-2">{item.date_Op}</td> */}
//                   <td className="border px-4 py-2">{new Date(item.date_Op).toLocaleDateString('en-GB')}</td>
//                   <td className="border px-4 py-2">{item.code_Produit}</td>
//                   <td className="border px-4 py-2">{item.designation_Produit}</td>
//                   <td className="border px-4 py-2">{item.qte_Produit}</td>
//                   {/* <td className="border px-4 py-2">{item.n_Serie}</td> */}
//                   {/* <td className="border px-4 py-2">{item.code_Projet}</td> */}
//                   <td className="border px-4 py-2">{item.nom_Projet}</td>
//                   <td className="border px-4 py-2">{item.Partenaire}</td>
//                   <td className="border px-4 py-2">{item.user_Dmd}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Historique;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice';
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
import { fetchHistoriqueData } from '../store/historiqueSlice';

Modal.setAppElement('#root');


const useStyles = makeStyles({
  table: {
    minWidth: 560,
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
  modalContent: {
    maxHeight: '70vh', // Adjust this value as needed
    overflowY: 'auto',
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    marginRight: 10,

  },
});

function ListeSortXUser() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const { productData } = useSelector(state => state.product);
  const { venteData } = useSelector(state => state.vente);
  const authState = useSelector(state => state.auth);
  const historiqueData = useSelector(state => state.historique.historiqueData);

  const user = authState.user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchProductData());
    dispatch(fetchAchatempoData());
    dispatch(fetchVenteData());
    dispatch(fetchHistoriqueData());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const filteredHistoriqueData = historiqueData
  // console.log("filteredHistoriqueData***:",historiqueData)


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
  const uniqueCodeVente = [...new Set(historiqueData.map(data => data.code_Op))]

  // console.log("fronSOrtX",uniqueCodeVente)

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
//fix search
  const filteredAndSearchedData = filteredHistoriqueData.filter((data) => {
    // const matchesSearchQuery = (data.code_Op?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesSearchQuery = data.code_Op?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUserDmd = data.user_Dmd?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = data.Partenaire?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTypeOp = data.type_Op?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = data.update_at?.includes(selectedDate);
    const matchesCode = data.code?.toLowerCase().includes(searchQuery.toLowerCase());
    // return matchesSearchQuery || matchesUserDmd || matchesClient;
    return (matchesSearchQuery || matchesUserDmd || matchesClient || matchesCode || matchesTypeOp) && matchesDate;
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('fr-FR'); // Formats as dd/mm/yyyy
    const formattedTime = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Formats time as hh:mm
    return `${formattedDate} ${formattedTime}`;
  };

  // useEffect(() => {
  //   // Calculate statistics based on selectedDate
  //   if (selectedDate) {
  //     const filteredByDate = historiqueData.filter(item => item.update_at.includes(selectedDate));
  //     console.log("filteredByDate=+>",filteredByDate)
  //     setFilteredData(filteredByDate);
  //   } else {
  //     // If no date selected, show all data and reset stats
  //     setFilteredData(historiqueData);
  //   }
  // }, [historiqueData, selectedDate]);

  const handleDateChange = e => {
    setSelectedDate(e.target.value);
  };
console.log("selectedAchat####=>", selectedAchat)
  return (
    <div>
      <Typography variant="h5" gutterBottom>Historique</Typography>
      <div className='flex items-center my-5 '>
        <input
          value={searchQuery}
          placeholder='Rechercher...'
          onChange={handleSearch} 
          className='px-3 py-2 mr-5 border border-gray-300 rounded-md'
        />
        <input
             type="date"
             value={selectedDate}
             onChange={handleDateChange}
             className="p-2 border border-gray-300 rounded shadow-sm w-[200px]"
           />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
  {uniqueCodeVente.map((codeHisto, index) => {
    const relatedDemands = filteredAndSearchedData.filter(data => data.code_Op=== codeHisto);
    if (relatedDemands.length === 0) return null; // Skip if no matching demands
    const firstDemand = relatedDemands[0];
    return (
      <React.Fragment key={codeHisto}>
        <TableRow
          // style={{
          //         backgroundColor : index % 2 === 0 ? "#e7e7e7" : "#ffffff", // Alternate row colors
          //     }}
          style={{
                  backgroundColor : firstDemand.type_Op === "sortie" ? "#ffeeec" : "#ffffff", // Alternate row colors
              }}
        >
          <TableCell>{firstDemand.type_Op}</TableCell>
          <TableCell>{firstDemand.code_Op}</TableCell>
          <TableCell>{formatDate(firstDemand.update_at)}</TableCell>
          <TableCell>{firstDemand.Partenaire}</TableCell>
          <TableCell>{firstDemand.user_Dmd}</TableCell>
          {/* <TableCell>{renderStatus(status)}</TableCell> Use renderStatus to display the status with the correct styling */}
          <TableCell>
            <IconButton onClick={() => openModal(firstDemand)}><span className='text-sm mr-1 text-blue-600'>Voir plus</span><div className='text-blue-500'><FaEye /></div></IconButton>
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
          <Typography variant="h6">Details de la Demande</Typography>
          <IconButton onClick={closeModal}><FaTimes /></IconButton>
        </div>
        <div className={classes.modalContent}>
          {selectedAchat && (
            <>
              <Typography variant="subtitle1">Code d'Operation : {selectedAchat.code_Op}</Typography>
              <Typography variant="subtitle1">Date<span className='pl-24'>:</span> {formatDate(selectedAchat.update_at)}</Typography>
              <Typography variant="subtitle1">Utilisateur<span className='pl-14'>:</span> {selectedAchat.user_Dmd}</Typography>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>code</TableCell>
                      <TableCell>Désignation</TableCell>
                      <TableCell>Quantité</TableCell>
                      {/* <TableCell>Qte Magasin</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historiqueData.filter(data => data.code_Op === selectedAchat.code_Op).map((data) => (
                      <TableRow key={data.id_Pdr}>
                        <TableCell>{data.code}</TableCell>
                        <TableCell>{data.designation}</TableCell>
                        <TableCell>{data.qte}</TableCell>
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
    <div className='w-32'>
      <img src={logo} alt="Logo" />
    </div>
    {/* <h5 className='mt-4'>Demande de Sortie</h5> */}

    <table className='w-2/5 shadow-y-lg ml-auto  w-[50%]'> 
      <tbody>
        <tr className='font-semibold text-lg'>
          <td className='w-32'><h6>{selectedAchat?.type_Op
      ? selectedAchat.type_Op.charAt(0).toUpperCase() + selectedAchat.type_Op.slice(1).toLowerCase()
      : ''} PDR N°</h6></td>
          {/* <td className='w-32'><h6>{selectedAchat?.type_Op.toUpperCase()} PDR N°</h6></td> */}
          <td>: {selectedAchat?.code}</td>
        </tr>
        <tr>
          <td><h6>Demandeur</h6></td>
          <td>: {selectedAchat?.user_Dmd}</td>
        </tr>
        <tr className='font-semibold text-lg'>
          <td className='flex items-start '><h6>Client</h6></td>
          <td>: {selectedAchat?.Partenaire}</td>
        </tr>
        <tr>
          <td colSpan="2">&nbsp;</td>
        </tr>
        <tr>
          <td colSpan="2">&nbsp;</td>
        </tr>
        {/* <tr>
          <td><h6>Onduleur</h6></td>
          <td>: {selectedAchat?.note}</td>
        </tr> */}

        
      </tbody>
    </table>
    {/* <br />
    <br /> */}

    <div className='my-4'>
    <table className={`${classes.table} border-collapse border border-green-800 rounded-lg shadow-sm mx-auto`}>
      <thead>
        <tr className='border'>
        <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
            <th className="border border-black text-[9px] font-semibold text-center py-1">Désignation</th>
            {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Client</th> */}
            <th className="border border-black text-[9px] font-semibold text-center py-1">Quantité</th>
            {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th> */}
            {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
        </tr>
      
      </thead>
      <tbody>
        {historiqueData.filter(a => a.code_Op === selectedAchat?.code_Op).map((item, idx) => (
            <tr key={idx} className='border'>
            <td className="border border-black text-[9px] text-center py-1 w-28">{item.code}</td>
            <td className=" border border-black text-[9px] text-center py-1 w-96">{item.designation}</td>
            {/* <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.Partenaire}</td> */}
            <td className=" border border-black text-[9px] text-center py-1 w-11">{item.qte}</td>
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
        </div>
      </Modal>
    </div>
  );
}

export default ListeSortXUser;







