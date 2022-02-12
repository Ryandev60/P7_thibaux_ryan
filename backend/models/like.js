module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });

  Like.associate = (models) => {
    // User
    Like.belongsTo(models.User, {
      foreignKey: "userId",
    });
    // Post
    Like.belongsTo(models.Post, {
      foreignKey: "postId",
    });
  };
  return Like;
};
