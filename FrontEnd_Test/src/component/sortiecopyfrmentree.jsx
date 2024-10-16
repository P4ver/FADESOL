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
import { fetchVenteData, postVenteData } from '../store/venteSlice';
import ListeSortXUser from './listeSortXUser';
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

const SortX = () => {
  const classes = useStyles();
  const [lines, setLines] = useState([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: '' }]);
  const productData = useSelector((state) => state.product.productData);
  const projetData = useSelector((state) => state.projet.projetData);
  const clientData = useSelector((state) => state.client.clientData);
  const historiqueData = useSelector(state => state.historique.historiqueData);
  const { venteData } = useSelector(state => state.vente);

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
  const [saveArray, setSaveArray] = useState([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: '' }]);
  //=========================================================================================

console.log("NomProjetInput",NomProjetInput)
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
    // dispatch(fetchVenteData());

    const fetchDataAndGenerateCode = async () => {
      await dispatch(fetchProductData());
      await dispatch(fetchProjetData());
      await dispatch(fetchAchatempoData());
      await dispatch(fetchClientData());
      await dispatch(fetchHistoriqueData());
      await dispatch(fetchVenteData());
  
      // await generateNextCodeAchat();
      if (!didRunRef.current) {
        await generateNextCodeAchat();
        didRunRef.current = true;
      }
    };

    fetchDataAndGenerateCode();
    // generateNextCodeAchat();
  }, [dispatch]);

  const generateNextCodeAchat = () => {
    // setCodeAchat(newCodeSortie);
    if (venteData && venteData.length > 0) {
      // const lastCodeSortie = venteData[venteData.length - 1].code_Sortie;
      const lastCodeSortie = venteData[venteData.length - 1].code_Sortie || localStorage.getItem('lastCodeSortie');
      const lastCodeSortieINT = parseInt(lastCodeSortie.split('-')[1], 10) + 1;
      const newCodeSortie = `CS-${String(lastCodeSortieINT).padStart(6, '0')}`;
      console.log("codeSortieINT code sortie:", newCodeSortie);
      setCodeAchat(newCodeSortie);
      localStorage.setItem('lastCodeSortie', newCodeSortie);
    } else {
      console.log("venteData is empty or undefined.");
      // Handle cases where venteData is empty, e.g., set a default value
      // setCodeAchat("CS-000001");
    }
  };

  // const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
  // const handleAddLine = () => {
  //   console.log("addline+")
  //   console.log("addline lines",lines)
  //   for (const line of lines) {
  //     const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
  //     const qte_Magasin = article?.qte_Magasin || '';
  //     console.log("addline article", article)
  //     console.log("addline qte_Magasin",qte_Magasin)
  //     console.log("addline qte",line.quantite)
  //     if (line.quantite > qte_Magasin) {
  //       toast.error(`La quantité demandée pour l'article ${article.Numéro_Article} est supérieure à la quantité en stock!`);
  //       return;
  //     }
  //   }
  //   setLines([...lines, { demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: ''}]);
  // };
  const handleAddLine = () => {
    // Check if any line has a quantity in stock less than 3
    const hasLowStock = lines.some(line => {
      const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
      const qte_Magasin = article?.qte_Magasin || '';
      console.log("addline article", article);
      console.log("addline lines", lines);
      console.log("addline qte_Magasin", qte_Magasin);
      console.log("addline qte", line.quantite);
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
      if (line.quantite > qte_Magasin) {
        Swal.fire({
          title: 'Error',
          text: `La quantité demandée pour l'article ${article.Numéro_Article} est supérieure à la quantité en stock!`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // toast.error(`La quantité demandée pour l'article ${article.Numéro_Article} est supérieure à la quantité en stock!`);
        return true;
      }

      return false;
    });
  
    // If any line has an issue, stop the function
    if (hasLowStock) return;
  
    // Proceed to add a new line if no issues
    setLines([...lines, { demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: '' }]);
  };
  
  // console.log("saveArray",saveArray)
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
// console.log("sortie : selectedClient",selectedClient)
  const lastClickTimeRef = useRef(0);


  const handleSubmit = async () => {
  try {

    const now = Date.now();
    if (now - lastClickTimeRef.current < 3000) return; // Ignore clicks within 1 second

    lastClickTimeRef.current = now;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
        
    // Check if any line is missing required fields
    // const hasMissingFields = lines.some(line => 
    //   !line.demandeCode || !line.partenaire || !line.note || !line.quantite
    // );

    // if (hasMissingFields) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Tous les champs doivent être remplis pour chaque ligne.',
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   });
    //   return; // Exit the function if any line is missing required fields
    // }
    // if (!selectedClient){
    //   Swal.fire({
    //     title: 'Error',
    //     text: `le client doit être rempli`,
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   }); 
    //   // toast.error(`le client doit être rempli`);
    // }
    // if (!NomProjetInput){
    //   toast.error(`le nom projet doit être rempli`);
    // }
    // ================================================================
    const hasError = lines.some(line => {
      const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
      const qte_Magasin = article?.qte_Magasin || '';
      console.log("hasError lines",lines)
      console.log("hasError lines.lenght", lines.length)
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


      // Check if quantity is greater than available stock
      if (line.quantite > qte_Magasin) {
        Swal.fire({
          title: 'Error',
          text: `La quantité demandée pour l'article ${article?.Numéro_Article} est supérieure à la quantité en stock!`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        // toast.error(`La quantité demandée pour l'article ${article?.Numéro_Article} est supérieure à la quantité en stock!`);
        return true; // If condition fails, stop further checks
      }
      
      console.log("submit lines", lines);
      console.log("submit article", article);
      
      return false; // Otherwise, continue checking other lines
    });
    
    // If any line failed, stop the process
    if (hasError) {
      console.log("One or more lines have invalid quantities, halting process.");
      return; // Stop further execution if there's an error
    }
    
    // Proceed with the next steps if no error occurred
    console.log("All lines passed the check, proceeding...");
    //==========================================================================================================================
    for (const line of lines) {   
      // if (line.demandeCode && line.projetCode && line.quantite && line.partenaire) {
      // if (line.demandeCode && line.quantite && selectedClient && line.note) {
      if (line.demandeCode && line.quantite && selectedClient && NomProjetInput) {
        const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
        console.log("===>article: ",article)   
        console.log("inside of lines", lines)
        // console.log("qte_Magasin", qte_Magasin)
        const designation = article?.Description_Article || '';
        const id_Article = article?.id_Article || null;
        const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
        const qte_Magasin = article?.qte_Magasin || '';
        const Partenaire = clientData.find(client=>client.Partenaire == line.partenaire)?.Partenaire || '';
        // const Partenaire = clientData.map(client=>client.Partenaire)
        const note = line.note || '';
        let checkCodeProjet = "sans"; // Initialize with default value
        let checkNomProjet = "sans"; // Initialize with default value 
        if (NomProjetInput) {
          // checkCodeProjet = line.projetCode;
          checkNomProjet = NomProjetInput;
        }

        if (qte_Magasin <= 0 ) {
          Swal.fire({
            title: 'Error',
            text: `La quantité Magasin de ${line.demandeCode} n\'est pas disponible.`,
            icon: 'error',
            confirmButtonText: 'OK'
          }); 
          throw new Error(`Article with code ${line.demandeCode} has no stock`);
        } 


        if (id_Article === null) {
          throw new Error(`Article with code ${line.demandeCode} not found`);
        }
        const code_Prd = productData.find(item => item.id_Article === id_Article)?.Numéro_Article || '';
        const GroupeArticle = productData.find(item => item.id_Article === id_Article)?.Groupe_Articles || '';
        const ventePayload = {
          code_Produit: line.demandeCode,
          designation_Produit: designation,
          qte_Produit: parseInt(line.quantite, 10),
          code_Projet: checkCodeProjet,
          nom_Projet: checkNomProjet,
          n_Serie:"trt test",
          code_Sortie: codeAchat,
          user_Dmd: user.username,
          id_Article: id_Article,
          Partenaire: selectedClient,
          note: "Without Onduleur Name",
          Groupe_Articles: GroupeArticle
        };
        console.log("ventePayload",ventePayload)
        if (parseInt(line.quantite, 10) > qte_Magasin ) {
          Swal.fire({
            title: 'Error',
            text: `la quantité de ${line.demandeCode}  que vous voulez n\'est pas disponible.`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          throw new Error(`Article with code ${line.demandeCode} has no stock`);
        }

        console.log("qte=========>", parseInt(line.quantite, 10) + qte_Magasin)
        const historiqueData = {
          type_Op:"Sortie=>",
          code_Produit: code_Prd,
          designation_Produit: designation,
          code_Projet: checkCodeProjet,
          nom_Projet: checkNomProjet,
          n_Serie : "======",
          user_Dmd: user.username,
          qte_Produit: parseInt(line.quantite, 10),
          id_Article: id_Article,
          Partenaire: Partenaire,
        }

    const quantityReceived = qte_Magasin - parseInt(line.quantite, 10);
    //============================================================
    // if (typeUser === "Utilisateur"){
      await dispatch(updateQteMagasin({
        productId: id_Article,
        qte_Magasin: quantityReceived
      }));

    // }
    const response = await dispatch(postVenteData(ventePayload))
    //============================================================
        // Handle response/error
        if (response.error) {
          throw new Error(response.error.message);
        }
        await dispatch(postHistoriqueData(historiqueData))
        .then(response => {
          console.log("Post historique Data Response:", response);
          toast.success('Sortie effectuée avec succès')
        })
        .catch(error => {
          console.error("Post historique Data Error:", error);
        });
      }
      else if (lines.length == 1) {
        // Swal.fire({
        //   title: 'Error',
        //   text: 'tous les cases doit être rempli.',
        //   icon: 'error',
        //   confirmButtonText: 'OK'
        // });
        // console.error('Demande or Projet details or quantite or Nom de Projet or Client are not available');
        return;
      }
      // else {
      //   Swal.fire({
      //     title: 'Error',
      //     text: 'tous les cases doit être rempli.',
      //     icon: 'error',
      //     confirmButtonText: 'OK'
      //   });
      //   console.error('Demande or Projet details or quantite or Nom de Projet or Client are not available');
      //   return;
      // }
    }

    // Reset lines after successful submission
    setInputValue('')
    setNomProjetInput('')
    setLines([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: ''}]);

    // window.location.reload();
  } catch (error) {
    console.error('Error submitting data:', error.message);
  }
};

console.log("lines====>", lines)

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
    console.log("client**", client.Partenaire)
    setSelectedClient(client.Partenaire);
    setInputValue(client.Partenaire);
    setShowList(false); // Hide the list after selecting a client
    if (client.Partenaire && lines.some(line => line.partenaire !== client.Partenaire)) {
      setLines(lines.map(line => ({ ...line, partenaire: client.Partenaire })));
    }
  };
  // console.log('@@select client@@',selectedClient)

  const [showFullListe, setShowFullListe] = useState(false);

  const toggleListe = () => {
    setShowFullListe(!showFullListe);
  };
  const handleNomProjetInput = (value) => {
    setNomProjetInput(value);  
  };
  // =========================================================
  const handleCodeSelect = (article, index) => {
    const updatedLines = [...lines];
    updatedLines[index].demandeCode = article.Numéro_Article;
    setLines(updatedLines);
    setShowCodeList(null);  
  };
  // =========================================================
  // const handleOnduleurInput = (value) => {
  //   setOnduleurInput(value);  
  // };
  // =========================================================
  return (
    <div className="max-w-[75%] mx-auto p-4 bg-white rounded-lg shadow-md">
      {!checkAccess() && 
        <Link to="/dashboard" className=" w-16 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 text-xl rounded-lg shadow-2xl">
          Back
        </Link>
      }
        <Typography variant="h5" align="center" gutterBottom>Sortie</Typography>
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
      {/* Onduleur */}
      {/* <div className='border px-4 py-2 my-4'>
        <label className='pr-2 font-bold'>Onduleur <span className='ml-5'>: </span></label>
          <input
            type="text"
            value={OnduleurInput}
            onChange={(e) => handleOnduleurInput(e.target.value)}
            placeholder="Nom de Projet"
            className='outline-none w-[50%]'
          />
      </div> */}
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
            {/* <th className="border px-4 py-2">Onduleur</th> */}
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
                  placeholder='Enter Numero article ou Code Barre'
                  onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
                  onFocus={() => handleFocus(index)}
                  className="w-full px-2 py-1 border-none"
                  // onKeyPress={(e) => handleKeyPress(e, index)}
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
              <>       
                  <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={line.nomProjet}
                    placeholder='Enter Projet Nom'
                    onChange={(e) => handleChange(index, 'nomProjet', e.target.value)}
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
              </>} */}
       
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
              {/* <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.note || ''} // Bind the note value
                  placeholder='Enter Note'
                  onChange={(e) => handleChange(index, 'note', e.target.value)} // Handle note change
                  className="w-full px-2 py-1 border-none"
                />
              </td> */}
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

      {/* <div className='border px-4 py-2 my-4'>
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
            {filteredClients
            .map(client => (
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
      </div> */}


      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
      </div>

      <button
        onClick={toggleListe}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
      >
        {showFullListe ? 'Masquer la liste de Sortie' : 'Afficher la liste de Sortie'}
      </button>

      {!loading && !checkAccess() && showFullListe && <ListeSortXUser />}
      <ToastContainer />
    </div>
  );
};

