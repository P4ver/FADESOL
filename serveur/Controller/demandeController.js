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

// const modifierDemande = (req, res)=>{
//     pool.getConnection((err, connection)=>{
//         if (err) throw err
//         console.log("connection as id", connection.threadId)
//         const { code, designation, quat2, qt2, projet, nonProjet, delivered} = req.body
//         connection.query("UPDATE demande SET code = ?, designation = ?, quat2 = ?, qt2 = ?, projet = ?, nonProjet = ?  WHERE id_Demande = ?", [  code, designation, quat2, qt2, projet, nonProjet, delivered, id_Demande],(err, rows)=>{
//             connection.release()
//             if (err) throw err
//             res.send("Les données ont été mises à jour.")
//         })
//     })
//   }

  const modifierUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connection as id", connection.threadId);
        { code, designation, quat2, qt2, projet, nonProjet, delivered} = req.body
        const { login_User, password_User, nom_User, prenom_User, tel_User, note_User, type_User, email_User, status} = req.body
        // const { login_User, password_User, nom_User, prenom_User, tel_User, note_User, type_User, email_User, status} = req.body
        const { id } = req.params; 
        connection.query(
            "UPDATE user SET login_User = ?, password_User = ?, nom_User = ?, prenom_User = ?, tel_User = ?, note_User = ?, type_User = ?, email_User = ?, status = ?  WHERE id_User = ?",
            [ login_User, password_User, nom_User, prenom_User, tel_User, note_User, type_User, email_User, status, id],
            (err, rows) => {
                connection.release();
                if (err) throw err;
                res.send("Les données ont été mises à jour.");
            }
        );
    });
};

// const supprimerFournisseur = (req, res) =>{
//     pool.getConnection((err, connection)=>{
//         if (err) throw err
//         console.log("connection as id", connection.threadId)
//         connection.query("DELETE FROM demande WHERE id_Fournisseur = ?", [req.params.id],(err, rows)=>{
//             connection.release()
//             if(err) throw err
//             console.log(rows)
//             res.send("Les données ont été supprimées.")
//         })
//     })
// }


module.exports = {obtenirDemandes, obtenirDemandesID, ajouterDemande, modifierDemande};
