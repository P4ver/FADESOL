
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

Modal.setAppElement('#root');

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: '90%', // Adjust as needed
    margin: 'auto',
  },
  tableCell: {
    padding: '4px 8px', // Reduce padding
    fontSize: '0.8rem', // Smaller font size
  },
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

  const userState = useSelector(state => state.user);

  const user = authState.user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAchatData());
    dispatch(fetchProductData());
    dispatch(fetchAchatempoData());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [qteRecu, setQteRecu] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState(null);

  // const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
  const filteredAchatData = achatempoData
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

  const handleInputChange = (id, value) => {
    setQteRecu(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };


  const handleFormSubmit = async (id) => {
    const quantityReceived = qteRecu[id];
    console.log("handleSubmit quantityReceived",quantityReceived)
    if (quantityReceived !== undefined) {
      console.log('Updating quantity received for ID:', id);
      console.log('New quantity received:', quantityReceived);
      try {
        // Dispatching updateAchatempoData action
        await dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: quantityReceived }
        }));
  
        // Dispatching updateProductData action
        console.log('Dispatching updateProductData action...');
        await dispatch(updateProductData({ productId: id, updatedProductData: { qte_magasin: quantityReceived } }));
        console.log('updateProductData action dispatched successfully.');
        
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

  const getStatus = (quantite, qteRecu, userDmd) => {
    console.log("getStatus", userDmd)
    // console.log("getStatus type",userState.userData.find(user => user.login_User === userDmd).type_User)
    const typeOfUser = userState.userData.find(user => user.login_User === userDmd).type_User
    if (typeOfUser === 'Utilisateur'){
      return (
        <span className="text-black">
          ==Livré==
        </span>
      );
    }
    if (qteRecu === 0) {
      return (
        <span className="text-red-500">
          <FaTruck className={classes.statusIcon} /> Pending
        </span>
      );
    } else if (quantite > qteRecu) {
      return (
        <span className="text-green-500">
          <FaTruck className={classes.statusIcon} /> Partiellement livré
        </span>
      );
    } else if (quantite === qteRecu) {
      return (
        <span className="text-blue-500">
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
      const updatePromises = Object.keys(qteRecu).map(async id => {

        await dispatch(updateAchatempoData({
          id_Achat: id,
          updatedAchatempoData: { qte_Reçu: qteRecu[id] }
        }));
  
        const updatedItem = achatempoData.find(item => item.id_Achat == id);
        console.log("updatedItem : ", updatedItem)
        if (!updatedItem) {
          throw new Error(`Item with id ${id} not found in achatempoData`);
        }
        const product = productData.find(p => p.Numéro_Article == updatedItem.code);
        // console.log("product", productData.map(pr=>pr))
        console.log("product=>+>", product)
        if (!product) {
          throw new Error(`Product with designation ${updatedItem.designation} not found`);
        }
        // console.log("============>updatedItem: qte Reçu",updatedItem.qte_Reçu)
        const newQteMagasin = (parseInt(qteRecu[id]) - updatedItem.qte_Reçu) + product.qte_Magasin;
        console.log("updatedItem.quantite : ", updatedItem.quantite)
        console.log("parseInt(qteRecu[id]) : ", parseInt(qteRecu[id]))
        console.log("product.id_Article : ", product.id_Article)
        console.log("newQteMagasin : ", newQteMagasin)
        console.log("updatedItem.qte_Reçu", updatedItem.qte_Reçu)
        console.log("product.qte_Magasin", product.qte_Magasin)
        await dispatch(updateQteMagasin({
          productId: product.id_Article,
          qte_Magasin: newQteMagasin
        }));
        const ToAchatData={
          code_Achat: updatedItem.code_Achat,
          user_Dmd: updatedItem.user_Dmd,
          code: updatedItem.code,
          code_Projet: updatedItem.code_Projet,
          nom_Projet: updatedItem.nom_Projet,
          date: updatedItem.date,
          designation_Produit: updatedItem.designation,
          quantite: updatedItem.quantite,
          // id_Article: id_Article,
          Partenaire: updatedItem.Partenaire,
        }
        console.log("out ToAchatData ",ToAchatData)
        if (updatedItem.quantite == parseInt(qteRecu[id])){
          console.log("ToAchatData ",ToAchatData)
          await dispatch(postAchatData(ToAchatData));
        }

      });
      await Promise.all(updatePromises);
      setUpdateSuccess(true);
      setModalIsOpen(false);
      
      // Rest of the function...
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
  // const getGeneralStatus = (codeAchat) => {
  //   const relatedDemands = filteredAchatData.filter(data => data.code_Achat === codeAchat);
  //   const relatedUserStates = relatedDemands.map(demand =>
  //     userState.userData.find(user => user.login_User === demand.user_Dmd)
  //   );
  //   console.log("relatedUserStates",relatedUserStates)
    
  //   const  relatedUserType = relatedUserStates.map(user=>user.type_User)
  //   console.log("*******relatedUserType**",relatedUserType)

  //   // console.log("*******fnduser**", filteredAchatData.map(dt=>dt.user_Dmd))
  //   // console.log("*******relatedDemands**",relatedDemands.every(demand=>demand.user_Dmd))
  //   if (relatedUserType[0] == 'Utilisateur') {
  //     return '=====';
  //   }

  //   if (relatedDemands.every(demand => demand.qte_Reçu === 0)) {
  //     return 'Pending';
  //   }

  //   if (relatedDemands.every(demand => demand.qte_Reçu === demand.quantite)) {
  //     return 'Livré';
  //   }

  //   if (relatedDemands.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
  //     return 'Partiellement livré';
  //   }

  //   return 'Unknown';
  // };

  function getGeneralStatus(code_Achat) {
    // Filter to find the matching dataPrd
    const filteredDataPrd = filteredAchatData.filter(item => item.code_Achat === code_Achat);
  
    // Check if the dataPrd exists
    if (filteredDataPrd.length === 0) {
      console.error(`Data not found for code_Achat: ${code_Achat}`);
      return 'Unknown CA'; // Or another fallback status
    }
    
    const dataPrd = filteredDataPrd[0]; // Access the first matching item
  
    // Filter to find the related user state
    const filteredUserStates = userState.userData.filter(user => user.login_User === dataPrd.user_Dmd);
  
    // Check if the relatedUserStates exists
    if (filteredUserStates.length === 0 || !filteredUserStates[0].type_User) {
      console.error(`type_User not found for code_Achat: ${code_Achat}`);
      return 'Unknown UserType'; // Or another fallback status
    }
    
    const type_User = filteredUserStates[0].type_User; // Access the type_User
  
    // Determine the general status
    if (type_User === 'Utilisateur') {
      return '=====';
    } 

    if (filteredDataPrd.every(demand => demand.qte_Reçu === 0)) {
      return 'Pending';
    }

    if (filteredDataPrd.every(demand => demand.qte_Reçu === demand.quantite)) {
      return 'Livré';
    }

    if (filteredDataPrd.some(demand => demand.qte_Reçu > 0 && demand.qte_Reçu < demand.quantite)) {
      return 'Partiellement livré';
    }

    // if (dataPrd.qte_Reçu === 0) {
    //   return 'Pending';
    // }
  
    // if (dataPrd.qte_Reçu === dataPrd.quantite) {
    //   return 'Livré';
    // }
  
    // if (dataPrd.qte_Reçu > 0 && dataPrd.qte_Reçu < dataPrd.quantite) {
    //   return 'Partiellement livré';
    // }
  }
  
  const renderStatus = (status) => {
    switch (status) {
      case '=====':
        return <p className='text-black'>==Livré==</p>;
      case 'Pending':
        return <p className='text-red-600'>Pending</p>;
      case 'Livré':
        return <p className='text-blue-600'>Livré</p>;
      case 'Partiellement livré':
        return <p className='text-green-600'>Partiellement livré</p>;
      default:
        return <p>Unknown</p>;
    }
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // const filteredAndSearchedData = filteredAchatData.filter((data) => {
  //   const matchesSearchQuery = data.code_Achat.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesFilterType =
  //     filterType === 'all' ||
  //     (filterType === 'livre' && getGeneralStatus(data.code_Achat) === 'Livré') ||
  //     (filterType === 'partiellement_livre' && getGeneralStatus(data.code_Achat) === 'Partiellement livré') ||
  //     (filterType === 'pending' && getGeneralStatus(data.code_Achat) === 'Pending');

  //   return matchesSearchQuery && matchesFilterType;
  // });


  const filteredAndSearchedData = filteredAchatData.filter((data) => {
    // Ensure code_Achat and searchQuery are strings to avoid runtime errors
    const codeAchat = data.code_Achat ? data.code_Achat.toString().toLowerCase() : '';
    const searchQueryLower = searchQuery ? searchQuery.toString().toLowerCase() : '';
  
    // Check if the code_Achat matches the search query
    const matchesSearchQuery = codeAchat.includes(searchQueryLower);
  
    // Get the status once to avoid multiple calls to getGeneralStatus
    const status = getGeneralStatus(data.code_Achat);
  
    // Check if the data matches the filter type
    const matchesFilterType =
      filterType === 'all' ||
      (filterType === 'livre' && status === 'Livré') ||
      (filterType === 'partiellement_livre' && status === 'Partiellement livré') ||
      (filterType === 'pending' && status === 'Pending');
  
    // Return true if both conditions are met
    return matchesSearchQuery && matchesFilterType;
  });
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };
// console.log("***filteredAchatData==>",filteredAchatData.map(data => data))
// console.log("from listdemand:",achatempoData)
  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Demandes d'Entree</Typography>
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
              <TableCell>Client</TableCell>
              <TableCell>Groupe Articles</TableCell>
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
    const status = getGeneralStatus(codeAchat);
    return (
      <React.Fragment key={codeAchat}>
        <TableRow>
          <TableCell>{firstDemand.code_Achat}</TableCell>
          <TableCell>
            {new Date(firstDemand.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </TableCell>
          <TableCell>{firstDemand.Partenaire}</TableCell>
          <TableCell>GA</TableCell>
          <TableCell>{firstDemand.user_Dmd}</TableCell>
          <TableCell>{renderStatus(status)}</TableCell> {/* Use renderStatus to display the status with the correct styling */}
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
          <Typography variant="h6">Details de la Demande d'Entree</Typography>
          <IconButton onClick={closeModal}><FaTimes /></IconButton>
        </div>
        {selectedAchat && (
          <>
            <Typography variant="subtitle1">Code Entree: {selectedAchat.code_Achat}</Typography>
            <Typography variant="subtitle1">Date: {selectedAchat.date}</Typography>
            <Typography variant="subtitle1">Utilisateur: {selectedAchat.user_Dmd}</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Code Projet</TableCell>
                    <TableCell className={classes.tableCell}>Désignation</TableCell>
                    <TableCell className={classes.tableCell}>Quantité Demandée</TableCell>
                    <TableCell className={classes.tableCell}>Quantité Reçue</TableCell>
                    <TableCell className={classes.tableCell}>Status</TableCell>
                    <TableCell className={classes.tableCell}>Entrer Qte Reçue</TableCell>
                    <TableCell className={classes.tableCell}>Qte Magasin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAchatData.filter(data => data.code_Achat === selectedAchat.code_Achat).map((data) => (
                    <TableRow key={data.id_Achat}>
                      <TableCell className={classes.tableCell}>{data.code_Projet}</TableCell>
                      <TableCell className={classes.tableCell}>{data.designation}</TableCell>
                      <TableCell className={classes.tableCell}>{data.quantite}</TableCell>
                      <TableCell className={classes.tableCell}>{data.qte_Reçu}</TableCell>
                      <TableCell className={classes.tableCell}>{getStatus(data.quantite, data.qte_Reçu, data.user_Dmd)}</TableCell>
                      <TableCell className={classes.tableCell}>
                        <TextField
                          type="number"
                          className={classes.input}
                          value={qteRecu[data.id_Achat] || ''}
                          onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
                          size="small" // Makes the input smaller
                          inputProps={{ style: { padding: '4px 8px' } }} 
                          />
                        {/* <IconButton onClick={() => handleFormSubmit(data.id_Achat)}>
                          <FaCheck />
                        </IconButton> */}
                      </TableCell>
                      {/* <TableCell>{data.qte_Magasin}</TableCell> */}
                      <TableCell className={classes.tableCell}>{lookNewQteMagasin(data.id_Article)}</TableCell>
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
                <h5 className='mt-4'>Demande d'Entree</h5>

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
                    <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
                        <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Désignation</th>
                        <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Client</th>
                        <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
                        {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
                    </tr>
                  
                  </thead>
                  <tbody>
                    {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
                      <tr key={idx} className='border'>
                        <td className=" border border-black text-[9px] text-center  py-1 min-w-28">{item.code}</td>
                        <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.designation}</td>
                        <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.Partenaire}</td>
                        <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.quantite}</td>
                        {/* <td className=" border border-black text-[9px] text-center py-1 w-1/5">{lookNewQteMagasin(item.id_Article)}</td>
                        <td className=" border border-black text-[9px] text-center   py-1 w-1/5">{item.nom_Projet}</td> */}
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

export default ListeDemande;




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatempoData, updateAchatempoData, deleteAchatempoData } from '../store/achatempoSlice';
// // import {fetchProductData,updateProductData} from "../store/productSlice"
// import {fetchProductData,updateProductData, updateQteMagasin} from "../store/productSlice"
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
//   const { productData } = useSelector(state => state.product);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();
  
  

//   useEffect(() => {
//     dispatch(fetchAchatData());
//     dispatch(fetchProductData());
//     dispatch(fetchAchatempoData());
//   }, [dispatch]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const [qteRecu, setQteRecu] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedAchat, setSelectedAchat] = useState(null);
//   // const filteredAchatData = achatempoData.filter(data => data.user_Dmd === user.username);
//   const filteredAchatData = achatempoData
//   const lookNewQteMagasin = (id_Article) =>{
//     const findQteMagasinUpdate = productData.find(p => p.id_Article  == id_Article)
//     console.log("=>==>=>=>", findQteMagasinUpdate.qte_Magasin)
//     return findQteMagasinUpdate.qte_Magasin
//   }

//   useEffect(() => {
//     if (updateSuccess) {
//       // window.location.reload();
//       console.log("avoid reload")
//     }
//   }, [updateSuccess]);

//   const handleInputChange = (id, value) => {
//     setQteRecu(prevState => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };


//   const handleFormSubmit = async (id) => {
//     const quantityReceived = qteRecu[id];
//     console.log("handleSubmit quantityReceived",quantityReceived)
//     if (quantityReceived !== undefined) {
//       console.log('Updating quantity received for ID:', id);
//       console.log('New quantity received:', quantityReceived);
//       try {
//         // Dispatching updateAchatempoData action
//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: quantityReceived }
//         }));
  
//         // Dispatching updateProductData action
//         console.log('Dispatching updateProductData action...');
//         await dispatch(updateProductData({ productId: id, updatedProductData: { qte_magasin: quantityReceived } }));
//         console.log('updateProductData action dispatched successfully.');
        
//         setUpdateSuccess(true);
//         const updatedItem = achatempoData.find(item => item.id_Achat == id);
//         console.log("lsitdemand:===>", updatedItem)

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

//   const getStatus = (quantite, qteRecu) => {
//     if (qteRecu === 0) {
//       return (
//         <span className="text-red-500">
//           <FaTruck className={classes.statusIcon} /> Pending
//         </span>
//       );
//     } else if (quantite > qteRecu) {
//       return (
//         <span className="text-green-500">
//           <FaTruck className={classes.statusIcon} /> Partiellement livré
//         </span>
//       );
//     } else if (quantite === qteRecu) {
//       return (
//         <span className="text-blue-500">
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
//       const updatePromises = Object.keys(qteRecu).map(async id => {

//         await dispatch(updateAchatempoData({
//           id_Achat: id,
//           updatedAchatempoData: { qte_Reçu: qteRecu[id] }
//         }));
        
//         const updatedItem = achatempoData.find(item => item.id_Achat == id);
//         // console.log("===>getStatus===>", getStatus(updatedItem.quantite, qteRecu[id]))
//         console.log("qte reçu",  qteRecu[id])
//         console.log("qte ",  updatedItem.quantite)
//         // console.log("")
//         // if (updatedItem.quantite == qteRecu[id]) {
//         //   const achatDataToInsert = {
//         //     code_Achat: updatedItem.code_Achat,
//         //     code_Projet: updatedItem.code_Projet,
//         //     designation: updatedItem.designation,
//         //     quantite: updatedItem.quantite,
//         //     nom_Projet: updatedItem.nom_Projet,
//         //     date: updatedItem.date,
//         //     user_Dmd: updatedItem.user_Dmd,
//         //   };
//         //   await dispatch(postAchatData(achatDataToInsert));
//         // }
//         if (!updatedItem) {
//           throw new Error(`Item with id ${id} not found in achatempoData`);
//         }
//         const product = productData.find(p => p.Numéro_Article == updatedItem.code);
//         console.log("product", product)
//         if (!product) {
//           throw new Error(`Product with Numéro_Article ${updatedItem.code} not found`);
//         }
//         console.log("lstdemand============>updatedItem: ",updatedItem)
//         const newQteMagasin = (parseInt(qteRecu[id]) - updatedItem.qte_Reçu) + product.qte_Magasin;
//         console.log("newQteMagasin : ", newQteMagasin)
//         await dispatch(updateQteMagasin({
//           productId: product.id_Article,
//           qte_Magasin: newQteMagasin
//         }));

//         const ToAchatData={
//           code_Achat: updatedItem.code_Achat,
//           user_Dmd: updatedItem.user_Dmd,
//           code: updatedItem.code,
//           code_Projet: updatedItem.code_Projet,
//           nom_Projet: updatedItem.nom_Projet,
//           date: updatedItem.date,
//           designation_Produit: updatedItem.designation,
//           quantite: updatedItem.quantite,
//           // id_Article: id_Article,
//           Partenaire: updatedItem.Partenaire,
//         }
//         console.log("out ToAchatData ",ToAchatData)
//         if (updatedItem.quantite == parseInt(qteRecu[id])){
//           console.log("ToAchatData ",ToAchatData)
//           await dispatch(postAchatData(ToAchatData));
//         }


//       });
//       await Promise.all(updatePromises);
//       setUpdateSuccess(true);
//       setModalIsOpen(false);

//           // if (getStatus(updatedItem.quantite, qteRecu[id]) == 'Livré') {
//           // const achatDataToInsert = {
//           //   code_Achat: updatedItem.code_Achat,
//           //   code_Projet: updatedItem.code_Projet,
//           //   designation: updatedItem.designation,
//           //   quantite: updatedItem.quantite,
//           //   nom_Projet: updatedItem.nom_Projet,
//           //   date: updatedItem.date,
//           //   user_Dmd: updatedItem.user_Dmd,
//           // };

//           // // Dispatch de l'action pour insérer dans la table 'achat'
//           // await dispatch(postAchatData(achatDataToInsert));
//           // }
//       // Rest of the function...
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

//     return 'Unknown';
//   };
//   const renderStatus = (status) => {
//     switch (status) {
//       case 'Pending':
//         return <p className='text-red-600'>Pending</p>;
//       case 'Livré':
//         return <p className='text-blue-600'>Livré</p>;
//       case 'Partiellement livré':
//         return <p className='text-green-600'>Partiellement livré</p>;
//       default:
//         return <p>Unknown</p>;
//     }
//   };
//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setFilterType(event.target.value);
//   };

//   const filteredAndSearchedData = filteredAchatData.filter((data) => {
//     const matchesSearchQuery = data.code_Achat.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesFilterType =
//       filterType === 'all' ||
//       (filterType === 'livre' && getGeneralStatus(data.code_Achat) === 'Livré') ||
//       (filterType === 'partiellement_livre' && getGeneralStatus(data.code_Achat) === 'Partiellement livré') ||
//       (filterType === 'pending' && getGeneralStatus(data.code_Achat) === 'Pending');

//     return matchesSearchQuery && matchesFilterType;
//   });

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct(prevProduct => ({
//       ...prevProduct,
//       [name]: value
//     }));
//   };

// // console.log("from listdemand:",achatempoData)
//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>Liste des Demandes d'Achat</Typography>
//       <Box className={classes.filterContainer}>
//         <TextField
//           label="Rechercher par Code Achat"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearch}
//           className={classes.searchInput}
//         />
//         <div>
//           <Button variant="contained" color="primary" onClick={() => setFilterType('all')}>Tous</Button>
//           <Button variant="contained" color="secondary" onClick={() => setFilterType('livre')}>Livré</Button>
//           <Button variant="contained" color="secondary" onClick={() => setFilterType('partiellement_livre')}>Partiellement Livré</Button>
//           <Button variant="contained" color="secondary" onClick={() => setFilterType('pending')}>En Attente</Button>
//         </div>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table" size='small'>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Utilisateur</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
       
//           <TableBody>
//   {uniqueCodeAchats.map((codeAchat) => {
//     const relatedDemands = filteredAndSearchedData.filter(data => data.code_Achat === codeAchat);
//     if (relatedDemands.length === 0) return null; // Skip if no matching demands
//     const firstDemand = relatedDemands[0];
//     const status = getGeneralStatus(codeAchat);
//     return (
//       <React.Fragment key={codeAchat}>
//         <TableRow>
//           <TableCell>{firstDemand.code_Achat}</TableCell>
//           <TableCell>{firstDemand.date}</TableCell>
//           <TableCell>{firstDemand.user_Dmd}</TableCell>
//           <TableCell>{renderStatus(status)}</TableCell> {/* Use renderStatus to display the status with the correct styling */}
//           <TableCell>
//             <IconButton onClick={() => openModal(firstDemand)}><div className='text-blue-500'><FaEye /></div></IconButton>
//             <IconButton onClick={() => handleDelete(firstDemand.id_Achat)}><div className='text-red-500'><FaTimes /></div></IconButton>
//           </TableCell>
//         </TableRow>
//       </React.Fragment>
//     );
//   })}
// </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         className={classes.modal}
//         contentLabel="Order Details"
//       >
//         <div className={classes.modalHeader}>
//           <Typography variant="h6">Details de la Demande d'Achat</Typography>
//           <IconButton onClick={closeModal}><FaTimes /></IconButton>
//         </div>
//         {selectedAchat && (
//           <>
//             <Typography variant="subtitle1">Code Achat: {selectedAchat.code_Achat}</Typography>
//             <Typography variant="subtitle1">Date: {selectedAchat.date}</Typography>
//             <Typography variant="subtitle1">Utilisateur: {selectedAchat.user_Dmd}</Typography>
//             <TableContainer component={Paper}>
//               <Table className={classes.table} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Code Projet</TableCell>
//                     <TableCell>Désignation</TableCell>
//                     <TableCell>Quantité Demandée</TableCell>
//                     <TableCell>Quantité Reçue</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Entrer Qte Reçue</TableCell>
//                     <TableCell>Qte Magasin</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredAchatData.filter(data => data.code_Achat === selectedAchat.code_Achat).map((data) => (
//                     <TableRow key={data.id_Achat}>
//                       <TableCell>{data.code_Projet}</TableCell>
//                       <TableCell>{data.designation}</TableCell>
//                       <TableCell>{data.quantite}</TableCell>
//                       <TableCell>{data.qte_Reçu}</TableCell>
//                       <TableCell>{getStatus(data.quantite, data.qte_Reçu)}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           className={classes.input}
//                           value={qteRecu[data.id_Achat] || ''}
//                           onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
//                           />
//                         <IconButton onClick={() => handleFormSubmit(data.id_Achat)}>
//                           <FaCheck />
//                         </IconButton>
//                       </TableCell>
//                       {/* <TableCell>{data.qte_Magasin}</TableCell> */}
//                       <TableCell>{lookNewQteMagasin(data.id_Article)}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.validateButton}
//               onClick={handleValidation}
//             >
//               Valider Tout
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               className={classes.updateButton}
//               onClick={handlePrint}
//             >
//               <FaPrint /> Imprimer
//             </Button>
//             <div id="print-area" className={`${classes.printArea}`}>
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
//   <table className={`${classes.table} w-[10%] border-collapse border border-green-800 rounded-lg shadow-sm`}>
//     <thead>
//       <tr className='border'>
//       <th className="border border-black text-[9px] font-semibold text-center py-1">Code</th>
//            <th className="border border-black text-[9px] font-semibold text-center py-1 w-2/5">Désignation</th>
//            <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
//            <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th>
//           <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th>
//       </tr>
    
//     </thead>
//     <tbody>
//       {achatempoData.filter(a => a.code_Achat === selectedAchat?.code_Achat).map((item, idx) => (
//         <tr key={idx} className='border'>
//           <td className=" border border-black text-[9px] text-center  py-1">{item.code}</td>
//           <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.designation}</td>
//           <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.quantite}</td>
//           {/* <td className=" border border-black text-[9px] text-center py-1 w-1/5">{item.qte_Magasin}</td> */}
//           <td className=" border border-black text-[9px] text-center py-1 w-1/5">{lookNewQteMagasin(item.id_Article)}</td>
//           <td className=" border border-black text-[9px] text-center   py-1 w-1/5">{item.nom_Projet}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//   <br />
//   <div className='my-2 float-right'><p>Signature<span className='text-gray-200'>___________________</span></p></div>
// </div>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default ListeDemande;