export default SortX;


//====================================================================

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
// import { fetchVenteData, postVenteData } from '../store/venteSlice';
// import ListeSortXUser from './listeSortXUser';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRef } from 'react';
// import { Link } from 'react-router-dom';


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

// const SortX = () => {
//   const classes = useStyles();
//   const [lines, setLines] = useState([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: '' }]);
//   const productData = useSelector((state) => state.product.productData);
//   const projetData = useSelector((state) => state.projet.projetData);
//   const clientData = useSelector((state) => state.client.clientData);
//   const historiqueData = useSelector(state => state.historique.historiqueData);
//   const { venteData } = useSelector(state => state.vente);

//   const [filteredData, setFilteredData] = useState([]);

//   const [codeAchat, setCodeAchat] = useState('');
//   const [loading, setLoading] = useState(true);

//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   //=========================================================================================
//   const [userAth, setUser] = useState(null);
//   const [typeUser, setTypeUser] = useState(null);
//   const userState = useSelector(state => state.user);

//   //===============================Client====================================================
//   const [selectedClient, setSelectedClient] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [showList, setShowList] = useState(false);
//   //===============================Nom de Projet=============================================
//   const [NomProjetInput, setNomProjetInput] = useState('');
//     //================================Numero Articl (search)================================================
//     const [inputCodeValue, setInputCodeValue] = useState('');
//     const [filteredCodes, setFilteredCodes] = useState([]);
//     const [showCodeList, setShowCodeList] = useState(false);
//   //=========================================================================================

