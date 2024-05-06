const express = require('express');
const router = express.Router();

const verifyToken = require("../middleware/verifyToken")
// const {verifyToken} = require("../routes/auth")


// Route pour obtenir le message de salutation personnalisé en fonction du rôle de l'utilisateur
router.get('/greeting', verifyToken, (req, res) => {
    // Extract user's role from req.user
    const  role  = req.user.type_User;
    // console.log("f_greeting :",req.user.type_User)
    // Generate personalized greeting based on user's role
    let greeting;
    switch (role) {
        case 'Super Admin':
            greeting = 'Bonjour Super Admin !';
            break;
        case 'Admin':
            greeting = 'Bonjour Admin !';
            break;
        case 'Utilisateur':
            greeting = 'Bonjour Utilisateur !';
            break;
        default:
            greeting = 'Bonjour !';
    }
    res.json({ message: greeting });
});

module.exports = router;
