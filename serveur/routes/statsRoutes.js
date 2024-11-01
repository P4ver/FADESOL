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

                totalControllers.countSorties((errSorties, sortieCount) => {
                    if (errSorties) {
                        return res.status(500).json({ error: 'Erreur lors du comptage des ventes.' });
                    }
                    totalControllers.countReturn((errReturn, returnCount) => {
                        if (errReturn) {
                            return res.status(500).json({ error: 'Erreur lors du comptage des ventes.' });
                        }
                    
                    res.json({
                        users: userCount,
                        products: productCount,
                        achats: achatCount,
                        sorties: sortieCount,
                        return : returnCount,
                    });
                });
                });
            });
        });
    });
});

module.exports = router;