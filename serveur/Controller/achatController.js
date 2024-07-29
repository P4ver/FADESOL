const pool = require('../db');

const createAchat = (req, res) => {
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO achat SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
    // pool.getConnection((err, connection) => {
    //     if (err) throw err;
    //     const { code, code_Projet, designation, quantite, nom_Projet, date, code_Achat, user_Dmd, Partenaire } = req.body; // Added check_Delivery
    //     connection.query(
    //         'INSERT INTO achat (code, code_Projet, designation, quantite, nom_Projet, date, code_Achat, user_Dmd, Partenaire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    //         [code, code_Projet, designation, quantite, nom_Projet, date,  code_Achat, user_Dmd, Partenaire], // Included check_Delivery in values
    //         (err, result) => {
    //             connection.release();
    //             if (err) return res.status(500).send(err);
    //             res.send('Achat added.');
    //         }
    //     );
    // });
};

// Get all achats
const getAllAchats = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM achat', (err, results) => {
            connection.release();
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    });
};

// Get achat details with related demande and projet
const getAchatDetails = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`
            SELECT a.id_Achat, a.code, d.designation, d.quantité, a.code_Projet, p.nom_Projet, p.date
            FROM achat a
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
            'UPDATE achat SET qte_Reçu = ? WHERE id_Achat = ?',
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
//             'UPDATE achat SET check_Delivery = ? WHERE id_Achat = ?',
//             [check_Delivery, id_Achat],
//             (err, result) => {
//                 connection.release();
//                 if (err) return res.status(500).send(err);
//                 res.send('Achat delivery status updated.');
//             }
//         );
//     });
// };



// Delete achat
const deleteAchat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const { id_Achat } = req.params;
        connection.query('DELETE FROM achat WHERE id_Achat = ?', [id_Achat], (err, result) => {
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