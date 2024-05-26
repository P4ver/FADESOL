
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
    // console.log("=*=>",rowData)
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

