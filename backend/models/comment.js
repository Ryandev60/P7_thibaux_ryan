module.exports = (sequelize, DataTypes) => {
 const Comment = sequelize.define("Comment", {
   content: {
     type: DataTypes.STRING,
     allownull: false,
     validate: {
       notEmpty: true
     }
   },
   id: {
     type: DataTypes.INTEGER,
     autoIncrement: true,
     primaryKey: true
   },
   userId: {
    type: DataTypes.INTEGER,
    allownull: false
   },
   postId: {
    type: DataTypes.INTEGER,
    allownull: false
   }
 });

 // Association
 Comment.associate = (models) => {

  // Récupération de l'id du Post
  Comment.belongsTo(models.Post, {
    foreignKey: 'postId'
  });
  // Récupération de l'id du User
  Comment.belongsTo(models.User, {
    foreignKey: 'userId'
  });

}
 return Comment;
};