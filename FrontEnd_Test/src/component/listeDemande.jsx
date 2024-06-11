

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

function ListeDemande() {
  const classes = useStyles();
  const { achatempoData } = useSelector(state => state.achatempo);
  const { achatData } = useSelector(state => state.achat);
  const { productData } = useSelector(state => state.product);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchProductData());
    dispatch(fetchAchatempoData());
  }, [dispatch]);
// console.log("pppppppppppp", productData)
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

  // const handleFormSubmit = async (id) => {
  //   const quantityReceived = qteRecu[id];
  //   if (quantityReceived !== undefined) {
  //     try {
  //       await dispatch(updateAchatempoData({
  //         id_Achat: id,
  //         updatedAchatempoData: { qte_Reçu: quantityReceived }
  //       }));
  //       setUpdateSuccess(true);
  //     } catch (error) {
  //       console.error('Error updating quantity received:', error);
  //       alert('Failed to update quantity received.');
  //     }
  //   } else {
  //     alert('Please enter a quantity received.');
  //   }
  // };


  const handleFormSubmit = async (id) => {
    const quantityReceived = qteRecu[id];
    if (quantityReceived !== undefined) {
      console.log('Updating quantity received for ID:', id);
      console.log('New quantity received:', quantityReceived);
      try {
        // Dispatching updateAchatempoData action to update qte_Reçu
        await dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: quantityReceived }
        }));
  
        // Dispatching updateQteMagasin action to update qte_Magasin
        const updatedQteMagasin = quantityReceived + 1008; // Update qte_Magasin based on your logic
        await dispatch(updateQteMagasin({ productId: 17, qte_Magasin: updatedQteMagasin }));
  
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

  // const [simo, setSimo] = useState(null)
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
          achat.nom_Projet == item.nom_Projet &&
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




  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Function to save edits
  const handleSaveEdit = async () => {
    try {
      console.log('Saving edits:', editedProduct);
      await dispatch(updateProductData({ productId: editedProduct.id_Article, updatedProductData: editedProduct }));
      // Add any additional actions after saving edits
      console.log('Product updated successfully!');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
// console.log("from listdemand:",achatempoData)
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
                    <TableCell>Qte Magasin</TableCell>
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
                      <TableCell>{data.qte_Magasin}</TableCell>
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