// console.log("NomProjetInput",NomProjetInput)
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
// const didRunRef = useRef(false);
//   useEffect(() => {
//     // dispatch(fetchProductData());
//     // dispatch(fetchProjetData());
//     // dispatch(fetchAchatempoData());
//     // dispatch(fetchClientData());
//     // dispatch(fetchHistoriqueData()); 
//     // dispatch(fetchVenteData());

//     const fetchDataAndGenerateCode = async () => {
//       await dispatch(fetchProductData());
//       await dispatch(fetchProjetData());
//       await dispatch(fetchAchatempoData());
//       await dispatch(fetchClientData());
//       await dispatch(fetchHistoriqueData());
//       await dispatch(fetchVenteData());
  
//       // await generateNextCodeAchat();
//       if (!didRunRef.current) {
//         await generateNextCodeAchat();
//         didRunRef.current = true;
//       }
//     };

//     fetchDataAndGenerateCode();
//     // generateNextCodeAchat();
//   }, [dispatch]);

//   const generateNextCodeAchat = () => {
//     // setCodeAchat(newCodeSortie);
//     if (venteData && venteData.length > 0) {
//       // const lastCodeSortie = venteData[venteData.length - 1].code_Sortie;
//       const lastCodeSortie = venteData[venteData.length - 1].code_Sortie || localStorage.getItem('lastCodeSortie');
//       const lastCodeSortieINT = parseInt(lastCodeSortie.split('-')[1], 10) + 1;
//       const newCodeSortie = `CS-${String(lastCodeSortieINT).padStart(6, '0')}`;
//       console.log("codeSortieINT code sortie:", newCodeSortie);
//       setCodeAchat(newCodeSortie);
//       localStorage.setItem('lastCodeSortie', newCodeSortie);
//     } else {
//       console.log("venteData is empty or undefined.");
//       // Handle cases where venteData is empty, e.g., set a default value
//       // setCodeAchat("CS-000001");
//     }
//   };

