
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateAchatData } from '../store/achatSlice';

// function ListeDemande() {
//     const { achatData } = useSelector(state => state.achat);
//     const authState = useSelector(state => state.auth);
//     const user = authState.user;
//     const dispatch = useDispatch();

//     // Filter the achatData based on the user_Dmd matching the current user's username
//     const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

//     // State to manage the qte_Reçu inputs
//     const [qteRecu, setQteRecu] = useState({});
//     console.log(filteredAchatData)
//     // Handle input change
//     const handleInputChange = (id, value) => {
//         setQteRecu(prevState => ({
//             ...prevState,
//             [id]: value,
//         }));
//     };

//     // Handle form submission
//     const handleFormSubmit = async (id) => {
//         const quantityReceived = qteRecu[id];
//         if (quantityReceived !== undefined) {
//             try {
//                 // Dispatch the updateAchatData action
//                 await dispatch(updateAchatData({
//                     id_Achat: id,
//                     updatedAchatData: { qte_Reçu: quantityReceived }
//                 }));
//                 alert('Quantity received updated successfully!');
//             } catch (error) {
//                 console.error('Error updating quantity received:', error);
//                 alert('Failed to update quantity received.');
//             }
//         } else {
//             alert('Please enter a quantity received.');
//         }
//     };

//     // Calculate status based on qte_Reçu and quantite
//     const getStatus = (quantite, qteRecu) => {
//         if (qteRecu === 0) {
//             return 'Pending';
//         } else if (quantite > qteRecu) {
//             return 'Partiellement livré';
//         } else if (quantite == qteRecu) {
//             return 'Livré';
//         } else {
//             return 'Unknown'; // This is a fallback for any unexpected cases
//         }
//     };

//     return (
//         <div>
//             <h1>Achat Data Table</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Code</th>
//                         <th>Quantite en Stock</th>
//                         <th>Quantite</th>
//                         <th>User</th>
//                         <th>Quantite Reçu</th>
//                         <th>Quantite Reçu</th>
//                         <th>Action</th>
//                         <th>Status</th> {/* Added Status header */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredAchatData.map((data, index) => (
//                         <tr key={index}>
//                             <td>{data.code}</td>
//                             <td>{data.qte_En_Stock}</td>
//                             <td>{data.quantite}</td>
//                             <td>{data.user_Dmd}</td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     value={qteRecu[data.id_Achat] || ''}
//                                     onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
//                                 />
//                             </td>
//                             <td>
//                                 {data.qte_Reçu}
//                             </td>
//                             <td>
//                                 <button onClick={() => handleFormSubmit(data.id_Achat)}>Quantite Reçu</button>
//                             </td>
//                             <td>
//                                 {getStatus(data.quantite, data.qte_Reçu)} {/* Calculated Status */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ListeDemande;



import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAchatData } from '../store/achatSlice';

function ListeDemande() {
    const { achatData } = useSelector(state => state.achat);
    const authState = useSelector(state => state.auth);
    const user = authState.user;
    const dispatch = useDispatch();

    // Filter the achatData based on the user_Dmd matching the current user's username
    const filteredAchatData = achatData.filter(data => data.user_Dmd === user.username);

    // State to manage the qte_Reçu inputs and update status
    const [qteRecu, setQteRecu] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Handle input change
    const handleInputChange = (id, value) => {
        setQteRecu(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (id) => {
        const quantityReceived = qteRecu[id];
        if (quantityReceived !== undefined) {
            try {
                // Dispatch the updateAchatData action
                await dispatch(updateAchatData({
                    id_Achat: id,
                    updatedAchatData: { qte_Reçu: quantityReceived }
                }));
                setUpdateSuccess(true);
            } catch (error) {
                console.error('Error updating quantity received:', error);
                alert('Failed to update quantity received.');
            }
        } else {
            alert('Please enter a quantity received.');
        }
    };

    // Reload the page when update is successful
    useEffect(() => {
        if (updateSuccess) {
            window.location.reload();
        }
    }, [updateSuccess]);

    // Calculate status based on qte_Reçu and quantite
    const getStatus = (quantite, qteRecu) => {
        if (qteRecu === 0) {
            return 'Pending';
        } else if (quantite > qteRecu) {
            return 'Partiellement livré';
        } else if (quantite === qteRecu) {
            return 'Livré';
        } else {
            return 'Unknown'; // This is a fallback for any unexpected cases
        }
    };

    return (
        <div>
            <h1>Achat Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Quantite en Stock</th>
                        <th>Quantite</th>
                        <th>User</th>
                        <th>Quantite Reçu</th>
                        <th>Quantite Reçu</th>
                        <th>Action</th>
                        <th>Status</th> {/* Added Status header */}
                    </tr>
                </thead>
                <tbody>
                    {filteredAchatData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.code}</td>
                            <td>{data.qte_En_Stock}</td>
                            <td>{data.quantite}</td>
                            <td>{data.user_Dmd}</td>
                            <td>
                                <input
                                    type="number"
                                    value={qteRecu[data.id_Achat] || ''}
                                    onChange={(e) => handleInputChange(data.id_Achat, e.target.value)}
                                />
                            </td>
                            <td>
                                {data.qte_Reçu}
                            </td>
                            <td>
                                <button onClick={() => handleFormSubmit(data.id_Achat)}>Quantite Reçu</button>
                            </td>
                            <td>
                                {getStatus(data.quantite, data.qte_Reçu)} {/* Calculated Status */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListeDemande;
