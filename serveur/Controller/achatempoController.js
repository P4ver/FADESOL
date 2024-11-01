const pool = require('../db');

const createAchat = (req, res) => {
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO achatempo SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
};
// Get all achatempos
const getAllAchats = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM achatempo', (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

// Get achatempo details with related demande and projet
const getAchatDetails = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`
            SELECT a.id_Achat, a.code, d.designation, d.quantité, a.code_Projet, p.nom_Projet, p.date
            FROM achatempo a
            JOIN demande d ON a.code = d.code
            JOIN projet p ON a.code_Projet = p.code_Projet
        `, (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

const updateAchat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Achat } = req.params; // Extracting id_Achat from URL parameters
        const { qte_Reçu } = req.body; // Extracting qte_Reçu from request body
        connection.query(
            'UPDATE achatempo SET qte_Reçu = ? WHERE id_Achat = ?',
            [qte_Reçu, id_Achat],
            (err, result) => {
                connection.release();
                if (err) return res.status(500).send(err);
                res.send('Achat delivery status updated.');
            }
        );
    });
};
// const updateAchat = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         const { id_Achat } = req.params; // Extracting id_Achat from URL parameters
//         const { check_Delivery } = req.body; // Extracting check_Delivery from request body
//         connection.query(
//             'UPDATE achatempo SET check_Delivery = ? WHERE id_Achat = ?',
//             [check_Delivery, id_Achat],
//             (err, result) => {
//                 connection.release();
//                 if (err) return res.status(500).send(err);
//                 res.send('Achat delivery status updated.');
//             }
//         );
//     });
// };



// Delete achatempo
const deleteAchat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Achat } = req.params;
        connection.query('DELETE FROM achatempo WHERE id_Achat = ?', [id_Achat], (err, result) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.send('Achat deleted.');
        });
    });
};

module.exports = {
    createAchat,
    getAllAchats,
    getAchatDetails,
    updateAchat,
    deleteAchat
};
