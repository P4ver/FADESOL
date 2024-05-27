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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatData, postAchatData } from '../store/achatSlice';
import { deleteAchatData, deleteAchatItem } from '../store/achatSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";

const Entree = () => {
    const [demandeCode, setDemandeCode] = useState('');
    const [projetCode, setProjetCode] = useState('');
    const [quantite, setQuantite] = useState('');
    const [demandeDetails, setDemandeDetails] = useState(null);
    const [projetDetails, setProjetDetails] = useState(null);

    const dispatch = useDispatch();

    const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
    const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
    const { achatData, loading, error } = useSelector((state) => state.achat);

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
        dispatch(fetchAchatData());
    }, [dispatch]);

    useEffect(() => {
        if (demandeCode) {
            const selectedDemande = demandeData.find(demande => demande.code === demandeCode);
            if (selectedDemande) {
                setDemandeDetails(selectedDemande);
            }
        }
    }, [demandeCode, demandeData]);

    useEffect(() => {
        if (projetCode) {
            const selectedProjet = projetData.find(projet => projet.code_Projet === projetCode);
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
        const selectedProjet = projetData.find(projet => projet.code_Projet == e.target.value);
        if (selectedProjet) {
            setProjetDetails(selectedProjet);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (demandeDetails && projetDetails && quantite) {
            const achatPayload = {
                code: demandeDetails.code,
                designation: demandeDetails.designation,
                quantite: parseInt(quantite, 10),
                qte_En_Stock: demandeDetails.quantité,
                code_Projet: projetDetails.code_Projet,
                nom_Projet: projetDetails.nom_Projet,
                date: projetDetails.date,
            };
            dispatch(postAchatData(achatPayload));
        } else {
            console.error('Demande or Projet details or quantite are not available');
        }
    };
    
    const handleDelete = (id_Achat) => {
        dispatch(deleteAchatData(id_Achat));
    };

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
            </div>
            {/* <div className="bg-purple-600 text-white p-2 mb-4">
                <h2 className="text-xl font-bold">ENTREE</h2>
                <div className="flex justify-between bg-red-200 text-red-600 p-2 mt-2">
                <span>Expression BESOIN / DDE ACHAT</span>
                </div>
            </div> */}
            <div className="max-w-md mx-auto flex justify-center  items-center">
                <div className="mb-4 flex">
                    <div className="mr-2 w-60">
                        <label className="block text-sm font-bold mb-2">Demande Code:</label>
                        <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
                    </div>
                    {demandeDetails && (
                        <div className="mr-2 ">
                            <label className="block text-sm font-bold mb-2">Designation:</label>
                            <input type="text" value={demandeDetails.designation} className="w-full border rounded py-2 px-3" disabled />
                        </div>
                    )}
                    {demandeDetails && (
                        <div className="mr-2">
                            <label className="block text-sm font-bold mb-2">Quantite:</label>
                            <input type="text" value={demandeDetails.quantité} className="w-full border rounded py-2 px-3" disabled />
                        </div>
                    )}
                </div>
                <div className="mb-4 flex">
                    <div className="mr-2 w-60">
                        <label className="block text-sm font-bold mb-2">Projet Code:</label>
                        <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
                    </div>
                    {projetDetails && (
                        <div>
                            <label className="block text-sm font-bold mb-2">Nom Projet:</label>
                            <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3" disabled />
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 w-20">Quantite:</label>
                    <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-3" />
                </div>
                <div className="mb-4 ml-10 ">
                    <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create </button>
                </div>
            </div>

            <div className="mt-8">
                <table className="min-w-full table-auto bg-white border border-gray-200">
                    <thead>
                        <tr className='bg-green-600 text-white'>
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Designation</th>
                            <th className="px-4 py-2">Quantite En Stock</th>
                            <th className="px-4 py-2">Quantite</th>
                            <th className="px-4 py-2">Code Projet</th>
                            <th className="px-4 py-2">Nom Projet</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">livraison</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achatData.map((achat, index) => (
                            <tr key={achat.id_Achat} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{achat.code}</td>
                                <td className="border px-4 py-2">{achat.designation}</td>
                                <td className="border px-4 py-2">{achat.qte_En_Stock}</td>
                                <td className="border px-4 py-2">{achat.quantite}</td>
                                <td className="border px-4 py-2">{achat.code_Projet}</td>
                                <td className="border px-4 py-2">{achat.nom_Projet}</td>
                                <td className="border px-4 py-2">{achat.date}</td>
                                <td className="border py-2 px-4 text-center">
                                    <input
                                    type="checkbox"
                                    // checked={livraison[index]}
                                    // onChange={() => handleLivraisonChange(index)}
                                    />
                                </td>
                                <td className="border py-2 px-4  text-center">
                                    <button
                                        className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-2 rounded-full"
                                        onClick={() => handleDelete(achat.id_Achat)} // pass id_Achat to handleDelete
                                    >
                                        <FaDeleteLeft/>
                                        {/* <RiDeleteBinFill/> */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="mt-4 flex justify-center ">
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Imprimer</button>
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</button>
                </div>


            </div>
        </div>
    );
};

export default Entree;








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
    
//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const handleQuantiteChange = (e) => {
//         setQuantite(e.target.value);
//     };

//     const fetchDemandeDetails = () => {
//         const demande = demandeData.find((d) => d.code === demandeCode);
//         setDemandeDetails(demande);
//     };

//     const fetchProjetDetails = () => {
//         const projet = projetData.find((p) => p.code_Projet == projetCode);
//         setProjetDetails(projet);
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
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2">Demande Code:</label>
//                     <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
//                     <button onClick={fetchDemandeDetails} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Demande Details</button>
//                 </div>
//                 {demandeDetails && (
//                     <div className="mb-4">
//                         <h3 className="font-bold mb-2">Demande Details:</h3>
//                         <p><span className="font-bold">Code:</span> {demandeDetails.code}</p>
//                         <p><span className="font-bold">Designation:</span> {demandeDetails.designation}</p>
//                         <p><span className="font-bold">Quantité:</span> {demandeDetails.quantité}</p>
//                     </div>
//                 )}
//                 <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                     <input type="text" value={projetCode} onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
//                     <button onClick={fetchProjetDetails} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Projet Details</button>
//                 </div>
//                 {projetDetails && (
//                     <div className="mb-4">
//                         <h3 className="font-bold mb-2">Projet Details:</h3>
//                         <p><span className="font-bold">Code Projet:</span> {projetDetails.code_Projet}</p>
//                         <p><span className="font-bold">Nom Projet:</span> {projetDetails.nom_Projet}</p>
//                         <p><span className="font-bold">Date:</span> {projetDetails.date}</p>
//                     </div>
//                 )}
//                 {demandeDetails && projetDetails && (
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2">Quantite:</label>
//                         <input type="number" value={quantite} onChange={handleQuantiteChange} className="w-full border rounded py-2 px-3" />
//                     </div>
//                 )}
//                 {demandeDetails && projetDetails && quantite && (
//                     <div className="mb-4">
//                         <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Create Achat</button>
//                     </div>
//                 )}
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
//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const handleQuantiteChange = (e) => {
//         setQuantite(e.target.value);
//     };

//     const fetchDemandeDetails = () => {
//         const demande = demandeData.find((d) => d.code === demandeCode);
//         setDemandeDetails(demande);
//     };

//     const fetchProjetDetails = () => {
//         const projet = projetData.find((p) => p.code_Projet == projetCode);
//         setProjetDetails(projet);
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
//         <div>
//             {/* <h2>Achat Form</h2>
//             <ul>
//                 {achatData.map((achat) => (
//                     <li key={achat.id_Achat}>
//                         {achat.code} - {achat.designation} - {achat.qte_En_Stock} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
//                     </li>
//                 ))}
//             </ul> */}

//             <div>
//                 <label>Demande Code:</label>
//                 <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} />
//                 <button onClick={fetchDemandeDetails}>Fetch Demande Details</button>
//             </div>
//             {demandeDetails && (
//                 <div>
//                     <h3>Demande Details:</h3>
//                     <p>Code: {demandeDetails.code}</p>
//                     <p>Designation: {demandeDetails.designation}</p>
//                     <p>Quantité: {demandeDetails.quantité}</p>
//                 </div>
//             )}
//             {demandeDetails && (
//                 <div>
//                     <label>Projet Code:</label>
//                     <input type="text" value={projetCode} onChange={handleProjetCodeChange} />
//                     <button onClick={fetchProjetDetails}>Fetch Projet Details</button>
//                 </div>
//             )}
//             {projetDetails && (
//                 <div>
//                     <h3>Projet Details:</h3>
//                     <p>Code Projet: {projetDetails.code_Projet}</p>
//                     <p>Nom Projet: {projetDetails.nom_Projet}</p>
//                     <p>Date: {projetDetails.date}</p>
//                 </div>
//             )}
//             {demandeDetails && projetDetails && (
//                 <div>
//                     <label>Quantite:</label>
//                     <input type="number" value={quantite} onChange={handleQuantiteChange} />
//                 </div>
//             )}
//             {demandeDetails && projetDetails && quantite && (
//                 <div>
//                     <button onClick={handleSubmit}>Create Achat</button>
//                 </div>
//             )}

//             <h2>Achat Form</h2>
//             <ul>
//                 {achatData.map((achat) => (
//                     <li key={achat.id_Achat}>
//                         {achat.code} - {achat.designation} - {achat.qte_En_Stock} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Entree;

{/************************************************************************************************/}

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';

// const Entree = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
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

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const fetchDemandeDetails = () => {
//         const demande = demandeData.find((d) => d.code === demandeCode);
//         setDemandeDetails(demande);
//     };

//     const fetchProjetDetails = () => {
//         const projet = projetData.find((p) => p.code_Projet == projetCode);
//         setProjetDetails(projet);
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (demandeDetails && projetDetails) {
//             const achatPayload = {
//                 code: demandeDetails.code,
//                 designation: demandeDetails.designation,
//                 quantite: 5,
//                 qte_En_Stock: demandeDetails.quantité,
//                 code_Projet: projetDetails.code_Projet,
//                 nom_Projet: projetDetails.nom_Projet,
//                 date: projetDetails.date,
//             };
//             dispatch(postAchatData(achatPayload));
//         } else {
//             console.error('Demande or Projet details are not available');
//         }
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     if (demandeDetails && projetDetails) {
//     //         const achatPayload = {
//     //             code: demandeDetails.code,
//     //             designation: demandeDetails.designation,
//     //             quantite: demandeDetails.quantité,
//     //             qte_En_Stock: demandeDetails.quantité,
//     //             code_Projet: projetDetails.code_Projet,
//     //             nom_Projet: projetDetails.nom_Projet,
//     //             date: projetDetails.date,
//     //         };
//     //         dispatch(postAchatData(achatPayload));
//     //     } else {
//     //         console.error('Demande or Projet details are not available');
//     //     }
//     // };
    
//     return (
//         <div>
//             <h2>Achat Form</h2>
//             <ul>
//                 {achatData.map((achat) => (
//                     <li key={achat.id_Achat}>
//                         {achat.code} - {achat.designation} - {achat.qte_En_Stock} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
//                     </li>
//                 ))}
//             </ul>

//             <div>
//                 <label>Demande Code:</label>
//                 <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} />
//                 <button onClick={fetchDemandeDetails}>Fetch Demande Details</button>
//             </div>
//             {demandeDetails && (
//                 <div>
//                     <h3>Demande Details:</h3>
//                     <p>Code: {demandeDetails.code}</p>
//                     <p>Designation: {demandeDetails.designation}</p>
//                     <p>Quantité: {demandeDetails.quantité}</p>
//                 </div>
//             )}
//             {demandeDetails && (
//                 <div>
//                     <label>Projet Code:</label>
//                     <input type="text" value={projetCode} onChange={handleProjetCodeChange} />
//                     <button onClick={fetchProjetDetails}>Fetch Projet Details</button>
//                 </div>
//             )}
//             {projetDetails && (
//                 <div>
//                     <h3>Projet Details:</h3>
//                     <p>Code Projet: {projetDetails.code_Projet}</p>
//                     <p>Nom Projet: {projetDetails.nom_Projet}</p>
//                     <p>Date: {projetDetails.date}</p>
//                 </div>
//             )}
//             {demandeDetails && projetDetails && (
//                 <div>
//                     <button onClick={handleSubmit}>Create Achat</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Entree;

{/************************************************************************************************/}

////1
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';
// import { fetchAchatData } from '../store/achatSlice';
// import { postAchatData } from '../store/achatSlice';

// const Entree = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
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
//     console.log(achatData)
//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const fetchDemandeDetails = () => {
//         const demande = demandeData.find((d) => d.code === demandeCode);
//         // console.log("===>",demande)
//         setDemandeDetails(demande);
//     };

//     const fetchProjetDetails = () => {
//         const projet = projetData.find((p) => p.code_Projet == projetCode);
//         setProjetDetails(projet);
//     };

//     // const handleSubmit = () => {
//     //     const achatData = {
//     //         demandeCode,
//     //         projetCode,
//     //     };
//     //     dispatch(postAchatData(achatData));
//     // };
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Create achat with demande and projet data
//         if (demandeData && projetData) {
//             dispatch(postAchatData({ code: demandeCode, code_Projet: projetCode,  quantite:}));
//         } else {
//             console.error('Demande or Projet data not available');
//         }
//     };

//     return (
//         <div>
//             <h2>Achat Form</h2>
//            <ul>
//                 {achatData.map((achat) => (
//                     <li key={achat.id_Achat}>
//                         {achat.code} - {achat.designation} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
//                     </li>
//                 ))}
//             </ul>

//             <div>
//                 <label>Demande Code:</label>
//                 <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} />
//                 <button onClick={fetchDemandeDetails}>Fetch Demande Details</button>
//             </div>
//             {demandeDetails && (
//                 <div>
//                     <h3>Demande Details:</h3>
//                     <p>Code: {demandeDetails.code}</p>
//                     <p>Designation: {demandeDetails.designation}</p>
//                     <p>Quantité: {demandeDetails.quantité}</p>
//                 </div>
//             )}
//             {demandeDetails && (
//                 <div>
//                     <label>Projet Code:</label>
//                     <input type="text" value={projetCode} onChange={handleProjetCodeChange} />
//                     <button onClick={fetchProjetDetails}>Fetch Projet Details</button>
//                 </div>
//             )}
//             {projetDetails && (
//                 <div>
//                     <h3>Projet Details:</h3>
//                     <p>Code Projet: {projetDetails.code_Projet}</p>
//                     <p>Nom Projet: {projetDetails.nom_Projet}</p>
//                     <p>Date: {projetDetails.date}</p>
//                 </div>
//             )}
//             {demandeDetails && projetDetails && (
//                 <div>
//                     <button onClick={handleSubmit}>Create Achat</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Entree;

{/************************************************************************************************/}
//OLD
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAchatData, postAchatData } from '../store/achatSlice';

// const Entree = () => {
//     const dispatch = useDispatch();
//     const { achatData, loading, error } = useSelector((state) => state.achat);

//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
//     const [demandeData, setDemandeData] = useState(null);
//     const [projetData, setProjetData] = useState(null);
//     useEffect(() => {
//         dispatch(fetchAchatData());
//     }, [dispatch]);

//     const handleDemandeCodeChange = (e) => {
//         const code = e.target.value;
//         setDemandeCode(code);
//         // Fetch demande data based on the code
//         fetchDemandeData(code);
//     };

//     const handleProjetCodeChange = (e) => {
//         const code_Projet = e.target.value;
//         setProjetCode(code_Projet);
//         // Fetch projet data based on the code_Projet
//         fetchProjetData(code_Projet);
//     };

//     const fetchDemandeData = async (code) => {
//         try {
//             // Fetch demande data based on the code
//             const response = await fetch(`http://localhost:3000/demande/${code}`);
//             if (!response.ok) {
//                 throw new Error('Demande not found');
//             }
//             const data = await response.json();
//             setDemandeData(data);
//         } catch (error) {
//             console.error(error);
//             setDemandeData(null);
//         }
//     };

//     const fetchProjetData = async (code_Projet) => {
//         try {
//             // Fetch projet data based on the code_Projet
//             const response = await fetch(`http://localhost:3000/projet/${code_Projet}`);
//             if (!response.ok) {
//                 throw new Error('Projet not found');
//             }
//             const data = await response.json();
//             setProjetData(data);
//         } catch (error) {
//             console.error(error);
//             setProjetData(null);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Create achat with demande and projet data
//         if (demandeData && projetData) {
//             dispatch(postAchatData({ code: demandeCode, code_Projet: projetCode }));
//         } else {
//             console.error('Demande or Projet data not available');
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Demande Code:
//                     <input
//                         type="text"
//                         value={demandeCode}
//                         onChange={handleDemandeCodeChange}
//                     />
//                 </label>
//                 {demandeData && (
//                     <div>
//                         <p>Demande Data:</p>
//                         <p>Designation: {demandeData.designation}</p>
//                         <p>Quantite: {demandeData.quantite}</p>
//                     </div>
//                 )}
//                 <label>
//                     Projet Code:
//                     <input
//                         type="text"
//                         value={projetCode}
//                         onChange={handleProjetCodeChange}
//                     />
//                 </label>
//                 {projetData && (
//                     <div>
//                         <p>Projet Data:</p>
//                         <p>Nom Projet: {projetData.nom_Projet}</p>
//                         <p>Date: {projetData.date}</p>
//                     </div>
//                 )}
//                 <button type="submit" disabled={!demandeData || !projetData}>
//                     Create Achat
//                 </button>
//             </form>

//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             <ul>
//                 {achatData.map((achat) => (
//                     <li key={achat.id_Achat}>
//                         {achat.code} - {achat.designation} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Entree;
