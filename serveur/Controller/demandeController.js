const pool = require("../db")
// Controller function to create a new product
const createDemande = (req, res) => {
  const { code, desi, quat2, qt2, projet, nonProjet, delivered } = req.body;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Error connecting to database' });
      return;
    }
    
    const sql = 'INSERT INTO demande (code, desi, quat2, qt2, projet, nonProjet, delivered) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [code, desi, quat2, qt2, projet, nonProjet, delivered], (err, result) => {
      connection.release(); // Release the connection
      if (err) {
        console.error('Error creating Demande: ', err);
        res.status(500).json({ error: 'Error creating product' });
        return;
      }
      console.log('Demande created successfully');
      res.status(201).json({ message: 'Demande created successfully' });
    });
  });
};

// Controller function to fetch all demande
const getAllDemandes = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Error connecting to database' });
      return;
    }
    
    const sql = 'SELECT * FROM demande';
    connection.query(sql, (err, results) => {
      connection.release(); // Release the connection
      if (err) {
        console.error('Error fetching demande: ', err);
        res.status(500).json({ error: 'Error fetching demande' });
        return;
      }
      res.json(results);
    });
  });
};

// Controller function to update a product
const updateDemande = (req, res) => {
  const productId = req.params.id;
  const { code, desi, quat2, qt2, projet, nonProjet, delivered } = req.body;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Error connecting to database' });
      return;
    }
    
    const sql = 'UPDATE demande SET code=?, desi=?, quat2=?, qt2=?, projet=?, nonProjet=?, delivered=? WHERE id=?';
    connection.query(sql, [code, desi, quat2, qt2, projet, nonProjet, delivered, productId], (err, result) => {
      connection.release(); // Release the connection
      if (err) {
        console.error('Error updating product: ', err);
        res.status(500).json({ error: 'Error updating product' });
        return;
      }
      console.log('Demande updated successfully');
      res.json({ message: 'Demande updated successfully' });
    });
  });
};

// Controller function to delete a product
const deleteDemande = (req, res) => {
  const demandeId = req.params.id;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection: ', err);
      res.status(500).json({ error: 'Error connecting to database' });
      return;
    }
    
    const sql = 'DELETE FROM demande WHERE id=?';
    connection.query(sql, [productId], (err, result) => {
      connection.release(); // Release the connection
      if (err) {
        console.error('Error deleting product: ', err);
        res.status(500).json({ error: 'Error deleting product' });
        return;
      }
      console.log('Product deleted successfully');
      res.json({ message: 'Product deleted successfully' });
    });
  });
};

module.exports = {deleteDemande, createDemande, updateDemande, getAllDemandes}