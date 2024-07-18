
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDemandeData } from '../store/demandeSlice';
import { fetchProjetData } from '../store/projetSlice';
import { fetchVenteData, postVenteData } from '../store/venteSlice';
import { fetchProductData, updateQteMagasin } from '../store/productSlice';
import { fetchAchatempoData } from '../store/achatempoSlice';
import Swal from 'sweetalert2';
import { postHistoriqueData } from '../store/historiqueSlice';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Typography, IconButton } from '@mui/material';

const Sortie = () => {
  const [lines, setLines] = useState([{ demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
  const productData = useSelector((state) => state.product.productData);
  const projetData = useSelector((state) => state.projet.projetData);
  const authState = useSelector(state => state.auth);
  const user = authState.user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
    dispatch(fetchProjetData());
    dispatch(fetchAchatempoData());
    dispatch(fetchVenteData());
    dispatch(fetchDemandeData());
  }, [dispatch]);

  const handleAddLine = () => {
    setLines([...lines, { demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
  };

  const handleChange = (index, key, value) => {
    const newLines = [...lines];
    newLines[index][key] = value;
    setLines(newLines);
  };

  const handleSubmit = async () => {
    try {
      for (const line of lines) {
        if (line.demandeCode && line.projetCode && line.quantite && line.n_Serie) {
          const article = productData.find(demande =>
            demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
          );
          const projet = projetData.find(projet => projet.code_Projet === line.projetCode);

          if (!article || !projet) {
            throw new Error('Invalid demandeCode or projetCode');
          }

          const ventePayload = {
            code_Produit: article.Numéro_Article,
            designation_Produit: article.Description_Article,
            qte_Produit: parseInt(line.quantite, 10),
            n_Serie: line.n_Serie,
            code_Projet: projet.code_Projet,
            nom_Projet: projet.nom_Projet,
            id_Article: article.id_Article,
            user_Dmd: user.username
          };

          const historiqueData = {
            type_Op: "sortie",
            code_Produit: article.Numéro_Article,
            designation_Produit: article.Description_Article,
            qte_Produit: parseInt(line.quantite, 10),
            n_Serie: line.n_Serie,
            code_Projet: projet.code_Projet,
            nom_Projet: projet.nom_Projet,
            user_Dmd: user.username
          };

          const newQteMagasin = article.qte_Magasin - parseInt(line.quantite, 10);
          await dispatch(updateQteMagasin({
            productId: article.id_Article,
            qte_Magasin: newQteMagasin
          }));

          await dispatch(postVenteData(ventePayload));
          await dispatch(postHistoriqueData(historiqueData));

          Swal.fire({
            title: 'Success',
            text: 'Sortie effectuée avec succès dans le stock',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      }

      setLines([{ demandeCode: '', projetCode: '', quantite: '', n_Serie: '' }]);
    } catch (error) {
      console.error('Error submitting data:', error.message);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' && index === lines.length - 1) {
      handleAddLine();
    }
  };

  const filterProjects = (value) => {
    return projetData.filter(projet => projet.nom_Projet.toLowerCase().startsWith(value.toLowerCase()));
  };

  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <Typography variant="h5" align="center" gutterBottom>Opération Magasinier - Sortie</Typography>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Numero Article ou Code Barre</th>
            <th className="border px-4 py-2">Designation Fournisseur</th>
            <th className="border px-4 py-2">Designation Fadesol</th>
            <th className="border px-4 py-2">Projet</th>
            <th className="border px-4 py-2">Quantité Magasin</th>
            <th className="border px-4 py-2">Quantité</th>
            <th className="border px-4 py-2">N° Serie</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode}
                  placeholder='Enter Numero article ou Code Barre'
                  onChange={(e) => handleChange(index, 'demandeCode', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.Description_Article : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.Designation_Fadesol : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.projetCode}
                  placeholder='Sélectionnez le Projet'
                  onChange={(e) => handleChange(index, 'projetCode', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  list={`projects-${index}`}
                />
                <datalist id={`projects-${index}`}>
                  {filterProjects(line.projetCode).map(projet => (
                    <option key={projet.code_Projet} value={projet.nom_Projet} />
                  ))}
                </datalist>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.demandeCode ? productData.find(demande =>
                    demande.Numéro_Article === line.demandeCode || demande.code_Barre === line.demandeCode
                  )?.qte_Magasin : ''}
                  className="w-full px-2 py-1 border-none"
                  disabled
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={line.quantite}
                  placeholder='Enter Quantité'
                  onChange={(e) => handleChange(index, 'quantite', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={line.n_Serie}
                  placeholder='Enter N° Serie'
                  onChange={(e) => handleChange(index, 'n_Serie', e.target.value)}
                  className="w-full px-2 py-1 border-none"
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </td>
              <td className="border px-4 py-2">
                {index === lines.length - 1 && (
                  <IconButton onClick={handleAddLine}>
                    <div className="flex h-8 w-8 items-center justify-center bg-customGreen rounded-full text-white hover:text-black hover:shadow ml-2">
                      <AiOutlinePlusCircle />
                    </div>
                  </IconButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="bg-customBlue hover:bg-customBlueDark text-white font-bold py-2 px-4 rounded">Soumettre</button>
      </div>
    </div>
  );
};

export default Sortie;
