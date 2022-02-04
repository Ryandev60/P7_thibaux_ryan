const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", commentController.findAll);
router.post("/", commentController.create);
// router.get("/:id", commentController.findOne);
// router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;

