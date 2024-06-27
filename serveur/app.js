

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Configurer CORS pour Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

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
const returnlist = require('./routes/returnRoutes');
const historique = require('./routes/historiqueRoutes')
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

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
app.use('/', returnlist);
app.use('/', historique);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd_Test', 'dist', 'index.html'));
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('contact-admin', (data) => {
    console.log('Received contact-admin event:', data);
    io.emit('notify-admin', data);
    console.log('Emitted notify-admin event:', data);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
