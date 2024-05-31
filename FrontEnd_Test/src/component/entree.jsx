
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import Switch from "@mui/material/Switch";

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
//     const [showAdditionalLine, setShowAdditionalLine] = useState(false); // State to manage visibility of additional line

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
//     const handleAddLine = () => {
//         setShowAdditionalLine(true);
//     };
//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             <div className="max-w-md mx-auto flex justify-center items-center">
//             {showAdditionalLine && 
//             (<>   
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
//             </>)}
//                 <div className="mb-4 ml-10">
//                     <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
//                     <button onClick={handleAddLine} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded ml-4">Add Line</button>

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
// import { fetchAchatData, postAchatData } from '../store/achatSlice';
// import { RiDeleteBinFill } from "react-icons/ri";
// import { FaDeleteLeft } from "react-icons/fa6";
// import Switch from "@mui/material/Switch";
// import { Link } from 'react-router-dom';

// const Entree = () => {
//     const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
//     const [demandeData, setDemandeData] = useState([]);
//     const [projetData, setProjetData] = useState([]);
//     const dispatch = useDispatch();

//     console.log(lines)
//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     useEffect(() => {
//         setDemandeData(demandeData);
//     }, [demandeData]);

//     useEffect(() => {
//         setProjetData(projetData);
//     }, [projetData]);

//     const handleAddLine = () => {
//         setLines([...lines, { demandeCode: '', projetCode: '', quantite: '' }]);
//     };

//     const handleChange = (index, key, value) => {
//         const newLines = [...lines];
//         newLines[index][key] = value;
//         setLines(newLines);
//     };

//     const handleSubmit = () => {
//         lines.forEach(line => {
//             if (line.demandeCode && line.projetCode && line.quantite) {
//                 const achatPayload = {
//                     code: line.demandeCode,
//                     designation: demandeData.find(demande => demande.code === line.demandeCode)?.designation || '',
//                     quantite: parseInt(line.quantite, 10),
//                     qte_En_Stock: demandeData.find(demande => demande.code === line.demandeCode)?.quantité || '',
//                     code_Projet: line.projetCode,
//                     nom_Projet: projetData.find(projet => projet.code_Projet === line.projetCode)?.nom_Projet || '',
//                     // You can add more fields here as needed
//                 };
//                 dispatch(postAchatData(achatPayload));
//             }
//         });
//     };

//     return (
//         <div className="container mx-auto p-4 w-full">
//             <div className="text-center bg-customBlue text-white py-2 mb-4">
//                 <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
//             </div>
//             {lines.map((line, index) => (
//                 <div key={index}>
//                     <div className="max-w-md mx-auto flex justify-center items-center">
//                         <div className="mb-4 flex">
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">Demande Code:</label>
//                                 <input type="text" value={line.demandeCode} placeholder='enter code' onChange={(e) => handleChange(index, 'demandeCode', e.target.value)} className="w-full border rounded py-2 px-3" />
//                             </div>
//                             <div className="mr-2">
//                                 <label className="block text-sm font-bold mb-2">Designation:</label>
//                                 <input type="text" value={demandeData.find(demande => demande.code === line.demandeCode)?.designation || ''} className="w-full border rounded py-2 px-3" disabled />
//                             </div>
//                             <div className="mr-2">
//                                 <label className="block text-sm font-bold mb-2">Quantite En Stock:</label>
//                                 <input type="text" value={demandeData.find(demande => demande.code === line.demandeCode)?.quantité || ''} className="w-full border rounded py-2 px-3" disabled />
//                             </div>
//                         </div>
//                         <div className="mb-4 flex">
//                             <div className="mr-2 w-60">
//                                 <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                                 <input type="text" value={line.projetCode} placeholder='Code de Projet' onChange={(e) => handleChange(index, 'projetCode', e.target.value)} className="w-full border rounded py-2 px-3" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                                 <input type="text" value={projetData.find(projet => projet.code_Projet === line.projetCode)?.nom_Projet || ''} className="w-full border rounded py-2 px-3" disabled />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
//                             <input type="number" value={line.quantite} placeholder='0' onChange={(e) => handleChange(index, 'quantite', e.target.value)} className="w-full border rounded py-2 px-3" />
//                         </div>
//                     </div>
//                 </div>
//             ))}
//             <div className="max-w-md mx-auto flex justify-center items-center mb-4 ml-10">
//                 <button onClick={handleAddLine} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Add Line</button>
//                 <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded ml-4">Create</button>
//             </div>
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
import { Link } from 'react-router-dom';

const Entree = () => {
    const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '' }]);
    const demandeData = useSelector((state) => state.demande.demandeData);
    const projetData = useSelector((state) => state.projet.projetData);
    const [code_Achat, setCode_Achat] = useState('');
    
    const authState = useSelector(state => state.auth);
    const user = authState.user;
