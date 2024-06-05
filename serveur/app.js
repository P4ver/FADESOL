const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

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
// app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors(
//   {
//     origin: 'https://fadesol.vercel.app',
//     credentials: true,
//   }
// ));
app.use(cors(
  {
    origin: '*',
    credentials: true,
  }
));





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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})