const auth = require("../middleware/auth.js");
const db = require('../models');

module.exports = (app) => {
  const userController = require("../controllers/user.controllers.js");

  var router = require("express").Router();

  router.post("/signup", userController.signup);
  router.post("/login", userController.login);
  router.delete("/delete/:id", auth, userController.deleteUser);

  app.use("/api/user", router);
};
