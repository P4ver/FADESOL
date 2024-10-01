
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
import ListeDemandeUser from './listeDemandeUser';
import { postAchatData } from '../store/achatSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';


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
  const achatempoData = useSelector((state) => state.achatempo.achatempoData);
  const historiqueData = useSelector(state => state.historique.historiqueData);
  console.log("achatempoData",achatempoData)
  const [filteredData, setFilteredData] = useState([]);

  const [codeAchat, setCodeAchat] = useState('');
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
  const didRunRef = useRef(false);
  useEffect(() => {
    // dispatch(fetchProductData());
    // dispatch(fetchProjetData());
    // dispatch(fetchAchatempoData());
    // dispatch(fetchClientData());
    // dispatch(fetchHistoriqueData()); 

    // Generate the next codeAchat when the component mounts
    // const generateNextCodeAchat = () => {
    //   const lastCode = localStorage.getItem('lastCodeAchat') || 'CE-000000';
    //   const lastNumber = parseInt(lastCode.split('-')[1], 10);
    //   const newCode = `CE-${String(lastNumber + 1).padStart(6, '0')}`;
    //   setCodeAchat(newCode);
    //   localStorage.setItem('lastCodeAchat', newCode);
    // };
    const fetchDataAndGenerateCode = async () => {
      await dispatch(fetchProductData());
      await dispatch(fetchProjetData());
      await dispatch(fetchAchatempoData());
      await dispatch(fetchClientData());
      await dispatch(fetchHistoriqueData());

  
      // await generateNextCodeAchat();
      if (!didRunRef.current) {
        await generateNextCodeAchat();
        didRunRef.current = true;
      }
    };
    fetchDataAndGenerateCode();
  }, [dispatch]);
  const generateNextCodeAchat = () => {
    // setCodeAchat(newCodeSortie);
    if (achatempoData && achatempoData.length > 0) {
      // const lastCodeSortie = venteData[venteData.length - 1].code_Sortie;
      const lastCodeEntree = achatempoData[achatempoData.length - 1].code_Achat || localStorage.getItem('lastCodeAchat');
      const lastCodeEntreeINT = parseInt(lastCodeEntree.split('-')[1], 10) + 1;
      const newCodeEntree = `CE-${String(lastCodeEntreeINT).padStart(6, '0')}`;
      console.log("codeEntreeINT code Entree:", newCodeEntree);
      setCodeAchat(newCodeEntree);
      localStorage.setItem('lastCodeAchat', newCodeEntree);
    } else {
      console.log("achatempoData is empty or undefined.");
      // Handle cases where venteData is empty, e.g., set a default value
      // setCodeAchat("CS-000001");
    }
  };
console.log("achatempoData.length", achatempoData.length)
// console.log("lastCodeEntree", lastCodeEntree)
  // console.log("ooooouseroooo",user.username)
  // console.log("===>historiqueData==>:", historiqueData)
  const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
  // console.log("historiqueForUser==>:",historiqueForUser)
  const handleAddLine = () => {
    setLines([...lines, { demandeCode: '', projetCode: '', quantite: '', partenaire: ''}]);
  };

  const handleChange = (index, key, value) => {
    const newLines = [...lines];
    newLines[index][key] = value;
    setLines(newLines);
  };

  const lastClickTimeRef = useRef(0);

