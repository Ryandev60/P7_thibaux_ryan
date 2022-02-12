exports.createLike = (req, res, next) => {
 const userId = req.body.userId;
 const postId = req.body.postId;
 const newLike = req.body;

 db.Like.findOne({
   where: {
     userId: userId,
     postId: postId,
   },
 }).then((like) => {
   if (like) {
     db.Like.update({
       where: {
         userId: userId,
         postId: postId,
       },
     })
       .then(console.log("J'aime retirer"))
       .catch((error) => {
         res.status(400).json({ error });
       });
   } else {
     db.Like.create(newLike)
       .then(() => {
         res.status(201).json({ message: "Le like a bien été retirer" });
       })
       .catch((error) => {
         res.status(400).json({ error });
       });
   }
 }).catch();
};


item.Likes[0] &&
item.Likes[0].userId === currentUserDecoded.userId
  ? () => setPostLiked(item.id)
  : () => setPostUnLiked(item.id)