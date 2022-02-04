const db = require("../models");
const fs = require("fs");

exports.create = (req, res) => {
  // on test si la requête contient un fichier

  const newComment = {
    ...req.body,
  };

  db.Comment.create(newComment)
    .then(() => {
      res.status(201).json({ message: "Le commentaire a été créé" });
    })
    .catch(() => {
      res.status(400).json({ message: "Le post n'a pas pu être créé" });
    });
};

exports.findAll = (req, res, next) => {
  db.Comment.findAll({
    include: [
      {
        model: db.User,
        attributes: ["firstName", "lastName"],
      },
    ],
    where: { postId: req.query.id },
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.delete = (req, res) => {
  db.Comment.findOne({
    where: { id: req.query.id },
  })
    .then((comment) => {
      if (!comment) {
        return re.status(404).json({ error: "Le commentaire n'a pas été trouver" });
      }

      comment
        .destroy()
        .then(() => {
          res
            .status(200)
            .json({ message: "Le commentaire à bien été supprimer" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
