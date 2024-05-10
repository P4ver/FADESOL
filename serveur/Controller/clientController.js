const pool = require("../db")


const obtenirDonnéesClient = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from client', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}


const obtenirClientID = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM client WHERE id_Client = ?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}


const ajouterClient = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO client SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}

const modifierClient = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
  
        // const {id, name , age, email} = req.body
        const { id_Client, nom_Client, adresse_Client, tel_Client} = req.body
        // const { id_Produit, pu_Produit, type_Produit, prix_Vente, note_Produit, code_Barre, numero_Serie, unite, statut} = req.body
        connection.query("UPDATE client SET nom_Client = ?, adresse_Client = ?, tel_Client = ?  WHERE id_Client = ?", [ nom_Client, adresse_Client, tel_Client, id_Client],(err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été mises à jour.")
        })
    })
  }

const supprimerClient = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query("DELETE FROM client WHERE id_Client = ?", [req.params.id],(err, rows)=>{
            connection.release()
            if(err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}

module.exports = {obtenirDonnéesClient, obtenirClientID, ajouterClient, modifierClient, supprimerClient}