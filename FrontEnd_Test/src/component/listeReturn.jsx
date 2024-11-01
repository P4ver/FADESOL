import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData, updateProductData, updateQteMagasin } from '../store/productSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchHistoriqueData } from '../store/historiqueSlice';
import { fetchClientData } from '../store/clientSlice';
import { fetchVenteData } from '../store/venteSlice';
import { fetchReturnData, postReturnData, deleteReturnData } from '../store/returnSlice';
import Modal from 'react-modal';
import { FaEye, FaPrint, FaTimes } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../pictures/logo.png';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  printArea: {
    display: 'none', // Masquer l'élément par défaut
  }
});

function ListeReturn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productData } = useSelector(state => state.product);
  const { venteData } = useSelector(state => state.vente);
  const { returnData } = useSelector(state => state.return);
  const authState = useSelector(state => state.auth);
  const user = authState.user;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

  useEffect(() => {
    dispatch(fetchReturnData());
    dispatch(fetchProductData());
    dispatch(fetchVenteData());
  }, [dispatch]);

  const uniqueCodeVente = [...new Set(returnData.map(data => data.code_Return))];

  useEffect(() => {
    const handleDeleteDuplicates = async () => {
      try {
        const returnMap = {};
        const duplicates = [];
  
        returnData.forEach(returnItem => {
          const key = `${returnItem.code}-${returnItem.code_Projet}-${returnItem.designation}-${returnItem.quantite}-${returnItem.nom_Projet}-${returnItem.date}-${returnItem.code_Return}-${returnItem.user_Dmd}`;
          if (returnMap[key]) {
            duplicates.push(returnItem.id_return);
          } else {
            returnMap[key] = true;
          }
        });
  
        const deletePromises = duplicates.map(id => dispatch(deleteReturnData(id)));
        await Promise.all(deletePromises);
      } catch (error) {
        console.error('Error deleting duplicates:', error);
        alert('Failed to delete duplicates.');
      }
    };
  
    handleDeleteDuplicates();
  }, [returnData, dispatch]);

  const openModal = (returnItem) => {
    setSelectedReturn(returnItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReturn(null);
  };

 const getGeneralStatus = (codeReturn) => {
  const relatedDemands = returnData.filter(data => data.code_Return === codeReturn);

  if (relatedDemands.every(demand => demand.qteRecue === 0)) {
    return 'Pending';
  }

  if (relatedDemands.every(demand => demand.qteRecue === demand.quantite)) {
    return 'Livré';
  }

  if (relatedDemands.some(demand => demand.qteRecue > 0 && demand.qteRecue < demand.quantite)) {
    return 'Partiellement livré';
  }

  return 'Unknown';
};


const handlePrint = () => {
  const printContents = document.getElementById('print-area').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};
  
  const filteredReturnData = returnData.filter(data => {
    const codeReturn = data.code_Return || ''; // Valeur par défaut si undefined
    const query = searchQuery || ''; // Valeur par défaut si undefined
  
    const matchesSearchQuery = codeReturn.toLowerCase().includes(query.toLowerCase());
    const status = getGeneralStatus(codeReturn).toLowerCase(); // Assurez-vous que getGeneralStatus renvoie une chaîne non vide
  
    const matchesFilterType =
      filterType === 'all' ||
      (filterType === 'livre' && status === 'livré') ||
      (filterType === 'partiellement_livre' && status === 'partiellement livré') ||
      (filterType === 'pending' && status === 'pending');
  
    return matchesSearchQuery && matchesFilterType;
  });
  
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part

  return (
    <div>
      <Typography variant="h5" gutterBottom>Liste des Demandes de Return</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueCodeVente.map((codeReturn) => {
              const relatedDemands = returnData.filter(data => data.code_Return === codeReturn);
              if (relatedDemands.length === 0) return null; // Skip if no matching demands
              const firstDemand = relatedDemands[0];
              const status = getGeneralStatus(codeReturn);
              return (
                <TableRow key={codeReturn}>
                  <TableCell>{firstDemand.code_Return}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{firstDemand.user_Dmd}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openModal(firstDemand)}><FaEye /></IconButton>
                  </TableCell>
                </TableRow>
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
    <Typography variant="h6">Details de la Demande de Return</Typography>
    <IconButton onClick={closeModal}><FaTimes /></IconButton>
  </div>
  {selectedReturn && (
    <>
      <Typography variant="subtitle1">Code Retrun: {selectedReturn.code_Return}</Typography>
      <Typography variant="subtitle1">Date: {selectedReturn.date_Return}</Typography>
      <Typography variant="subtitle1">Utilisateur: {selectedReturn.user_Dmd}</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Désignation</TableCell>
              <TableCell>Quantité Demandée</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returnData.filter(data => data.code_Return === selectedReturn.code_Return).map((data) => (
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
        onClick={handlePrint}
      >
        <FaPrint /> Imprimer
      </Button>
      <div id="print-area" className={`${classes.printArea}`}>
  <div className='w-32 mx-auto'>
    <img src={logo} alt="Logo" />
  </div>
  <h5 className='mt-4'>Demande de Return</h5>

  <table className='w-2/5 shadow-y-lg'> 
    <tbody>
      {[
        { label: 'Code Return', value: selectedReturn?.code_Return },
        { label: 'Date', value: selectedReturn?.date_Return ? new Date(selectedReturn.date_Return).toISOString().split('T')[0] : '' },
        { label: 'User', value: selectedReturn?.user_Dmd }
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
           
           <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Quantité</th>
           {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Qte Magasin</th> */}
          {/* <th className="border border-black text-[9px] font-semibold text-center py-1 w-1/5">Projet</th> */}
      </tr>
    
    </thead>
    <tbody>
      {returnData.filter(a => a.code_Return === selectedReturn?.code_Return).map((item, idx) => (
        <tr key={idx} className='border'>
          <td className=" border border-black text-[9px] text-center py-1 min-w-28">{item.code_Produit}</td>
          <td className=" border border-black text-[9px] text-center  py-1 w-2/5">{item.designation_Produit}</td>
          
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
