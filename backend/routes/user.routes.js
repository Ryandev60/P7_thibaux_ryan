const auth = require("../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers.js");

// Création d'un compte
router.post("/signup", userController.signup);

// Connexion
router.post("/login", userController.login);

//Supression
router.delete("/:id", userController.delete);

// Récupération d'un user

router.get("/getone/:id",auth, userController.getOneUser)

// Modification d'un user

router.put("/modify/:id", auth, userController.updateUser)

// Exportation des routes
module.exports = router;

