module.exports = (sequelize, Sequelize) => {
 const Comment = sequelize.define("Comment", {
   title: {
     type: Sequelize.STRING
   },
   description: {
     type: Sequelize.STRING
   },
   published: {
     type: Sequelize.BOOLEAN
   }
 });

 return Comment;
};