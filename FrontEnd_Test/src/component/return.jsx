
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchVenteData } from '../store/venteSlice';
// import { fetchProductData, updateQteMagasin } from '../store/productSlice';
// import { fetchReturnData, postReturnData } from '../store/returnSlice';

// const Return = () => {
//   const [demandeCode, setDemandeCode] = useState('');
//   const [quantite, setQuantite] = useState('');
//   const [venteDetails, setVenteDetails] = useState(null);
//   const dispatch = useDispatch();

//   const { venteData } = useSelector((state) => state.vente);
//   const { productData } = useSelector((state) => state.product);
//   const { returnData, loading, error } = useSelector((state) => state.return);


// // Your other component code

//   console.log("returnData==>===>",returnData)
//   useEffect(() => {
//     dispatch(fetchVenteData());
//     dispatch(fetchProductData());
//     dispatch(fetchReturnData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (demandeCode) {
//       const selectedVente = venteData.find(vente => vente.code_Produit === demandeCode);
//       if (selectedVente) {
//         setVenteDetails(selectedVente);
//       } else {
//         setVenteDetails(null);
//       }
//     }
//   }, [demandeCode, venteData]);

//   const handleDemandeCodeChange = (e) => {
//     setDemandeCode(e.target.value);
//   };


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (venteDetails && quantite) {
//       const newReturnDetails = {
//         code_Produit: venteDetails.code_Produit,
//         designation_Produit: venteDetails.designation_Produit,
//         qte_Produit: parseInt(quantite, 10),
//         n_Serie: venteDetails.n_Serie,
//         code_Projet: venteDetails.code_Projet,
//         nom_Projet: venteDetails.nom_Projet
//       };

//       const product = productData.find(product => product.Numéro_Article === venteDetails.code_Produit);
//       if (product) {
//         const newQteMagasin = product.qte_Magasin + parseInt(quantite, 10);

//         await dispatch(updateQteMagasin({
//           productId: product.id_Article,
//           qte_Magasin: newQteMagasin
//         }));

//         await dispatch(postReturnData(newReturnDetails))
//           .then(response => {
//             console.log("Post Return Data Response:", response);
//             // Clear the input fields on successful submission
//             setVenteDetails(null);
//             setQuantite('');
//           })
//           .catch(error => {
//             console.error("Post Return Data Error:", error);
//           });
//       } else {
//         console.error('Product not found in stock');
//       }
//     } else {
//       console.error('Vente details or quantite are not available');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex space-x-4 mb-4">
//         <div className="w-1/5">
//           <label className="block text-sm font-bold mb-2">Article Code:</label>
//           <input
//             type="text"
//             value={demandeCode}
//             placeholder='Enter code'
//             onChange={handleDemandeCodeChange}
//             className="w-full border rounded py-2 px-3"
//           />
//         </div>
//         {venteDetails && (
//           <>
//             <div className="w-1/5">
//               <label className="block text-sm font-bold mb-2">Description:</label>
//               <input
//                 type="text"
//                 value={venteDetails.designation_Produit}
//                 className="w-full border rounded py-2 px-3"
//                 disabled
//               />
//             </div>
//             <div className="w-1/5">
//               <label className="block text-sm font-bold mb-2">Projet Code:</label>
//               <input
//                 type="text"
//                 value={venteDetails.code_Projet}
//                 className="w-full border rounded py-2 px-3"
//                 disabled
//               />
//             </div>
//             <div className="w-1/5">
//               <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//               <input
//                 type="text"
//                 value={venteDetails.nom_Projet}
//                 className="w-full border rounded py-2 px-3"
//                 disabled
//               />
//             </div>
//             <div className="w-1/5">
//               <label className="block text-sm font-bold mb-2">N° Serie:</label>
//               <input
//                 type="text"
//                 value={venteDetails.n_Serie}
//                 className="w-full border rounded py-2 px-3"
//                 disabled
//               />
//             </div>
//             <div className="w-1/5">
//               <label className="block text-sm font-bold mb-2">Old Quantite:</label>
//               <input
//                 type="number"
//                 value={venteDetails.qte_Produit}
//                 className="w-full border rounded py-2 px-2"
//                 disabled
//               />
//             </div>
//           </>
//         )}
//         <div className="w-1/5">
//           <label className="block text-sm font-bold mb-2">Quantite:</label>
//           <input
//             type="number"
//             value={quantite}
//             placeholder='0'
//             onChange={(e) => setQuantite(e.target.value)}
//             className="w-full border rounded py-2 px-2"
//           />
//         </div>
//       </div>
//       <div className="flex justify-start">
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
//           Create
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Return;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenteData } from '../store/venteSlice';
import { fetchProductData, updateQteMagasin } from '../store/productSlice';
import { fetchReturnData, postReturnData } from '../store/returnSlice';
import Swal from 'sweetalert2';

