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

router.post('/logout', (req, res) => {
    // Clear the JWT cookie by setting an expired date
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.json({ message: 'Déconnecté avec succès' });
});


// const ajouterUser = (req, res)=>{
//     pool.getConnection((err, connection)=>{
//         if (err) throw err
//         console.log("connection as id", connection.threadId)
        
//         connection.query("INSERT INTO user SET ?", [req.body], (err, rows)=>{
//             connection.release()
//             if (err) throw err
//             res.send("Les données ont été insérées.")
//         })
//     })
// }

router.post('/register', (req, res) => {
    const { name, password } = req.body;

    // Check if the name and password are provided
    if (!name || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un nom et un mot de passe' });
    }

    // Check if the user already exists
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
        }
        
        const query = 'SELECT * FROM user WHERE login_User = ?';
        connection.query(query, [name], (err, results) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur existant' });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
            }
            
            // If the user doesn't exist, insert into the database
            const insertQuery = 'INSERT INTO user (login_User, password_User) VALUES (?, ?)';
            connection.query(insertQuery, [name, password], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
                }
                res.json({ message: 'Utilisateur enregistré avec succès' });
            });
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