//   // const historiqueForUser = historiqueData.filter(historic => historic.user_Dmd === user.username)
//   const handleAddLine = () => {
//     setLines([...lines, { demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: ''}]);
//   };
//   const handleFocus = (index) => {
//     setShowCodeList(index);  // Show the dropdown for the focused row
//   };
//   const handleChange = (index, key, value) => {
//     const newLines = [...lines];
//     newLines[index][key] = value;
//     setLines(newLines);

//     if (key === 'demandeCode' && value.length > 0) {
//       setShowCodeList(index);  // Show list only if there's input
//     } else {
//       setShowCodeList(null);  // Hide list if input is empty
//     }
//   };
// // console.log("sortie : selectedClient",selectedClient)
//   const lastClickTimeRef = useRef(0);

//   const handleSubmit = async () => {
//   try {

//     const now = Date.now();
//     if (now - lastClickTimeRef.current < 2000) return; // Ignore clicks within 1 second

//     lastClickTimeRef.current = now;

//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd part
        
//     // Check if any line is missing required fields
//     // const hasMissingFields = lines.some(line => 
//     //   !line.demandeCode || !line.partenaire || !line.note || !line.quantite
//     // );

//     // if (hasMissingFields) {
//     //   Swal.fire({
//     //     title: 'Error',
//     //     text: 'Tous les champs doivent être remplis pour chaque ligne.',
//     //     icon: 'error',
//     //     confirmButtonText: 'OK'
//     //   });
//     //   return; // Exit the function if any line is missing required fields
//     // }

