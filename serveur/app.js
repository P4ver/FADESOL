// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const path = require('path');

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
// const port = process.env.PORT || 7680;
// app.use(bodyParser.json());
// app.use(cookieParser());

// // Only allow connections from your local IP address
// const allowedOrigin = 'http://192.168.1.37'; 

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true,
// }));

// app.use(express.static(path.join(__dirname, 'FrontEnd_Test', 'dist')));

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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'FrontEnd_Test', 'dist', 'index.html'));
// });

// app.listen(port, '192.168.1.37', () => {
//   console.log(`Example app listening on port ${port}`);
// });



require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


// Routes d'authentification
const auth = require('./routes/auth')
const users = require('./routes/users')
const produits = require('./routes/productRoutes')
const fournisseur = require("./routes/fournisseurRoutes")
const client = require("./routes/clientRoutes")
const user = require("./routes/userRoutes")
const barcodeRoutes = require('./routes/barcodeRoutes');
const demande = require("./routes/demandeRoutes")
const projet = require("./routes/projetRoutes")
const achatRoutes = require("./routes/achatempoRoutes")
const achat = require("./routes/achatRoutes")
const vente = require("./routes/venteRoutes")
const statsRoutes = require('./routes/statsRoutes');

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// }));

// app.use(cors(
//   {
//     origin: 'http://localhost:5173',
//     credentials: true,
//   }
// ));

app.use(cors(
  {
    origin: 'https://fadesol-beta.vercel.app',
    credentials: true,
  }
));

// app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static(path.join(__dirname, 'FrontEnd_Test', 'dist')));

// Routes d'authentification
app.use('/auth', auth);
// Routes des fonctionnalités utilisateur
app.use('/users', users);

app.use('/', produits);
app.use('/', achatRoutes);
app.use('/', achat);
app.use('/', vente);
app.use('/', fournisseur);
app.use('/', client);
app.use('/', user);
app.use('/', demande);
app.use('/', projet);
app.use('/', statsRoutes);

// app.use('/', barcodeRoutes);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd_Test', 'dist', 'index.html'));
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

