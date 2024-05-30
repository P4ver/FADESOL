// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';

// const Entree = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
//     const [quantite, setQuantite] = useState('');
//     const [demandeDetails, setDemandeDetails] = useState(null);
//     const [projetDetails, setProjetDetails] = useState(null);

//     const dispatch = useDispatch();

//     const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
//     const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
//     const { achatData, loading, error } = useSelector((state) => state.achat);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         if (demandeCode) {
//             const selectedDemande = demandeData.find(demande => demande.code === demandeCode);
//             if (selectedDemande) {
//                 setDemandeDetails(selectedDemande);
//             }
//         }
//     }, [demandeCode, demandeData]);

//     useEffect(() => {
//         if (projetCode) {
//             const selectedProjet = projetData.find(projet => projet.code_Projet === projetCode);
//             if (selectedProjet) {
//                 setProjetDetails(selectedProjet);
//             }
//         }
//     }, [projetCode, projetData]);

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (demandeDetails && projetDetails && quantite) {
//             const achatPayload = {
//                 code: demandeDetails.code,
//                 designation: demandeDetails.designation,
//                 quantite: parseInt(quantite, 10),
//                 qte_En_Stock: demandeDetails.quantité,
//                 code_Projet: projetDetails.code_Projet,
//                 nom_Projet: projetDetails.nom_Projet,
//                 date: projetDetails.date,
//             };
//             dispatch(postAchatData(achatPayload));
//         } else {
//             console.error('Demande or Projet details or quantite are not available');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <div className="max-w-md mx-auto">
//                 <div className="mb-4 flex">
//                     <div className="mr-2">
//                         <label className="block text-sm font-bold mb-2">Demande Code:</label>
//                         <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {demandeDetails && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Designation:</label>
//                             <input type="text" value={demandeDetails.designation} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     {demandeDetails && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Quantite:</label>
//                             <input type="text" value={demandeDetails.quantité} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2">Quantite:</label>
//                     <input type="number" value={quantite} onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-3" />
//                 </div>
//                 <div className="mb-4 flex">
//                     <div className="mr-2">
//                         <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                         <input type="text" value={projetCode} onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {projetDetails && (
//                         <div>
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Achat</button>
//                 </div>
//             </div>

//             <div className="mt-8">
//                 <h2 className="font-bold text-lg mb-4">Achat Form</h2>
//                 <table className="w-full table-auto">
//                     <thead>
//                         <tr>
//                             <th className="px-4 py-2">Code</th>
//                             <th className="px-4 py-2">Designation</th>
//                             <th className="px-4 py-2">Quantite En Stock</th>
//                             <th className="px-4 py-2">Quantite</th>
//                             <th className="px-4 py-2">Code Projet</th>
//                             <th className="px-4 py-2">Nom Projet</th>
//                             <th className="px-4 py-2">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {achatData.map((achat) => (
//                             <tr key={achat.id_Achat}>
//                                 <td className="border px-4 py-2">{achat.code}</td>
//                                 <td className="border px-4 py-2">{achat.designation}</td>
//                                 <td className="border px-4 py-2">{achat.qte_En_Stock}</td>
//                                 <td className="border px-4 py-2">{achat.quantite}</td>
//                                 <td className="border px-4 py-2">{achat.code_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.nom_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.date}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Entree;
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// // import { fetchAchatData, postAchatData } from '../store/achatSlice';
// import { fetchAchatData, postAchatData , updateAchatData } from '../store/achatSlice';

// import { deleteAchatData, deleteAchatItem } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import { FaDeleteLeft } from "react-icons/fa6";
// import Switch from "@mui/material/Switch";


// const Entree = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
//     const [quantite, setQuantite] = useState('');
//     const [demandeDetails, setDemandeDetails] = useState(null);
//     const [projetDetails, setProjetDetails] = useState(null);
//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
//     const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
//     const { achatData, loading, error } = useSelector((state) => state.achat);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         if (demandeCode) {
//             const selectedDemande = demandeData.find(demande => demande.code === demandeCode);
//             if (selectedDemande) {
//                 setDemandeDetails(selectedDemande);
//             }
//         }
//     }, [demandeCode, demandeData]);

//     useEffect(() => {
//         if (projetCode) {
//             const selectedProjet = projetData.find(projet => projet.code_Projet === projetCode);
//             if (selectedProjet) {
//                 setProjetDetails(selectedProjet);
//             }
//         }
//     }, [projetCode, projetData]);

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//         const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
//         if (selectedProjet) {
//             setProjetDetails(selectedProjet);
//         }
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (demandeDetails && projetDetails && quantite) {
//             const achatPayload = {
//                 code: demandeDetails.code,
//                 designation: demandeDetails.designation,
//                 quantite: parseInt(quantite, 10),
//                 qte_En_Stock: demandeDetails.quantité,
//                 code_Projet: projetDetails.code_Projet,
//                 nom_Projet: projetDetails.nom_Projet,
//                 date: projetDetails.date,
//                 check_Delivery: checkDelivery, // Added check_Delivery to the payload
//             };
//             dispatch(postAchatData(achatPayload));
//         } else {
//             console.error('Demande or Projet details or quantite are not available');
//         }
//     };
    
//     const handleDelete = (id_Achat) => {
//         dispatch(deleteAchatData(id_Achat));
//     };
//     const handleCheckDeliveryChange = (e) => { // Added handler for checkbox change
//         setCheckDelivery(e.target.checked);
//     };

//     const toggleStatus = async (id_Achat, status) => {
//         try {
//           const updatedAchat = achatData.find(item => item.id_Achat === id_Achat);
//           if (updatedAchat) {
//             const updatedStatus = status === 'Active' ? 'inActive' : 'Active';
//             const updatedAchatData = { ...updatedAchat, status: updatedStatus };
//             await dispatch(updateAchatData({ id_Achat: id_Achat, updateAchatData: updatedAchatData }));
//             // toast.success('User status updated successfully');
//           }
//         } catch (error) {
//           console.error('Error toggling user status:', error);
//         //   toast.error('Failed to toggle user status. Please try again.');
//         }
//       };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             {/* <div className="bg-purple-600 text-white p-2 mb-4">
//                 <h2 className="text-xl font-bold">ENTREE</h2>
//                 <div className="flex justify-between bg-red-200 text-red-600 p-2 mt-2">
//                 <span>Expression BESOIN / DDE ACHAT</span>
//                 </div>
//             </div> */}
//             <div className="max-w-md mx-auto flex justify-center  items-center">
//                 <div className="mb-4 flex">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">Demande Code:</label>
//                         <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {demandeDetails && (
//                         <div className="mr-2 ">
//                             <label className="block text-sm font-bold mb-2">Designation:</label>
//                             <input type="text" value={demandeDetails.designation} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     {demandeDetails && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Quantite:</label>
//                             <input type="text" value={demandeDetails.quantité} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4 flex">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                         <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {projetDetails && (
//                         <div>
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
//                     <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-3" />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2">Delivery:</label>
//                     <input
//                         type="checkbox"
//                         checked={checkDelivery}
//                         onChange={handleCheckDeliveryChange}
//                     />
//                 </div>
//                 <div className="mb-4 ml-10 ">
//                     <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create </button>
//                 </div>
//             </div>

//             <div className="mt-8">
//                 <table className="min-w-full table-auto bg-white border border-gray-200">
//                     <thead>
//                         <tr className='bg-green-600 text-white'>
//                             <th className="px-4 py-2">Code</th>
//                             <th className="px-4 py-2">Designation</th>
//                             <th className="px-4 py-2">Quantite En Stock</th>
//                             <th className="px-4 py-2">Quantite</th>
//                             <th className="px-4 py-2">Code Projet</th>
//                             <th className="px-4 py-2">Nom Projet</th>
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">livraison</th>
//                             <th className="px-4 py-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {achatData.map((achat, index) => (
//                             <tr key={achat.id_Achat} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                                 <td className="border px-4 py-2">{achat.code}</td>
//                                 <td className="border px-4 py-2">{achat.designation}</td>
//                                 <td className="border px-4 py-2">{achat.qte_En_Stock}</td>
//                                 <td className="border px-4 py-2">{achat.quantite}</td>
//                                 <td className="border px-4 py-2">{achat.code_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.nom_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.date}</td>
//                                 {/* <td className="border px-4 py-2">{achat.check_Delivery}</td> */}
                                
//                                 {/* <td className="border py-2 px-4 text-center">
//                                     <input
//                                     type="checkbox"
//                                     // checked={livraison[index]}
//                                     // onChange={() => handleLivraisonChange(index)}
//                                     />
//                                 </td> */}
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                     <Switch
//                                     checked={achat.status === 'Active'}
//                                     onChange={() => toggleStatus(achat.id_Achat, achat.check_Delivery)}
//                                     color="secondary"
//                                     />
//                                     {achat.check_Delivery}
//                                 </td>
//                                 <td className="border py-2 px-4  text-center">
//                                     <button
//                                         className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full"
//                                         onClick={() => handleDelete(achat.id_Achat)} // pass id_Achat to handleDelete
//                                     >
//                                         <FaDeleteLeft/>
//                                         {/* <RiDeleteBinFill/> */}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
                
//                 <div className="mt-4 flex justify-center ">
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Imprimer</button>
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</button>
//                 </div>


//             </div>
//         </div>
//     );
// };

// export default Entree;

//hada works good

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData, updateAchatData, deleteAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import { FaDeleteLeft } from "react-icons/fa6";
// import Switch from "@mui/material/Switch";
// import { Link } from 'react-router-dom'
// const Entree = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
//     const [quantite, setQuantite] = useState('');
//     const [demandeDetails, setDemandeDetails] = useState(null);
//     const [projetDetails, setProjetDetails] = useState(null);
//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
//     const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
//     const { achatData, loading, error } = useSelector((state) => state.achat);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         if (demandeCode) {
//             const selectedDemande = demandeData.find(demande => demande.code === demandeCode);
//             if (selectedDemande) {
//                 setDemandeDetails(selectedDemande);
//             }
//         }
//     }, [demandeCode, demandeData]);

//     useEffect(() => {
//         if (projetCode) {
//             const selectedProjet = projetData.find(projet => projet.code_Projet == projetCode);
//             if (selectedProjet) {
//                 setProjetDetails(selectedProjet);
//             }
//         }
//     }, [projetCode, projetData]);

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//         const selectedProjet = projetData.find(projet => projet.code_Projet === e.target.value);
//         if (selectedProjet) {
//             setProjetDetails(selectedProjet);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (demandeDetails && projetDetails && quantite) {
//             const achatPayload = {
//                 code: demandeDetails.code,
//                 designation: demandeDetails.designation,
//                 quantite: parseInt(quantite, 10),
//                 qte_En_Stock: demandeDetails.quantité,
//                 code_Projet: projetDetails.code_Projet,
//                 nom_Projet: projetDetails.nom_Projet,
//                 date: projetDetails.date,
//                 check_Delivery: checkDelivery,
//             };
//             dispatch(postAchatData(achatPayload));
//         } else {
//             console.error('Demande or Projet details or quantite are not available');
//         }
//     };
    
//     const handleDelete = (id_Achat) => {
//         dispatch(deleteAchatData(id_Achat));
//     };

//     const handleCheckDeliveryChange = (e) => {
//         setCheckDelivery(e.target.checked);
//     };

//     const toggleStatus = async (id_Achat, currentStatus) => {
//         try {
//             const updatedAchat = achatData.find(item => item.id_Achat === id_Achat);
//             console.log("update",updatedAchat)
//             // console.log("qsdfsdqf",currentStatus)
//             if (updatedAchat) {
//                 const updatedStatus = currentStatus == 1 ? 0 : 1;
//                 console.log("updatedStatus",updatedStatus)
//                 const updatedAchatData = { ...updatedAchat, check_Delivery: updatedStatus };
//                 await dispatch(updateAchatData({ id_Achat, updatedAchatData }));
//             }
//         } catch (error) {
//             console.error('Error toggling user status:', error);
//         }
//     };
//     const handlePrint = () => {
//         window.print();
//     };
//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             <div className="max-w-md mx-auto flex justify-center items-center">
//                 <div className="mb-4 flex">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">Demande Code:</label>
//                         <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {demandeDetails && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Designation:</label>
//                             <input type="text" value={demandeDetails.designation} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     {demandeDetails && (
//                         <div className="mr-2">
//                             {/* <label className="block text-sm font-bold mb-2">Quantite:</label> */}
//                             <label className="block text-sm font-bold mb-2">Quantite En Stock:</label>
//                             <input type="text" value={demandeDetails.quantité} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4 flex">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                         <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {projetDetails && (
//                         <div>
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
//                     <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-3" />
//                 </div>
//                 <div className="mb-4 text-center">
//                     <label className="block text-sm font-bold mb-2 ">Delivery:</label>
//                     <input
//                         type="checkbox"
//                         checked={checkDelivery}
//                         onChange={handleCheckDeliveryChange}
//                     />
//                 </div>
//                 <div className="mb-4 ml-10">
//                     <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
//                 </div>
//             </div>

//             <div className="mt-8">
//                 <table className="min-w-full table-auto bg-white border border-gray-200">
//                     <thead>
//                         <tr className='bg-green-600 text-white'>
//                             <th className="px-4 py-2">Code</th>
//                             <th className="px-4 py-2">Designation</th>
//                             <th className="px-4 py-2">Quantite En Stock</th>
//                             <th className="px-4 py-2">Quantite</th>
//                             <th className="px-4 py-2">Code Projet</th>
//                             <th className="px-4 py-2">Nom Projet</th>
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">livraison</th>
//                             <th className="px-4 py-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {achatData.map((achat, index) => (
//                             <tr key={achat.id_Achat} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                                 <td className="border px-4 py-2">{achat.code}</td>
//                                 <td className="border px-4 py-2">{achat.designation}</td>
//                                 <td className="border px-4 py-2">{achat.qte_En_Stock}</td>
//                                 <td className="border px-4 py-2">{achat.quantite}</td>
//                                 <td className="border px-4 py-2">{achat.code_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.nom_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.date}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                     <Switch
//                                         checked={achat.check_Delivery}
//                                         onChange={() => toggleStatus(achat.id_Achat, achat.check_Delivery)}
//                                     />
//                                 </td>
//                                 <td className="border px-4 py-2 text-center">
//                                     <button onClick={() => handleDelete(achat.id_Achat)} className="text-red-600 hover:text-red-800">
//                                         <RiDeleteBinFill />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className="mt-4 flex justify-center">
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
//                     <Link to="/Livraison" className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Entree;



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData, updateAchatData, deleteAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import Switch from "@mui/material/Switch";
// import { Link } from 'react-router-dom';

// const Entree = () => {
//     const [achatEntries, setAchatEntries] = useState([{
//         idAchat: '',
//         date: new Date().toISOString().split('T')[0], // Current date
//         idArticle: '',
//         designation: '',
//         quantite: '',
//         idProjet: '',
//         nomProjet: ''
//     }]);
//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData } = useSelector((state) => state.demande);
//     const { projetData } = useSelector((state) => state.projet);
//     const { achatData } = useSelector((state) => state.achat);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     const handleInputChange = (e, index, field) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries[index][field] = e.target.value;

//         if (field === 'idArticle') {
//             const selectedArticle = demandeData.find(demande => demande.code === e.target.value);
//             if (selectedArticle) {
//                 updatedEntries[index].designation = selectedArticle.designation;
//             }
//         }

//         if (field === 'idProjet') {
//             const selectedProjet = projetData.find(projet => projet.code_Projet === e.target.value);
//             if (selectedProjet) {
//                 updatedEntries[index].nomProjet = selectedProjet.nom_Projet;
//             }
//         }

//         setAchatEntries(updatedEntries);
//     };

//     const handleAddEntry = () => {
//         setAchatEntries([...achatEntries, {
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }]);
//     };

