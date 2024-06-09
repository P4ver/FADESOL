const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/verifyToken")

const {obtenirDonnéesUser, supprimerUser, ajouterUser, obtenirUserID, modifierUser} = require("../Controller/userController")

// router.get('/user', verifyToken, authorizeRole(['Admin', 'Super Admin']), obtenirDonnéesUser)
// router.get('/user/:id', verifyToken, authorizeRole(['Admin', 'Super Admin']),obtenirUserID)
router.get('/user', obtenirDonnéesUser)
router.get('/user/:id', obtenirUserID)
router.post('/user', ajouterUser)
router.put('/user/:id', modifierUser)
router.delete('/user/:id', supprimerUser)
// router.post('/user', verifyToken, authorizeRole(['Super Admin']),ajouterUser)
// router.put('/user/:id', verifyToken, authorizeRole(['Super Admin']),modifierUser)
// router.delete('/user/:id', verifyToken, authorizeRole(['Super Admin']),supprimerUser)

module.exports = router;
