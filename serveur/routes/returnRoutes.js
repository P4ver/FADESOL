const express = require('express');
const {
    createReturn,
    getAllReturns,
    updateReturn,
    deleteReturn
} = require('../Controller/returnController');

const router = express.Router();

router.post('/return', createReturn);
router.get('/return', getAllReturns);
router.put('/return/:id_Return', updateReturn);
router.delete('/return/:id_Return', deleteReturn);

module.exports = router;