//     for (const line of lines) {
//         // Check for empty fields
//         // if (!line.demandeCode || !line.partenaire || !line.note || !line.quantite) {
//         //   Swal.fire({
//         //     title: 'Error',
//         //     text: 'Tous les champs doivent être remplis.',
//         //     icon: 'error',
//         //     confirmButtonText: 'OK'
//         //   });
//         //   return; // Exit the function if any required field is emptye
//         // }
      
//       // if (line.demandeCode && line.projetCode && line.quantite && line.partenaire) {
//       // if (line.demandeCode && line.quantite && selectedClient && line.note) {
//       if (line.demandeCode && line.quantite && selectedClient && NomProjetInput) {
//         const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
//         console.log("===>article: ",article)
//         const designation = article?.Description_Article || '';
//         const id_Article = article?.id_Article || null;
//         const nom_Projet = projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '';
//         const qte_Magasin = article?.qte_Magasin || '';
//         const Partenaire = clientData.find(client=>client.Partenaire == line.partenaire)?.Partenaire || '';
//         // const Partenaire = clientData.map(client=>client.Partenaire)
//         const note = line.note || '';
//         let checkCodeProjet = "sans"; // Initialize with default value
//         let checkNomProjet = "sans"; // Initialize with default value 
//         if (NomProjetInput) {
//           // checkCodeProjet = line.projetCode;
//           checkNomProjet = NomProjetInput;
//         }

//         if (qte_Magasin <= 0 ) {
//           Swal.fire({
//             title: 'Error',
//             text: 'La quantité Magasin n\'est pas disponible.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//           throw new Error(`Article with code ${line.demandeCode} has no stock`);
//         }


//         if (id_Article === null) {
//           throw new Error(`Article with code ${line.demandeCode} not found`);
//         }
//         const code_Prd = productData.find(item => item.id_Article === id_Article)?.Numéro_Article || '';
//         const GroupeArticle = productData.find(item => item.id_Article === id_Article)?.Groupe_Articles || '';
//         const ventePayload = {
//           code_Produit: line.demandeCode,
//           designation_Produit: designation,
//           qte_Produit: parseInt(line.quantite, 10),
//           code_Projet: checkCodeProjet,
//           nom_Projet: checkNomProjet,
//           n_Serie:"trt test",
//           code_Sortie: codeAchat,
//           user_Dmd: user.username,
//           id_Article: id_Article,
//           Partenaire: selectedClient,
//           note: "Without Onduleur Name",
//           Groupe_Articles: GroupeArticle
//         };
//         console.log("ventePayload",ventePayload)
//         if (parseInt(line.quantite, 10) > qte_Magasin ) {
//           Swal.fire({
//             title: 'Error',
//             text: 'la quantité que vous voulez n\'est pas disponible.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//           });
//           throw new Error(`Article with code ${line.demandeCode} has no stock`);
//         }

//         console.log("qte=========>", parseInt(line.quantite, 10) + qte_Magasin)
//         const historiqueData = {
//           type_Op:"Sortie=>",
//           code_Produit: code_Prd,
//           designation_Produit: designation,
//           code_Projet: checkCodeProjet,
//           nom_Projet: checkNomProjet,
//           n_Serie : "======",
//           user_Dmd: user.username,
//           qte_Produit: parseInt(line.quantite, 10),
//           id_Article: id_Article,
//           Partenaire: Partenaire,
//         }

