const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Récupérer tout les posts
router.get("/", postController.getAll);

// Créé un post
router.post("/", postController.create);

// Supprimer un post
router.delete("/:id", postController.delete);

// router.get("/:id", postController.getOne);
// router.put("/:id",  postController.modify);

module.exports = router;
