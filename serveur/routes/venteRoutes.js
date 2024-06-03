const express = require('express');
const {
    createVente,
    getAllVentes,
    updateVente,
    deleteVente
} = require('../Controller/VenteController');

const router = express.Router();

router.post('/vente', createVente);
router.get('/vente', getAllVentes);
router.put('/vente/:id_Vente', updateVente);
router.delete('/vente/:id_Vente', deleteVente);

module.exports = router;