//     const handleSubmit = () => {
//         achatEntries.forEach(entry => {
//             if (entry.idArticle && entry.designation && entry.quantite && entry.idProjet && entry.nomProjet) {
//                 const achatPayload = {
//                     code: entry.idArticle,
//                     designation: entry.designation,
//                     quantite: parseInt(entry.quantite, 10),
//                     qte_En_Stock: 0, // Assuming there's no stock data available
//                     code_Projet: entry.idProjet,
//                     nom_Projet: entry.nomProjet,
//                     date: entry.date,
//                     check_Delivery: checkDelivery,
//                 };
//                 dispatch(postAchatData(achatPayload));
//             } else {
//                 console.error('All fields are required');
//             }
//         });
//     };

//     const handleDelete = (index) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries.splice(index, 1);
//         setAchatEntries(updatedEntries);
//     };

//     const handleCheckDeliveryChange = (e) => {
//         setCheckDelivery(e.target.checked);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">Demande </h1>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-bold mb-2">ID Achat:</label>
//                 <input type="text" value={achatEntries[0].idAchat} placeholder='Enter ID Achat' onChange={(e) => handleInputChange(e, 0, 'idAchat')} className="w-full border rounded py-2 px-3" />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-bold mb-2">Date:</label>
//                 <input type="date" value={achatEntries[0].date} onChange={(e) => handleInputChange(e, 0, 'date')} className="w-full border rounded py-2 px-3" />
//             </div>
//             {achatEntries.map((entry, index) => (
//                 <div key={index} className="flex flex-wrap mb-4">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">ID Article:</label>
//                         <input type="text" value={entry.idArticle} placeholder='Enter ID Article' onChange={(e) => handleInputChange(e, index, 'idArticle')} className="w-full border rounded py-2 px-3" list="articleList" />
//                         <datalist id="articleList">
//                             {demandeData.map(demande => (
//                                 <option key={demande.code} value={demande.code}>{demande.designation}</option>
//                             ))}
//                         </datalist>
//                     </div>
//                     {entry.designation && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Designation:</label>
//                             <input type="text" value={entry.designation} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     <div className="mr-2 w-40">
//                         <label className="block text-sm font-bold mb-2">Quantite:</label>
//                         <input type="number" value={entry.quantite} placeholder='0' onChange={(e) => handleInputChange(e, index, 'quantite')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">ID Projet:</label>
//                         <input type="text" value={entry.idProjet} placeholder='Enter ID Projet' onChange={(e) => handleInputChange(e, index, 'idProjet')} className="w-full border rounded py-2 px-3" list="projetList" />
//                         <datalist id="projetList">
//                             {projetData.map(projet => (
//                                 <option key={projet.code_Projet} value={projet.code_Projet}>{projet.nom_Projet}</option>
//                             ))}
//                         </datalist>
//                     </div>
//                     {entry.nomProjet && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input type="text" value={entry.nomProjet} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     <div className="flex items-center">
//                         <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
//                             <RiDeleteBinFill />
//                         </button>
//                     </div>
//                 </div>
//             ))}
//             <div className="flex justify-center mb-4">
//                 <button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Add Line</button>
//             </div>
//             {/* <div className="mb-4 text-center">
//                 <label className="block text-sm font-bold mb-2">Delivery:</label>
//                 <input
//                     type="checkbox"
//                     checked={checkDelivery}
//                     onChange={handleCheckDeliveryChange}
//                 />
//             </div>
//             <div className="flex justify-center mb-4">
//                 <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">Submit</button>
//             </div> */}

