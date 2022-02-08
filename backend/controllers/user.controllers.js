const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Crée et sauvegarder un user
exports.signup = (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user ) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const user = {
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: `${req.protocol}://${req.get(
              "host"
            )}/images/user-solid.svg`,
          };

          // Sauvegarder un utilisateur dans la FB
          db.User.create(user)
            .then(() => {
              res.status(201).send({
                message: "L'utilisateur a été créé", ////////////////////
              });
            })
            .catch(() => {
              res.send({
                message: "L'utilisateur n'a pas pu être créé", ////////////////////
              });
            });
        });
      } else {
        res.status(401).send({
          message: "Email déja existant"
        })
      }
    })
    .catch((err) => {
      res.status(401).send({ err });
    });
};

// Connexion utlisateur
exports.login = (req, res, next) => {
  db.User.findOne({
    where: { email: req.body.email },
  }) // On cherche si l'email rentré par l'utilisateur correspond à un email dans la DB
    .then((user) => {
      if (!user) {
        // Si on ne trouve pas d'utilisateur on renvoi une erreur
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) // On comparer le mot de passe rentré par l'utilisateur avec le mot de passe correspondant hasher du dans la DB
        .then((valid) => {
          console.log("valideee");
          if (!valid) {
            // Si ce n'est pas valable
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } // Si c'est valable
          // On renvoie un status 200 avec un token encodé
          console.log("hello");
          res.status(200).json({
            userId: user.id,
            userRole: user.admin,
            token: jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET,
              { expiresIn: "24h" } // Durée de validité du token
            ),
          });
        })
        .catch((error) => res.status(505).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); // Erreur serveur
};

// Suprimer un utilisateur
exports.delete = (req, res) => {
  const id = req.query.id;

  db.User.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(201).send({
        message: "Utlisateur supprimé avec succés",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err,
      });
    });
};
