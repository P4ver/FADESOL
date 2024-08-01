const express = require('express');
const router = express.Router();

const {obtenirDonnéesFournisseur, supprimerFournisseur, ajouterFournisseur, obtenirFournisseurID, modifierFournisseur} = require("../Controller/fournisseurController")
const { verifyToken, authorizeRole } = require("../middleware/verifyToken")

router.get('/fournisseur', obtenirDonnéesFournisseur)
router.get('/fournisseur/:id', obtenirFournisseurID)
router.post('/fournisseur', ajouterFournisseur)
router.put('/fournisseur', modifierFournisseur)
router.delete('/fournisseur/:id', supprimerFournisseur)

module.exports = router;