const express = require('express');
const router = express.Router();
const { obtenirDonnéesProjet, obtenirProjetID, ajouterProjet, modifierProjet, supprimerProjet } = require("../Controller/projetController")


// Route to create a new product
router.post('/projet', ajouterProjet);
// Route to fetch all products
router.get('/projet', obtenirDonnéesProjet);

router.get('/projet/:id', obtenirProjetID);

// Route to update a product
router.put('/projet/:id', modifierProjet);

// Route to delete a product
router.delete('/projet/:id', supprimerProjet);

module.exports = router;
