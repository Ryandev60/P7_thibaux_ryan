const Post = require("./post.model");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
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
        notEmpty: true,
      },
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  
  return User;
};

const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    userId: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    publishedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

 

  return Post;
};
User.hasMany(Post, {});

Post.belongsTo(User, {})

