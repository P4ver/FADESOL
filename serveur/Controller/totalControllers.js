const pool = require('../db');

// Fonction pour obtenir le nombre d'utilisateurs
const countUsers = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT COUNT(*) AS userCount FROM user', (err, results) => {
            connection.release();
            if (err) return callback(err, null);
            callback(null, results[0].userCount);
        });
    });
};

// Fonction pour obtenir le nombre de produits
const countProducts = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT COUNT(*) AS productCount FROM articles', (err, results) => {
            connection.release();
            if (err) return callback(err, null);
            callback(null, results[0].productCount);
        });
    });
};

// Fonction pour obtenir le nombre d'achats
const countAchats = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT COUNT(*) AS achatCount FROM achat', (err, results) => {
            connection.release();
            if (err) return callback(err, null);
            callback(null, results[0].achatCount);
        });
    });
};

const counVente = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT COUNT(*) AS venteCount FROM vente', (err, results) => {
            connection.release();
            if (err) return callback(err, null);
            callback(null, results[0].venteCount);
        });
    });
};


module.exports = {
    countUsers,
    countProducts,
    countAchats,
    counVente
};
