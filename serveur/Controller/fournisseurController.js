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


const obtenirFournisseurID = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM fournisseur WHERE id_Fournisseur = ?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}


const ajouterFournisseur = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO fournisseur SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}

const modifierFournisseur = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
  
        // const {id, name , age, email} = req.body
        const { id_Fournisseur, nom_Fournisseur, adresse_Fournisseur, tel_Fournisseur} = req.body
        // const { id_Produit, pu_Produit, type_Produit, prix_Vente, note_Produit, code_Barre, numero_Serie, unite, statut} = req.body
        connection.query("UPDATE fournisseur SET nom_Fournisseur = ?, adresse_Fournisseur = ?, tel_Fournisseur = ?  WHERE id_Fournisseur = ?", [ nom_Fournisseur, adresse_Fournisseur, tel_Fournisseur, id_Fournisseur],(err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été mises à jour.")
        })
    })
  }

const supprimerFournisseur = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query("DELETE FROM fournisseur WHERE id_Fournisseur = ?", [req.params.id],(err, rows)=>{
            connection.release()
            if(err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}

module.exports = {obtenirDonnéesFournisseur, supprimerFournisseur, ajouterFournisseur, obtenirFournisseurID, modifierFournisseur}