
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
import { Link } from 'react-router-dom';


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
  const [lines, setLines] = useState([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '' }]);
  const productData = useSelector((state) => state.product.productData);
  const projetData = useSelector((state) => state.projet.projetData);
  const clientData = useSelector((state) => state.client.clientData);
  const achatempoData = useSelector((state) => state.achatempo.achatempoData);
  const historiqueData = useSelector(state => state.historique.historiqueData);
  // console.log("achatempoData",achatempoData)
  const [filteredData, setFilteredData] = useState([]);

  const [codeAchat, setCodeAchat] = useState('');
  const [loading, setLoading] = useState(true);

  const authState = useSelector(state => state.auth);
  const user = authState.user;
  //=========================================================================================
  const [userAth, setUser] = useState(null);
  const [typeUser, setTypeUser] = useState(null);
  const userState = useSelector(state => state.user);
  
  //===============================Client====================================================
  const [selectedClient, setSelectedClient] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [showList, setShowList] = useState(false);
  //===============================Nom de Projet=============================================
  const [NomProjetInput, setNomProjetInput] = useState('');
  //================================Numero Articl (search)================================================
  const [inputCodeValue, setInputCodeValue] = useState('');
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [showCodeList, setShowCodeList] = useState(false);
  //=========================================================================================
  const [loadingProcess, setLoadingProcess] = useState(null);


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
  // console.log("typeUser!",typeUser)
  const checkAccess = ()=>{
    if (typeUser === "Super Admin") return true
    else if (typeUser === "Admin") return true
    else return false
  }

  // console.log("NomProjetInput", NomProjetInput)
  // console.log("Entree: checkAccess:", checkAccess())
  //=========================================================================================
  const dispatch = useDispatch();
  const didRunRef = useRef(false);
  useEffect(() => {
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
// console.log("achatempoData.length", achatempoData.length)
// console.log("lastCodeEntree", lastCodeEntree)
  const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
  // console.log("historiqueForUser==>:",historiqueForUser)
  const handleAddLine = () => {
    const hasLowStock = lines.some(line => {
      const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
      const qte_Magasin = article?.qte_Magasin || '';
      if (!line.demandeCode){
        Swal.fire({
          title: 'Error',
          text: `vous devez d'abord remplir cette ligne.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        throw new Error(`vous devez d'abord remplir cette ligne.`);
      }
      if (line.demandeCode) {
        if (!line.quantite){
          Swal.fire({
            title: 'Error',
            text: `Veuillez entrer la quantité pour l'article ${article.Numéro_Article} !`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          // toast.error(`Veuillez entrer la quantité pour l'article ${article.Numéro_Article} !`);
          return true;
        }
      }
      return false;
    });
  
    // If any line has an issue, stop the function
    if (hasLowStock) return;
    setLines([...lines, { demandeCode: '', nomProjet: '', quantite: '', partenaire: ''}]);
  };

  const handleFocus = (index) => {
    setShowCodeList(index);  // Show the dropdown for the focused row
  };

  const handleChange = (index, key, value) => {
    const newLines = [...lines];
    newLines[index][key] = value;
    setLines(newLines);

    if (key === 'demandeCode' && value.length > 0) {
      setShowCodeList(index);  // Show list only if there's input
    } else {
      setShowCodeList(null);  // Hide list if input is empty
    }

  };
  // console.log("entree : selectedClient",selectedClient)
  const lastClickTimeRef = useRef(0);
const handleSubmit = async () => {
  setLoadingProcess(true)
  try {

    const now = Date.now();
    if (now - lastClickTimeRef.current < 2000) return; // Ignore clicks within 1 second

    lastClickTimeRef.current = now;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
    
    // if (!selectedClient){
    //   toast.error(`le client doit être rempli`);
    // }
    // if (!NomProjetInput){
    //   toast.error(`le nom projet doit être rempli`);
    // }
    // ================================================================
    const hasError = lines.some(line => {
      const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
      const qte_Magasin = article?.qte_Magasin || '';
          if (!selectedClient){
            Swal.fire({
              title: 'Error',
              text: `le client doit être rempli`,
              icon: 'error',
              confirmButtonText: 'OK'
            }); 
            throw new Error(`le client doit être rempli`);
            // toast.error(`le client doit être rempli`);
          }
        else if (!NomProjetInput){
          Swal.fire({
            title: 'Error',
            text: `le nom de projet doit être rempli`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          throw new Error(`le nom de projet doit être rempli`);
        }
        if (lines.length == 1){
          if (!line.demandeCode){
            Swal.fire({
              title: 'Error',
              text: `Code doit être rempli.`,
              icon: 'error',
              confirmButtonText: 'OK'
            });
            // toast.error(`Code doit être rempli.`);
          }
          // if (!line.quantite){
          //   toast.error(`Quantite doit être rempli.`);
          // }
          else if (line.demandeCode){
            if (!line.quantite){
              Swal.fire({
                title: 'Error',
                text: `Quantite de ${line.demandeCode} doit être remplie.`,
                icon: 'error',
                confirmButtonText: 'OK'
              });
              // toast.error(`Quantite de ${line.demandeCode} doit être rempli.`);
            }
          }
        }

        if (lines.length > 1){
          if (line.demandeCode){
            if (!line.quantite){
              Swal.fire({
                title: 'Error',
                text: `Quantite de ${line.demandeCode} doit être remplie`,
                icon: 'error',
                confirmButtonText: 'OK'
              });
              // toast.error(`Quantite doit être rempli ${line.demandeCode}`);
              throw new Error(`Quantite doit être rempli ${line.demandeCode}`);
            }
          }
        }
        // if (lines.length > 1 && !line.demandeCode){
          
        // }

      return false; // Otherwise, continue checking other lines
    });
    
    // If any line failed, stop the process
    if (hasError) {
      console.log("One or more lines have invalid quantities, halting process.");
      return; // Stop further execution if there's an error
    }
    console.log("All lines passed the check, proceeding...");
    for (const line of lines) {
      // if (line.demandeCode && line.projetCode && line.quantite && line.partenaire) {
      // if (line.demandeCode && line.quantite && line.partenaire) {
      if (line.demandeCode && line.quantite && selectedClient && NomProjetInput) {
        const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
        const designation = article?.Description_Article || '';
        const id_Article = article?.id_Article || null;
        const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
        const qte_Magasin = article?.qte_Magasin || '';
        const Partenaire = clientData.find(client=>client.Partenaire == line.partenaire)?.Partenaire || '';
        // const Partenaire = clientData.map(client=>client.Partenaire)

        let checkCodeProjet = "sans"; // Initialize with default value
        let checkNomProjet = "sans"; // Initialize with default value 
      
        if (NomProjetInput) {
          // checkCodeProjet = line.projetCode;
          // checkNomProjet = line.nomProjet;
          checkNomProjet = NomProjetInput;
          
        }

        // console.log("line from input:",line)
        // console.log("Partenaire:",Partenaire)
        // console.log("selectedClient from handlesubmit:",selectedClient)
        
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
          Partenaire: selectedClient,
          // code_Produit: code_Produit 
        };
        console.log("qte=========>", parseInt(line.quantite, 10) + qte_Magasin)
        const historiqueData = {
          type_Op:"entree",
          code: code_Prd,
          designation: designation,
          // code_Projet: checkCodeProjet,
          // nom_Projet: checkNomProjet,
          // code_Projet: line.projetCode,
          // nom_Projet: nom_Projet,
          code_Op: codeAchat,
          user_Dmd: user.username,
          qte: parseInt(line.quantite, 10),
          // id_Article: id_Article,
          Partenaire: selectedClient,
          // Partenaire: Partenaire,
        }

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
      // await dispatch(postAchatData(ToAchatData));
    }
    //============================================================
    
        // console.log("===achatpayload===>", achatPayload);
        // Dispatch postAchatempoData thunk with achatPayload
        const response = await dispatch(postAchatempoData(achatPayload));
        console.log("===Res===>", response);

        if (response.error) {
          throw new Error(response.error.message);
        } 

       await dispatch(postHistoriqueData(historiqueData))
      .then(response => {
        console.log("Post historique Data Response:", response);
        toast.success('Entree effectuée avec succès dans le stock')
      })
      .catch(error => {
        console.error("Post historique Data Error:", error);
      });
        // Handle response/error

      }
      else if (lines.length == 1) {
        // Swal.fire({
        //   title: 'Error',
        //   text: 'Les détails de Demande ou Projet ou quantité ou n_Serie ou Client ne sont pas disponibles.',
        //   icon: 'error',
        //   confirmButtonText: 'OK'
        // });
        // console.error('Demande or Projet details or quantite or n_Serie or Client are not available');
        return;
      }
    }

    // Reset lines after successful submission
    setInputValue('')
    setNomProjetInput('')
    setLines([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: ''}]);
    // window.location.reload();
  } catch (error) {
    console.error('Error submitting data:', error.message);
  }finally {
    setLoadingProcess(false); // Stop loading after the operation completes
  }
};

// console.log("entree lines",lines)

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' && index === lines.length - 1) {
      handleAddLine();
    }
  };
  

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
    // console.log("client**", client.Partenaire)
    setSelectedClient(client.Partenaire);
    setInputValue(client.Partenaire);
    setShowList(false); // Hide the list after selecting a client
    if (client.Partenaire && lines.some(line => line.partenaire !== client.Partenaire)) {
      setLines(lines.map(line => ({ ...line, partenaire: client.Partenaire })));
    }
  };


  const [showFullListe, setShowFullListe] = useState(false);

  //Toggle the state when button is clicked
  const toggleListe = () => {
    setShowFullListe(!showFullListe);
  };

  const handleNomProjetInput = (value) => {
    setNomProjetInput(value);  
  };

// =========================================================


// const handleCodeChange = (value) => {
//   setInputCodeValue(value);
//   if (value) {
//     const filtered = productData.filter(article =>
//       article.Numéro_Article.toLowerCase().includes(value.toLowerCase())
//     );
//     console.log("filtered", filtered)
//     setFilteredCodes(filtered);
//     setShowCodeList(true); // Show the list when typing
//   } else {
//     setFilteredCodes([]);
//     setShowCodeList(false); // Hide the list if input is empty
//   }
// };
const handleCodeSelect = (article, index) => {
  const updatedLines = [...lines];
  updatedLines[index].demandeCode = article.Numéro_Article;
  setLines(updatedLines);
  setShowCodeList(null);  
};

// console.log("inputCodeValue", inputCodeValue)
  return (
    <>
    {loadingProcess && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <div className='flex justify-center items-center py-14 rounded-md text-black flex-col w-[300px] bg-slate-50'>
        <div className='flex'>
          <div className="mx-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"> </div>
          <p className="text-lg">Chargement...</p>
        </div>
        <div className="pt-10">Cela peut prendre quelques secondes.</div>
      </div>
      </div>  
    )}
      <div className="max-w-[75%] mx-auto p-4 bg-white rounded-lg shadow-md">
      {!checkAccess() && 
          <Link to="/dashboard" className=" w-16 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 text-xl rounded-lg shadow-2xl">
            Back
          </Link>
      }
        <Typography variant="h5" align="center" gutterBottom>Entree</Typography>

        {/* current date and time */}
        <div className="px-4 py-2 my-4">
          <label className='pr-2 font-bold'>Date </label><span className='ml-20 font-bold mr-1'> : </span>
          <span>
            {new Date().toLocaleDateString('en-GB')} {/* dd/mm/yyyy format */}
            {' '}
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* hh:mm format */}
          </span>
        </div>

        {/* Client */}
        <div className='px-4 py-2 my-4'>
          <label className='pr-2 font-bold'>Client<span className='ml-20'>: </span></label>
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

        {/* nom de projet */}
        <div className='px-4 py-2 my-4'>
          <label className='pr-2 font-bold'>Nom de Projet <span className='ml-5'>: </span></label>
            <input
              type="text"
              value={NomProjetInput}
              onChange={(e) => handleNomProjetInput(e.target.value)}
              placeholder="Nom de Projet"
              className='outline-none w-[50%]'
            />
        </div>

        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 w-56">Code</th>
              {/* <th className="border px-4 py-2">Designation Fournisseur</th> */}
              <th className="border px-4 py-2">Designation</th>
              {/* {checkAccess() && <> */}
                {/* <th className="border px-4 py-2">Nom de Projet</th> */}
                {/* <th className="border px-4 py-2">Projet Nom</th> */}
              {/* </>} */}
              {/* <th className="border px-4 py-2">Client</th> */}
              {/* <th className="border px-4 py-2 w-40">Quantité Magasin</th> */}
              <th className="border px-4 py-2 w-32">Quantité</th>
              <th className="border px-4 py-2 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={line.demandeCode}
                    // value={inputCodeValue}
                    placeholder='Enter Numero article ou Code Barre'
                    onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
                    onFocus={() => handleFocus(index)}
                    // onChange={(e) => handleCodeChange(e.target.value)}
                    className="w-full px-2 py-1 border-none"
                  />

                  {showCodeList === index && ( 
                      <ul className="border mt-1 max-h-40 overflow-y-auto">
                        {productData.filter(article => article.Numéro_Article.toLowerCase().includes(line.demandeCode.toLowerCase())).map(article => (
                          <li
                            key={article.id_Article}
                            onClick={() => handleCodeSelect(article, index)} 
                            className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                          >
                            {article.Numéro_Article}
                          </li>
                        ))}
                      </ul>
                    )}
                  
                </td>
                {/* <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={line.demandeCode ? productData.find(demande =>
                      demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                    )?.Description_Article : ''}
                    className="w-full px-2 py-1 border-none"
                    disabled
                  />
                </td> */}
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
                {/* {checkAccess() && 
                <>        */}

                  {/* <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={line.nomProjet}
                      placeholder='Enter Projet Name'
                      onChange={(e) => handleChange(index, 'nomProjet', e.target.value)}
                      className="w-full px-2 py-1 border-none"
                      onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                  </td> */}

                    {/*
                    <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || ''}
                      className="w-full px-2 py-1 border-none"
                      disabled
                    /></td>
                    */}

                {/* </>} */}
      
                {/* <td className="border px-4 py-2">
                <input
                    type="text"
                    value={line.demandeCode ? productData.find(demande =>
                      demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                    )?.qte_Magasin : ''}
                    className="w-full px-2 py-1 border-none"
                    disabled
                  />
      
                </td> */}
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

        <button 
          onClick={toggleListe}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
          >
          {showFullListe ? 'Masquer la liste de demande' : 'Afficher la liste de demande'}
        </button>

        {!loading && !checkAccess() && showFullListe && <ListeDemandeUser />}
        {/* {!loading && !checkAccess() && <ListeDemandeUser />} */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Entree;
