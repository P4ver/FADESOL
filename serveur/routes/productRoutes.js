const express = require('express');
const router = express.Router();
// const pool = require("../db")

const {obtenirProduits, obtenirProduitsID, ajouterProduit, modifierProduit, supprimerProduit} = require('../Controller/productController')
router.get('/produits', obtenirProduits)
router.get('/produits/:id', obtenirProduitsID)
router.post('/produits', ajouterProduit)
router.put('/produits/:id', modifierProduit)
router.delete('/produits/:id', supprimerProduit)

module.exports = router;