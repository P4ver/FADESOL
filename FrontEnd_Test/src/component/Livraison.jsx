
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAchatData } from '../store/achatSlice';
import { RiDeleteBinFill } from "react-icons/ri";

const Livraisons = () => {
    const dispatch = useDispatch();
    const { achatData, loading, error } = useSelector((state) => state.achat);

    useEffect(() => {
        dispatch(fetchAchatData());
    }, [dispatch]);


    const achatsLivres = achatData.filter(achat => achat.check_Delivery);

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">Achats Livrés</h1>
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
                        </tr>
                    </thead>
                    <tbody>
                        {achatsLivres.map((achat, index) => (
                            <tr key={achat.id_Achat} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{achat.code}</td>
                                <td className="border px-4 py-2">{achat.designation}</td>
                                <td className="border px-4 py-2">{achat.qte_En_Stock}</td>
                                <td className="border px-4 py-2">{achat.quantite}</td>
                                <td className="border px-4 py-2">{achat.code_Projet}</td>
                                <td className="border px-4 py-2">{achat.nom_Projet}</td>
                                <td className="border px-4 py-2">{achat.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="mt-4 flex justify-center">
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" >Valide</button>
                </div>
            
            </div>
        </div>
    );
};

export default Livraisons;
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';

// export default function Demande() {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [projetCode, setProjetCode] = useState('');
//     const [rowData, setRowData] = useState([]); // State for combined row data

//     const dispatch = useDispatch();

//     const { demandeData, loading: demandeLoading, error: demandeError } = useSelector((state) => state.demande);
//     const { projetData, loading: projetLoading, error: projetError } = useSelector((state) => state.projet);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//     }, [dispatch]);

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setProjetCode(e.target.value);
//     };

//     const handleAddData = () => {
//         const selectedDemande = demandeData.find(d => d.code === demandeCode);
//         const selectedProjet = projetData.find(p => p.code_Projet.toString() === projetCode);
//         if (selectedDemande && selectedProjet) {
//             setRowData([...rowData, { demande: selectedDemande, projet: selectedProjet }]);
//             setDemandeCode(''); // Clear the demande code after adding to the list
//             setProjetCode(''); // Clear the projet code after adding to the list
//         }
//     };
//     // console.log("=*=>",rowData)
//     const handleDeleteRow = (index) => {
//         const updatedRowData = [...rowData];
//         updatedRowData.splice(index, 1);
//         setRowData(updatedRowData);
//     };

//     return (
//         <div>
//             <div>
//                 <h1>Demande</h1>
//                 <input
//                     type="text"
//                     placeholder="Enter demande code"
//                     value={demandeCode}
//                     onChange={handleDemandeCodeChange}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Enter projet code"
//                     value={projetCode}
//                     onChange={handleProjetCodeChange}
//                 />
//                 <button onClick={handleAddData}>Add</button>
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Code</th>
//                                 <th>Designation</th>
//                                 <th>Quantité en Stock</th>
//                                 <th>Quantité</th>
//                                 <th>Projet Code</th>
//                                 <th>Nom Projet</th>
//                                 <th>Delivered</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {rowData.map((row, index) => (
//                                 <tr key={index}>
//                                     <td>{row.demande.code}</td>
//                                     <td>{row.demande.designation}</td>
//                                     <td>{row.demande.quantité}</td>
//                                     <td><input type="text" /></td>
//                                     <td>{row.projet.code_Projet}</td>
//                                     <td>{row.projet.nom_Projet}</td>
//                                     <td>{row.demande.delivered || '-'}</td>
//                                     <td>
//                                         <button onClick={() => handleDeleteRow(index)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

