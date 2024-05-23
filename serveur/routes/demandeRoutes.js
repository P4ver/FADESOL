const express = require('express');
const router = express.Router();
const {obtenirDemandes, obtenirDemandesID, ajouterDemande, modifierDemande} = require("../Controller/demandeController")


// Route to create a new product
router.post('/demande', ajouterDemande);
// Route to fetch all products
router.get('/demande', obtenirDemandes);

router.get('/demande/:id', obtenirDemandesID);

// Route to update a product
router.put('/demande/:id', modifierDemande);

// Route to delete a product
// router.delete('/demande/:id', supprimerDemande);

module.exports = router;
