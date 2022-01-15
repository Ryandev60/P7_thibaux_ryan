module.exports = app => {
 const userController = require("../controllers/user.controllers.js");

 var router = require("express").Router();

 router.post('/signup', userController.signup);
 router.post('/login', userController.login);
 //router.delete('/delete/:id', userController.delete);

 app.use('/api/user', router);
};