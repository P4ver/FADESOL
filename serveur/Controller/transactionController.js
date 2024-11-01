const pool = require("../db");

// Ajouter une transaction à l'historique
const ajouterTransaction = (req, res) => {
    pool.getConnection((err, connection)=>{
        if (err) throw err
        connection.query("INSERT INTO transaction_history SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) {
                console.error("Erreur lors de l'ajout à l'historique:", err);
                return reject("Erreur lors de l'ajout à l'historique");
            }
            res.send("Les données ont été insérées.")
        })
    })
};


// Récupérer tout l'historique des transactions
const obtenirHistoriqueTransactions = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connected as id", connection.threadId);

        connection.query("SELECT * FROM transaction_history", (err, rows) => {
            connection.release();
            if (err) {
                console.error("Erreur lors de la récupération de l'historique:", err);
                return res.status(500).send("Erreur lors de la récupération de l'historique.");
            }
            res.send(rows);
        });
    });
};

// Récupérer l'historique des transactions pour un article spécifique
const obtenirHistoriqueParId = (req, res) => {
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM transaction_history WHERE id_Transaction=?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
};


module.exports = {
    ajouterTransaction,
    obtenirHistoriqueTransactions,
    obtenirHistoriqueParId,
};