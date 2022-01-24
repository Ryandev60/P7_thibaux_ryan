// Importation d'express qui est un framework pour construire des applications web basées sur nodeJS
const express = require("express");

// Création d'application express
const app = express();

// Importation dotenv
const dotenv = require('dotenv').config();

// Importation des models
const db = require("./models");

// Syncronisation de la DB
db.sequelize.sync();

// Ajout de headers à l'objet res pour permettre à l'application d'accéder à l'API
app.use((req, res, next) => { // On l'applique sur toutes les routes
 res.setHeader("Access-Control-Allow-Origin", "*"); // On Autorise tout le monde à acceder à notre API
 res.setHeader( // On donne l'autorisation de pouvoir utiliser certains headers sur response
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
 );
 res.setHeader( //  On donne l'autorisation de pouvoir utiliser certaines méthodes
   "Access-Control-Allow-Methods",
   "GET, POST, PUT, DELETE, PATCH, OPTIONS"
 );
 next(); // On passe l'éxécution au middleware suivant
});

// Interception des requêtes contenant du JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Importations des routes
require("./routes/user.routes")(app);
require("./routes/post.routes")(app);


// Exportations de nos app pour le server.js
module.exports = app;