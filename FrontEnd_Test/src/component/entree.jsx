

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatData, postAchatData, updateAchatData, deleteAchatData } from '../store/achatSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import Switch from "@mui/material/Switch";
import { Link } from 'react-router-dom'

const Entree = () => {
    const [demandeCode, setDemandeCode] = useState('');
    const [projetCode, setProjetCode] = useState('');
    const [quantite, setQuantite] = useState('');
    const [demandeDetails, setDemandeDetails] = useState(null);
    const [projetDetails, setProjetDetails] = useState(null);
    const [checkDelivery, setCheckDelivery] = useState(false);
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
                check_Delivery: checkDelivery,
            };
            dispatch(postAchatData(achatPayload));
        } else {
            console.error('Demande or Projet details or quantite are not available');
        }
    };
    
    const handleDelete = (id_Achat) => {
        dispatch(deleteAchatData(id_Achat));
    };

    const handleCheckDeliveryChange = (e) => {
        setCheckDelivery(e.target.checked);
    };

    const toggleStatus = async (id_Achat, currentStatus) => {
        try {
            const updatedAchat = achatData.find(item => item.id_Achat === id_Achat);
            console.log("update",updatedAchat)
            // console.log("qsdfsdqf",currentStatus)
            if (updatedAchat) {
                const updatedStatus = currentStatus == 1 ? 0 : 1;
                console.log("updatedStatus",updatedStatus)
                const updatedAchatData = { ...updatedAchat, check_Delivery: updatedStatus };
                await dispatch(updateAchatData({ id_Achat, updatedAchatData }));
            }
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="container mx-auto p-4 w-full">
            <div className="text-center bg-customBlue text-white py-2 mb-4">
                <h1 className="text-2xl font-bold">OPERATION MAGASINIER</h1>
            </div>
            <div className="max-w-md mx-auto flex justify-center items-center">
                <div className="mb-4 flex">
                    <div className="mr-2 w-60">
                        <label className="block text-sm font-bold mb-2">Demande Code:</label>
                        <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
                    </div>
                    {demandeDetails && (
                        <div className="mr-2">
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
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Delivery:</label>
                    <input
                        type="checkbox"
                        checked={checkDelivery}
                        onChange={handleCheckDeliveryChange}
                    />
                </div>
                <div className="mb-4 ml-10">
                    <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
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
                                {/* <td className="border px-4 py-2">{achat.check_Delivery}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Switch
                                        checked={achat.check_Delivery}
                                        onChange={() => toggleStatus(achat.id_Achat, achat.check_Delivery)}
                                    />
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <button onClick={() => handleDelete(achat.id_Achat)} className="text-red-600 hover:text-red-800">
                                        <RiDeleteBinFill />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
                    <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Transformer</button>
                    <Link to="/demande" className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md">Voir Livraisons</Link>
                </div>
            </div>
        </div>
    );
};

export default Entree;