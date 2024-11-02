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

// const mysql = require('mysql');

// const pool = mysql.createPool({
//     // connectionLimit: 10,
//     host: 'localhost',
//     user: 'gsprbhwx_admin', // Your MySQL username
//     password: "fadesol@2024", // Your MySQL password
//     database: 'gsprbhwx_fadesolcpanel', // Name of the database you created
//     port: 3306
// });

// module.exports = pool;