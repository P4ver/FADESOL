import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchAchatData, postAchatData } from '../store/achatSlice';

const Entree = () => {
    const [demandeCode, setDemandeCode] = useState('');
    const [projetCode, setProjetCode] = useState('');
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

    const handleDemandeCodeChange = (e) => {
        setDemandeCode(e.target.value);
    };

    const handleProjetCodeChange = (e) => {
        setProjetCode(e.target.value);
    };

    const fetchDemandeDetails = () => {
        const demande = demandeData.find((d) => d.code === demandeCode);
        setDemandeDetails(demande);
    };

    const fetchProjetDetails = () => {
        const projet = projetData.find((p) => p.code_Projet == projetCode);
        setProjetDetails(projet);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (demandeDetails && projetDetails) {
            const achatPayload = {
                code: demandeDetails.code,
                designation: demandeDetails.designation,
                quantite: demandeDetails.quantité,
                code_Projet: projetDetails.code_Projet,
                nom_Projet: projetDetails.nom_Projet,
                date: projetDetails.date,
            };
            dispatch(postAchatData(achatPayload));
        } else {
            console.error('Demande or Projet details are not available');
        }
    };

    return (
        <div>
            <h2>Achat Form</h2>
            <ul>
                {achatData.map((achat) => (
                    <li key={achat.id_Achat}>
                        {achat.code} - {achat.designation} - {achat.quantite} - {achat.code_Projet} - {achat.nom_Projet} - {achat.date}
                    </li>
                ))}
            </ul>

            <div>
                <label>Demande Code:</label>
                <input type="text" value={demandeCode} onChange={handleDemandeCodeChange} />
                <button onClick={fetchDemandeDetails}>Fetch Demande Details</button>
            </div>
            {demandeDetails && (
                <div>
                    <h3>Demande Details:</h3>
                    <p>Code: {demandeDetails.code}</p>
                    <p>Designation: {demandeDetails.designation}</p>
                    <p>Quantité: {demandeDetails.quantité}</p>
                </div>
            )}
            {demandeDetails && (
                <div>
                    <label>Projet Code:</label>
                    <input type="text" value={projetCode} onChange={handleProjetCodeChange} />
                    <button onClick={fetchProjetDetails}>Fetch Projet Details</button>
                </div>
            )}
            {projetDetails && (
                <div>
                    <h3>Projet Details:</h3>
                    <p>Code Projet: {projetDetails.code_Projet}</p>
                    <p>Nom Projet: {projetDetails.nom_Projet}</p>
                    <p>Date: {projetDetails.date}</p>
                </div>
            )}
            {demandeDetails && projetDetails && (
                <div>
                    <button onClick={handleSubmit}>Create Achat</button>
                </div>
            )}
        </div>
    );
};

export default Entree;

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
