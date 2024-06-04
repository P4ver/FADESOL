const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bdibawrkccer658nc2x3-mysql.services.clever-cloud.com',
    user: 'uwdlyklpge60bjid', // Your MySQL username
    password: "a6ETVhHQPzWDQjxOyyjG", // Your MySQL password
    database: 'bdibawrkccer658nc2x3', // Name of the database you created
});

module.exports = pool;
// const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root', // Your MySQL username
//     password: null, // Your MySQL password
//     database: 'fadesoldb', // Name of the database you created
// });

// module.exports = pool;