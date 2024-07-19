
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData, updateProductData, updateQteMagasin } from '../store/productSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatempoData, postAchatempoData } from '../store/achatempoSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchHistoriqueData, postHistoriqueData } from '../store/historiqueSlice';
import Swal from 'sweetalert2';
import { fetchClientData } from '../store/clientSlice';
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
const Entree = () => {
  const classes = useStyles();
  const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
  const productData = useSelector((state) => state.product.productData);
  const projetData = useSelector((state) => state.projet.projetData);
  const clientData = useSelector((state) => state.client.clientData);
  const historiqueData = useSelector(state => state.historique.historiqueData);

  const [filteredData, setFilteredData] = useState([]);

  const [codeAchat, setCodeAchat] = useState('');
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  //=========================================================================================
  const [userAth, setUser] = useState(null);
  const [typeUser, setTypeUser] = useState(null);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    if (authState.user) {
      setUser(authState.user);
    }
  }, [authState]);

  useEffect(() => {
    if (userAth && userState.userData.length > 0) {
      const match = userState.userData.find(usr => usr.login_User == userAth.username);
      setTypeUser(match.type_User)
    }
  }, [userAth, userState]);
  console.log("typeUser!",typeUser)
  const checkAccess = ()=>{
    if (typeUser === "Super Admin") return true
    else if (typeUser === "Admin") return true
    else return false
  }

  console.log("sortie: checkAccess:", checkAccess())
  //=========================================================================================
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchProjetData());
    dispatch(fetchAchatempoData());
    dispatch(fetchClientData());
    dispatch(fetchHistoriqueData()); 

    // Generate the next codeAchat when the component mounts
    const generateNextCodeAchat = () => {
      const lastCode = localStorage.getItem('lastCodeAchat') || 'CA-000';
      const lastNumber = parseInt(lastCode.split('-')[1], 10);
      const newCode = `CA-${String(lastNumber + 1).padStart(3, '0')}`;
      setCodeAchat(newCode);
      localStorage.setItem('lastCodeAchat', newCode);
    };

    generateNextCodeAchat();
  }, [dispatch]);
  console.log("ooooouseroooo",user.username)
  console.log("===>historiqueData==>:", historiqueData)
  const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
  console.log("historiqueForUser==>:",historiqueForUser)
  const handleAddLine = () => {
    setLines([...lines, { demandeCode: '', projetCode: '', quantite: '', partenaire: ''}]);
  };

  const handleChange = (index, key, value) => {
    const newLines = [...lines];
    newLines[index][key] = value;
    setLines(newLines);
  };


// const handleSubmit = async () => {
//   try {
//       const currentDate = new Date();
//       const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
//     console.log(formattedDate)
//       for (const line of lines) {
//           if (line.demandeCode && line.projetCode && line.quantite) {
//               const designation = productData.find(demande => demande.Numéro_Article === line.demandeCode)?.Description_Article || '';
//               const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
//               const qte_Magasin = productData.find(demande => demande.Numéro_Article === line.demandeCode)?.qte_Magasin || '';
//               const achatPayload = {
//                   code: line.demandeCode,
//                   designation: designation,
//                   quantite: parseInt(line.quantite, 10),
//                   code_Projet: line.projetCode,
//                   nom_Projet: nom_Projet,
//                   check_Delivery: false,
//                   code_Achat: codeAchat,
//                   user_Dmd: user.username,
//                   date: formattedDate,
//                   qte_Reçu: 0,
//                   qte_Magasin:qte_Magasin
//               };

//               console.log("===achatpayload===>", achatPayload);
//               // Dispatch postAchatempoData thunk with achatPayload
//               const response = await dispatch(postAchatempoData(achatPayload));
//               console.log("===Res===>", response);
//               // Handle response/error
//               if (response.error) {
//                   throw new Error(response.error.message);
//               }
//           }
//       }

//       // Reset lines after successful submission
//       setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
//   } catch (error) {
//       console.error('Error submitting data:', error.message);
//   }
// };


// console.log("==><==")

