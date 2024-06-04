const pool = require("../db")

const obtenirDonnéesProjet = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * FROM projet', (err, rows) => {
            connection.release() // return the connection to pool 
            if (err) throw err
            res.send(rows)
        })
    })
}

const obtenirProjetID = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("connected as id", connection.threadId)
        connection.query('SELECT * FROM projet WHERE id_Projet = ?', [req.params.id], (err, rows) => {
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    })
}

const ajouterProjet = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("connected as id", connection.threadId)
        
        connection.query("INSERT INTO projet SET ?", [req.body], (err, rows) => {
            connection.release()
            if (err) throw err
            res.send("Les données ont été insérées.")
        })
    })
}

const modifierProjet = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connected as id", connection.threadId);
        const { date, code_Projet, nom_Projet } = req.body;
        const { id } = req.params; // Assuming id is the name of the parameter in the route

        connection.query(
            "UPDATE projet SET date = ?, code_Projet = ?, nom_Projet = ? WHERE id_Projet = ?",
            [date, code_Projet, nom_Projet, id],
            (err, rows) => {
                connection.release();
                if (err) throw err;
                res.send("Les données ont été mises à jour.");
            }
        );
    });
};

const supprimerProjet = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log("connected as id", connection.threadId)
        connection.query("DELETE FROM projet WHERE id_Projet = ?", [req.params.id], (err, rows) => {
            connection.release()
            if (err) throw err
            console.log(rows)
            res.send("Les données ont été supprimées.")
        })
    })
}

module.exports = { obtenirDonnéesProjet, obtenirProjetID, ajouterProjet, modifierProjet, supprimerProjet }