//             <div className="mt-8">
//                 {/* <table className="min-w-full table-auto bg-white border border-gray-200">
//                     <thead>
//                         <tr className='bg-green-600 text-white'>
//                             <th className="px-4 py-2">Code</th>
//                             <th className="px-4 py-2">Designation</th>
//                             <th className="px-4 py-2">Quantite</th>
//                             <th className="px-4 py-2">Code Projet</th>
//                             <th className="px-4 py-2">Nom Projet</th>
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">Livraison</th>
//                             <th className="px-4 py-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {achatData.map((achat, index) => (
//                             <tr key={index}>
//                                 <td className="border px-4 py-2">{achat.code}</td>
//                                 <td className="border px-4 py-2">{achat.designation}</td>
//                                 <td className="border px-4 py-2">{achat.quantite}</td>
//                                 <td className="border px-4 py-2">{achat.code_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.nom_Projet}</td>
//                                 <td className="border px-4 py-2">{achat.date}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                     <Switch
//                                         checked={achat.check_Delivery}
//                                         onChange={() => toggleStatus(achat.id_Achat, achat.check_Delivery)}
//                                     />
//                                 </td>
//                                 <td className="border px-4 py-2 text-center">
//                                     <button onClick={() => handleDelete(achat.id_Achat)} className="text-red-600 hover:text-red-800">
//                                         <RiDeleteBinFill />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table> */}
//                 <div className="mt-4 flex justify-center">
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
//                     {/* <Link to="/Livraison" className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</Link> */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Entree;





// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData, updateAchatData, deleteAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import Switch from "@mui/material/Switch";
// import { Link } from 'react-router-dom';

// const Entree = () => {
//     const [achatEntries, setAchatEntries] = useState(() => {
//         const savedEntries = localStorage.getItem('achatEntries');
//         return savedEntries ? JSON.parse(savedEntries) : [{
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0], // Current date
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }];
//     });
//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData } = useSelector((state) => state.demande);
//     const { projetData } = useSelector((state) => state.projet);
//     const { achatData } = useSelector((state) => state.achat);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         localStorage.setItem('achatEntries', JSON.stringify(achatEntries));
//     }, [achatEntries]);

//     const handleInputChange = (e, index, field) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries[index][field] = e.target.value;

//         if (field === 'idArticle') {
//             const selectedArticle = demandeData.find(demande => demande.code === e.target.value);
//             if (selectedArticle) {
//                 updatedEntries[index].designation = selectedArticle.designation;
//             }
//         }

//         if (field === 'idProjet') {
//             const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
//             if (selectedProjet) {
//                 updatedEntries[index].nomProjet = selectedProjet.nom_Projet;
//             }
//         }

//         setAchatEntries(updatedEntries);
//     };

//     const handleAddEntry = () => {
//         setAchatEntries([...achatEntries, {
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }]);
//     };

