import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatempoData, postAchatempoData } from '../store/achatempoSlice';
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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDemandeData());
        dispatch(fetchProjetData());
        dispatch(fetchAchatempoData());
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
                        date: formattedDate, // Add the formatted date to the payload
                        qte_Reçu:0
                    };
                    const response = await dispatch(postAchatempoData(achatPayload));
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
