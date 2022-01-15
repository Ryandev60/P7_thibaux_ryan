module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true
      }
    },
  });

  return User;
};
