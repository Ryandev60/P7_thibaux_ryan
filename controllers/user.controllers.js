const db = require("../models");
const User = db.user;
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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    // Crée un user
    console.log(user);
    // Save Tutorial in the database
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
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
      console.log("It's work");
      if (!user) {
        // Si on ne trouve pas d'utilisateur on renvoi une erreur
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      console.log("1" + req.body.password);
      console.log("2" + req.body.email);

      console.log("3" + user.email);
      console.log("4" + user.password);
      bcrypt
        .compare(req.body.password, user.password) // On comparer le mot de passe rentré par l'utilisateur avec le mot de passe correspondant hasher du dans la DB
        .then((valid) => {
          if (!valid) {
            console.log("geelo");
            // Si ce n'est pas valable
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } // Si c'est valable
          console.log('hello');

          res.status(200).json({
            userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }// Durée de validité du token
            ), 
          });
        })
        .catch((error) => res.status(500).json({ error }));
      console.log("error"); // Erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); // Erreur serveur
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//  const id = req.params.id;

//  Tutorial.update(req.body, {
//    where: { id: id }
//  })
//    .then(num => {
//      if (num == 1) {
//        res.send({
//          message: "Tutorial was updated successfully."
//        });
//      } else {
//        res.send({
//          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//        });
//      }
//    })
//    .catch(err => {
//      res.status(500).send({
//        message: "Error updating Tutorial with id=" + id
//      });
//    });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//  const id = req.params.id;

//  Tutorial.destroy({
//    where: { id: id }
//  })
//    .then(num => {
//      if (num == 1) {
//        res.send({
//          message: "Tutorial was deleted successfully!"
//        });
//      } else {
//        res.send({
//          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//        });
//      }
//    })
//    .catch(err => {
//      res.status(500).send({
//        message: "Could not delete Tutorial with id=" + id
//      });
//    });
// };
