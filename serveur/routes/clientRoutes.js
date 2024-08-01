const express = require('express');
const router = express.Router();

const {obtenirDonnéesClient, obtenirClientID, ajouterClient, modifierClient, supprimerClient} = require("../Controller/clientController")
const { verifyToken, authorizeRole } = require("../middleware/verifyToken")

router.get('/client', verifyToken, obtenirDonnéesClient)
router.get('/client/:id', verifyToken, obtenirClientID)
router.post('/client', verifyToken, ajouterClient)
router.put('/client', verifyToken, modifierClient)
router.delete('/client/:id', verifyToken, supprimerClient)

module.exports = router;