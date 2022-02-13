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




  Executing (default): SHOW INDEX FROM `Users` FROM `groupomania`
Executing (default): CREATE TABLE IF NOT EXISTS `Posts` (`postContent` VARCHAR(255), `id` INTEGER auto_increment , `userId` INTEGER, `attachment` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Posts` FROM `groupomania`
Executing (default): CREATE TABLE IF NOT EXISTS `Comments` (`content` VARCHAR(255), `id` INTEGER auto_increment , `userId` INTEGER, `postId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY 
(`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Comments` FROM `groupomania`
Executing (default): CREATE TABLE IF NOT EXISTS `Likes` (`id` INTEGER auto_increment , `userId` INTEGER, `postId` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Likes` FROM `groupomania`