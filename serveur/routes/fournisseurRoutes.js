const express = require('express');
const router = express.Router();
// const pool = require("../db")

const {obtenirDonnéesFournisseur} = require("../Controller/fournisseurController")

router.get('/fournisseur', obtenirDonnéesFournisseur)
// router.get('/produits/:id', obtenirProduitsID)
// router.post('/produits', ajouterProduit)
// router.put('/produits', modifierProduit)
// router.delete('/produits/:id', supprimerProduit)

module.exports = router;