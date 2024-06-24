const pool = require("../db");

// Create a new return record
const createReturn = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet } = req.body;
        connection.query(
            'INSERT INTO listreturn (code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet) VALUES (?, ?, ?, ?, ?, ?)',
            [code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Return record added.');
            }
        );
    });
};

// Get all return records
const getAllReturns = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM listreturn', (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

// Update return record
const updateReturn = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Return } = req.params;
        const { code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet } = req.body;
        connection.query(
            'UPDATE listreturn SET code_Produit = ?, designation_Produit = ?, qte_Produit = ?, n_Serie = ?, code_Projet = ?, nom_Projet = ? WHERE id_Return = ?',
            [code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet, id_Return],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Return record updated.');
            }
        );
    });
};

// Delete return record
const deleteReturn = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Return } = req.params;
        connection.query('DELETE FROM listreturn WHERE id_Return = ?', [id_Return], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send('Return record deleted.');
        });
    });
};

module.exports = {
    createReturn,
    getAllReturns,
    updateReturn,
    deleteReturn
};