const Return = () => {
  const [demandeCode, setDemandeCode] = useState('');
  const [quantite, setQuantite] = useState('');
  const [venteDetails, setVenteDetails] = useState(null);
  const dispatch = useDispatch();

  const { venteData } = useSelector((state) => state.vente);
  const { productData } = useSelector((state) => state.product);
  const { returnData, loading, error } = useSelector((state) => state.return);

  useEffect(() => {
    dispatch(fetchVenteData());
    dispatch(fetchProductData());
    dispatch(fetchReturnData());
  }, [dispatch]);

  useEffect(() => {
    if (demandeCode) {
      const selectedVente = venteData.find(vente => vente.code_Produit === demandeCode);
      if (selectedVente) {
        setVenteDetails(selectedVente);
      } else {
        setVenteDetails(null);
      }
    }
  }, [demandeCode, venteData]);

  const handleDemandeCodeChange = (e) => {
    setDemandeCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (venteDetails && quantite) {
      const newReturnDetails = {
        code_Produit: venteDetails.code_Produit,
        designation_Produit: venteDetails.designation_Produit,
        qte_Produit: parseInt(quantite, 10),
        n_Serie: venteDetails.n_Serie,
        code_Projet: venteDetails.code_Projet,
        nom_Projet: venteDetails.nom_Projet
      };

      const product = productData.find(product => product.Numéro_Article === venteDetails.code_Produit);
      if (product) {
        const newQteMagasin = product.qte_Magasin + parseInt(quantite, 10);

        await dispatch(updateQteMagasin({
          productId: product.id_Article,
          qte_Magasin: newQteMagasin
        }));

        await dispatch(postReturnData(newReturnDetails))
          .then(response => {
            console.log("Post Return Data Response:", response);
            // Show success notification
            Swal.fire({
              title: 'Success',
              text: 'Entrée effectuée avec succès dans le stock',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            // Clear the input fields on successful submission
            setDemandeCode('');
            setVenteDetails(null);
            setQuantite('');
          })
          .catch(error => {
            console.error("Post Return Data Error:", error);
          });
      } else {
        console.error('Product not found in stock');
      }
    } else {
      console.error('Vente details or quantite are not available');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <div className="w-1/5">
          <label className="block text-sm font-bold mb-2">Article Code:</label>
          <input
            type="text"
            value={demandeCode}
            placeholder='Enter code'
            onChange={handleDemandeCodeChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        {venteDetails && (
          <>
            <div className="w-1/5">
              <label className="block text-sm font-bold mb-2">Description:</label>
              <input
                type="text"
                value={venteDetails.designation_Produit}
                className="w-full border rounded py-2 px-3"
                disabled
              />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-bold mb-2">Projet Code:</label>
              <input
                type="text"
                value={venteDetails.code_Projet}
                className="w-full border rounded py-2 px-3"
                disabled
              />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-bold mb-2">Nom Projet:</label>
              <input
                type="text"
                value={venteDetails.nom_Projet}
                className="w-full border rounded py-2 px-3"
                disabled
              />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-bold mb-2">N° Serie:</label>
              <input
                type="text"
                value={venteDetails.n_Serie}
                className="w-full border rounded py-2 px-3"
                disabled
              />
            </div>
            <div className="w-1/5">
              <label className="block text-sm font-bold mb-2">Old Quantite:</label>
              <input
                type="number"
                value={venteDetails.qte_Produit}
                className="w-full border rounded py-2 px-2"
                disabled
              />
            </div>
          </>
        )}
        <div className="w-1/5">
          <label className="block text-sm font-bold mb-2">Quantite:</label>
          <input
            type="number"
            value={quantite}
            placeholder='0'
            onChange={(e) => setQuantite(e.target.value)}
            className="w-full border rounded py-2 px-2"
          />
        </div>
      </div>
      <div className="flex justify-start">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
          Create
        </button>
      </div>
    </div>
  );
};

export default Return;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchVenteData, postVenteData } from '../store/venteSlice';
// import { fetchProductData, updateQteMagasin } from '../store/productSlice';

// const Return = () => {
//     const [demandeCode, setDemandeCode] = useState('');
//     const [quantite, setQuantite] = useState('');
//     const [venteDetails, setVenteDetails] = useState(null);
//     const dispatch = useDispatch();

//     const { venteData, venteLoading, venteError } = useSelector((state) => state.vente);
//     const { productData } = useSelector((state) => state.product);

//     useEffect(() => {
//         dispatch(fetchVenteData());
//         dispatch(fetchProductData());
//     }, [dispatch]);

//     useEffect(() => {
//         if (demandeCode) {
//             const selectedVente = venteData.find(vente => vente.code_Produit === demandeCode);
//             if (selectedVente) {
//                 setVenteDetails(selectedVente);
//             } else {
//                 setVenteDetails(null);
//             }
//         }
//     }, [demandeCode, venteData]);

//     const handleDemandeCodeChange = (e) => {
//         setDemandeCode(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (venteDetails && quantite) {
//             const updatedVenteDetails = {
//                 ...venteDetails,
//                 qte_Produit: parseInt(quantite, 10)
//             };

//             // Find the corresponding product in productData to get current qte_Magasin
//             const product = productData.find(product => product.Numéro_Article === venteDetails.code_Produit);
//             if (product) {
//                 const newQteMagasin = product.qte_Magasin + parseInt(quantite, 10);

//                 // Update the product quantity in stock
//                 await dispatch(updateQteMagasin({
//                     productId: product.id_Article,
//                     qte_Magasin: newQteMagasin
//                 }));

//                 // Post the vente data
//                 await dispatch(postVenteData(updatedVenteDetails))
//                     .then(response => {
//                         console.log("Post Vente Data Response:", response);
//                     })
//                     .catch(error => {
//                         console.error("Post Vente Data Error:", error);
//                     });
//             } else {
//                 console.error('Product not found in stock');
//             }
//         } else {
//             console.error('Vente details or quantite are not available');
//         }
//     };

    

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <div className="flex space-x-4 mb-4">
//                 <div className="w-1/5">
//                     <label className="block text-sm font-bold mb-2">Article Code:</label>
//                     <input 
//                         type="text" 
//                         value={demandeCode} 
//                         placeholder='Enter code' 
//                         onChange={handleDemandeCodeChange} 
//                         className="w-full border rounded py-2 px-3" 
//                     />
//                 </div>
//                 {venteDetails && (
//                     <>
//                         <div className="w-1/5">
//                             <label className="block text-sm font-bold mb-2">Description:</label>
//                             <input 
//                                 type="text" 
//                                 value={venteDetails.designation_Produit} 
//                                 className="w-full border rounded py-2 px-3" 
//                                 disabled 
//                             />
//                         </div>
//                         <div className="w-1/5">
//                             <label className="block text-sm font-bold mb-2">Projet Code:</label>
//                             <input 
//                                 type="text" 
//                                 value={venteDetails.code_Projet} 
//                                 className="w-full border rounded py-2 px-3" 
//                                 disabled 
//                             />
//                         </div>
//                         <div className="w-1/5">
//                             <label className="block text-sm font-bold mb-2">Nom Projet:</label>
//                             <input 
//                                 type="text" 
//                                 value={venteDetails.nom_Projet} 
//                                 className="w-full border rounded py-2 px-3" 
//                                 disabled 
//                             />
//                         </div>
//                         <div className="w-1/5">
//                             <label className="block text-sm font-bold mb-2">N° Serie:</label>
//                             <input 
//                                 type="text" 
//                                 value={venteDetails.n_Serie} 
//                                 className="w-full border rounded py-2 px-3" 
//                                 disabled 
//                             />
//                         </div>
//                         <div className="w-1/5">
//                             <label className="block text-sm font-bold mb-2">Old Quantite:</label>
//                             <input 
//                                 type="number" 
//                                 value={venteDetails.qte_Produit} 
//                                 className="w-full border rounded py-2 px-2" 
//                                 disabled 
//                             />
//                         </div>
//                     </>
//                 )}
//                 <div className="w-1/5">
//                     <label className="block text-sm font-bold mb-2">Quantite:</label>
//                     <input 
//                         type="number" 
//                         value={quantite} 
//                         placeholder='0' 
//                         onChange={(e) => setQuantite(e.target.value)} 
//                         className="w-full border rounded py-2 px-2" 
//                     />
//                 </div>
//             </div>
//             <div className="flex justify-center">
//                 <button 
//                     onClick={handleSubmit} 
//                     className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
//                     Create
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Return;

