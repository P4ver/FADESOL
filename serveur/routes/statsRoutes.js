// statsRoutes.js

const express = require('express');
const router = express.Router();
const totalControllers = require('../Controller/totalControllers');

// Route pour obtenir les statistiques
router.get('/stats', (req, res) => {
    // Utilisation des fonctions de count pour obtenir les statistiques
    totalControllers.countUsers((errUsers, userCount) => {
        if (errUsers) {
            return res.status(500).json({ error: 'Erreur lors du comptage des utilisateurs.' });
        }
        totalControllers.countProducts((errProducts, productCount) => {
            if (errProducts) {
                return res.status(500).json({ error: 'Erreur lors du comptage des produits.' });
            }
            totalControllers.countAchats((errAchats, achatCount) => {
                if (errAchats) {
                    return res.status(500).json({ error: 'Erreur lors du comptage des achats.' });
                }
                totalControllers.counVente((errVente, counVente) => {
                    if (errVente) {
                        return res.status(500).json({ error: 'Erreur lors du comptage des achats.' });
                    }
                res.json({
                    users: userCount,
                    products: productCount,
                    achats: achatCount,
                    vente: counVente
                });
                });
            });
        });
    });
});

module.exports = router;
