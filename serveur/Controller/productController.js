const pool = require("../db")


const obtenirProduits = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from articles', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}


const obtenirProduitsID = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM articles WHERE id_Article=?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}


const ajouterProduit = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO articles SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}

// const modifierProduit = (req, res)=>{
//     pool.getConnection((err, connection)=>{
//         if (err) throw err
//         console.log("connection as id", connection.threadId)
  
//         // const {id, name , age, email} = req.body
//         const { id_Article, pu_Produit, type_Produit, prix_Vente, note_Produit, code_Barre, numero_Serie, unite, statut} = req.body
//         connection.query("UPDATE articles SET pu_Produit = ?, type_Produit = ?, prix_Vente = ?, note_Produit = ?, code_Barre = ?, numero_Serie = ?, unite = ?, statut = ?  WHERE id_Article = ?", [ pu_Produit, type_Produit, prix_Vente, note_Produit, code_Barre, numero_Serie, unite, statut, id_Article],(err, rows)=>{
//             connection.release()
//             if (err) throw err
//             res.send("Les données ont été mises à jour.")
//         })
//     })
//   }


const modifierProduit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connection as id", connection.threadId);

        const { Numéro_Article, Description_Article,  Groupe_Articles, Date_Actualisation} = req.body;
        const { id } = req.params; // Assuming id is the name of the parameter in the route

        connection.query(
            "UPDATE articles SET Numéro_Article = ?, Description_Article = ?, Groupe_Articles = ?, Date_Actualisation = ? WHERE id_Article = ?",
            [Numéro_Article, Description_Article, Groupe_Articles, Date_Actualisation, id],
            (err, rows) => {
                connection.release();
                if (err) throw err;
                res.send("Les données ont été mises à jour.");
            }
        );
    });
};


const supprimerProduit = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query("DELETE FROM articles WHERE id_Article = ?", [req.params.id],(err, rows)=>{
            connection.release()
            if(err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}


module.exports = {obtenirProduits, obtenirProduitsID, ajouterProduit, modifierProduit, supprimerProduit};