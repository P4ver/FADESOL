// const express = require('express');
// const {
//     createVente,
//     getAllVentes,
//     updateVente,
//     deleteVente
// } = require('../Controller/VenteController');

// const router = express.Router();

// router.post('/vente', createVente);
// router.get('/vente', getAllVentes);
// router.put('/vente/:id_Vente', updateVente);
// router.delete('/vente/:id_Vente', deleteVente);

// module.exports = router;


// routes.js

const express = require('express');
const {
    createVente,
    getAllVentes,
    updateVente,
    deleteVente,
    getDailySales  // Import the new function
} = require('../Controller/VenteController');

const router = express.Router();

router.post('/vente', createVente);
router.get('/vente', getAllVentes);
router.put('/vente/:id_Vente', updateVente);
router.delete('/vente/:id_Vente', deleteVente);

// New route for fetching daily sales
router.get('/vente/byDay', getDailySales);

module.exports = router;
