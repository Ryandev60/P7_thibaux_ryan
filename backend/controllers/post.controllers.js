const db = require("../models");
const fs = require("fs");

// Créé un Post

exports.create = (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    creatorId: req.body.creatorId,
  };
  console.log(newPost);
  db.Post.create(newPost)
    .then(() => {
      res.status(201).send({
        message: "Le post a été crée", ////////////////////
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "Le post n'a pas pu être créé", ////////////////////
      });
    });
};

// Récupérer tout  les Posts

exports.getAll = (req, res) => {
  db.Post.findAll({
    include: [
      {
        model: db.User,
        attributes: ["firstName", "lastName"],
      },
      {
        model: db.comment,
        attributes: ["creatorId"]
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un post

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);

  db.Post.findOne({ where: { id: id }})
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post non trouvé" });
      }
      post
        .destroy()
        .then(() => {
          res.status(200).json({ message: "Post supprimé avec SUCCES !" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
