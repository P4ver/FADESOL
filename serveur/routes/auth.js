const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require("../db")

// router.post('/login', (req, res) => {
//     const { name, password } = req.body;

//     pool.getConnection((err, connection) => {
//         if (err) {
//             return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
//         }
//         // const query = 'SELECT id_User, type_User FROM Users WHERE login_User = ? AND password_User = ?';
//         const query = 'SELECT * FROM user WHERE login_User = ? AND password_User = ?';
//         connection.query(query, [name, password], (err, results) => {
//             connection.release();
//             console.log("logintst:result",results)

//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération des données utilisateur' });
//             }

//             if (results.length === 0) {
//                 return res.status(401).json({ message: 'Identifiants incorrects' });
//             }

//             const { id_User, type_User } = results[0];
//             // Generate JWT with user's id and type
//             const token = jwt.sign({ id_User, type_User }, 'secret_key');

//             // Set JWT as a cookie
//             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // Expires in 24 hours
//             res.json({ message: 'Connecté avec succès' });
//         });
//     });
// });


router.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Database connection error:', err);
        return res.status(500).json({ message: 'Database connection error' });
      }
  
      const query = 'SELECT * FROM user WHERE login_User = ? AND password_User = ?';
      connection.query(query, [name, password], (err, results) => {
        connection.release();
        if (err) {
          console.error('Error fetching user data:', err);
          return res.status(500).json({ message: 'Error fetching user data' });
        }
  
        if (results.length === 0) {
          console.log('Incorrect credentials');
          return res.status(401).json({ message: 'Incorrect credentials' });
        }
  
        const { id_User, type_User } = results[0];
        const token = jwt.sign({ id_User, type_User }, 'secret_key', { expiresIn: '24h' });
  
        res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000, secure: true, sameSite: 'None' });
        res.json({ message: 'Successfully logged in' });
      });
    });
  });
  
router.post('/logout', (req, res) => {
    // Clear the JWT cookie by setting an expired date
    res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
    res.json({ message: 'Déconnecté avec succès' });
});


router.post('/register', (req, res) => {
    const { login_User, password_User, nom_User, prenom_User, tel_User, email_User } = req.body;
    const type_User = "Utilisateur"

    // Check if all required fields are provided
    if (!login_User || !password_User || !nom_User || !prenom_User || !tel_User || !email_User) {
        return res.status(400).json({ message: 'Veuillez fournir tous les champs requis' });
    }

    // Check if the user already exists
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de connexion à la base de données' });
        }
        
        const query = 'SELECT * FROM user WHERE login_User = ?';
        connection.query(query, [login_User], (err, results) => {
            connection.release();
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur existant' });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
            }
            
            // If the user doesn't exist, insert into the database
    const insertQuery = 'INSERT INTO user (login_User, password_User, nom_User, prenom_User, tel_User, type_User, email_User) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertQuery, [login_User, password_User, nom_User, prenom_User, tel_User, type_User,email_User], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
                }
                res.json({ message: 'Utilisateur enregistré avec succès' });
            });
        });
    });
});


module.exports = router;

