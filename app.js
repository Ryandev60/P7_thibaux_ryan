// Importation d'express qui est un framework pour construire des applications web basées sur nodeJS
const express = require("express");
const app = express();

// Importation de la DB
const db = require("./models");

// Syncronisation de la DB
db.sequelize.sync();

// Importations des routes 
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

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


require("./routes/user.routes")(app);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;