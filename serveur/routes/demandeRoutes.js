const express = require('express');
const router = express.Router();
const {deleteDemande, createDemande, updateDemande, getAllDemandes} = require("../Controller/demandeController")
// Route to create a new product
router.post('/', createDemande);

// Route to fetch all products
router.get('/', getAllDemandes);

// Route to update a product
router.put('/:id', updateDemande);

// Route to delete a product
router.delete('/:id', deleteDemande);

module.exports = router;