//     const handleSubmit = () => {
//         achatEntries.forEach(entry => {
//             if (entry.idArticle && entry.designation && entry.quantite && entry.idProjet && entry.nomProjet) {
//                 const achatPayload = {
//                     code: entry.idArticle,
//                     designation: entry.designation,
//                     quantite: parseInt(entry.quantite, 10),
//                     qte_En_Stock: 0, // Assuming there's no stock data available
//                     code_Projet: entry.idProjet,
//                     nom_Projet: entry.nomProjet,
//                     date: entry.date,
//                     check_Delivery: checkDelivery,
//                 };
//                 dispatch(postAchatData(achatPayload));
//             } else {
//                 console.error('All fields are required');
//             }
//         });
//     };

//     const handleDelete = (index) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries.splice(index, 1);
//         setAchatEntries(updatedEntries);
//     };

//     const handleCheckDeliveryChange = (e) => {
//         setCheckDelivery(e.target.checked);
//     };

//     const handleNewDemande = () => {
//         localStorage.removeItem('achatEntries');
//         setAchatEntries([{
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0], // Current date
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }]);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             <div className="flex justify-end mb-4">
//                 <button onClick={handleNewDemande} className="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-5 rounded">New Demande</button>
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-bold mb-2">ID Achat:</label>
//                 <input type="text" value={achatEntries[0].idAchat} placeholder='Enter ID Achat' onChange={(e) => handleInputChange(e, 0, 'idAchat')} className="w-full border rounded py-2 px-3" />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-sm font-bold mb-2 ">Date:</label>
//                 <input type="date" value={achatEntries[0].date} onChange={(e) => handleInputChange(e, 0, 'date')} className="w-full border rounded py-2 px-3" />
//             </div>
//             {achatEntries.map((entry, index) => (
//                 <div key={index} className="flex flex-wrap mb-4">
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">ID Article:</label>
//                         <input type="text" value={entry.idArticle} placeholder='Enter ID Article' onChange={(e) => handleInputChange(e, index, 'idArticle')} className="w-full border rounded py-2 px-3" list="articleList" />
//                         <datalist id="articleList">
//                             {demandeData.map(demande => (
//                                 <option key={demande.code} value={demande.code}>{demande.designation}</option>
//                             ))}
//                         </datalist>
//                     </div>
//                     {entry.designation && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Designation:</label>
//                             <input type="text" value={entry.designation} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     <div className="mr-2 w-40">
//                         <label className="block text-sm font-bold mb-2">Quantite:</label>
//                         <input type="number" value={entry.quantite} placeholder='0' onChange={(e) => handleInputChange(e, index, 'quantite')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     <div className="mr-2 w-60">
//                         <label className="block text-sm font-bold mb-2">ID Projet:</label>
//                         <input type="text" value={entry.idProjet} placeholder='Enter ID Projet' onChange={(e) => handleInputChange(e, index, 'idProjet')} className="w-full border rounded py-2 px-3" list="projetList" />
//                         <datalist id="projetList">
//                             {projetData.map(projet => (
//                                 <option key={projet.code_Projet} value={projet.code_Projet}>{projet.nom_Projet}</option>
//                             ))}
//                         </datalist>
//                     </div>
//                     {entry.nomProjet && (
//                         <div className="mr-2">
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input type="text" value={entry.nomProjet} className="w-full border rounded py-2 px-3" disabled />
//                         </div>
//                     )}
//                     <div className="flex items-center">
//                         <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
//                             <RiDeleteBinFill />
//                         </button>
//                     </div>
//                 </div>
//             ))}
//             <div className="flex justify-center mb-4">
//                 <button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Add Line</button>
//             </div>
//             {/* <div className="flex justify-center mb-4">
//                 <button onClick={handleNewDemande} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded">New Demande</button>
//             </div> */}
//             <div className="mt-8">
//                 <div className="mt-4 flex justify-end">
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Entree;




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import Switch from "@mui/material/Switch";
// import ListeDemandes from './listeDemande';

// const Entree = () => {
//     const [achatEntries, setAchatEntries] = useState([{
//         idAchat: '',
//         date: new Date().toISOString().split('T')[0],
//         idArticle: '',
//         designation: '',
//         quantite: '',
//         idProjet: '',
//         nomProjet: ''
//     }]);
//     const [localStorageName, setLocalStorageName] = useState(`achatEntries_${Date.now()}`);

//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData } = useSelector((state) => state.demande);
//     const { projetData } = useSelector((state) => state.projet);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         const savedEntries = localStorage.getItem(localStorageName);
//         if (savedEntries) {
//             setAchatEntries(JSON.parse(savedEntries));
//         }
//     }, [localStorageName]);

//     useEffect(() => {
//         localStorage.setItem(localStorageName, JSON.stringify(achatEntries));
//     }, [achatEntries, localStorageName]);

//     const handleInputChange = (e, index, field) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries[index][field] = e.target.value;

//         if (field === 'idArticle') {
//             const selectedArticle = demandeData.find(demande => demande.code === e.target.value);
//             if (selectedArticle) {
//                 updatedEntries[index].designation = selectedArticle.designation;
//             }
//         }

//         if (field === 'idProjet') {
//             const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
//             if (selectedProjet) {
//                 updatedEntries[index].nomProjet = selectedProjet.nom_Projet;
//             }
//         }

//         setAchatEntries(updatedEntries);
//     };

//     const handleAddEntry = () => {
//         const newEntry = {
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         };
        
//         const updatedEntries = [...achatEntries, newEntry];
//         setAchatEntries(updatedEntries);
        
//         localStorage.setItem(localStorageName, JSON.stringify(updatedEntries));
//     };

