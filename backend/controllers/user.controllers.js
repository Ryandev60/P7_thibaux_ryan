const db = require("../models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Crée et sauvegarder un user
exports.signup = (req, res) => {
  // Validation de la requête
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }; // Sauvegarder un utilisateur dans la FB
    db.User.create(user)
      .then(() => {
        res.status(201).send({
          message: "L'utilisateur a été créé", ////////////////////
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "L'utilisateur n'a pas pu être créé", ////////////////////
        });
      });
  });
};

// Connexion utlisateur
exports.login = (req, res, next) => {
  User.findOne({
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
          if (!valid) {
            // Si ce n'est pas valable
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } // Si c'est valable
          console.log("hello");
          // On renvoie un status 200 avec un token encodé
          res.status(200).json({
            userId: user.id,
            userRole: user.role,
            token: jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET,
              { expiresIn: "24h" } // Durée de validité du token
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
      console.log("error"); // Erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); // Erreur serveur
};

// Suprimer un utilisateur
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then(() => {
      if (id == req.params.id) {
        res.status(201).send({
          message: "Utlisateur supprimé avec succés",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: "Requête non autorisés",
      });
    });
};
