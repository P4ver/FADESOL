const pool = require("../db")


const obtenirDonnéesFournisseur = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from fournisseur', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}

module.exports = {obtenirDonnéesFournisseur}