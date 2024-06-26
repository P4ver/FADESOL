const pool = require("../db");

// Create a new historical record
const createHistorique = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { type_Op, date_Op, user_Dmd, code_Produit, designation_Produit, n_Serie, code_Projet, nom_Projet, qte_Produit } = req.body;
        connection.query(
            'INSERT INTO historique (type_Op, date_Op, user_Dmd, code_Produit, designation_Produit, n_Serie, code_Projet, nom_Projet, qte_Produit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [type_Op, date_Op, user_Dmd, code_Produit, designation_Produit, n_Serie, code_Projet, nom_Projet, qte_Produit],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Historical record added.');
            }
        );
    });
};

// Get all historical records
const getAllHistoriques = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM historique', (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

// Update historical record
const updateHistorique = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Historique } = req.params;
        const { type_Op, date_Op, user_Dmd, code_Produit, designation_Produit, n_Serie, code_Projet, nom_Projet } = req.body;
        connection.query(
            'UPDATE historique SET type_Op = ?, date_Op = ?, user_Dmd = ?, code_Produit = ?, designation_Produit = ?, n_Serie = ?, code_Projet = ?, nom_Projet = ? WHERE id_Historique = ?',
            [type_Op, date_Op, user_Dmd, code_Produit, designation_Produit, n_Serie, code_Projet, nom_Projet, id_Historique],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Historical record updated.');
            }
        );
    });
};

// Delete historical record
const deleteHistorique = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Historique } = req.params;
        connection.query('DELETE FROM historique WHERE id_Historique = ?', [id_Historique], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send('Historical record deleted.');
        });
    });
};

module.exports = {
    createHistorique,
    getAllHistoriques,
    updateHistorique,
    deleteHistorique
};
