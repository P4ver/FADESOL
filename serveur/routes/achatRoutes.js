const express = require('express');
const {
    createAchat,
    getAllAchats,
    getAchatDetails,
    updateAchat,
    deleteAchat
} = require('../Controller/achatController');

const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/verifyToken")

router.post('/achat', createAchat);
router.get('/achat', getAllAchats);
router.get('/achat/details', getAchatDetails);
router.put('/achat/:id_Achat', updateAchat);
router.delete('/achat/:id_Achat', deleteAchat);

module.exports = router;
