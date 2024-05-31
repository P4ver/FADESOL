const express = require('express');
const {
    createAchat,
    getAllAchats,
    getAchatDetails,
    updateAchat,
    deleteAchat
} = require('../Controller/achatempoController');

const router = express.Router();

router.post('/achatempo', createAchat);
router.get('/achatempo', getAllAchats);
router.get('/achatempo/details', getAchatDetails);
router.put('/achatempo/:id_Achat', updateAchat);
router.delete('/achatempo/:id_Achat', deleteAchat);

module.exports = router;
