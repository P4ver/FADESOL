
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

function ListeSortieUser() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const { productData } = useSelector(state => state.product);
  const {venteData} = useSelector(state => state.vente)

console.log("==================>vent==+>", venteData)
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


  
  // const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
  const filteredAchatData = venteData.filter(data => data.user_Dmd === user.username);
  console.log("filteredAchatData===>", filteredAchatData)
  const lookNewQteMagasin = (id_Article) =>{
    const findQteMagasinUpdate = productData.find(p => p.id_Article  == id_Article)
    console.log("=>==>=>=>", findQteMagasinUpdate)
    return findQteMagasinUpdate.qte_Magasin
  }

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
// console.log("lsit user uniqueCodeAchats",uniqueCodeAchats)
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


  


  const filteredAndSearchedData = filteredAchatData.filter((data) => {
    // const matchesSearchQuery = data.code_Produit.toLowerCase().includes(searchQuery.toLowerCase());
    // return matchesSearchQuery ;
    const codeProduit = data.code_Produit || ''; // Default to an empty string if undefined
    const matchesSearchQuery = codeProduit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearchQuery;
  });
  // const filteredAndSearchedData = filteredAchatData.filter((data) => {

  //   const matchesSearchQuery = data.code_Achat.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesSearchQuery ;
  // });
  console.log("===>selectedAchat===>", selectedAchat)
console.log("test filteredAndSearchedData", filteredAndSearchedData)
  // const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Numero Article</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
            {filteredAndSearchedData.map((CVente) => {
              {/* const relatedDemands = filteredAndSearchedData.filter(data => data.code_Achat === codeAchat); */}
              const relatedDemands = filteredAndSearchedData.filter(data => data.id_Vente === CVente.id_Vente);
              if (filteredAndSearchedData.length === 0) return null; // Skip if no matching demands
              const firstDemand = relatedDemands[0];
              return (
                <React.Fragment key={CVente}>
                  <TableRow>
                    <TableCell>{CVente.code_Produit}</TableCell>
                    <TableCell>{CVente.date_Vente}</TableCell>
                    <TableCell>{CVente.user_Dmd}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => openModal(firstDemand)}><div className='text-blue-500'><FaEye /></div></IconButton>
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
            <Typography variant="subtitle1">Numero Article: {selectedAchat.code_Produit}</Typography>
            <Typography variant="subtitle1">Date: {selectedAchat.date_Vente}</Typography>
            <Typography variant="subtitle1">Utilisateur: {selectedAchat.user_Dmd}</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Désignation</TableCell>
                    <TableCell>Quantité Demandée</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAchatData.filter(data => data.id_Vente === selectedAchat.id_Vente).map((data) => (
                    <TableRow key={data.id_Vente}>
                      <TableCell>{data.designation_Produit}</TableCell>
                      <TableCell>{data.qte_Produit}</TableCell>
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
              <h5 className='mt-4'>Demande de Vente</h5>

              <table className='w-2/5 shadow-y-lg'> 
                <tbody>
                  {[
                    { label: 'Numero Article', value: selectedAchat?.code_Produit},
                    { label: 'Date', value: selectedAchat?.date_Vente },
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
                  <th className="border border-black text-[9px] font-semibold text-center py-1">n_Serie</th>
                      <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Désignation</th>
                      <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
                      {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th> */}
                      {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
                  </tr>
                
                </thead>
                <tbody>
                  {venteData.filter(a => a.id_Vente === selectedAchat?.id_Vente).map((item, idx) => (
                    <tr key={idx} className='border'>
                      <td className=" border border-black text-[9px] text-center  py-1">{item.n_Serie}</td>
                      <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.designation_Produit}</td>
                      <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.qte_Produit}</td>
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

export default ListeSortieUser;
