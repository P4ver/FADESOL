

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchDemandeData } from '../store/demandeSlice';
// import { fetchProjetData } from '../store/projetSlice';

// export default function Demande() {
//     const [searchCode, setSearchCode] = useState('');
//     const [selectedDemande, setSelectedDemande] = useState(null);
//     const [demandeList, setDemandeList] = useState([]); // State for demande list

//     const [searchProjetCode, setSearchProjetCode] = useState('');
//     const [selectedProjet, setSelectedProjet] = useState(null);
//     const [projetList, setProjetList] = useState([]); // State for projet list

//     const dispatch = useDispatch();

//     const { demandeData, loading, error } = useSelector((state) => state.demande);
//     const { projetData, loading: projetLoading, error: projetError } = useSelector((state) => state.projet);

//     useEffect(() => {
//         dispatch(fetchDemandeData());
//         dispatch(fetchProjetData());
//     }, [dispatch]);


//     useEffect(() => {
//         if (searchCode) {
//             const foundDemande = demandeData.find(d => d.code === searchCode);
//             setSelectedDemande(foundDemande || null);
//         } else {
//             setSelectedDemande(null);
//         }
//     }, [searchCode, demandeData]);

//     useEffect(() => {
//         if (searchProjetCode) {
//             const foundProjet = projetData.find(p => p.code_Projet.toString() === searchProjetCode);
//             setSelectedProjet(foundProjet || null);
//         } else {
//             setSelectedProjet(null);
//         }
//     }, [searchProjetCode, projetData]);

//     const handleCodeChange = (e) => {
//         setSearchCode(e.target.value);
//     };

//     const handleProjetCodeChange = (e) => {
//         setSearchProjetCode(e.target.value);
//     };

//     const handleAddDemande = () => {
//         if (selectedDemande) {
//             setDemandeList([...demandeList, selectedDemande]);
//             setSearchCode(''); // Clear the search code after adding to the list
//         }
//     };

//     const handleAddProjet = () => {
//         if (selectedProjet) {
//             setProjetList([...projetList, selectedProjet]);
//             setSearchProjetCode(''); // Clear the search code after adding to the list
//         }
//     };

//     const handleDeleteDemande = (index) => {
//         const updatedList = [...demandeList];
//         updatedList.splice(index, 1);
//         setDemandeList(updatedList);
//     };

//     const handleDeleteProjet = (index) => {
//         const updatedList = [...projetList];
//         updatedList.splice(index, 1);
//         setProjetList(updatedList);
//     };

//     const handleDeliveredChange = (index, checked) => {
//         const updatedList = [...demandeList];
//         updatedList[index].delivered = checked;
//         setDemandeList(updatedList);
//     };

//     return (
//         <div>
//             <div>
//                 <h1>Demande</h1>
//                 <input
//                     type="text"
//                     placeholder="Enter demande code"
//                     value={searchCode}
//                     onChange={handleCodeChange}
//                 />
//                 <button onClick={handleAddDemande}>Add Demande</button> {/* Button to add selected demand */}
//                 {demandeList.length > 0 && (
//                     <div>
//                         <h2>Demande List:</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Code</th>
//                                         <th>Designation</th>
//                                         <th>Quantité en Stock</th>
//                                         <th>Delivered</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {demandeList.map((demande, index) => (
//                                         <tr key={index}>
//                                             <td>{demande.code}</td>
//                                             <td>{demande.designation}</td>
//                                             <td>{demande.quantité}</td>
//                                             <td>
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={demande.delivered}
//                                                     onChange={(e) => handleDeliveredChange(index, e.target.checked)}
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <button onClick={() => handleDeleteDemande(index)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                     </div>
//                 )}
//                 {selectedDemande && (
//                     <div>
//                         <h2>Selected Demande:</h2>
//                         <p>{selectedDemande.code}</p>
//                         <p>{selectedDemande.designation}</p>
//                         <p>{selectedDemande.quantité}</p>
//                     </div>
//                 )}

                    
//             </div>

//             <div>
//                 <h1>Projet</h1>
//                 <input
//                     type="text"
//                     placeholder="Enter projet code"
//                     value={searchProjetCode}
//                     onChange={handleProjetCodeChange}
//                 />
//                 <button onClick={handleAddProjet}>Add Projet</button>
//                 {projetList.length > 0 && (
//                     <div>
//                         <h2>Projet List:</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Code Projet</th>
//                                     <th>Nom Projet</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {projetList.map((projet, index) => (
//                                     <tr key={index}>
//                                         <td>{projet.code_Projet}</td>
//                                         <td>{projet.nom_Projet}</td>
//                                         <td>
//                                             <button onClick={() => handleDeleteProjet(index)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 {selectedProjet && (
//                     <div>
//                         <h2>Selected Projet:</h2>
//                         <p>{selectedProjet.code_Projet}</p>
//                         <p>{selectedProjet.nom_Projet}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';

export default function Demande() {
    const [demandeCode, setDemandeCode] = useState('');
    const [projetCode, setProjetCode] = useState('');
    const [rowData, setRowData] = useState([]); // State for combined row data

    const dispatch = useDispatch();

    const { demandeData, loading: demandeLoading, error: demandeError } = useSelector((state) => state.demande);
    const { projetData, loading: projetLoading, error: projetError } = useSelector((state) => state.projet);

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
    }, [dispatch]);

    const handleDemandeCodeChange = (e) => {
        setDemandeCode(e.target.value);
    };

    const handleProjetCodeChange = (e) => {
        setProjetCode(e.target.value);
    };

    const handleAddData = () => {
        const selectedDemande = demandeData.find(d => d.code === demandeCode);
        const selectedProjet = projetData.find(p => p.code_Projet.toString() === projetCode);
        if (selectedDemande && selectedProjet) {
            setRowData([...rowData, { demande: selectedDemande, projet: selectedProjet }]);
            setDemandeCode(''); // Clear the demande code after adding to the list
            setProjetCode(''); // Clear the projet code after adding to the list
        }
    };
    const handleDeleteRow = (index) => {
        const updatedRowData = [...rowData];
        updatedRowData.splice(index, 1);
        setRowData(updatedRowData);
    };

    return (
        <div>
            <div>
                <h1>Demande</h1>
                <input
                    type="text"
                    placeholder="Enter demande code"
                    value={demandeCode}
                    onChange={handleDemandeCodeChange}
                />
                <input
                    type="text"
                    placeholder="Enter projet code"
                    value={projetCode}
                    onChange={handleProjetCodeChange}
                />
                <button onClick={handleAddData}>Add</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Designation</th>
                                <th>Quantité en Stock</th>
                                <th>Quantité</th>
                                <th>Projet Code</th>
                                <th>Nom Projet</th>
                                <th>Delivered</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.demande.code}</td>
                                    <td>{row.demande.designation}</td>
                                    <td>{row.demande.quantité}</td>
                                    <td><input type="text" /></td>
                                    <td>{row.projet.code_Projet}</td>
                                    <td>{row.projet.nom_Projet}</td>
                                    <td>{row.demande.delivered || '-'}</td>
                                    <td>
                                        <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

