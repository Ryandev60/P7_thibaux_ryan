const db = require("../models");
const Post = db.tutorials;
const Op = db.Sequelize.Op;

// Crée et sauvegarder un post
exports.create = (req, res) => {
 // Validate request
 if (!req.body.title) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }

 // Crée un post
 const post = {
   title: req.body.title,
   description: req.body.description,
   published: req.body.published ? req.body.published : false
 };

 // Sauvegarder un post dans la DB
 Post.create(tutorial)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Tutorial."
     });
   });
};

// Retrouver tout les posts dans la DB
exports.findAll = (req, res) => {
 const title = req.query.title;
 var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

 Post.findAll({ where: condition })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving tutorials."
     });
   });
};

// Trouver un post grâce à son id
exports.findOne = (req, res) => {
 const id = req.params.id;

 Post.findByPk(id)
   .then(data => {
     if (data) {
       res.send(data);
     } else {
       res.status(404).send({
         message: `Cannot find Tutorial with id=${id}.`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error retrieving Tutorial with id=" + id
     });
   });
};

// Mettre à jour un post grâce à son id
exports.update = (req, res) => {
 const id = req.params.id;

 Post.update(req.body, {
   where: { id: id }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Tutorial was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Tutorial with id=" + id
     });
   });
};

// Supprimer un post grâce à son id
exports.delete = (req, res) => {
 const id = req.params.id;

 Post.destroy({
   where: { id: id }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Tutorial was deleted successfully!"
       });
     } else {
       res.send({
         message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Could not delete Tutorial with id=" + id
     });
   });
};