const handleSubmit = async () => {
  try {

    const now = Date.now();
    if (now - lastClickTimeRef.current < 1000) return; // Ignore clicks within 1 second

    lastClickTimeRef.current = now;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
    
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

        // console.log("line from input:",line)
        // console.log("Partenaire:",Partenaire)
        
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
          // date: formattedDate,
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
        const ToAchatData={
          code_Achat: codeAchat,
          user_Dmd: user.username,
          code: code_Prd,
          code_Projet: checkCodeProjet,
          nom_Projet: checkNomProjet,
          date: formattedDate,
          designation_Produit: designation,
          quantite: parseInt(line.quantite, 10),
          // id_Article: id_Article,
          Partenaire: Partenaire,
        }
        
await dispatch(postHistoriqueData(historiqueData))
  .then(response => {
    console.log("Post historique Data Response:", response);
    // Swal.fire({
    //   title: 'Success',
    //   text: 'Sortie effectuée avec succès dans le stock',
    //   icon: 'success',
    //   confirmButtonText: 'OK'
    // });
    toast.success('Entree effectuée avec succès dans le stock')
    // Clear the input fields on successful submission
    // setDemandeCode('');
    // setVenteDetails(null);
    // setQuantite('');
  })
  .catch(error => {
    console.error("Post historique Data Error:", error);
  });
    const quantityReceived = parseInt(line.quantite, 10) + qte_Magasin;
    console.log("parseInt(line.quantite, 10)==============>", parseInt(line.quantite, 10))
    console.log("quantityReceived==============>", quantityReceived)
    // console.log("id_Article==============>",id_Article)

    //============================================================
    if (typeUser === "Utilisateur"){
      await dispatch(updateQteMagasin({
        productId: id_Article,
        qte_Magasin: quantityReceived
      }));
      await dispatch(postAchatData(ToAchatData));
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

    window.location.reload();
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

  const [selectedClient, setSelectedClient] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleClientChange = (value) => {
    setInputValue(value);
    if (value) {
      const filtered = clientData.filter(client =>
        client.Partenaire.toLowerCase().includes(value.toLowerCase())
      );
      // console.log("filtered",filtered)
      setFilteredClients(filtered);
      setShowList(true); // Show the list when typing
    } else {
      setFilteredClients([]);
      setShowList(false); // Hide the list if input is empty
    }
  };

  const handleClientSelect = (client) => {
    console.log("client**", client.Partenaire)
    setSelectedClient(client.Partenaire);
    setInputValue(client.Partenaire);
    setShowList(false); // Hide the list after selecting a client
    if (client.Partenaire && lines.some(line => line.partenaire !== client.Partenaire)) {
      setLines(lines.map(line => ({ ...line, partenaire: client.Partenaire })));
    }
  };


  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">

      <Typography variant="h5" align="center" gutterBottom>Entree</Typography>

      {/* 
      <div className='border px-4 py-2 mb-4'>
        <label className='pr-2 font-bold'>Client :</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleClientChange(e.target.value)}
          placeholder="Select or type client"
          className='outline-none w-[50%]'
        />

        {showList && (
          <ul className="border mt-1 max-h-40 overflow-y-auto">
            {filteredClients.map(client => (
              <li
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className="cursor-pointer px-2 py-1 hover:bg-gray-200"
              >
                {client.Partenaire}
              </li>
            ))}
          </ul>
        )}

      </div>
     */}

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
            {/* <th className="border px-4 py-2">Client</th> */}
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
                  // onKeyPress={(e) => handleKeyPress(e, index)}
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
                  <select
                    value={line.partenaire}
                    onChange={e => handleChange(index, 'partenaire', e.target.value)}
                    className="w-full px-2 py-1 border-none"
                  >
                    <option value="">Sélectionner un client</option>
                    {clientData
                    .slice()
                    .sort((a, b) => a.Partenaire.localeCompare(b.Partenaire))
                    .map(client => (
                      <option key={client.id} value={client.Partenaire}>
                        {client.Partenaire}
                      </option>
                    ))}
                  </select>
                </td> */}

            
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

      <div className='border px-4 py-2 my-4'>
        <label className='pr-2 font-bold'>Client :</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleClientChange(e.target.value)}
          placeholder="Select or type client"
          className='outline-none w-[50%]'
        />

        {showList && (
          <ul className="border mt-1 max-h-40 overflow-y-auto">
            {filteredClients.map(client => (
              <li
                key={client.id}
                onClick={() => handleClientSelect(client)}
                className="cursor-pointer px-2 py-1 hover:bg-gray-200"
              >
                {client.Partenaire}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
      </div>
      {/* {!checkAccess() && 
        <ListeDemandeUser/>
      } */}

      {!loading && !checkAccess() && <ListeDemandeUser />}
      <ToastContainer />
    </div>
  );
};

export default Entree;





// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProductData, updateProductData, updateQteMagasin } from '../store/productSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatempoData, postAchatempoData } from '../store/achatempoSlice';
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { Typography, IconButton } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { fetchHistoriqueData, postHistoriqueData } from '../store/historiqueSlice';
// import Swal from 'sweetalert2';
// import { fetchClientData } from '../store/clientSlice';
// import ListeDemandeUser from './listeDemandeUser';
// import { postAchatData } from '../store/achatSlice';
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
// const Entree = () => {
//   const classes = useStyles();
//   const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
//   const productData = useSelector((state) => state.product.productData);
//   const projetData = useSelector((state) => state.projet.projetData);
//   const clientData = useSelector((state) => state.client.clientData);
//   const historiqueData = useSelector(state => state.historique.historiqueData);

//   const [filteredData, setFilteredData] = useState([]);

//   const [codeAchat, setCodeAchat] = useState('');
//   const [loading, setLoading] = useState(true);

//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   //=========================================================================================
//   const [userAth, setUser] = useState(null);
//   const [typeUser, setTypeUser] = useState(null);
//   const userState = useSelector(state => state.user);

//   useEffect(() => {
//     if (authState.user) {
//       setUser(authState.user);
//     }
//   }, [authState]);

//   useEffect(() => {
//     if (userAth && userState.userData.length > 0) {
//       const match = userState.userData.find(usr => usr.login_User == userAth.username);
//       setTypeUser(match.type_User)
//       setLoading(false);
//     }
//   }, [userAth, userState]);
//   console.log("typeUser!",typeUser)
//   const checkAccess = ()=>{
//     if (typeUser === "Super Admin") return true
//     else if (typeUser === "Admin") return true
//     else return false
//   }

//   console.log("sortie: checkAccess:", checkAccess())
//   //=========================================================================================
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProductData());
//     dispatch(fetchProjetData());
//     dispatch(fetchAchatempoData());
//     dispatch(fetchClientData());
//     dispatch(fetchHistoriqueData()); 

//     // Generate the next codeAchat when the component mounts
//     const generateNextCodeAchat = () => {
//       const lastCode = localStorage.getItem('lastCodeAchat') || 'CA-00000';
//       const lastNumber = parseInt(lastCode.split('-')[1], 10);
//       const newCode = `CA-${String(lastNumber + 1).padStart(5, '0')}`;
//       setCodeAchat(newCode);
//       localStorage.setItem('lastCodeAchat', newCode);
//     };

//     generateNextCodeAchat();
//   }, [dispatch]);
//   // console.log("ooooouseroooo",user.username)
//   // console.log("===>historiqueData==>:", historiqueData)
//   const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
//   // console.log("historiqueForUser==>:",historiqueForUser)
//   const handleAddLine = () => {
//     setLines([...lines, { demandeCode: '', projetCode: '', quantite: '', partenaire: ''}]);
//   };

//   const handleChange = (index, key, value) => {
//     const newLines = [...lines];
//     newLines[index][key] = value;
//     setLines(newLines);
//   };

// const handleSubmit = async () => {
//   try {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
    
//     for (const line of lines) {
//       // if (line.demandeCode && line.projetCode && line.quantite && line.partenaire) {
//       if (line.demandeCode && line.quantite && line.partenaire) {
//         const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
//         const designation = article?.Description_Article || '';
//         const id_Article = article?.id_Article || null;
//         const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
//         const qte_Magasin = article?.qte_Magasin || '';
//         const Partenaire = clientData.find(client=>client.Partenaire == line.partenaire)?.Partenaire || '';
//         // const Partenaire = clientData.map(client=>client.Partenaire)

//         let checkCodeProjet = "sans"; // Initialize with default value
//         let checkNomProjet = "sans"; // Initialize with default value 
      
//         if (line.projetCode) {
//           checkCodeProjet = line.projetCode;
//           checkNomProjet = nom_Projet;
//         }

//         // console.log("line from input:",line)
//         // console.log("Partenaire:",Partenaire)
        
//         if (id_Article === null) {
//           throw new Error(`Article with code ${line.demandeCode} not found`);
//         }
//         const code_Prd = productData.find(item => item.id_Article === id_Article)?.Numéro_Article || '';

//         const achatPayload = {
//           code: line.demandeCode,
//           designation: designation,
//           quantite: parseInt(line.quantite, 10),
//           code_Projet: checkCodeProjet,
//           nom_Projet: checkNomProjet,
//           // code_Projet: line.projetCode,
//           // nom_Projet: nom_Projet,
//           check_Delivery: false,
//           code_Achat: codeAchat,
//           user_Dmd: user.username,
//           date: formattedDate,
//           qte_Reçu: 0,
//           qte_Magasin: qte_Magasin,
//           id_Article: id_Article,
//           Partenaire: Partenaire,
//           // code_Produit: code_Produit 
//         };
//         console.log("qte=========>", parseInt(line.quantite, 10) + qte_Magasin)
//         const historiqueData = {
//           type_Op:"entree",
//           code_Produit: code_Prd,
//           designation_Produit: designation,
//           code_Projet: checkCodeProjet,
//           nom_Projet: checkNomProjet,
//           // code_Projet: line.projetCode,
//           // nom_Projet: nom_Projet,
//           n_Serie : "======",
//           user_Dmd: user.username,
//           qte_Produit: parseInt(line.quantite, 10),
//           id_Article: id_Article,
//           Partenaire: Partenaire,
//         }
//         const ToAchatData={
//           code_Achat: codeAchat,
//           user_Dmd: user.username,
//           code: code_Prd,
//           code_Projet: checkCodeProjet,
//           nom_Projet: checkNomProjet,
//           date: formattedDate,
//           designation_Produit: designation,
//           quantite: parseInt(line.quantite, 10),
//           // id_Article: id_Article,
//           Partenaire: Partenaire,
//         }
        
// await dispatch(postHistoriqueData(historiqueData))
//   .then(response => {
//     console.log("Post historique Data Response:", response);
//     // Swal.fire({
//     //   title: 'Success',
//     //   text: 'Sortie effectuée avec succès dans le stock',
//     //   icon: 'success',
//     //   confirmButtonText: 'OK'
//     // });
    
//     // Clear the input fields on successful submission
//     // setDemandeCode('');
//     // setVenteDetails(null);
//     // setQuantite('');
//   })
//   .catch(error => {
//     console.error("Post historique Data Error:", error);
//   });
//     const quantityReceived = parseInt(line.quantite, 10) + qte_Magasin;
//     console.log("parseInt(line.quantite, 10)==============>", parseInt(line.quantite, 10))
//     console.log("quantityReceived==============>", quantityReceived)
//     // console.log("id_Article==============>",id_Article)

//     //============================================================
//     if (typeUser === "Utilisateur"){
//       await dispatch(updateQteMagasin({
//         productId: id_Article,
//         qte_Magasin: quantityReceived
//       }));
//       await dispatch(postAchatData(ToAchatData));
//     }
//     //============================================================
    
//         console.log("===achatpayload===>", achatPayload);
//         // Dispatch postAchatempoData thunk with achatPayload
//         const response = await dispatch(postAchatempoData(achatPayload));
//         console.log("===Res===>", response);
//         // Handle response/error
//         if (response.error) {
//           throw new Error(response.error.message);
//         }
//       }else {//<<<<===========
//         Swal.fire({
//           title: 'Error',
//           text: 'Les détails de Demande ou Projet ou quantité ou n_Serie ou Client ne sont pas disponibles.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//         console.error('Demande or Projet details or quantite or n_Serie or Client are not available');
//       }
//     }

//     // Reset lines after successful submission
//     setLines([{ demandeCode: '', projetCode: '', quantite: '', partenaire: ''}]);

//     window.location.reload();
//   } catch (error) {
//     console.error('Error submitting data:', error.message);
//   }
// };



//   const handleKeyPress = (event, index) => {
//     if (event.key === 'Enter' && index === lines.length - 1) {
//       handleAddLine();
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

//   // console.log("fEntree: client ",clientData)
//   return (
//     <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
//       <Typography variant="h5" align="center" gutterBottom>Opération Magasinier</Typography>
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Numero Article ou Code Barre</th>
//             <th className="border px-4 py-2">Designation Fournisseur</th>
//             <th className="border px-4 py-2">Designation Fadesol</th>
//             {checkAccess() && <>
//               <th className="border px-4 py-2">Projet Code</th>
//               <th className="border px-4 py-2">Projet Nom</th>
//             </>}
//             <th className="border px-4 py-2">Client</th>
//             <th className="border px-4 py-2">Quantité Magasin</th>
//             <th className="border px-4 py-2">Quantité</th>
//             <th className="border px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lines.map((line, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={line.demandeCode}
//                   placeholder='Enter Numero article ou Code Barre'
//                   onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
//                   className="w-full px-2 py-1 border-none"
//                   // onKeyPress={(e) => handleKeyPress(e, index)}
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.Description_Article : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.Designation_Fadesol : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
//               </td>
//               {checkAccess() && 
//               <>       
//                   <td className="border px-4 py-2">
//                   <input
//                     type="text"
//                     value={line.projetCode}
//                     placeholder='Enter Projet Code'
//                     onChange={(e) => handleChange(index, 'projetCode', e.target.value)}
//                     className="w-full px-2 py-1 border-none"
//                     onKeyPress={(e) => handleKeyPress(e, index)}
//                   />
//                 </td>
//                   <td className="border px-4 py-2">
//                   <input
//                     type="text"
//                     value={projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || ''}
//                     className="w-full px-2 py-1 border-none"
//                     disabled
//                   /></td>

//               </>}


//                <td className="border px-4 py-2">
//                   <select
//                     value={line.partenaire}
//                     onChange={e => handleChange(index, 'partenaire', e.target.value)}
//                     className="w-full px-2 py-1 border-none"
//                   >
//                     <option value="">Sélectionner un client</option>
//                     {/* {clientData.map(client => (
//                       <option key={client.id} value={client.Partenaire}>
//                         {client.Partenaire}
//                       </option>
//                     ))} */}
//                     {clientData
//                     .slice()
//                     .sort((a, b) => a.Partenaire.localeCompare(b.Partenaire))
//                     .map(client => (
//                       <option key={client.id} value={client.Partenaire}>
//                         {client.Partenaire}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

            
//               <td className="border px-4 py-2">
//               <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.qte_Magasin : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
     
//               </td>
//               <td className="border px-4 py-2">
//                 <input
//                   type="number"
//                   value={line.quantite}
//                   placeholder='Enter Quantité'
//                   onChange={(e) => handleChange(index, 'quantite', e.target.value)}
//                   className="w-full px-2 py-1 border-none"
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 {index === lines.length - 1 && (
//                   <IconButton onClick={handleAddLine}>
//                     <div className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-white hover:text-black hover:shadow ml-2">
//                       <AiOutlinePlusCircle />
//                     </div>
//                   </IconButton>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="text-center mt-4">
//         <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
//       </div>
//       {/* {!checkAccess() && 
//         <ListeDemandeUser/>
//       } */}

//       {!loading && !checkAccess() && <ListeDemandeUser />}

//     </div>
//   );
// };

// export default Entree;