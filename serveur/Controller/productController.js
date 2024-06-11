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

const updateQteMagasin = (req, res) => {
    const id_Article = req.params.id; // Corrected to use req.params.id
    const { qte_Magasin } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting database connection:", err);
            return res.status(500).send("Error getting database connection.");
        }

        connection.query(
            'UPDATE articles SET qte_Magasin = ? WHERE id_Article = ?',
            [qte_Magasin, id_Article],
            (err, result) => {
                connection.release();
                if (err) {
                    console.error("Error updating quantity in the store:", err);
                    return res.status(500).send(err);
                }
                res.send('Magasin quantity updated successfully.');
            }
        );
    });
};


module.exports = {obtenirProduits, obtenirProduitsID, ajouterProduit, modifierProduit, supprimerProduit, updateQteMagasin};