const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const auth = require('./routes/auth')
const users = require('./routes/users')
const app = express();

const cookieParser = require('cookie-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes d'authentification
app.use('/auth', auth);
// Routes des fonctionnalités utilisateur
app.use('/users', users);

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: null, // Your MySQL password
    database: 'fadtestdb', // Name of the database you created
})

app.get('/', (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        // connection.query('SELECT * from testDBonline', (err, rows)=>{
        connection.query("SELECT * FROM client WHERE nom_Client = ?", ['userpvr'],(err, rows)=>{
        // connection.query('SELECT * from client', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            // console.log(rows[0].nom_Client)
            res.send(rows)
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });