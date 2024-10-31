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
        console.log("connected as id", connection.threadId);

        const { Numéro_Article, Description_Article, Groupe_Articles, Actif, Designation_Fadesol, Gamme_Etiquette, Emplacement, qte_Magasin, code_Barre } = req.body;
        const { id } = req.params; // Assuming id is the name of the parameter in the route

        connection.query(
            "UPDATE articles SET Numéro_Article = ?, Description_Article = ?, Groupe_Articles = ?, Actif = ?, Designation_Fadesol = ?, Gamme_Etiquette = ?, Emplacement = ?, qte_Magasin = ?, code_Barre = ? WHERE id_Article = ?",
            [Numéro_Article, Description_Article, Groupe_Articles, Actif, Designation_Fadesol, Gamme_Etiquette, Emplacement, qte_Magasin, code_Barre, id],
            (err, rows) => {
                connection.release();
                if (err) {
                    console.error("Failed to update product:", err);
                    res.status(500).send("Failed to update product");
                    return;
                }
                res.send("Product updated successfully.");
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


const dupliquerProduit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connected as id", connection.threadId);

        const originalId = req.params.id; // Get the ID of the product to duplicate

        // Fetch the original product
        connection.query('SELECT * FROM articles WHERE id_Article = ?', [originalId], (err, rows) => {
            if (err) {
                connection.release();
                console.error("Failed to fetch product:", err);
                res.status(500).send("Failed to fetch product");
                return;
            }

            const originalProduct = rows[0];
            if (!originalProduct) {
                connection.release();
                res.status(404).send("Product not found");
                return;
            }

            // Remove the id_Article from the original product data
            const { id_Article, Numéro_Article, ...newProduct } = originalProduct;

            // Modify the Numéro_Article field
            newProduct.Numéro_Article = `${Numéro_Article}-copy`;

            // Insert the new product with a unique ID
            connection.query("INSERT INTO articles SET ?", [newProduct], (err, result) => {
                connection.release();
                if (err) {
                    console.error("Failed to duplicate product:", err);
                    res.status(500).send("Failed to duplicate product");
                    return;
                }
                res.send("Product duplicated successfully.");
            });
        });
    });
};

// module.exports = {obtenirProduits, obtenirProduitsID, ajouterProduit, modifierProduit, supprimerProduit, updateQteMagasin};


module.exports = { obtenirProduits, obtenirProduitsID, ajouterProduit, modifierProduit, supprimerProduit, updateQteMagasin, dupliquerProduit };