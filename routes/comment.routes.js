module.exports = app => {
 const commentController = require("../controllers/comment.controllers.js");

router.get('/', auth, commentController.findAll);
router.post('/', auth, commentController.create);
router.get('/:id', auth, commentController.findOne);
router.put('/:id', auth, commentController.update);
router.delete('/:id', auth, commentController.delete);

 app.use('/api/comment', router);
};