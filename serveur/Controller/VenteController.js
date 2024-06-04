const pool = require("../db")

const createVente = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const {code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet } = req.body; // Added check_Delivery
        connection.query(
            'INSERT INTO vente (code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet) VALUES (?, ?, ?, ?, ?, ?)', 
            [code_Produit, designation_Produit, qte_Produit, n_Serie, code_Projet, nom_Projet], // Included check_Delivery in values
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Vente added.');
            }
        );
    });
};

// Get all ventes
const getAllVentes = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM vente', (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

// Get vente details with related demande and projet
// const getVenteDetails = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         connection.query(`
//             SELECT v.id_Vente, v.code, d.designation, d.quantité, v.code_Projet, p.nom_Projet, p.date
//             FROM vente v
//             JOIN demande d ON v.code = d.code
//             JOIN projet p ON v.code_Projet = p.code_Projet
//         `, (err, results) => {
//             connection.release();
//             if (err) return res.status(500).send(err);
//             res.json(results);
//         });
//     });
// };

// Update vente
const updateVente = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Vente } = req.params; // Extracting id_Vente from URL parameters
        const { check_Delivery } = req.body; // Extracting check_Delivery from request body
        connection.query(
            'UPDATE vente SET check_Delivery = ? WHERE id_Vente = ?',
            [check_Delivery, id_Vente],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Vente delivery status updated.');
            }
        );
    });
};

// Delete vente
const deleteVente = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Vente } = req.params;
        connection.query('DELETE FROM vente WHERE id_Vente = ?', [id_Vente], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send('Vente deleted.');
        });
    });
};

module.exports = {
    createVente,
    getAllVentes,
    updateVente,
    deleteVente
};
