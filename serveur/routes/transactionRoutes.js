const express = require("express");
const router = express.Router();
const { ajouterTransaction, obtenirHistoriqueTransactions, obtenirHistoriqueParId } = require("../Controller/transactionController");

// Route pour ajouter une nouvelle transaction à l'historique (POST)
router.post("/transactions", ajouterTransaction);

// Route pour récupérer tout l'historique des transactions (GET)
router.get("/transactions", obtenirHistoriqueTransactions);

// Route pour récupérer l'historique d'une transaction spécifique par ID (GET)
router.get("/transactions/:id", obtenirHistoriqueParId);

module.exports = router;
