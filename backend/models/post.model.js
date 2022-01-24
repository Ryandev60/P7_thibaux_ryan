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

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Post;
};
