const db = require("../models");
const fs = require("fs");

exports.create = (req, res) => {
  // on test si la requête contient un fichier

  const newComment = {
    ...req.body
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
 db.Comment
   .findAll({
     include: [
       {
         model: db.User,
         attributes: ["firstName", "lastName"],
       },
     ],
     where: { postId: req.query.id },
     order: [['createdAt', 'DESC']],
   })
   .then((comments) => {
     res.status(200).json(comments);
   })
   .catch((error) => {
     res.status(500).json({ error });
   });
};