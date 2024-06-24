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

// Fonction pour obtenir le nombre de sorties
const countSorties = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT COUNT(*) AS sortieCount FROM vente', (err, results) => {
            connection.release();
            if (err) return callback(err, null);
            callback(null, results[0].sortieCount);
        });
    });
};
module.exports = {
    countUsers,
    countProducts,
    countAchats,
    countSorties
};