//     const handleSubmit = () => {
//         achatEntries.forEach(entry => {
//             if (entry.idArticle && entry.designation && entry.quantite && entry.idProjet && entry.nomProjet) {
//                 const achatPayload = {
//                     code: entry.idArticle,
//                     designation: entry.designation,
//                     quantite: parseInt(entry.quantite, 10),
//                     qte_En_Stock: 0,
//                     code_Projet: entry.idProjet,
//                     nom_Projet: entry.nomProjet,
//                     date: entry.date,
//                     check_Delivery: checkDelivery,
//                 };
//                 dispatch(postAchatData(achatPayload));
//             } else {
//                 console.error('All fields are required');
//             }
//         });
//     };

//     const handleDelete = (index) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries.splice(index, 1);
//         setAchatEntries(updatedEntries);
//     };

//     const handleCheckDeliveryChange = (e) => {
//         setCheckDelivery(e.target.checked);
//     };

//     const handleNewDemande = () => {
//         const newLocalStorageName = `achatEntries_${Date.now()}`;
//         localStorage.setItem(newLocalStorageName, JSON.stringify([]));
//         setLocalStorageName(newLocalStorageName);
//         setAchatEntries([{
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }]);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             <div className="flex justify-end mb-4">
//                 <button onClick={handleNewDemande} className="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-5 rounded">New Demande</button>
//             </div>
//             {achatEntries.length > 0 && (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2">ID Achat:</label>
//                         <input type="text" value={achatEntries[0].idAchat} placeholder='Enter ID Achat' onChange={(e) => handleInputChange(e, 0, 'idAchat')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2">Date:</label>
//                         <input type="date" value={achatEntries[0].date} onChange={(e) => handleInputChange(e, 0, 'date')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {achatEntries.map((entry, index) => (
//                         <div key={index} className="flex flex-wrap mb-4">
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">ID Article:</label>
//                                 <input type="text" value={entry.idArticle} placeholder='Enter ID Article' onChange={(e) => handleInputChange(e, index, 'idArticle')} className="w-full border rounded py-2 px-3" list="articleList" />
//                                 <datalist id="articleList">
//                                     {demandeData.map(demande => (
//                                         <option key={demande.code} value={demande.code}>{demande.designation}</option>
//                                     ))}
//                                 </datalist>
//                             </div>
//                             {entry.designation && (
//                                 <div className="mr-2">
//                                     <label className="block text-sm font-bold mb-2">Designation:</label>
//                                     <input type="text" value={entry.designation} className="w-full border rounded py-2 px-3" disabled />
//                                 </div>
//                             )}
//                             <div className="mr-2 w-40">
//                                 <label className="block text-sm font-bold mb-2">Quantite:</label>
//                                 <input type="number" value={entry.quantite} placeholder='0' onChange={(e) => handleInputChange(e, index, 'quantite')} className="w-full border rounded py-2 px-3" />
//                             </div>
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">ID Projet:</label>
//                                 <input type="text" value={entry.idProjet} placeholder='Enter ID Projet' onChange={(e) => handleInputChange(e, index, 'idProjet')} className="w-full border rounded py-2 px-3" list="projetList" />
//                                 <datalist id="projetList">
//                                     {projetData.map(projet => (
//                                         <option key={projet.code_Projet} value={projet.code_Projet}>{projet.nom_Projet}</option>
//                                     ))}
//                                 </datalist>
//                             </div>
//                             {entry.nomProjet && (
//                                 <div className="mr-2">
//                                     <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                                     <input type="text" value={entry.nomProjet} className="w-full border rounded py-2 px-3" disabled />
//                                 </div>
//                             )}
//                             <div className="flex items-center">
//                                 <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
//                                     <RiDeleteBinFill />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </>
//             )}
//             <div className="flex justify-center mb-4">
//                 <button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Add Line</button>
//             </div>
//             <div className="mt-8">
//                 <div className="mt-4 flex justify-end">
//                     <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
//                 </div>
//             </div>
//                 {/* <AchatTable /> */}
//             </div>
// );
// };

// export default Entree;

// 1. Installez uuid : npm install uuid

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import { v4 as uuidv4 } from 'uuid';
// import Switch from "@mui/material/Switch";
// import ListeDemandes from './listeDemande';

// const Entree = () => {
//     const [achatEntries, setAchatEntries] = useState([{
//         id: uuidv4(),
//         idAchat: '',
//         date: new Date().toISOString().split('T')[0],
//         idArticle: '',
//         designation: '',
//         quantite: '',
//         idProjet: '',
//         nomProjet: ''
//     }]);
//     const [localStorageName, setLocalStorageName] = useState(`achatEntries_${Date.now()}`);

//     const [checkDelivery, setCheckDelivery] = useState(false);
//     const dispatch = useDispatch();

//     const { demandeData } = useSelector((state) => state.demande);
//     const { projetData } = useSelector((state) => state.projet);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         const savedEntries = localStorage.getItem(localStorageName);
//         if (savedEntries) {
//             setAchatEntries(JSON.parse(savedEntries));
//         }
//     }, [localStorageName]);

//     useEffect(() => {
//         localStorage.setItem(localStorageName, JSON.stringify(achatEntries));
//     }, [achatEntries, localStorageName]);

//     const handleInputChange = (e, index, field) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries[index][field] = e.target.value;

//         if (field === 'idArticle') {
//             const selectedArticle = demandeData.find(demande => demande.code === e.target.value);
//             if (selectedArticle) {
//                 updatedEntries[index].designation = selectedArticle.designation;
//             }
//         }

//         if (field === 'idProjet') {
//             const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
//             if (selectedProjet) {
//                 updatedEntries[index].nomProjet = selectedProjet.nom_Projet;
//             }
//         }

//         setAchatEntries(updatedEntries);
//     };

//     const handleAddEntry = () => {
//         const newEntry = {
//             id: uuidv4(),
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         };

