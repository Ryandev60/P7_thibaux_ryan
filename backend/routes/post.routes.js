const auth = require("../middleware/auth.js");

module.exports = (app) => {
  const postController = require("../controllers/post.controllers");
  var router = require("express").Router();

  
  router.get("/",  postController.getAll);
  // router.post("/",  postController.create); // auth
  // router.get("/:id", postController.getOne);
  // router.put("/:id",  postController.modify);
  // router.delete("/:id", postController.delete);

  app.use("/api/post", router);
};
