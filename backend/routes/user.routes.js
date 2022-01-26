const auth = require("../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");

// Création d'un compte
router.post("/signup", userController.signup);

// Connexion
router.post("/login", userController.login);

//Supression
router.delete("/delete/:id", auth, userController.delete);

// Exportation des routes
module.exports = router;

