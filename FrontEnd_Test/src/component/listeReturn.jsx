

//resolve the problem of lower case i think
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReturnData } from '../store/returnSlice';
import { RiDeleteBinFill } from "react-icons/ri";
import logo from '../pictures/logo.png';

const ListeReturn = () => {
    const dispatch = useDispatch();
    const { returnData } = useSelector((state) => state.return);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    console.log("from list  user ==+>",user)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20); // Display 5 items per page
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id_Return) => {
        dispatch(deleteReturnData(id_Return));
    };

    const handlePrint = () => {
        const printContents = document.getElementById('print-area').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload to restore original content
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    console.log("return data", returnData)
    const filteredData = returnData.filter(item =>
        (item.code_Produit && item.code_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.designation_Produit && item.designation_Produit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.qte_Produit && item.qte_Produit.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.n_Serie && item.n_Serie.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.code_Projet && item.code_Projet.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nom_Projet && item.nom_Projet.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.reverse().filter(data => data.user_Dmd === user.username).slice(indexOfFirstItem, indexOfLastItem);
    const currentItems2 = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    console.log("======>>>>old",currentItems)
    console.log("======>>>>new",currentItems2)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 300000); // Refresh every 5 minutes (300000 milliseconds)

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    return (
        <div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded py-2 px-4 w-1/3"
                />
            </div>
            <table className="w-full table-auto bg-white border border-gray-200">
                <thead>
                    <tr className='bg-green-600 text-white'>
                        <th className="px-4 py-2">Code</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Quantite</th>
                        <th className="px-4 py-2">N° Serie</th>
                        <th className="px-4 py-2">Code Projet</th>
                        <th className="px-4 py-2">Nom Projet</th>
                        <th className="px-4 py-2">User</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((returnItem, index) => (
                        <tr key={returnItem.id_Return} className={index % 2 === 0 ? 'bg-gray-100' : ''}>

                            <td className="border px-4 py-2">{returnItem.code_Produit}</td>
                            <td className="border px-4 py-2">{returnItem.designation_Produit}</td>
                            <td className="border px-4 py-2">{returnItem.qte_Produit}</td>
                            <td className="border px-4 py-2">{returnItem.n_Serie}</td>
                            <td className="border px-4 py-2">{returnItem.code_Projet}</td>
                            <td className="border px-4 py-2">{returnItem.nom_Projet}</td>
                            <td className="border px-4 py-2">{returnItem.user_Dmd}</td>
                            <td className="border px-4 py-2 text-center">

                                <button onClick={() => handleDelete(returnItem.id_Return)} className="text-red-600 hover:text-red-800">
                                    <RiDeleteBinFill />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center items-center space-x-4">
                <button
                    onClick={handlePrevious}
                    className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNext}
                    className={`py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="mt-4 flex justify-center">
                <button className="bg-customBlue text-white py-2 px-4 mx-2 rounded-md hover:bg-blue-700" onClick={handlePrint}>Imprimer</button>
            </div>

            <div id="print-area" className="hidden">
                <div className='w-32 mx-auto'>
                    <img src={logo} alt="Logo" />
                </div>
                <h5 className='mt-4'>Demande Retour</h5>
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className="text-xl">USER : {authState.user.username}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />
                <div className='my-4'>
                    <table className="w-full border-collapse border border-green-800 rounded-lg shadow-sm">
                        <thead>
                            <tr className='border'>
                                <th className="border border-black text-sm font-semibold text-center">Code</th>
                                <th className="border border-black text-sm font-semibold text-center">Désignation</th>
                                <th className="border border-black text-sm font-semibold text-center">Quantité</th>
                                <th className="border border-black text-sm font-semibold text-center">Numéro de série</th>
                                <th className="border border-black text-sm font-semibold text-center">Projet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnData.map((item, idx) => (
                                <tr key={idx} className='border'>
                                    <td className="border border-black text-sm text-center">{item.code_Produit}</td>
                                    <td className="border border-black text-sm text-center">{item.designation_Produit}</td>
                                    <td className="border border-black text-sm text-center">{item.qte_Produit}</td>
                                    <td className="border border-black text-sm text-center">{item.n_Serie}</td>
                                    <td className="border border-black text-sm text-center">{item.nom_Projet}</td>
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

export default ListeReturn;