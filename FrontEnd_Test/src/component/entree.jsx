
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData } from '../store/productSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatempoData, postAchatempoData } from '../store/achatempoSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Typography, IconButton } from '@mui/material';
import { postHistoriqueData } from '../store/historiqueSlice';
import Swal from 'sweetalert2';
import { fetchClientData } from '../store/clientSlice';

const Entree = () => {
  const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
  const productData = useSelector((state) => state.product.productData);
  const projetData = useSelector((state) => state.projet.projetData);
  const clientData = useSelector((state) => state.client.clientData);

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
        console.log("===achatpayload===>", achatPayload);
        // Dispatch postAchatempoData thunk with achatPayload
        const response = await dispatch(postAchatempoData(achatPayload));
        console.log("===Res===>", response);
        // Handle response/error
        if (response.error) {
          throw new Error(response.error.message);
        }
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
    </div>
  );
};

export default Entree;
