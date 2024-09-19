
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

function ListeSortXUser() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const { productData } = useSelector(state => state.product);
  const { venteData } = useSelector(state => state.vente);
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
  console.log("filteredVenteData***:",filteredVenteData)

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
  const uniqueCodeVente = [...new Set(filteredVenteData.map(data => data.code_Sortie))]

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




  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
//fix search
  const filteredAndSearchedData = filteredVenteData.filter((data) => {
    // const matchesSearchQuery = data.code_Sortie?.toLowerCase().includes(searchQuery.toLowerCase());
    // const matchesUserDmd = data.user_Dmd?.toLowerCase().includes(searchQuery.toLowerCase());
    // const matchesClient = data.Partenaire?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearchQuery = data.code_Sortie 
  ? data.code_Sortie.toString().toLowerCase().includes(searchQuery.toLowerCase()) 
  : false;

const matchesUserDmd = data.user_Dmd 
  ? data.user_Dmd.toString().toLowerCase().includes(searchQuery.toLowerCase()) 
  : false;

const matchesClient = data.Partenaire 
  ? data.Partenaire.toString().toLowerCase().includes(searchQuery.toLowerCase()) 
  : false;


    return matchesSearchQuery || matchesUserDmd || matchesClient;
  });

console.log("from sortXuser:",filteredAchatData)
  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Demandes de Sortie</Typography>
      <Box className={classes.filterContainer}>
        <TextField
          label="Rechercher par Code Sortie"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          className={classes.searchInput}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Utilisateur</TableCell>
              {/* <TableCell>Status</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
  {uniqueCodeVente.map((codeAchat) => {
    {/* const relatedDemands = filteredVenteData.filter(data => data.code_Sortie === codeAchat); */}
    const relatedDemands = filteredAndSearchedData.filter(data => data.code_Sortie === codeAchat);
    if (relatedDemands.length === 0) return null; // Skip if no matching demands
    const firstDemand = relatedDemands[0];
    const status = getGeneralStatus(codeAchat);
    return (
      <React.Fragment key={codeAchat}>
        <TableRow>
          <TableCell>{firstDemand.code_Sortie}</TableCell>
          <TableCell>
          {new Date(firstDemand.date_Vente).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
          </TableCell>
          <TableCell>{firstDemand.Partenaire}</TableCell>
          {/* <TableCell>{formattedDate}</TableCell> */}
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
                  {filteredVenteData.filter(data => data.code_Sortie === selectedAchat.code_Sortie).map((data) => (
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
  <div className='w-32'>
    <img src={logo} alt="Logo" />
  </div>
  {/* <h5 className='mt-4'>Demande de Sortie</h5> */}

  <table className='w-2/5 shadow-y-lg ml-auto  w-[50%]'> 
        {/* { label: 'Date', value: selectedAchat?.date_Vente ? new Date(selectedAchat.date_Vente).toISOString().split('T')[0] : '' }, */}
    <tbody>
      {/* {[
        { label: 'Sortie PDR N°', value: selectedAchat?.code_Sortie },
        { 
          label: 'Date', 
          value: selectedAchat?.date_Vente ? 
            new Date(selectedAchat.date_Vente).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).replace(',', '') : '' 
        },
        { label: 'Demandeur', value: selectedAchat?.user_Dmd },
        { label: 'Client', value: selectedAchat?.Partenaire },
        { label: 'Onduleur', value: selectedAchat?.note }
      ].map((item, idx) => (
        <tr key={idx}>
          <td><h6>{item.label}</h6></td>
          <td>: {item.value}</td>
        </tr>
      ))} */}


      <tr className='font-semibold text-lg'>
        <td className='w-32'><h6>Sortie PDR N°</h6></td>
        <td>: {selectedAchat?.code_Sortie}</td>
      </tr>
      <tr>
        <td><h6>Date</h6></td>
        <td>: {selectedAchat?.date_Vente ? 
              new Date(selectedAchat.date_Vente).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).replace(',', '') : '' }
        </td>
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
      <tr>
        <td><h6>Onduleur</h6></td>
        <td>: {selectedAchat?.note}</td>
      </tr>
      <tr>
        <td><h6>Groupe d'articles</h6></td>
        <td>: {selectedAchat?.Groupe_Articles}</td>
      </tr>

      
    </tbody>
  </table>
  {/* <br />
  <br /> */}

  <div className='my-4'>
  <table className={`${classes.table} border-collapse border border-green-800 rounded-lg shadow-sm mx-auto `}>
    <thead>
      <tr className='border'>
      <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
           <th className="border border-black text-[9px] font-semibold text-center py-1 ">Désignation</th>
           {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Client</th> */}
           <th className="border border-black text-[9px] font-semibold text-center py-1 ">Quantité</th>
           {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th> */}
          {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
      </tr>
    
    </thead>
    <tbody>
      {venteData.filter(a => a.code_Sortie === selectedAchat?.code_Sortie).map((item, idx) => (
          <tr key={idx} className='border'>
          <td className="border border-black text-[9px] text-center py-1 w-28">{item.code_Produit}</td>
          <td className=" border border-black text-[9px] text-center py-1 w-96">{item.designation_Produit}</td>
          {/* <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.Partenaire}</td> */}
          <td className=" border border-black text-[9px] text-center py-1 w-11">{item.qte_Produit}</td>
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

export default ListeSortXUser;