const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Récupérer tout les posts
router.get("/", auth, postController.getAll);

// Créé un post
router.post("/create", postController.create);

// Supprimer un post
router.delete("/:id", postController.delete);


module.exports = router;
