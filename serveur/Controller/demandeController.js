const pool = require("../db")

const obtenirDemandes = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from demande', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}

const obtenirDemandesID = (req, res)=>{
    pool.getConnection((err, connection)=>{
        // console.log("eeeeeeeeeeeeeeeeeeeee")
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM demande WHERE id_Demande = ?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}

const ajouterDemande = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO demande SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}



  const modifierDemande = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connection as id", connection.threadId);

        const { code, designation, quantité} = req.body
        const { id } = req.params; 
        connection.query(
            "UPDATE demande SET code = ?, designation = ?, quantité = ? WHERE id_Demande = ?",
            [ code, designation, quantité, id],
            (err, rows) => {
                connection.release();
                if (err) throw err;
                res.send("Les données ont été mises à jour.");
            }
        );
    });
};

const supprimerDemande = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query("DELETE FROM demande WHERE id_Demande = ?", [req.params.id],(err, rows)=>{
            connection.release()
            if(err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}
module.exports = {obtenirDemandes, obtenirDemandesID, ajouterDemande, modifierDemande, supprimerDemande};
