
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchVenteData, postVenteData } from '../store/venteSlice';
import { fetchProductData, updateQteMagasin } from '../store/productSlice';
import { fetchAchatempoData } from '../store/achatempoSlice';
import Swal from 'sweetalert2';
import { postHistoriqueData } from '../store/historiqueSlice';

const Sortie = () => {
  const [demandeCode, setDemandeCode] = useState('');
  const [projetCode, setProjetCode] = useState('');
  const [quantite, setQuantite] = useState('');
  const [n_Serie, setN_Serie] = useState('');
  const [demandeDetails, setDemandeDetails] = useState(null);
  const [projetDetails, setProjetDetails] = useState(null);
  const authState = useSelector(state => state.auth);
  const user = authState.user;

  console.log("from sortie user: ", user)
  const dispatch = useDispatch();

  const { demandeData, demandeLoading, demandeError } = useSelector((state) => state.demande);
  const { productData, prjloading, prjerror } = useSelector((state) => state.product);
  const { projetData, projetLoading, projetError } = useSelector((state) => state.projet);
  const { venteData, venteLoading, venteError } = useSelector((state) => state.vente);

  useEffect(() => {
    dispatch(fetchDemandeData());
    dispatch(fetchProjetData());
    dispatch(fetchAchatempoData());
    dispatch(fetchVenteData());
    dispatch(fetchProductData());
  }, [dispatch]);

  useEffect(() => {
    if (demandeCode) {
      const selectedDemande = productData.find(demande => demande.Numéro_Article === demandeCode || demande.code_Barre === demandeCode);
      if (selectedDemande) {
        setDemandeDetails(selectedDemande);
      }
    }
  }, [demandeCode, productData]);
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
    const selectedProjet = projetData.find(projet => projet.code_Projet === e.target.value);
    if (selectedProjet) {
      setProjetDetails(selectedProjet);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    if (demandeDetails && projetDetails && quantite && n_Serie) {
      const achatPayload = {
        code_Produit: demandeDetails.Numéro_Article,
        designation_Produit: demandeDetails.Description_Article,
        qte_Produit: parseInt(quantite, 10),
        // n_Serie: parseInt(n_Serie, 10),
        n_Serie: n_Serie,
        code_Projet: projetDetails.code_Projet,
        nom_Projet: projetDetails.nom_Projet,
        id_Article: demandeDetails.id_Article,
        user_Dmd: user.username
      };
      const historiqueData = {
        type_Op: "sortie",
        code_Produit: demandeDetails.Numéro_Article,
        designation_Produit: demandeDetails.Description_Article,
        qte_Produit: parseInt(quantite, 10),
        n_Serie: n_Serie,
        // n_Serie: parseInt(n_Serie, 10),
        code_Projet: projetDetails.code_Projet,
        nom_Projet: projetDetails.nom_Projet,
        user_Dmd: user.username,
        date_Op: currentDate,
      };
      const newQteMagasin = demandeDetails.qte_Magasin - parseInt(quantite, 10);
      await dispatch(updateQteMagasin({
        productId: demandeDetails.id_Article,
        qte_Magasin: newQteMagasin
      }));

      dispatch(postVenteData(achatPayload))
        .then(response => {
          console.log("Post Vente Data Response:", response);
          // Show success notification
          Swal.fire({
            title: 'Success',
            text: 'Sortie effectuée avec succès dans le stock',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          // Reset the input fields and state variables here
          setDemandeCode('');
          setProjetCode('');
          setQuantite('');
          setN_Serie('');
          setDemandeDetails(null);
          setProjetDetails(null);
        })
        .catch(error => {
          console.error("Post Vente Data Error:", error);
        });


      dispatch(postHistoriqueData(historiqueData))
        .then(response => {
          console.log("Post Vente Data Response:", response);
        })
        .catch(error => {
          console.error("Post Vente Data Error:", error);
        });
    } else {
      console.error('Demande or Projet details or quantite or n_Serie are not available');
    }
  };
  console.log("demandeDetails==>", demandeDetails)

  return (
    <div className="w-full mx-auto flex justify-center items-center">
      <div className="mb-4 flex">
        <div className="mr-2 w-32">
          <label className="block text-sm font-bold mb-2">Article Code:</label>
          <input type="text" value={demandeCode} placeholder='enter code' onChange={handleDemandeCodeChange} className="w-full border rounded py-2 px-3" />
        </div>
        {demandeDetails && (
          <>
          
          <div className="mr-2 w-60">
            <label className="block text-sm font-bold mb-2">Designation Fournisseur</label>
            <input type="text" value={demandeDetails.Description_Article} className="w-full border rounded py-2 px-3" disabled />
          </div>
          <div className="mr-2">
            <label className="block text-sm font-bold mb-2">Designation fadesol</label>
            <input type="text" value={demandeDetails.Designation_Fadesol} className="w-full border rounded py-2 px-3" disabled />
          </div>
          <div className="mr-2">
            <label className="block text-sm font-bold mb-2">Quantite Actual</label>
            <input type="text" value={demandeDetails.qte_Magasin} className="w-full border rounded py-2 px-3" disabled />
          </div>
          </>
        )}
      </div>
      <div className="mb-4 flex">
        <div className="mr-2 w-32">
          <label className="block text-sm font-bold mb-2">Projet Code:</label>
          <input type="text" value={projetCode} placeholder='Code de Projet' onChange={handleProjetCodeChange} className="w-full border rounded py-2 px-3" />
        </div>
        {/* {projetDetails && (
          <div className='mr-2'>
            <label className="block text-sm font-bold mb-2">Nom Projet:</label>
            <input type="text" value={projetDetails.nom_Projet} className="w-full border rounded py-2 px-3 " disabled />
          </div>
        )} */}
      </div>
      <div className="mb-4 mr-2 w-16">
        <label className="block text-sm font-bold mb-2">Quantite:</label>
        <input type="number" value={quantite} placeholder='0' onChange={(e) => setQuantite(e.target.value)} className="w-full border rounded py-2 px-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 w-20">N° Serie:</label>
        <input type="text" value={n_Serie} placeholder='0' onChange={(e) => setN_Serie(e.target.value)} className="w-36 border rounded py-2 px-2" />
      </div>
      <div className="mb-4 ml-3">
        <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-6 px-10 rounded">Create</button>
      </div>
    </div>
  );
};

export default Sortie;