//         const updatedEntries = [...achatEntries, newEntry];
//         setAchatEntries(updatedEntries);

//         localStorage.setItem(localStorageName, JSON.stringify(updatedEntries));
//     };

//     const handleSubmit = () => {
//         achatEntries.forEach(entry => {
//             if (entry.idArticle && entry.designation && entry.quantite && entry.idProjet && entry.nomProjet) {
//                 const achatPayload = {
//                     code: entry.idArticle,
//                     designation: entry.designation,
//                     quantite: parseInt(entry.quantite, 10),
//                     qte_En_Stock: 0,
//                     code_Projet: entry.idProjet,
//                     nom_Projet: entry.nomProjet,
//                     date: entry.date,
//                     check_Delivery: checkDelivery,
//                 };
//                 dispatch(postAchatData(achatPayload));
//             } else {
//                 console.error('All fields are required');
//             }
//         });
//     };

//     const handleDelete = (index) => {
//         const updatedEntries = [...achatEntries];
//         updatedEntries.splice(index, 1);
//         setAchatEntries(updatedEntries);
//         localStorage.setItem(localStorageName, JSON.stringify(updatedEntries));
//     };

//     const handleCheckDeliveryChange = (e) => {
//         setCheckDelivery(e.target.checked);
//     };

//     const handleNewDemande = () => {
//         const newLocalStorageName = `achatEntries_${Date.now()}`;
//         localStorage.setItem(newLocalStorageName, JSON.stringify([]));
//         setLocalStorageName(newLocalStorageName);
//         setAchatEntries([{
//             id: uuidv4(),
//             idAchat: '',
//             date: new Date().toISOString().split('T')[0],
//             idArticle: '',
//             designation: '',
//             quantite: '',
//             idProjet: '',
//             nomProjet: ''
//         }]);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             <div className="flex justify-end mb-4">
//                 <button onClick={handleNewDemande} className="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-5 rounded">New Demande</button>
//             </div>
//             {achatEntries.length > 0 && (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2">ID Achat:</label>
//                         <input type="text" value={achatEntries[0].idAchat} placeholder='Enter ID Achat' onChange={(e) => handleInputChange(e, 0, 'idAchat')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2">Date:</label>
//                         <input type="date" value={achatEntries[0].date} onChange={(e) => handleInputChange(e, 0, 'date')} className="w-full border rounded py-2 px-3" />
//                     </div>
//                     {achatEntries.map((entry, index) => (
//                         <div key={index} className="flex flex-wrap mb-4">
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">ID Article:</label>
//                                 <input type="text" value={entry.idArticle} placeholder='Enter ID Article' onChange={(e) => handleInputChange(e, index, 'idArticle')} className="w-full border rounded py-2 px-3" list="articleList" />
//                                 <datalist id="articleList">
//                                     {demandeData.map(demande => (
//                                         <option key={demande.code} value={demande.code}>{demande.designation}</option>
//                                     ))}
//                                 </datalist>
//                             </div>
//                             {entry.designation && (
//                                 <div className="mr-2">
//                                     <label className="block text-sm font-bold mb-2">Designation:</label>
//                                     <input type="text" value={entry.designation} className="w-full border rounded py-2 px-3" disabled />
//                                 </div>
//                             )}
//                             <div className="mr-2 w-40">
//                                 <label className="block text-sm font-bold mb-2">Quantite:</label>
//                                 <input type="number" value={entry.quantite} placeholder='0' onChange={(e) => handleInputChange(e, index, 'quantite')} className="w-full border rounded py-2 px-3" />
//                             </div>
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">ID Projet:</label>
//                                 <input type="text" value={entry.idProjet} placeholder='Enter ID Projet' onChange={(e) => handleInputChange(e, index, 'idProjet')} className="w-full border rounded py-2 px-3" list="projetList" />
//                                 <datalist id="projetList">
//                                     {projetData.map(projet => (
//                                         <option key={projet.code_Projet} value={projet.code_Projet}>{projet.nom_Projet}</option>
//                                     ))}
//                                 </datalist>
//                             </div>
//                             {entry.nomProjet && (
//                                 <div className="mr-2">
//                                     <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                                     <input type="text" value={entry.nomProjet} className="w-full border rounded py-2 px-3" disabled />
//                                 </div>
//                             )}
//                             <div className="flex items-center">
//                                 <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
//                                     <RiDeleteBinFill size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
                  
//                     <div className="flex justify-between">
//                         <button onClick={handleAddEntry} className="bg-customBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Entry</button>
//                         <button onClick={handleSubmit} className="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
//                         <button onClick={handlePrint} className="bg-customGray hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Print</button>
//                     </div>
//                 </>
//             )}
//             <ListeDemandes />
//         </div>
//     );
// };

// export default Entree;












import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatData, postAchatData } from '../store/achatSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import Switch from "@mui/material/Switch";


