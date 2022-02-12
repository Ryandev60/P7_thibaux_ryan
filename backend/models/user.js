module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
  });

  // Association
  User.associate = (models) => {
    // Post
    User.hasMany(models.Post, {
      onDelete: "cascade",
      foreignKey: "userId",
    });

    // Comment
    User.hasMany(models.Comment, {
      onDelete: "cascade",
      foreignKey: "userId",
    });

    // Like
    User.hasMany(models.Like, {
      onDelete: "cascade",
      foreignKey: "userId",
    });
  };
  return User;
};
