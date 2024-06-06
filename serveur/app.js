// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

// // Routes d'authentification
// const auth = require('./routes/auth')
// const users = require('./routes/users')
// const produits = require('./routes/productRoutes')
// const fournisseur = require("./routes/fournisseurRoutes")
// const client = require("./routes/clientRoutes")
// const user = require("./routes/userRoutes")
// const barcodeRoutes = require('./routes/barcodeRoutes');
// const demande = require("./routes/demandeRoutes")
// const projet = require("./routes/projetRoutes")
// const achatRoutes = require("./routes/achatempoRoutes")
// const achat = require("./routes/achatRoutes")
// const vente = require("./routes/venteRoutes")
// const statsRoutes = require('./routes/statsRoutes');
// // app.use(bodyParser.urlencoded({ extended: true }));
// const port = process.env.PORT || 3000;
// app.use(bodyParser.json());
// app.use(cookieParser());
// // app.use(cors(
// //   {
// //     origin: 'http://localhost:5173',
// //     credentials: true,
// //   }
// // ));

// app.use(cors(
//   {
//     origin: 'https://fadesol-1bb5.vercel.app',
//     credentials: true,
//   }
// ));





// // Routes d'authentification
// app.use('/auth', auth);
// // Routes des fonctionnalités utilisateur
// app.use('/users', users);

// app.use('/', produits);
// app.use('/', achatRoutes);
// app.use('/', achat);
// app.use('/', vente);
// app.use('/', fournisseur);
// app.use('/', client);
// app.use('/', user);
// app.use('/', demande);
// app.use('/', projet);
// app.use('/', statsRoutes);

// // app.use('/', barcodeRoutes);


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const produits = require('./routes/productRoutes');
const fournisseur = require("./routes/fournisseurRoutes");
const client = require("./routes/clientRoutes");
const user = require("./routes/userRoutes");
const barcodeRoutes = require('./routes/barcodeRoutes');
const demande = require("./routes/demandeRoutes");
const projet = require("./routes/projetRoutes");
const achatRoutes = require("./routes/achatempoRoutes");
const achat = require("./routes/achatRoutes");
const vente = require("./routes/venteRoutes");
const statsRoutes = require('./routes/statsRoutes');

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: 'https://fadesol-beta.vercel.app',
  credentials: true,
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.use('/auth', auth);
app.use('/users', users);
app.use('/produits', produits);
app.use('/fournisseur', fournisseur);
app.use('/client', client);
app.use('/user', user);
app.use('/demande', demande);
app.use('/projet', projet);
app.use('/achat', achatRoutes);
app.use('/achatempo', achat);
app.use('/vente', vente);
app.use('/stats', statsRoutes);
app.use('/barcode', barcodeRoutes);

// Catch-all handler to send back the main React HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