//   console.log("whoami", user.username)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
        dispatch(fetchAchatData());
    }, [dispatch]);

    const handleAddLine = () => {
        setLines([...lines, { demandeCode: '', projetCode: '', quantite: '' }]);
    };

    const handleChange = (index, key, value) => {
        const newLines = [...lines];
        newLines[index][key] = value;
        setLines(newLines);
    };

    const handleCode_AchatChange = (e) => {
        setCode_Achat(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const currentDate = new Date(); // Get the current date and time
            const formattedDate = currentDate.toISOString(); // Format the date as ISO string
    
            for (const line of lines) {
                if (line.demandeCode && line.projetCode && line.quantite) {
                    const achatPayload = {
                        code: line.demandeCode,
                        designation: demandeData.find(demande => demande.code === line.demandeCode)?.designation || '',
                        quantite: parseInt(line.quantite, 10),
                        qte_En_Stock: demandeData.find(demande => demande.code === line.demandeCode)?.quantité || '',
                        code_Projet: line.projetCode,
                        nom_Projet: projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '',
                        check_Delivery: false,
                        code_Achat: code_Achat, // Adding code_Achat here
                        user_Dmd: user.username,
                        date: formattedDate // Add the formatted date to the payload
                    };
                    const response = await dispatch(postAchatData(achatPayload));
                    console.log("=======>",response)
                    if (response.error) {
                        throw new Error(response.error.message);
                    }
                    console.log("achatPayload", achatPayload);
                }
            }
            setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
            setCode_Achat(''); // Resetting code_Achat after submission
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };
    
    

    // const handleSubmit = async () => {
    //     try {
    //         for (const line of lines) {
    //             if (line.demandeCode && line.projetCode && line.quantite) {
    //                 const achatPayload = {
    //                     code: line.demandeCode,
    //                     designation: demandeData.find(demande => demande.code === line.demandeCode)?.designation || '',
    //                     quantite: parseInt(line.quantite, 10),
    //                     qte_En_Stock: demandeData.find(demande => demande.code === line.demandeCode)?.quantité || '',
    //                     code_Projet: line.projetCode,
    //                     nom_Projet: projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || '',
    //                     check_Delivery: false,
    //                     code_Achat: code_Achat, // Adding code_Achat here
    //                     user_Dmd: user.username,
    //                     date:"add date of now when i click create"
    //                 };
    //                 const response = await dispatch(postAchatData(achatPayload));
    //                 console.log("=======>",response)
    //                 if (response.error) {
    //                     throw new Error(response.error.message);
    //                 }
    //                 console.log("achatPayload", achatPayload);
    //             }
    //         }
    //         setLines([{ demandeCode: '', projetCode: '', quantite: '' }]);
    //         setCode_Achat(''); // Resetting code_Achat after submission
    //     } catch (error) {
    //         console.error('Error submitting data:', error.message);
    //     }
    // };
    

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
            </div>
            <div className="max-w-md mx-auto flex justify-center items-center">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Code Achat:</label>
                    <input type="text" value={code_Achat} placeholder='Code Achat' onChange={handleCode_AchatChange} className="w-full border rounded py-2 px-3" />
                </div>
            </div>
            {lines.map((line, index) => (
                <div key={index}>
                    <div className="max-w-md mx-auto flex justify-center items-center">
                        <div className="mb-4 flex">
                            <div className="mr-2 w-60">
                                <label className="block text-sm font-bold mb-2">Demande Code:</label>
                                <input type="text" value={line.demandeCode} placeholder='enter code' onChange={(e) => handleChange(index, 'demandeCode', e.target.value)} className="w-full border rounded py-2 px-3" />
                            </div>
                            <div className="mr-2">
                                <label className="block text-sm font-bold mb-2">Designation:</label>
                                <input type="text" value={demandeData.find(demande => demande.code === line.demandeCode)?.designation || ''} className="w-full border rounded py-2 px-3" disabled />
                            </div>
                            <div className="mr-2">
                                <label className="block text-sm font-bold mb-2">Quantite En Stock:</label>
                                <input type="text" value={demandeData.find(demande => demande.code === line.demandeCode)?.quantité || ''} className="w-full border rounded py-2 px-3" disabled />
                            </div>
                        </div>
                        <div className="mb-4 flex">
                            <div className="mr-2 w-60">
                                <label className="block text-sm font-bold mb-2">Projet Code:</label>
                                <input type="text" value={line.projetCode} placeholder='Code de Projet' onChange={(e) => handleChange(index, 'projetCode', e.target.value)} className="w-full border rounded py-2 px-3" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Nom Projet:</label>
                                <input type="text" value={projetData.find(projet => projet.code_Projet == line.projetCode)?.nom_Projet || ''} className="w-full border rounded py-2 px-3" disabled />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
                            <input type="number" value={line.quantite} placeholder='0' onChange={(e) => handleChange(index, 'quantite', e.target.value)} className="w-full border rounded py-2 px-3" />
                        </div>
                    </div>
                </div>
            ))}
            <div className="max-w-md mx-auto flex justify-center items-center mb-4 ml-10">
                <button onClick={handleAddLine} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Add Line</button>
                <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded ml-4">Create</button>
            </div>
        </div>
    );
};

export default Entree;
