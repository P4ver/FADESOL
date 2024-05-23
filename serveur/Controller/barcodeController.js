// const pool = require("../db")
// const { createCanvas } = require('canvas');
// const JsBarcode = require('jsbarcode');

// function generateBarcode(data) {
//   const canvas = createCanvas();
//   JsBarcode(canvas, data, {
//     format: 'CODE128'
//   });
//   return canvas.toDataURL(); // Convert barcode to a base64 string
// }

// const generateAndStoreBarcodes = (req, res) => {
//     connection.query('SELECT Numéro_Article FROM articles', (error, results) => {
//       if (error) {
//         res.status(500).send(error);
//         return;
//       }
  
//       results.forEach(row => {
//         const productId = row.Numéro_Article;
//         const barcode = generateBarcode(productId.toString());
  
//         connection.query(
//           'UPDATE articles SET code_Barre = ? WHERE Numéro_Article = ?',
//           [barcode, productId],
//           (error, results) => {
//             if (error) {
//               res.status(500).send(error);
//               return;
//             }
//           }
//         );
//       });
  
//       res.send('Barcodes generated and updated.');
//     });
//   };
  
//   module.exports = { generateAndStoreBarcodes };