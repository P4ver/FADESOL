const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes d'authentification
const auth = require('./routes/auth')
const users = require('./routes/users')
const produits = require('./routes/productRoutes')
<<<<<<< HEAD
const fournisseur = require("./Controller/fournisseurController")
// const pool = require("./db")
=======
const fournisseur = require("./routes/fournisseurRoutes")
const client = require("./routes/clientRoutes")
const user = require("./routes/userRoutes")
>>>>>>> habti

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));

// Routes d'authentification
app.use('/auth', auth);
// Routes des fonctionnalités utilisateur
app.use('/users', users);

app.use('/', produits);
<<<<<<< HEAD
app.use('/', produits);
=======
app.use('/', fournisseur);
app.use('/', client);
app.use('/', user);
>>>>>>> habti


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });