const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    user: {
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

//  Post.belongsTo(User);

  return Post;
};
