
//code med

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchVenteData, postVenteData } from '../store/venteSlice';
import { fetchProductData, updateQteMagasin } from '../store/productSlice';
import { fetchAchatempoData } from '../store/achatempoSlice';
import Swal from 'sweetalert2';
import { postHistoriqueData } from '../store/historiqueSlice';
import { fetchClientData } from '../store/clientSlice';

const Sortie = () => {
  const [demandeCode, setDemandeCode] = useState('');
  const [projetCode, setProjetCode] = useState('');
  const [quantite, setQuantite] = useState('');
  const [n_Serie, setN_Serie] = useState('');
  const [demandeDetails, setDemandeDetails] = useState(null);
  const [projetDetails, setProjetDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null)
  const authState = useSelector(state => state.auth);
  const user = authState.user;
//=======================================================================================
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
//=======================================================================================
  console.log("from sortie user: ", user)
  const dispatch = useDispatch();

  const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
  const { productData, prjloading, prjerror } = useSelector((state) => state.product);
  const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
  const { venteData, venteLoading, venteError } = useSelector((state) => state.vente);
  const clientData = useSelector((state) => state.client.clientData);
  console.log("FSortie : clientData", clientData)

  useEffect(() => {
    dispatch(fetchDemandeData());
    dispatch(fetchProjetData());
    dispatch(fetchAchatempoData());
    dispatch(fetchVenteData());
    dispatch(fetchProductData());
    dispatch(fetchClientData()); 
  }, [dispatch]);

  useEffect(() => {
    if (demandeCode) {
      const selectedDemande = productData.find(demande => demande.Numéro_Article === demandeCode || demande.code_Barre === demandeCode);
      if (selectedDemande) {
        setDemandeDetails(selectedDemande);
      }
    }
  }, [demandeCode, productData]);

  useEffect(() => {
    const selectedClient = clientData.find(client => client.Partenaire == clientDetails)?.Partenaire || '';
    // if (clientDetails && clientDetails.length > 0) {
    console.log("clientDetails find", selectedClient)
    if (selectedClient) {
      setClientDetails(selectedClient);
    }
  }, [clientDetails]);
  // const selectedClient = clientData.find(client => client.Partenaire == clientDetails);
  // const selectedClient = clientData.map(client => client.Partenaire);
  // console.log("clientDetails find", selectedClient)
  // console.log("clientDetails ", clientData.find(client => client.Partenaire ==))
  console.log("clientDetails", clientDetails)
  
  
  useEffect(() => {
    if (projetCode) {
      const selectedProjet = projetData.find(projet => projet.code_Projet == projetCode);
      if (selectedProjet) {
        setProjetDetails(selectedProjet);
      }
    }
  }, [projetCode, projetData]);

  const handleDemandeCodeChange = (e) => {
    setDemandeCode(e.target.value);
  };

  const handleProjetCodeChange = (e) => {
    setProjetCode(e.target.value);
    const selectedProjet = projetData.find(projet => projet.code_Projet === e.target.value);
    if (selectedProjet) {
      setProjetDetails(selectedProjet);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let checkCodeProjet = "sans"; // Initialize with default value
    let checkNomProjet = "sans"; // Initialize with default value 
  
    if (projetDetails) {
      checkCodeProjet = projetDetails.code_Projet;
      checkNomProjet = projetDetails.nom_Projet;
    }

    // if (demandeDetails && projetDetails && quantite && n_Serie) {
    if (demandeDetails &&  quantite && n_Serie && clientDetails) {
      const achatPayload = {
        code_Produit: demandeDetails.Numéro_Article,
        designation_Produit: demandeDetails.Description_Article,
        qte_Produit: parseInt(quantite, 10),
        n_Serie: n_Serie,
        // code_Projet: projetDetails.code_Projet,
        // nom_Projet: projetDetails.nom_Projet,
        code_Projet: checkCodeProjet,
        nom_Projet: checkNomProjet,
        id_Article: demandeDetails.id_Article,
        user_Dmd: user.username,
        Partenaire: clientDetails
      };
      const historiqueData = {
        type_Op: "sortie",
        code_Produit: demandeDetails.Numéro_Article,
        designation_Produit: demandeDetails.Description_Article,
        qte_Produit: parseInt(quantite, 10),
        n_Serie: n_Serie,
        // n_Serie: parseInt(n_Serie, 10),
        code_Projet: checkCodeProjet,
        nom_Projet: checkNomProjet,
        user_Dmd: user.username,
        Partenaire: clientDetails
      };
      // console.log("==========>clientDetails:", clientDetails);
      console.log("==========>demandeDetails:", demandeDetails);
      const newQteMagasin = demandeDetails.qte_Magasin - parseInt(quantite, 10);
      await dispatch(updateQteMagasin({
        productId: demandeDetails.id_Article,
        qte_Magasin: newQteMagasin
      }));

      dispatch(postVenteData(achatPayload))
        .then(response => {
          console.log("Post Vente Data Response:", response);
          // Show success notification
          Swal.fire({
            title: 'Success',
            text: 'Sortie effectuée avec succès dans le stock',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // Reset the input fields and state variables here
          setDemandeCode('');
          setClientDetails('')
          setProjetCode('');
          setQuantite('');
          setN_Serie('');
          setDemandeDetails(null);
          setProjetDetails(null);
        })
        .catch(error => {
          console.error("Post Vente Data Error:", error);
        });


      dispatch(postHistoriqueData(historiqueData))
        .then(response => {
          console.log("Post Vente Data Response:", response);
        })
        .catch(error => {
          console.error("Post Vente Data Error:", error);
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Les détails de Demande ou Projet ou quantité ou n_Serie ou Client ne sont pas disponibles.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Demande or Projet details or quantite or n_Serie or Client are not available');
    }
  };
  console.log("FSortie : demandeDetails==>", demandeDetails)
  // console.log("under if checkCodeProjet", checkCodeProjet)
  // console.log("under if checkNomProjet", checkNomProjet)

  return (
    <div className="w-full flex justify-center items-center border">
      <div className="mb-4 flex">
        <div className="mr-2 ">
          <label className="block text-sm font-bold mb-2">Article Code:</label>
          <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
        </div>
        {demandeDetails && (
          <>
          
          <div className="mr-2 w-60">
            <label className="block text-sm font-bold mb-2">Designation Fournisseur</label>
            <input type="text" value={demandeDetails.Description_Article} className="w-full border rounded py-2 px-3" disabled />
          </div>
          <div className="mr-2">
            <label className="block text-sm font-bold mb-2">Designation fadesol</label>
            <input type="text" value={demandeDetails.Designation_Fadesol} className="w-full border rounded py-2 px-3" disabled />
          </div>
          <div className="mr-2">
            <label className="block text-sm font-bold mb-2">Quantite Actual</label>
            <input type="text" value={demandeDetails.qte_Magasin} className="w-full border rounded py-2 px-3" disabled />
          </div>
          </>
        )}
      </div>
      {checkAccess() && 
      <div className="mb-4 flex">
        <div className="mr-2">
          <label className="block text-sm font-bold mb-2">Projet Code:</label>
          <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
        </div>
      </div>
      }
      <div className="mb-4 mr-2 min-w-20 w-20">
        <label className="block text-sm font-bold mb-2">Quantite:</label>
        <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-2" />
      </div>
      {/* <div className="mb-4">
        <label className="block text-sm font-bold mb-2 w-20">Partenaire</label>
        <input type="text" value={clientDetails} placeholder='client' onChange={(e) => setClientDetails(e.target.value)} className="w-36 border rounded py-2 px-2" />
      </div> */}
      <td className="">
      <label className="block text-sm font-bold mb-2">Partenaire:</label>
        <select
          value={clientDetails}
          onChange={(e) => setClientDetails(e.target.value)}
          className="w-40 px-2 py-2 border-none mb-4 mx-1"
        >
          <option value="">Sélectionner un client</option>
          {clientData.map(client => (
            <option key={client.id} value={client.Partenaire}>
              {client.Partenaire}
            </option>
          ))}
        </select>
      </td>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 w-20">N° Serie:</label>
        <input type="text" value={n_Serie} placeholder='0' onChange={(e) => setN_Serie(e.target.value)} className="w-36 border rounded py-2 px-2" />
      </div>
      <div className="mb-4 ml-3">
        <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
      </div>
    </div>
  );
};

export default Sortie;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchVenteData, postVenteData } from '../store/venteSlice';
// import { fetchProductData, updateQteMagasin } from '../store/productSlice';
// import { fetchAchatempoData } from '../store/achatempoSlice';
// import Swal from 'sweetalert2';
// import { postHistoriqueData } from '../store/historiqueSlice';
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { Typography, IconButton } from '@mui/material';

// const Sortie = () => {
//   const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
//   const productData = useSelector((state) => state.product.productData);
//   const projetData = useSelector((state) => state.projet.projetData);
//   const authState = useSelector(state => state.auth);
//   const user = authState.user;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProductData());
//     dispatch(fetchProjetData());
//     dispatch(fetchAchatempoData());
//     dispatch(fetchVenteData());
//     dispatch(fetchDemandeData());
//   }, [dispatch]);

//   const handleAddLine = () => {
//     setLines([...lines, { demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
//   };

//   const handleChange = (index, key, value) => {
//     const newLines = [...lines];
//     newLines[index][key] = value;
//     setLines(newLines);
//   };

//   const handleSubmit = async () => {
//     try {
//       for (const line of lines) {
//         if (line.demandeCode && line.projetCode && line.quantite && line.n_Serie) {
//           const article = productData.find(demande => demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode);
//           const projet = projetData.find(projet => projet.code_Projet === line.projetCode);

//           if (!article || !projet) {
//             throw new Error('Invalid demandeCode or projetCode');
//           }

//           const ventePayload = {
//             code_Produit: article.Numéro_Article,
//             designation_Produit: article.Description_Article,
//             qte_Produit: parseInt(line.quantite, 10),
//             n_Serie: line.n_Serie,
//             code_Projet: projet.code_Projet,
//             nom_Projet: projet.nom_Projet,
//             id_Article: article.id_Article,
//             user_Dmd: user.username
//           };

//           const historiqueData = {
//             type_Op: "sortie",
//             code_Produit: article.Numéro_Article,
//             designation_Produit: article.Description_Article,
//             qte_Produit: parseInt(line.quantite, 10),
//             n_Serie: line.n_Serie,
//             code_Projet: projet.code_Projet,
//             nom_Projet: projet.nom_Projet,
//             user_Dmd: user.username
//           };

//           const newQteMagasin = article.qte_Magasin - parseInt(line.quantite, 10);
//           await dispatch(updateQteMagasin({
//             productId: article.id_Article,
//             qte_Magasin: newQteMagasin
//           }));

//           await dispatch(postVenteData(ventePayload));
//           await dispatch(postHistoriqueData(historiqueData));

//           Swal.fire({
//             title: 'Success',
//             text: 'Sortie effectuée avec succès dans le stock',
//             icon: 'success',
//             confirmButtonText: 'OK'
//           });
//         }
//       }

//       setLines([{ demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
//     } catch (error) {
//       console.error('Error submitting data:', error.message);
//     }
//   };

//   const handleKeyPress = (event, index) => {
//     if (event.key === 'Enter' && index === lines.length - 1) {
//       handleAddLine();
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
//       <Typography variant="h5" align="center" gutterBottom>Opération Magasinier - Sortie</Typography>
//       <table className="min-w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Numero Article ou Code Barre</th>
//             <th className="border px-4 py-2">Designation Fournisseur</th>
//             <th className="border px-4 py-2">Designation Fadesol</th>
//             <th className="border px-4 py-2">Projet</th>
//             <th className="border px-4 py-2">Quantité Magasin</th>
//             <th className="border px-4 py-2">Quantité</th>
//             <th className="border px-4 py-2">N° Serie</th>
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
//                   onKeyPress={(e) => handleKeyPress(e, index)}
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
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={line.demandeCode ? productData.find(demande =>
//                     demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
//                   )?.Designation_Fadesol : ''}
//                   className="w-full px-2 py-1 border-none"
//                   disabled
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <select
//                   value={line.projetCode}
//                   onChange={(e) => handleChange(index, 'projetCode', e.target.value)}
//                   className="w-full px-2 py-1 border-none"
//                 >
//                   <option value="" disabled>Select Projet</option>
//                   {projetData.map(projet => (
//                     <option key={projet.code_Projet} value={projet.code_Projet}>
//                       {projet.nom_Projet}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td className="border px-4 py-2">
//                 <input
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
//                 <input
//                   type="text"
//                   value={line.n_Serie}
//                   placeholder='Enter N° Serie'
//                   onChange={(e) => handleChange(index, 'n_Serie', e.target.value)}
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
//         <button onClick={handleSubmit} className="bg-customBlue hover:bg-customBlueDark text-white font-bold py-2 px-4 rounded">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default Sortie;















