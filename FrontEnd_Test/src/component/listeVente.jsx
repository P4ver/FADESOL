
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVenteData } from '../store/venteSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import logo from '../pictures/logo.png';

const ListeVente = () => {
    const dispatch = useDispatch();
    const { venteData } = useSelector((state) => state.vente);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const handleDelete = (id_Vente) => {
        dispatch(deleteVenteData(id_Vente));
    };

    const handlePrint = () => {
        const printContents = document.getElementById('print-area').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload to restore original content
    };

    return (
        <div>
            <table className="min-w-full table-auto bg-white border border-gray-200">
                <thead>
                    <tr className='bg-green-600 text-white'>
                        <th className="px-4 py-2">Code</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Quantite</th>
                        <th className="px-4 py-2">N° Serie</th>
                        <th className="px-4 py-2">Code Projet</th>
                        <th className="px-4 py-2">Nom Projet</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {venteData.map((vente, index) => (
                        <tr key={vente.id_Vente} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="border px-4 py-2">{vente.code_Produit}</td>
                            <td className="border px-4 py-2">{vente.designation_Produit}</td>
                            <td className="border px-4 py-2">{vente.qte_Produit}</td>
                            <td className="border px-4 py-2">{vente.n_Serie}</td>
                            <td className="border px-4 py-2">{vente.code_Projet}</td>
                            <td className="border px-4 py-2">{vente.nom_Projet}</td>
                            <td className="border px-4 py-2 text-center">
                                <button onClick={() => handleDelete(vente.id_Vente)} className="text-red-600 hover:text-red-800">
                                    <RiDeleteBinFill />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center">
                <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md" onClick={handlePrint}>Imprimer</button>
            </div>

            <div id="print-area" className="hidden">
                <div className='w-32 mx-auto'>
                    <img src={logo} alt="Logo" />
                </div>
                <h5 className='mt-4'>Demande Vente</h5>
                <table className='w-full shadow-lg'>
                    <tbody>
                        {[
                            { label: 'User', value: venteData[0]?.user_Dmd }
                        ].map((item, idx) => (
                            <tr key={idx}>
                                <td className="text-xl"><h6>{item.label}</h6></td>
                                <td className="text-xl">: {item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                <div className='my-4'>
                    <table className="w-full border-collapse border border-green-800 rounded-lg shadow-sm">
                        <thead>
                            <tr className='border'>
                                <th className="border border-black text-sm font-semibold text-center ">Code</th>
                                <th className="border border-black text-sm font-semibold text-center ">Désignation</th>
                                <th className="border border-black text-sm font-semibold text-center ">Quantité</th>
                                <th className="border border-black text-sm font-semibold text-center ">Numero de serie</th>
                                <th className="border border-black text-sm font-semibold text-center ">Projet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venteData.map((item, idx) => (
                                <tr key={idx} className='border'>
                                    <td className="border border-black text-sm text-center ">{item.code_Produit}</td>
                                    <td className="border border-black text-sm text-center ">{item.designation_Produit}</td>
                                    <td className="border border-black text-sm text-center ">{item.qte_Produit}</td>
                                    <td className="border border-black text-sm text-center ">{item.n_Serie}</td>
                                    <td className="border border-black text-sm text-center ">{item.nom_Projet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div className='my-2 float-right'><p className="text-xl">Signature<span className='text-gray-200'>_</span></p></div>
            </div>
        </div>
    );
};

export default ListeVente;