const handleSubmit = async () => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
    
    // let checkCodeProjet = "sans"; // Initialize with default value
    // let checkNomProjet = "sans"; // Initialize with default value 
  
    // if (projetDetails) {
    //   checkCodeProjet = projetDetails.code_Projet;
    //   checkNomProjet = projetDetails.nom_Projet;
    // }
    for (const line of lines) {
      // if (line.demandeCode && line.projetCode && line.quantite && line.partenaire) {
      if (line.demandeCode && line.quantite && line.partenaire) {
        const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
        const designation = article?.Description_Article || '';
        const id_Article = article?.id_Article || null;
        const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
        const qte_Magasin = article?.qte_Magasin || '';
        const Partenaire = clientData.find(client=>client.Partenaire == line.partenaire)?.Partenaire || '';
        // const Partenaire = clientData.map(client=>client.Partenaire)

        let checkCodeProjet = "sans"; // Initialize with default value
        let checkNomProjet = "sans"; // Initialize with default value 
      
        if (line.projetCode) {
          checkCodeProjet = line.projetCode;
          checkNomProjet = nom_Projet;
        }

        console.log("line from input:",line)
        console.log("Partenaire:",Partenaire)
        
        if (id_Article === null) {
          throw new Error(`Article with code ${line.demandeCode} not found`);
        }
        const code_Prd = productData.find(item => item.id_Article === id_Article)?.Numéro_Article || '';

        const achatPayload = {
          code: line.demandeCode,
          designation: designation,
          quantite: parseInt(line.quantite, 10),
          code_Projet: checkCodeProjet,
          nom_Projet: checkNomProjet,
          // code_Projet: line.projetCode,
          // nom_Projet: nom_Projet,
          check_Delivery: false,
          code_Achat: codeAchat,
          user_Dmd: user.username,
          date: formattedDate,
          qte_Reçu: 0,
          qte_Magasin: qte_Magasin,
          id_Article: id_Article,
          Partenaire: Partenaire,
          // code_Produit: code_Produit 
        };
        console.log("qte=========>", parseInt(line.quantite, 10) + qte_Magasin)
        const historiqueData = {
          type_Op:"entree",
          code_Produit: code_Prd,
          designation_Produit: designation,
          code_Projet: checkCodeProjet,
          nom_Projet: checkNomProjet,
          // code_Projet: line.projetCode,
          // nom_Projet: nom_Projet,
          n_Serie : "======",
          user_Dmd: user.username,
          qte_Produit: parseInt(line.quantite, 10),
          id_Article: id_Article,
          Partenaire: Partenaire,
        }
        
await dispatch(postHistoriqueData(historiqueData))
  .then(response => {
    console.log("Post historique Data Response:", response);
    Swal.fire({
      title: 'Success',
      text: 'Sortie effectuée avec succès dans le stock',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    // Clear the input fields on successful submission
    // setDemandeCode('');
    // setVenteDetails(null);
    // setQuantite('');
  })
  .catch(error => {
    console.error("Post historique Data Error:", error);
  });
    const quantityReceived = parseInt(line.quantite, 10) + qte_Magasin;
    console.log("id_Article==============>",id_Article)

    //============================================================
    if (typeUser === "Utilisateur"){
      await dispatch(updateQteMagasin({
        productId: id_Article,
        qte_Magasin: quantityReceived
      }));
    }
    //============================================================
    
        console.log("===achatpayload===>", achatPayload);
        // Dispatch postAchatempoData thunk with achatPayload
        const response = await dispatch(postAchatempoData(achatPayload));
        console.log("===Res===>", response);
        // Handle response/error
        if (response.error) {
          throw new Error(response.error.message);
        }
      }else {//<<<<===========
        Swal.fire({
          title: 'Error',
          text: 'Les détails de Demande ou Projet ou quantité ou n_Serie ou Client ne sont pas disponibles.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Demande or Projet details or quantite or n_Serie or Client are not available');
      }
    }

    // Reset lines after successful submission
    setLines([{ demandeCode: '', projetCode: '', quantite: '', partenaire: ''}]);
  } catch (error) {
    console.error('Error submitting data:', error.message);
  }
};



  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' && index === lines.length - 1) {
      handleAddLine();
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

  console.log("fEntree: client ",clientData)
  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <Typography variant="h5" align="center" gutterBottom>Opération Magasinier</Typography>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Numero Article ou Code Barre</th>
            <th className="border px-4 py-2">Designation Fournisseur</th>
            <th className="border px-4 py-2">Designation Fadesol</th>
            {checkAccess() && <>
              <th className="border px-4 py-2">Projet Code</th>
              <th className="border px-4 py-2">Projet Nom</th>
            </>}
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Quantité Magasin</th>
            <th className="border px-4 py-2">Quantité</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode}
                  placeholder='Enter Numero article ou Code Barre'
                  onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.Description_Article : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
              </td>
              <td>
                <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.Designation_Fadesol : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
              </td>
              {checkAccess() && 
              <>       
                  <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={line.projetCode}
                    placeholder='Enter Projet Code'
                    onChange={(e) => handleChange(index, 'projetCode', e.target.value)}
                    className="w-full px-2 py-1 border-none"
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                </td>
                  <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || ''}
                    className="w-full px-2 py-1 border-none"
                    disabled
                  /></td>

              </>}

                {/* <td className="border px-4 py-2">
                 <input
                   type="text"
                   value={line.partenaire}
                   placeholder='Enter Client'
                   onChange={(e) => handleChange(index, 'partenaire', e.target.value)}
                   className="w-full px-2 py-1 border-none"
                   onKeyPress={(e) => handleKeyPress(e, index)}
                 />
               </td>*/}
               <td className="border px-4 py-2">
                  <select
                    value={line.partenaire}
                    onChange={e => handleChange(index, 'partenaire', e.target.value)}
                    className="w-full px-2 py-1 border-none"
                  >
                    <option value="">Sélectionner un client</option>
                    {clientData.map(client => (
                      <option key={client.id} value={client.Partenaire}>
                        {client.Partenaire}
                      </option>
                    ))}
                  </select>
                </td>

            
              <td className="border px-4 py-2">
              <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.qte_Magasin : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
     
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={line.quantite}
                  placeholder='Enter Quantité'
                  onChange={(e) => handleChange(index, 'quantite', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                {index === lines.length - 1 && (
                  <IconButton onClick={handleAddLine}>
                    <div className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-white hover:text-black hover:shadow ml-2">
                      <AiOutlinePlusCircle />
                    </div>
                  </IconButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
      </div>


      {!checkAccess() && 
        <>
          {historiqueForUser.length > 0 && (
            <>
              <div className="overflow-x-auto mt-5">
                {/* <table className="min-w-full table-auto bg-white border border-gray-200"> */}
                <table className="min-w-full table-auto bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="px-4 py-2">Type Operation</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Code Produit</th>
                      <th className="px-4 py-2">Designation</th>
                      <th className="px-4 py-2">Quantite</th>
                      <th className="px-4 py-2">N° Serie</th>
                      <th className="px-4 py-2">Partenaire</th>
                      <th className="px-4 py-2">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historiqueForUser.slice().reverse().map((item, index) => (
                      <tr key={item.id_Historique} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        <td className="border px-4 py-2">{item.type_Op}</td>
                        <td className="border px-4 py-2">{item.date_Op}</td>
                        <td className="border px-4 py-2">{item.code_Produit}</td>
                        <td className="border px-4 py-2">{item.designation_Produit}</td>
                        <td className="border px-4 py-2">{item.qte_Produit}</td>
                        <td className="border px-4 py-2">{item.n_Serie}</td>
                        <td className="border px-4 py-2">{item.Partenaire}</td>
                        <td className="border px-4 py-2">{item.user_Dmd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className={classes.updateButton} onClick={handlePrint}>PRINT</button>
            </>
          )}
        </>
     }
     

<div id="print-area" className={`${classes.printArea} p-4`}>
  <div className="w-32 mx-auto">
  </div>
  <h5 className="mt-4 text-sm">list Operation</h5>
  <br />
  <br />

  {historiqueForUser.length > 0 && (
    <div className="overflow-x-auto mt-5">
      <table className="w-full border border-black rounded shadow-md">
        <thead>
          <tr className="bg-gray-100 text-black text-sm">
            <th className="px-1">Type Operation</th>
            <th className="px-1">Date</th>
            <th className="px-1">Code Produit</th>
            <th className="px-1">Designation</th>
            <th className="px-1">Quantite</th>
            <th className="px-1">N° Serie</th>
            <th className="px-1">Partenaire</th>
            <th className="px-1">User</th>
          </tr>
        </thead>
        <tbody>
          {historiqueForUser.slice().reverse().map((item, index) => (
            <tr key={item.id_Historique} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-xs`}>
              <td className="border border-black px-2">{item.type_Op}</td>
              <td className="border border-black px-2">{item.date_Op}</td>
              <td className="border border-black px-2">{item.code_Produit}</td>
              <td className="border border-black px-2">{item.designation_Produit}</td>
              <td className="border border-black px-2">{item.qte_Produit}</td>
              <td className="border border-black px-2">{item.n_Serie}</td>
              <td className="border border-black px-2">{item.Partenaire}</td>
              <td className="border border-black px-2">{item.user_Dmd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <br />
  <div className="my-2 float-right">
    <p className="text-xs">Signature<span className="text-gray-300">___________________</span></p>
  </div>
</div>

    </div>
  );
};

export default Entree;

     {/* <div id="print-area" className={`${classes.printArea}`}>
  <div style={{ width: '128px', margin: '0 auto' }}>
  </div>
  <h5 style={{ marginTop: '16px' }}>list Operation</h5>
  <br />
  <br />

  {historiqueForUser.length > 0 && (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid green', borderRadius: '4px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: 'green', color: 'white' }}>
            <th style={{ padding: '8px' }}>Type Operation</th>
            <th style={{ padding: '8px' }}>Date</th>
            <th style={{ padding: '8px' }}>Code Produit</th>
            <th style={{ padding: '8px' }}>Designation</th>
            <th style={{ padding: '8px' }}>Quantite</th>
            <th style={{ padding: '8px' }}>N° Serie</th>
            <th style={{ padding: '8px' }}>Partenaire</th>
            <th style={{ padding: '8px' }}>User</th>
          </tr>
        </thead>
        <tbody>
          {historiqueForUser.slice().reverse().map((item, index) => (
            <tr key={item.id_Historique} style={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white' }}>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.type_Op}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.date_Op}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.code_Produit}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.designation_Produit}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.qte_Produit}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.n_Serie}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.Partenaire}</td>
              <td style={{ border: '1px solid green', padding: '8px' }}>{item.user_Dmd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  <br />
  <div style={{ margin: '10px 0', float: 'right' }}>
    <p>Signature<span style={{ color: '#e5e5e5' }}>___________________</span></p>
  </div>
</div> */}



