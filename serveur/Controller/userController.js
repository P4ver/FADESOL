const pool = require("../db")


const obtenirDonnéesUser = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from user', (err, rows)=>{
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}

const obtenirUserID = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query('SELECT * FROM user WHERE id_User = ?', [req.params.id], (err, rows)=>{
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}


const ajouterUser = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        
        connection.query("INSERT INTO user SET ?", [req.body], (err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}

const modifierUser = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
  
        // const {id, name , age, email} = req.body
        const { id_User, login_User, password_User, nom_User, prenom_User, tel_User, note_User, type_User} = req.body
        connection.query("UPDATE user SET login_User = ?, password_User = ?, nom_User = ?, prenom_User = ?, tel_User = ?, note_User = ?, type_User = ?  WHERE id_User = ?", [ login_User, password_User, nom_User, prenom_User, tel_User, note_User, type_User, id_User],(err, rows)=>{
            connection.release()
            if (err) throw err
            res.send("Les données ont été mises à jour.")
        })
    })
  }

const supprimerUser = (req, res) =>{
    pool.getConnection((err, connection)=>{
        if (err) throw err
        console.log("connection as id", connection.threadId)
        connection.query("DELETE FROM user WHERE id_User = ?", [req.params.id],(err, rows)=>{
            connection.release()
            if(err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}

module.exports = {obtenirDonnéesUser, supprimerUser, ajouterUser, obtenirUserID, modifierUser}