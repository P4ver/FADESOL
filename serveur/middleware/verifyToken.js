const jwt = require('jsonwebtoken');

// Middleware function for verifying JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'JWT requis' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'JWT invalide' });
        }

        req.user = decoded;
        next(); // Proceed to the next middleware
    });
};

// Middleware function for authorizing user roles
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const role = req.user.type_User;

        if (roles.includes(role)) {
            next(); // Allow access if user role is in the allowed roles
        } else {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
    };
};

module.exports = { verifyToken, authorizeRole };

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     // Get JWT token from cookie
//     const token = req.cookies.jwt;
//     url = req.url;

//     if (!token) {
//         return res.status(401).json({ message: 'JWT requis' });
//     }

//     // Verify JWT
//     jwt.verify(token, 'secret_key', (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'JWT invalide' });
//         }

//         // Store decoded JWT payload in req.user
//         req.user = decoded;
//         const role = req.user.type_User;

//         // Check user role
//         if (role === 'Utilisateur') {
//             // Allow access to 'hello user' endpoint
//             if (req.url === '/user') {
//                 return next();
//             } else {
//                 return res.status(403).json({ message: 'Accès non autorisé' });
//             }
//         } else if (role === 'Admin') {
//             // Allow access to 'show all user' endpoint
//             if (req.url === '/user/:id') {
//                 return next();
//             } else {
//                 return res.status(403).json({ message: 'Accès non autorisé' });
//             }
//         } else if (role === 'Super Admin') {
//             // Allow access to all endpoints
//             return next();
//         } else {
//             return res.status(403).json({ message: 'Rôle non autorisé' });
//         }
//     });
// };

// module.exports = verifyToken;

// const jwt = require('jsonwebtoken');
// // pour verifie token
// const verifyToken = (req, res, next) => {
//     // Get JWT token from cookie
//     const token = req.cookies.jwt;

//     if (!token) {
//         return res.status(401).json({ message: 'JWT requis' });
//     }

//     // Verify JWT
//     jwt.verify(token, 'secret_key', (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'JWT invalide' });
//         }

//         // Store decoded JWT payload in req.user
//         req.user = decoded;
//         console.log("f_mdlwr_vrfy: ",req.user.type_User)
//         const  role  = req.user.type_User;
//         // console.log('from verify ', role)
//         if (role == 'Super Admin' || role == 'Admin'){
//             next();
//         }
//         else{
//             return res.status(403).json({ message: 'Vous n\'avez pas les droits pour accéder à cette ressource' });
//         }
//     });
// };

// module.exports = verifyToken;