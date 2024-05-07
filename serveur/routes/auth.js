const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../db")

router.post('/login', (req, res) => {
    const { name, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
        }
        // const query = 'SELECT id_User, type_User FROM Users WHERE login_User = ? AND password_User = ?';
        const query = 'SELECT * FROM user WHERE login_User = ? AND password_User = ?';
        connection.query(query, [name, password], (err, results) => {
            connection.release();
            console.log("logintst:result",results)

            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la récupération des données utilisateur' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Identifiants incorrects' });
            }

            const { id_User, type_User } = results[0];
            // Generate JWT with user's id and type
            const token = jwt.sign({ id_User, type_User }, 'secret_key');

            // Set JWT as a cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // Expires in 24 hours
            res.json({ message: 'Connecté avec succès' });
        });
    });
});



module.exports = router;


//=======================================


// router.post('/login', (req, res) => {
//     const { name, password } = req.body;

//     pool.getConnection((err, connection) => {
//         if (err) {
//             return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
//         }
//         // const query = 'SELECT id_User, type_User FROM Users WHERE login_User = ? AND password_User = ?';
//         const query = 'SELECT * FROM test_user WHERE name = ? AND password = ?';
//         connection.query(query, [name, password], (err, results) => {
//             connection.release();
//             console.log(results)
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération des données utilisateur' });
//             }
//             if (results.length === 0) {
//                 return res.status(401).json({ message: 'Identifiants incorrects' });
//             }
//             const { id_test_user} = results[0];
//             const token = jwt.sign({ id_test_user }, 'secret_key');
//             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // Expires in 24 hours
//             // const { id_User, type_User } = results[0];
//             // Generate JWT with user's id and type
//             // const token = jwt.sign({ id_User, type_User }, 'secret_key');
//             // Set JWT as a cookie
//             // res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // Expires in 24 hours
//             res.json({ message: 'Connecté avec succès' });
//         });
//     });
// });