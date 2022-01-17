const db = require("../models");
const Post = db.post;
const Op = db.Sequelize.Op;

// Crée un post
exports.create = (req, res) => {

  // Crée un post
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
 
  // Sauvegarder un post dans la DB
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message,////////////
      });
    });
 };


exports.getAll = (req, res) => {
  const title = req.query.title;
 
  Post.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message/////////////////////
      });
    });
 };


// Crée et sauvegarder un post


// Retrouver tout les posts dans la DB


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