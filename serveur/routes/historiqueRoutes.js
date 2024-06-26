const express = require('express');
const {
    createHistorique,
    getAllHistoriques,
    updateHistorique,
    deleteHistorique
} = require('../Controller/historiqueController');

const router = express.Router();

router.post('/historique', createHistorique);
router.get('/historique', getAllHistoriques);
router.put('/historique/:id_Historique', updateHistorique);
router.delete('/historique/:id_Historique', deleteHistorique);

module.exports = router;
