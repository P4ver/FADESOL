const mysql = require('mysql');

const pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: null, // Your MySQL password
    database: 'fadesoldb', // Name of the database you created
    port: 3306
});

module.exports = pool;
