const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/verifyToken")

const {obtenirDonnéesUser, supprimerUser, ajouterUser, obtenirUserID, modifierUser} = require("../Controller/userController")

router.get('/user', obtenirDonnéesUser)
router.get('/user/:id', obtenirUserID)
router.post('/user', ajouterUser)
router.put('/user/:id', modifierUser)
router.delete('/user/:id', supprimerUser)

module.exports = router;