const Entree = () => {
    const [achatEntries, setAchatEntries] = useState([{
        idAchat: '',
        date: new Date().toISOString().split('T')[0],
        idArticle: '',
        designation: '',
        quantite: '',
        idProjet: '',
        nomProjet: ''
    }]);
    const [localStorageName, setLocalStorageName] = useState(`achatEntries_${Date.now()}`);

    const [checkDelivery, setCheckDelivery] = useState(false);
    const dispatch = useDispatch();

    const { demandeData } = useSelector((state) => state.demande);
    const { projetData } = useSelector((state) => state.projet);

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
        dispatch(fetchAchatData());
    }, [dispatch]);

    useEffect(() => {
        const savedEntries = localStorage.getItem(localStorageName);
        if (savedEntries) {
            setAchatEntries(JSON.parse(savedEntries));
        }
    }, [localStorageName]);

    useEffect(() => {
        localStorage.setItem(localStorageName, JSON.stringify(achatEntries));
    }, [achatEntries, localStorageName]);

    const handleInputChange = (e, index, field) => {
        const updatedEntries = [...achatEntries];
        updatedEntries[index][field] = e.target.value;

        if (field === 'idArticle') {
            const selectedArticle = demandeData.find(demande => demande.code === e.target.value);
            if (selectedArticle) {
                updatedEntries[index].designation = selectedArticle.designation;
            }
        }

        if (field === 'idProjet') {
            const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
            if (selectedProjet) {
                updatedEntries[index].nomProjet = selectedProjet.nom_Projet;
            }
        }

        setAchatEntries(updatedEntries);
    };

    const handleAddEntry = () => {
        const newEntry = {
            idAchat: '',
            date: new Date().toISOString().split('T')[0],
            idArticle: '',
            designation: '',
            quantite: '',
            idProjet: '',
            nomProjet: ''
        };
        
        const updatedEntries = [...achatEntries, newEntry];
        setAchatEntries(updatedEntries);
        
        localStorage.setItem(localStorageName, JSON.stringify(updatedEntries));
    };

    const handleSubmit = () => {
        achatEntries.forEach(entry => {
            if (entry.idArticle && entry.designation && entry.quantite && entry.idProjet && entry.nomProjet) {
                const achatPayload = {
                    code: entry.idArticle,
                    designation: entry.designation,
                    quantite: parseInt(entry.quantite, 10),
                    qte_En_Stock: 0,
                    code_Projet: entry.idProjet,
                    nom_Projet: entry.nomProjet,
                    date: entry.date,
                    check_Delivery: checkDelivery,
                };
                dispatch(postAchatData(achatPayload));
            } else {
                console.error('All fields are required');
            }
        });
    };

    const handleDelete = (index) => {
        const updatedEntries = [...achatEntries];
        updatedEntries.splice(index, 1);
        setAchatEntries(updatedEntries);
    };

    const handleCheckDeliveryChange = (e) => {
        setCheckDelivery(e.target.checked);
    };

    const handleNewDemande = () => {
        const newLocalStorageName = `achatEntries_${Date.now()}`;
        localStorage.setItem(newLocalStorageName, JSON.stringify([]));
        setLocalStorageName(newLocalStorageName);
        setAchatEntries([{
            idAchat: '',
            date: new Date().toISOString().split('T')[0],
            idArticle: '',
            designation: '',
            quantite: '',
            idProjet: '',
            nomProjet: ''
        }]);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
            </div>
            <div className="flex justify-end mb-4">
                <button onClick={handleNewDemande} className="bg-customGreen hover:bg-green-600 text-white font-bold py-2 px-5 rounded">New Demande</button>
            </div>
            {achatEntries.length > 0 && (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">ID Achat:</label>
                        <input type="text" value={achatEntries[0].idAchat} placeholder='Enter ID Achat' onChange={(e) => handleInputChange(e, 0, 'idAchat')} className="w-full border rounded py-2 px-3" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Date:</label>
                        <input type="date" value={achatEntries[0].date} onChange={(e) => handleInputChange(e, 0, 'date')} className="w-full border rounded py-2 px-3" />
                    </div>
                    {achatEntries.map((entry, index) => (
                        <div key={index} className="flex flex-wrap mb-4">
                            <div className="mr-2 w-60">
                                <label className="block text-sm font-bold mb-2">ID Article:</label>
                                <input type="text" value={entry.idArticle} placeholder='Enter ID Article' onChange={(e) => handleInputChange(e, index, 'idArticle')} className="w-full border rounded py-2 px-3" list="articleList" />
                                <datalist id="articleList">
                                    {demandeData.map(demande => (
                                        <option key={demande.code} value={demande.code}>{demande.designation}</option>
                                    ))}
                                </datalist>
                            </div>
                            {entry.designation && (
                                <div className="mr-2">
                                    <label className="block text-sm font-bold mb-2">Designation:</label>
                                    <input type="text" value={entry.designation} className="w-full border rounded py-2 px-3" disabled />
                                </div>
                            )}
                            <div className="mr-2 w-40">
                                <label className="block text-sm font-bold mb-2">Quantite:</label>
                                <input type="number" value={entry.quantite} placeholder='0' onChange={(e) => handleInputChange(e, index, 'quantite')} className="w-full border rounded py-2 px-3" />
                            </div>
                            <div className="mr-2 w-60">
                                <label className="block text-sm font-bold mb-2">ID Projet:</label>
                                <input type="text" value={entry.idProjet} placeholder='Enter ID Projet' onChange={(e) => handleInputChange(e, index, 'idProjet')} className="w-full border rounded py-2 px-3" list="projetList" />
                                <datalist id="projetList">
                                    {projetData.map(projet => (
                                        <option key={projet.code_Projet} value={projet.code_Projet}>{projet.nom_Projet}</option>
                                    ))}
                                </datalist>
                            </div>
                            {entry.nomProjet && (
                                <div className="mr-2">
                                    <label className="block text-sm font-bold mb-2">Nom Projet:</label>
                                    <input type="text" value={entry.nomProjet} className="w-full border rounded py-2 px-3" disabled />
                                </div>
                            )}
                            <div className="flex items-center">
                                <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                                    <RiDeleteBinFill />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
            <div className="flex justify-center mb-4">
                <button onClick={handleAddEntry} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Add Line</button>
            </div>
            <div className="mt-8">
                <div className="mt-4 flex justify-end">
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
                </div>
            </div>
                {/* <AchatTable /> */}
            </div>
);
};

export default Entree;