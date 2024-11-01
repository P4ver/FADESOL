const jwt = require('jsonwebtoken');

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
