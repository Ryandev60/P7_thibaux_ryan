module.exports = (sequelize, DataTypes) => {
 const Post = sequelize.define("Post", {
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
   }
 });

 Post.associate = (models) => {
   // Récupération du l'id user avec Post
  Post.belongsTo(models.User, {
    foreignKey: 'userId'
  });

  // Envoi de l'id du Post
  Post.hasMany(models.Comment, {
    foreignKey: 'postId'
  });
  

}
 return Post;
};