//     const quantityReceived = qte_Magasin - parseInt(line.quantite, 10);
//     //============================================================
//     // if (typeUser === "Utilisateur"){
//       await dispatch(updateQteMagasin({
//         productId: id_Article,
//         qte_Magasin: quantityReceived
//       }));

//     // }
//     const response = await dispatch(postVenteData(ventePayload))
//     //============================================================
//         // Handle response/error
//         if (response.error) {
//           throw new Error(response.error.message);
//         }
//         await dispatch(postHistoriqueData(historiqueData))
//         .then(response => {
//           console.log("Post historique Data Response:", response);
//           toast.success('Sortie effectuée avec succès')
//         })
//         .catch(error => {
//           console.error("Post historique Data Error:", error);
//         });
//       }else {//<<<<===========
//         Swal.fire({
//           title: 'Error',
//           text: 'Les détails de Demande ou Projet ou quantité ou Nom de Projet ou Client ne sont pas disponibles.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//         console.error('Demande or Projet details or quantite or Nom de Projet or Client are not available');
//         return;
//       }
//     }

//     // Reset lines after successful submission
//     setInputValue('')
//     setNomProjetInput('')
//     setLines([{ demandeCode: '', nomProjet: '', quantite: '', partenaire: '', note: ''}]);

//     // window.location.reload();
//   } catch (error) {
//     console.error('Error submitting data:', error.message);
//   }
// };

// // console.log("===============>lines====>", lines)

//   const handleKeyPress = (event, index) => {
//     if (event.key === 'Enter' && index === lines.length - 1) {
//       handleAddLine();
//     }
//   };


//   const handleClientChange = (value) => {
//     setInputValue(value);
//     if (value) {
//       const filtered = clientData.filter(client =>
//         client.Partenaire.toLowerCase().includes(value.toLowerCase())
//       );
//       // console.log("filtered",filtered)
//       setFilteredClients(filtered);
//       setShowList(true); // Show the list when typing
//     } else {
//       setFilteredClients([]);
//       setShowList(false); // Hide the list if input is empty
//     }
//   };

//   const handleClientSelect = (client) => {
//     console.log("client**", client.Partenaire)
//     setSelectedClient(client.Partenaire);
//     setInputValue(client.Partenaire);
//     setShowList(false); // Hide the list after selecting a client
//     if (client.Partenaire && lines.some(line => line.partenaire !== client.Partenaire)) {
//       setLines(lines.map(line => ({ ...line, partenaire: client.Partenaire })));
//     }
//   };
//   // console.log('@@select client@@',selectedClient)

//   const [showFullListe, setShowFullListe] = useState(false);

//   const toggleListe = () => {
//     setShowFullListe(!showFullListe);
//   };
//   const handleNomProjetInput = (value) => {
//     setNomProjetInput(value);  
//   };
//   // =========================================================
//   const handleCodeSelect = (article, index) => {
//     const updatedLines = [...lines];
//     updatedLines[index].demandeCode = article.Numéro_Article;
//     setLines(updatedLines);
//     setShowCodeList(null);  
//   };
//   // =========================================================
//   // const handleOnduleurInput = (value) => {
//   //   setOnduleurInput(value);  
//   // };
//   // =========================================================
//   return (
//     <div className="max-w-[75%] mx-auto p-4 bg-white rounded-lg shadow-md">
//       {!checkAccess() && 
//         <Link to="/dashboard" className=" w-16 flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 text-xl rounded-lg shadow-2xl">
//           Back
//         </Link>
//       }
//         <Typography variant="h5" align="center" gutterBottom>Sortie</Typography>
//         {/* current date and time */}
//         <div className="px-4 py-2 my-4">
//           <label className='pr-2 font-bold'>Date <span className='ml-20'>: </span></label>
//           <span>
//             {new Date().toLocaleDateString('en-GB')} {/* dd/mm/yyyy format */}
//             {' '}
//             {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* hh:mm format */}
//           </span>
//         </div>

//       {/* Client */}
//         <div className='px-4 py-2 my-4'>
//         <label className='pr-2 font-bold'>Client<span className='ml-20'>: </span></label>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => handleClientChange(e.target.value)}
//           placeholder="Select or type client"
//           className='outline-none w-[50%]'
//         />

