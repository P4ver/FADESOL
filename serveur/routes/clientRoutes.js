const express = require('express');
const router = express.Router();

const {obtenirDonnéesClient, obtenirClientID, ajouterClient, modifierClient, supprimerClient} = require("../Controller/clientController")
router.get('/client', obtenirDonnéesClient)
router.get('/client/:id', obtenirClientID)
router.post('/client', ajouterClient)
router.put('/client', modifierClient)
router.delete('/client/:id', supprimerClient)

module.exports = router;