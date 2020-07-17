const express = require('express'); // Déclaration framework express
const bodyParser = require('body-parser'); // Déclaration Body-Parser pour récupérer des objets exploitables

const userRoutes = require('./routes/user'); // Déclaration du dossier des routes utilisateur

const app = express();

// DECLARATION DE MA BASE DE DONNEES

// DECLARATION DE MES CORS, HEADERS ET METHODS
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;