//         {showList && (
//           <ul className="border mt-1 max-h-40 overflow-y-auto">
//             {filteredClients.map(client => (
//               <li
//                 key={client.id}
//                 onClick={() => handleClientSelect(client)}
//                 className="cursor-pointer px-2 py-1 hover:bg-gray-200"
//               >
//                 {client.Partenaire}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {/* nom de projet */}
//       <div className='px-4 py-2 my-4'>
//         <label className='pr-2 font-bold'>Nom de Projet <span className='ml-5'>: </span></label>
//           <input
//             type="text"
//             value={NomProjetInput}
//             onChange={(e) => handleNomProjetInput(e.target.value)}
//             placeholder="Nom de Projet"
//             className='outline-none w-[50%]'
//           />
//       </div>
//       {/* Onduleur */}
//       {/* <div className='border px-4 py-2 my-4'>
//         <label className='pr-2 font-bold'>Onduleur <span className='ml-5'>: </span></label>
//           <input
//             type="text"
//             value={OnduleurInput}
//             onChange={(e) => handleOnduleurInput(e.target.value)}
//             placeholder="Nom de Projet"
//             className='outline-none w-[50%]'
//           />
//       </div> */}
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2 w-56">Code</th>
//             {/* <th className="border px-4 py-2">Designation Fournisseur</th> */}
//             <th className="border px-4 py-2">Designation</th>
//             {/* {checkAccess() && <> */}
//               {/* <th className="border px-4 py-2">Nom de Projet</th> */}
//               {/* <th className="border px-4 py-2">Projet Nom</th> */}
//             {/* </>} */}
//             {/* <th className="border px-4 py-2">Client</th> */}
//             {/* <th className="border px-4 py-2 w-40">Quantité Magasin</th> */}
//             <th className="border px-4 py-2 w-32">Quantité</th>
//             {/* <th className="border px-4 py-2">Onduleur</th> */}
//             <th className="border px-4 py-2 w-20">Action</th>
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
//                   onFocus={() => handleFocus(index)}
//                   className="w-full px-2 py-1 border-none"
//                   // onKeyPress={(e) => handleKeyPress(e, index)}
//                 />

//                 {showCodeList === index && ( 
//                   <ul className="border mt-1 max-h-40 overflow-y-auto">
//                     {productData.filter(article => article.Numéro_Article.toLowerCase().includes(line.demandeCode.toLowerCase())).map(article => (
//                       <li
//                         key={article.id_Article}
//                         onClick={() => handleCodeSelect(article, index)} 
//                         className="cursor-pointer px-2 py-1 hover:bg-gray-200"
//                       >
//                         {article.Numéro_Article}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//               </td>
//               {/* <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.Description_Article : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
//               </td> */}
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

//               {/* {checkAccess() && 
//               <>       
//                   <td className="border px-4 py-2">
//                   <input
//                     type="text"
//                     value={line.nomProjet}
//                     placeholder='Enter Projet Nom'
//                     onChange={(e) => handleChange(index, 'nomProjet', e.target.value)}
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
//               </>} */}
       
//               {/* <td className="border px-4 py-2">
//               <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.qte_Magasin : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
     
//               </td> */}
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
//               {/* <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={line.note || ''} // Bind the note value
//                   placeholder='Enter Note'
//                   onChange={(e) => handleChange(index, 'note', e.target.value)} // Handle note change
//                   className="w-full px-2 py-1 border-none"
//                 />
//               </td> */}
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

//       {/* <div className='border px-4 py-2 my-4'>
//         <label className='pr-2 font-bold'>Client :</label>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => handleClientChange(e.target.value)}
//           placeholder="Select or type client"
//           className='outline-none w-[50%]'
//         />

//         {showList && (
//           <ul className="border mt-1 max-h-40 overflow-y-auto">
//             {filteredClients
//             .map(client => (
//               <li
//                 key={client.id}
//                 onClick={() => handleClientSelect(client)}
//                 className="cursor-pointer px-2 py-1 hover:bg-gray-200"
//               >
//                 {client.Partenaire}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div> */}


//       <div className="text-center mt-4">
//         <button onClick={handleSubmit} className="bg-customGreen text-white hover:bg-green-600 px-4 py-2 rounded-md">Create</button>
//       </div>

//       <button
//         onClick={toggleListe}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
//       >
//         {showFullListe ? 'Masquer la liste de Sortie' : 'Afficher la liste de Sortie'}
//       </button>

//       {!loading && !checkAccess() && showFullListe && <ListeSortXUser />}
//       <ToastContainer />
//     </div>
//   );
// };

// export default SortX;
